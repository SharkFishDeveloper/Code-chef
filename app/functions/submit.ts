import axios from "axios";
import { getSession } from "next-auth/react";
import BACKEND_URL from "./backendurl";
import  ip,{ address } from "ip";
export interface submitReq {
    selectedLanguage:string,
    code:string,
    userId:string
}

//@ts-ignore
async function Submit({code,selectedLanguage}) {
    let language = selectedLanguage === "javascript" ? "js" : selectedLanguage
    const session = await getSession();
    var userId;
    try {
        if (!session) {
            return {message:"Please login first",status:300,result:"error"}; 
        }
        //@ts-ignore
        userId =  session?.user.id; 
        const ipAddress = `http://${address()}:4000`;
        
        const resp = await axios.post(`${ipAddress}/submit-code`,{code,selectedLanguage:language,userId});
        console.log("resp",resp.data)
        if(resp.data.stderr!==""){
            return {
                message: "Please fix your code",
                result: resp.data.stderr,
                status:403
            };
        }
        return {
            message: "Code executed successfully",
            result: resp.data.result,
            status:200
        };

    } catch (error) {
        
        console.log(error);
        return {message:"Submitting error",status:300,result:"error"}
    }
}



export {Submit};