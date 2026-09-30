import {test, expect, APIResponse } from "@playwright/test";
import fs from "fs";
import { readingAPIpayload } from "../../src/utilities/ReadingAPI.js";

let BaseUrl = process.env.API_URL!;

test("POST Request: create new resource from Filedata",async({request})=>{

    //File is JSON-->Js object
    let payload = JSON.parse(fs.readFileSync("src/apiData/postdata.json","utf-8"));
    let response:APIResponse=await request.post(`${BaseUrl}/booking`,{headers:{"Content-Type":"application/json"},data:payload})
    expect(response.status()).toBe(200);
    console.log("Status code is:",response.status());

    //json response
    let jsonresponse = await response.json();
    console.log(jsonresponse);

    //print booking id
    console.log("Booking id is:",jsonresponse.bookingid);
})

test("POST Request: create new resource from Filedata Utility",async({request})=>{

    //File is JSON-->Js object
    let payload = await readingAPIpayload("postdata");
    let response:APIResponse=await request.post(`${BaseUrl}/booking`,{headers:{"Content-Type":"application/json"},data:payload})
    expect(response.status()).toBe(200);
    console.log("Status code is:",response.status());

    //json response
    let jsonresponse = await response.json();
    console.log(jsonresponse);

    //print booking id
    console.log("Booking id is:",jsonresponse.bookingid);
})