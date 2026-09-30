import {test, expect, APIResponse} from "@playwright/test";
import { readingAPIpayload } from "../../src/utilities/ReadingAPI.js";

let BaseUrl = process.env.API_URL!;

let bookingId:number;
let authToken:string;

test.beforeEach(async({request})=>{
      //step 1:
    //payload
    const payload = await readingAPIpayload("postdata");

    //post request
    let response:APIResponse = await request.post(`${BaseUrl}/booking`,
        {headers:{"Content-Type":"application/json"},data:payload});

    //to extract the json respose payload
    const jsonResponse = await response.json();
    console.log(jsonResponse);

    //to extract only booking id
    bookingId = jsonResponse.bookingid;
    console.log("New booking created with bookingid:",bookingId);

    //step 2: Get the booking details based on same bookingid
    const getResponse = await request.get(`${BaseUrl}/booking/${bookingId}`);

    //to extract current response
    const jsonGetRes = await getResponse.json();
    console.log("Get the booking details using id:",bookingId);
    console.log(jsonGetRes);  

    //step 3: Generate token
    //auth payload
    const authPayload = await readingAPIpayload("authdata");
    const authRespose = await request.post(`${BaseUrl}/auth`,
        {headers:{"Content-Type":"application/json"},data:authPayload});
    
    //print response
    const res2 = await authRespose.json();
    console.log(res2);

    //extract token 
    authToken = res2.token;
    console.log("Token generated:",authToken);
    
})

test("Create new booking-->get the same booking-->Generate token-->Full update the booking",async({request})=>{
    //step 1: Create new booking
    //step 2: get the same booking 
    //step 3: Generate token
    //step 4: Full update for same booking 
    //new payload
    const putPayload = await readingAPIpayload("putdata");
    const putResponse = await request.put(`${BaseUrl}/booking/${bookingId}`,{headers:
        {"Content-Type": "application/json",
        "Accept": "application/json",
        "Cookie": `token=${authToken}`
        },data:putPayload});
    
    //print the response
    let res3 = await putResponse.json();
    console.log("Updated booking is: ");
    console.log(res3);

    //assert status
    expect(putResponse.status()).toBe(200);
    console.log("Current booking is updated successfully")
})

test("Create new booking-->get the same booking-->Generate token-->Partial update the booking",async({request})=>{
    //step 1: Create new booking
    //step 2: get the same booking 
    //step 3: Generate token
    //step 4: Partial update for same booking 
    //new payload
    const patchPayload = await readingAPIpayload("patchdata");
    const patchResponse = await request.patch(`${BaseUrl}/booking/${bookingId}`,{headers:
        {"Content-Type": "application/json",
        "Accept": "application/json",
        "Cookie": `token=${authToken}`
        },data:patchPayload});
    
    //print the response
    let res3 = await patchResponse.json();
    console.log("Partial updated booking is: ");
    console.log(res3);

    //assert status
    expect(patchResponse.status()).toBe(200);
    console.log("Current booking is partailly updated successfully")
})

test("Create new booking-->get the same booking-->Generate token-->Delete the booking",async({request})=>{
    //step 1: Create new booking
    //step 2: get the same booking 
    //step 3: Generate token
    //step 4: Delete the same booking 
    const deleteResponse = await request.delete(`${BaseUrl}/booking/${bookingId}`,{headers:{
        "Content-Type": "application/json",
        "Cookie": `token=${authToken}`
    }})

    //status code should be 201 and message should be created
    expect(deleteResponse.status()).toBe(201);
    console.log("Status code is:",deleteResponse.status());

    expect(deleteResponse.statusText()).toBe("Created");
    console.log("Status message is:",deleteResponse.statusText());

    //step 5: get the deleted booking and validate 404 status code
    const getRes = await request.get(`${BaseUrl}/booking/${bookingId}`);

    //print it
    console.log("Get: Get the booking details");
    console.log(await getRes.text());

    //assertion
    expect(getRes.status()).toBe(404);
    console.log(getRes.statusText());
})