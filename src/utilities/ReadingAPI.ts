import fs from "fs";

export function readingAPIpayload(fileName:string):Promise<any>
{
    return JSON.parse(fs.readFileSync("src/apiData/"+fileName+".json","utf-8"));    
}