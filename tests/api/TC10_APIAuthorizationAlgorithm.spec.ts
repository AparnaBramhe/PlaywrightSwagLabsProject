import {test, expect, APIResponse} from "@playwright/test";
import {Buffer} from "buffer";
import { readingAPIpayload } from "../../src/utilities/ReadingAPI";

test("Test for NoAuth Authentication algorithm",async({request})=>{

    const response:APIResponse = await request.get("https://jsonplaceholder.typicode.com/posts/1");

    //validate status code
    expect(response.status()).toBe(200);
    console.log("Status code matched!",response.status());

    //get the response body
    const jsonRes = await response.json();
    console.log(jsonRes);
})

test("Test for BasicAuth Authentication algorithm",async({request})=>{

    const username="postman";
    const password="password";

    //encode data in base64:Buffer package
    let bufferIntoBase64 = Buffer.from(`${username}:${password}`).toString("base64");
    console.log(bufferIntoBase64);

    const response:APIResponse = await request.get("https://postman-echo.com/basic-auth",
        {headers:{Authorization:`Basic ${bufferIntoBase64}`}}
    );

    //validate status code
    console.log(response.status());
    console.log(await response.text());
    expect(response.status()).toBe(200);
})

test("Test for APIKey",async({request})=>{
    const apiKey = "free_user_3Jzll4o7oQvUfgi6HJBv3QWNHaL";
    const response = await request.get("https://reqres.in/api/users?page=2",
        {headers:{'x-api-key':`${apiKey}`}}
    );

    expect(response.status()).toBe(200);
    console.log(await response.json());
})

test("Test for Bearer token",async({request})=>{
    const token = process.env.ACCESSTOKEN!;

    //payload
    //let payload = await readingAPIpayload("gorestdata");
    let email = "geeta"+new Date().getTime()+"@gmail.com";

    let payload={
        "name": "Geeta Verma",
        "email": email,
        "gender": "female",
        "status": "inactive"
    }

    const response = await request.post("https://gorest.co.in//public/v2/users",
        {headers:{Authorization:`Bearer ${token}`},data:payload}
    );

    expect(response.status()).toBe(201);
    console.log(await response.json());
})

//OAuth2.0
/*
OAuth (Open Authorization) is a protocol used for access delegation, 
where resource owners grant third-party applications to access their resources 
without sharing their user credentials.

https://medium.com/identity-beyond-borders/oauth-1-0-vs-oauth-2-0-e36f8924a835

*/