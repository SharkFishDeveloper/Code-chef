

import axios from "axios";
import BACKEND_URL from "./backendurl";
import { address } from "ip";

async function leaderboard_user(contest:string,userid:string){
    try {
        const ipAddress = `http://${address()}:4000`;
      const resp = await axios.post(`${ipAddress}/leaderboard/contest/${contest}/data`,{userId:userid});
        console.log(`${BACKEND_URL}/${contest}/data`);
        const data = resp.data;
        console.log("DATA L ---------------- ",data)
        return {data,status:200,message:"Success"}
    } catch (error) {
        return {message:"Error in leaderboard",status:404}
    }
}

export default leaderboard_user;