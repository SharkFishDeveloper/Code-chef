"use server"

import axios from "axios";
import { address } from "ip";

async function contestProblem(data:any) {
   try {
      const userData:{contest:string,solvedProblems:number,allproblems:number,score:number,user:any,time:number,username:string | null | undefined} = data;
      const ipAddress = `http://${address()}:4000`;
      const resp = await axios.post(`${ipAddress}/contest/${userData.contest}`,userData);
   
    console.log(resp.data);
    console.log(userData);
    return {message:"Submitted"};
   } catch (error) {
    return {message:"An error while submission"}
   }
}
export default contestProblem;
