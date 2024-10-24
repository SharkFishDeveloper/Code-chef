"use client"
import React, { useEffect, useState } from 'react';
import ProblemCard from '../../components/ProblemCard';
// import Loader from '../../components/Loader';
import Pingingloader from '../../components/Pingingloader';
import axios from 'axios';
import FRONTEND_URL from '../functions/frontendurl';






type Problem = {
  slug: string;
  level: string;
};


const Problems = () => {
  const [visibleCount, setVisibleCount] = useState(8);
  const [problemsF,setProblems] =  useState<{ message: Problem[], status: string }>({ message: [], status: '' });
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchProblms = async()=>{
      const resp = await axios.get(`${FRONTEND_URL}/api/fetch-problems`);
      if(resp.data.status==="200"){
          setProblems({message:resp.data.message,status:resp.data.status});
        }
      setLoading(false);

    }
    fetchProblms();
  
  }, [])
  
  const handleShowMore = () => {
    setVisibleCount(20);
  };

  return (
    <div className="min-h-screen w-full p-4">
        {loading ? (
            <Pingingloader />
        ) : (
            <div>
                <h1 className="font-semibold text-3xl text-black mb-4 text-center">Popular Problems</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {problemsF.message.slice(0, visibleCount).map((problem, index) => (
                        <ProblemCard 
                            key={index} 
                            title={problem.slug} 
                            level={problem.level}
                            index={(index+1).toString()}
                        />
                    ))}
                </div>
                {visibleCount < problemsF.message.length && (
                    <div className="flex justify-center mt-4">
                        <button 
                            onClick={handleShowMore} 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                        >
                            Show More
                        </button>
                    </div>
                )}
            </div>
        )}
    </div>
);

};

export default Problems;
