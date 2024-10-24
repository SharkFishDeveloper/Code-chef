"use server"
import fs from "fs";
// import "../../../problems/add/Problem.md"
import path from "path";
async function getFile(pathP:string) {
    const j = path.join(__dirname,`../../../../../${pathP}`);
    console.log("path ---",j)
    const data = fs.readFileSync(j,"utf-8");
    console.log("data from here ------------",data)
    return data;
}
export {getFile};