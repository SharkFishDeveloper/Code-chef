"use client"
import React, { use, useEffect, useState } from 'react'
import all_leader_board_user from '../../functions/all_leaderboard_user'
import leaderboard_user from '../../functions/contest_leaderboard';


const Leaderboard = ({ params }: { params: { userid:string } }) => {
  const resolvedParams = use(params);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [show,setShow] = useState(false);
  const [loading2,setLoading2]= useState(false);
  const [message,setMessage]= useState<any>();
  const [contestData,setcontestData]= useState<any>();


  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("params.userid",resolvedParams.userid)
        const respo = await all_leader_board_user(resolvedParams.userid);
        setData(respo);
        setLoading(false); // Update loading state when data is fetched
      } catch (error) {
        console.log('Error fetching data:', error);
        setLoading(false); // Ensure loading state is updated on error
      }
    };

    fetchData(); // Fetch data on component mount or when params.userid changes
  }, []);


  const handleLeaderBoardCLick = async (prob:string)=>{
    setShow(p=>!p);
    setLoading2(true);
    try {
    const resp  = await leaderboard_user(prob,resolvedParams.userid);
    console.log(resp);
    console.log(prob,resolvedParams.userid);
  
    setMessage(resp.data.message);
    setcontestData(resp.data.contestData)
   } catch (error) {
    console.log(error);
    return alert("Try again later");
   }finally{
    setLoading2(false);
   }
  }


  console.log("data",data); 
  return (
    !show ? (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && (<p></p>)}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">Contest Ranks</h2>
        </div>
  
        {loading2 ? (
          <div className="text-center">Loading...</div>
        ) : data && data.data ? (
          <div>
            {/* Render contest ranks */}
            {data.data.contestKeys.map((contestKey: string, index: number) => (
              <div
                key={contestKey}
                className="mb-4 border border-gray-200 rounded-lg p-4 hover:bg-gray-200 transition-all cursor-pointer"
                onClick={() => handleLeaderBoardCLick(contestKey.substring(8, contestKey.length))}
              >
                <p className="text-lg font-semibold">Contest - {contestKey.toUpperCase().substring(8, contestKey.length)}</p>
                <p className="text-lg">Rank: {data.data.userRanks[index]}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">No data available</div>
        )}
      </div>
    ) : (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">Contest Result</h2>
          {message && (<p className="text-lg">{message}</p>)}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
              </tr>
            </thead>

{contestData && (
              <tbody className="bg-white divide-y divide-gray-200">
              {contestData.map((entry:any, index:any) => {
                const user = JSON.parse(entry.value).user;
                const score = entry.score;
                return (
                  <tr key={index} className="hover:bg-gray-100 transition-all">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{score}</td>
                  </tr>
                );
              })}
            </tbody>
)}
          </table>
        </div>
      </div>
    </div>
    )
  );
}

export default Leaderboard