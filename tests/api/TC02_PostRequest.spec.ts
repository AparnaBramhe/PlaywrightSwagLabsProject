import {test, expect, APIResponse} from "@playwright/test";

//let BaseUrl = "https://restful-booker.herokuapp.com";

let BaseUrl = process.env.API_URL!;

test("POST Request: Create new resource with manual payload",async({request})=>{
    //JS object payload
    let payload = {
        firstname : "Neha",
        lastname : "Verma",
        totalprice : 1500,
        depositpaid : true,
        bookingdates : {
            checkin : "2026-09-14",
            checkout : "2026-09-16"
        },
        additionalneeds : "Breakfast"
    }

    const response:APIResponse = await request.post(`${BaseUrl}/booking`,
        {headers:
            {"Content-Type": "application/json"},data:payload
        }); //data will convert JSObject into JSON string

    //assertion
    expect(response.status()).toBe(200);
    console.log("Status code is: "+response.status());

    expect(response.statusText()).toBe("OK");
    console.log("Status message is: "+response.statusText());

    //Json response
    let jsonResponse=await response.json();
    console.log(jsonResponse);

    //Response validation
    //To validate response poperty
    expect(jsonResponse).toHaveProperty("bookingid");
    //bookingid should be number type
    expect(jsonResponse.bookingid).toEqual(expect.any(Number));
    //expect.any() matches any object instance created from the constructor 
    // or a corresponding primitive type. 

    //firstname should be strig type
    expect(jsonResponse.booking.firstname).toEqual(expect.any(String));

    //"depositpaid" : true,
    expect(jsonResponse.booking.depositpaid).toEqual(expect.any(Boolean));

    //validate value
    expect(jsonResponse.booking.firstname).toBe("Neha");
    console.log("Firstname matched!",jsonResponse.booking.firstname);

    //to validate data/fields of object
    //first for booking object
    let bookingObject = jsonResponse.booking;
    expect(bookingObject).toMatchObject(payload);

    //second for bookingdates object
    let bookingdatesObject = jsonResponse.booking.bookingdates;
    expect(bookingdatesObject).toMatchObject({
            checkin : "2026-09-14",
            checkout : "2026-09-16"
        });
})