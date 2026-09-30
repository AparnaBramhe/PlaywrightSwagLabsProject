/*
API chaining:
    Using response of one API request as input to next API request.
1. create new resource(POST)-->bookingid-->sending GET call(booking details)
2. create new resource(POST)-->bookingid+token from Auth API-->Full update resource(PUT)
3. create new resource(POST)-->bookingid+token from Auth API-->Parial update resource(PATCH)
4. create new resource(POST)-->bookingid+token from Auth API-->Delete resource(DELETE)

//Temporary understanding
In playwright all test cases execute in parallel
- current test case need to execute in sequence
test.describe.serial()

Note:
Test case should be independent, its executing parallely
right technique for api chaining
*/

import {test,expect,APIResponse} from "@playwright/test";
import { readingAPIpayload } from "../../src/utilities/ReadingAPI";

let BaseUrl = process.env.API_URL!;
let bookingId:number;
let token:string;

test.describe.serial("This is suite for API chaining",()=>{

    test("POST: create new booking",async({request})=>{

        let payload = await readingAPIpayload("postdata");
        let response:APIResponse = await request.post(`${BaseUrl}/booking`,
            {headers:{"Content-Type":"application/json"},data:payload});
        expect(response.status()).toBe(200);
        let jsonresponse = await response.json();
        console.log("Booking created:",jsonresponse);

        //id
        bookingId = jsonresponse.bookingid;
        console.log("Booking created with id:",jsonresponse.bookingid);
    })

    //get booking details for newly added booking
    test("GET: Get newly added booking details",async({request})=>{

        console.log("Collecting newly added booking details for ID:",bookingId);
        let response = await request.get(`${BaseUrl}/booking/${bookingId}`);
        expect(response.status()).toBe(200);

        //json response
        let jsonResponse = await response.json();
        console.log("Booking details:",jsonResponse);
    })

    test("POST: Create new Token for update and delete request",async({request})=>{
        
        console.log("Post call to generate token...");

        let payload = await readingAPIpayload("authdata");
        let response = await request.post(`${BaseUrl}/auth`,{headers:{"Content-Type":"application/json"},data:payload});

        expect(response.status()).toBe(200);

        //extract the token
        let jsonresponse = await response.json();
        token = jsonresponse.token;
        console.log(`API token is created ${token} for id ${bookingId}`);
    })

    //update full record
    test("PUT: Test for Full update for current booking",async({request})=>{
        
        console.log("Updating full record");
        //payload
        let payload = readingAPIpayload("putdata");
        let response = await request.put(`${BaseUrl}/booking/${bookingId}`,
            {headers:
                {"Content-Type":"application/json", 
                "Accept":"application/json",
                "Cookie":`token=${token}`},
            data:payload});

        expect(response.status()).toBe(200);

        let jsonResponse = await response.json();
        console.log("Full update record is...",jsonResponse);
    })

    //update parial record
    test("PATCH: Update partial record",async({request})=>{
        console.log("Updating partial record");
        //payload
        let payload = readingAPIpayload("patchdata");
        let response = await request.patch(`${BaseUrl}/booking/${bookingId}`,
            {headers:
                {"Content-Type":"application/json", 
                "Accept":"application/json",
                "Cookie":`token=${token}`},
            data:payload});

        expect(response.status()).toBe(200);

        let jsonResponse = await response.json();
        console.log("Partial update record is...",jsonResponse);        
    })

    //delete record
    test("DELETE: Delete partial record",async({request})=>{
        console.log("Deleting record");
        //payload
        let payload = readingAPIpayload("patchdata");
        let response = await request.delete(`${BaseUrl}/booking/${bookingId}`,
            {headers:
                {"Content-Type":"application/json", 
                "Cookie":`token=${token}`},
            data:payload});

        expect(response.status()).toBe(201);
        console.log("Status code is:",response.status());
        
        expect(response.statusText()).toBe("Created");
        console.log("Status message is ",response.statusText());
        
        console.log("Record deleted for is:",bookingId);
    })
})


