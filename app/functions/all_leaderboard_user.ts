
import axios from "axios";
import { address } from "ip";

async function all_leader_board_user(userid:string){
try {
    console.log("all_leader_board_user")
      const ipAddress = `http://${address()}:4000`;
      const resp = await axios.post(`${ipAddress}/contest/all-contests/${userid}`);
      const data = resp.data;
      console.log("/contest/${userid}/data",data);
    return {data,status:200,message:"Success"}
} catch (error) {
    return {message:"Error in leaderboard",status:404}
}
}




    export default all_leader_board_user;
// export default {all_leader_board_user,leaderboard_user};