import {test, expect, APIResponse} from "@playwright/test";
import { readingAPIpayload } from "../../src/utilities/ReadingAPI";
import Ajv from "ajv";

const ajv = new Ajv();
const BaseUrl = process.env.API_URL!;

test("Test for RestBooker schema validation", async({request})=>{
    
    //send the request and get the response
    let payload = await readingAPIpayload("postdata");
    let response = await request.post(`${BaseUrl}/booking`,
        {headers:{"Content-Type":"application/json"},data:payload});
    
    //get json response
    let jsonRes = await response.json();
    
    //store schema:https://transform.tools/json-to-json-schema
    let schema ={  
    "type": "object",
    "properties": {
    "bookingid": {
      "type": "number"
    },
    "booking": {
      "type": "object",
      "properties": {
        "firstname": {
          "type": "string"
        },
        "lastname": {
          "type": "string"
        },
        "totalprice": {
          "type": "number"
        },
        "depositpaid": {
          "type": "boolean"
        },
        "bookingdates": {
          "type": "object",
          "properties": {
            "checkin": {
              "type": "string"
            },
            "checkout": {
              "type": "string"
            }
          },
          "required": [
            "checkin",
            "checkout"
          ]
        },
        "additionalneeds": {
          "type": "string"
        }
      },
      "required": [
        "firstname",
        "lastname",
        "totalprice",
        "depositpaid",
        "bookingdates",
        "additionalneeds"
      ]
    }
  },
  "required": [
    "bookingid",
    "booking"
  ]
}
    //validation of response with schema
    const validate = ajv.compile(schema); //this method returns validate function()
    const isValid = validate(jsonRes);

    if(!isValid)
    {
      console.log("Schema error:",validate.errors);
    }

    expect(isValid).toBeTruthy();
    console.log("Response is valid as per schema");
})