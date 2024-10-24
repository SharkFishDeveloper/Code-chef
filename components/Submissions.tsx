import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FRONTEND_URL from '../app/functions/frontendurl'
import { useSession } from 'next-auth/react'

const Submissions = ({problemName}:{problemName:string}) => {
const session = useSession();
const [data,setData] = useState<{message:{status:string[],time:string[],slug:string}} | null>(null);


const formatDate = (dateString: string) => {
    const date = new Date(dateString);
  
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata',
    };
  
    return date.toLocaleDateString('en-IN', options);
  };


useEffect(()=>{
const resp =async ()=>{
try {
    const dataa = await axios.post(`${FRONTEND_URL}/api/submissions`,{
        // @ts-ignore
    userId:session.data?.user.id,
    problemName:problemName
    })
    console.log("dataa",dataa,problemName)
    if(dataa.data.message){
      setData({message:dataa.data.message}); //message is an array of time and 
    } 
    console.log(dataa);
} catch (error) {
    console.log(error);
    return alert("Problem in submissions tab");
}
}
resp();
},[])

return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md w-3/4 p-6 h-[90%]">
        <p className="text-2xl font-semibold mb-4">Submissions</p>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600">Problem Name:</p>
          <p className="text-lg font-semibold">{data?.message && data?.message.slug.toUpperCase()}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600 mb-2">Status:</p>
          <div>
            {data && data.message.status.map((s, i) => (
              <div key={i} className="flex items-center mb-4">

                <div className="bg-gray-200 rounded-lg p-4 flex items-center space-x-7 w-[99%] justify-between">
                  <p className="text-lg font-semibold text-green-600">{s}</p>
                  <p className="text-xs text-gray-500">{formatDate(data.message.time[i] as string)}</p>
                </div>

              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
  
  
  
}

export default Submissions