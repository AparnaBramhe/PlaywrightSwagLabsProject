import {test, expect, APIResponse} from "@playwright/test";

//let BaseUrl = "https://restful-booker.herokuapp.com";

let BaseUrl = process.env.API_URL!;

test("GET request: Get all BookingIds",async({request})=>{
    let response:APIResponse = await request.get("https://restful-booker.herokuapp.com/booking");
    
    console.log("Status code is: "+response.status());
    console.log("Status message is: "+response.statusText());
    
    //assert
    //status code should be 200
    expect(response.status()).toBe(200);
    
    //status text should be OK
    expect(response.statusText()).toBe("OK");
    
    //console.log(await response.body()); //Returns the buffer with response body.
    
    //get the Json response:JSON()
    let jsonResponse = await response.json(); //Returns the JSON representation of response body.
    console.log(jsonResponse);

    //get the response in text format: text()
    let textResponse = await response.statusText(); //Returns the text representation of response body.
    console.log(textResponse);
})

test("GET request: Get all BookingIds with BaseUrl",async({request})=>{
    let response:APIResponse = await request.get(`${BaseUrl}/booking`);
    
    console.log("Status code is: "+response.status());
    console.log("Status message is: "+response.statusText());
    
    //assert
    //status code should be 200
    expect(response.status()).toBe(200);
    
    //status text should be OK
    expect(response.statusText()).toBe("OK");
    
    //console.log(await response.body()); //Returns the buffer with response body.
    
    //get the Json response:JSON()
    let jsonResponse = await response.json(); //Returns the JSON representation of response body.
    console.log(jsonResponse);

    //get the response in text format: text()
    let textResponse = await response.statusText(); //Returns the text representation of response body.
    console.log(textResponse);
})

test("GET request: Get request for Path and Query parameters",async({request})=>{
    const firstname = "Jim";
    let response:APIResponse = await request.get(`${BaseUrl}/booking`,{params:{firstname:firstname}});
    
    console.log("Status code is: "+response.status());
    console.log("Status text is: "+response.statusText());

    //json response
    let jsonResponse = await response.json();
    console.log(jsonResponse);
})