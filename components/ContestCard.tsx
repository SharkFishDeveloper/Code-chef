"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

enum ContestStatus {
    Upcoming = 'Upcoming',
    Delayed = 'Delayed',
    CanParticipate = 'Can Participate',
    NotAvailable = 'Not Available'
  }
  

const ContestCard= ({ name, problems,dateProblem,score }:{ name:string, problems:string[],dateProblem:string,score:string[],startingTime:string }) => {
    //@ts-ignore
    const date = new Date(dateProblem);
        date.setHours(date.getHours() - 5);
        date.setMinutes(date.getMinutes() - 30);

    const formattedDate = date.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true // Display in 12-hour format
    });

    const endDate = new Date(date);
    endDate.setHours(date.getHours() + 2);
    
    const [checkParticipated,setcheckParticipated] = useState(true);

    const [contestStatus, setContestStatus] = useState<ContestStatus>(ContestStatus.NotAvailable);

    useEffect(() => {
      const now = new Date();
  
      // Check if current time is between startDate and endDate
      if (now < date) {
        setContestStatus(ContestStatus.Upcoming);
      } else if (now > endDate) {
        setContestStatus(ContestStatus.Delayed);
      } else if (now >= date && now <= endDate) {
        setContestStatus(ContestStatus.CanParticipate);
      } else {
        setContestStatus(ContestStatus.NotAvailable);
      }

      const data = localStorage.getItem("participated")
      if(data === name){
        setcheckParticipated(false);
      }
        
    }, [dateProblem]);

    const dateClass = () => {
        switch (contestStatus) {
          case ContestStatus.Upcoming:
            return 'text-blue-500'; // Blue for upcoming
          case ContestStatus.Delayed:
            return 'text-red-500'; // Red for delayed
          case ContestStatus.CanParticipate:
            return 'text-green-500'; // Green for can participate
          case ContestStatus.NotAvailable:
            return 'text-gray-500'; // Gray for not available
          default:
            return 'text-gray-700'; // Default gray
        }
      };
    return (
        <div className="h-[13rem] max-w-sm rounded-xl overflow-hidden shadow-lg bg-white m-4 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer hover:bg-gray-100 flex flex-col justify-between">
            <div className="px-6 py-7">
                <div className="font-bold text-xl mb-2">Contest - {name}</div>
                <p className="text-gray-700 text-base">
                    Total Questions - {problems?.length}
                </p>
                    <p className={`text-base ${dateClass()}`}>
                    Starts at - {formattedDate}
                    </p>
            </div>
            <div className="flex items-center justify-center bg-black text-white h-[3rem] rounded-md hover:bg-gray-800 cursor-pointer" >
                { contestStatus === ContestStatus.CanParticipate ? (
                    checkParticipated ? (
                        <Link  href={`/contest/${name}`} onClick={()=>{
                            localStorage.setItem("contest-name",name);
                            if(problems)localStorage.setItem("contest-problems",JSON.stringify(problems));
                            localStorage.setItem('contest-score',JSON.stringify(score))  
                            localStorage.setItem('contest-time',dateProblem)
                                localStorage.setItem("participated", name);
                        }}>Participate</Link>
                    ):(
                        <p onClick={()=>toast.error("You have already participated ")}>Participate</p>
                    ) 
                ): <p>{contestStatus}</p>}
            </div>
        </div>
    
    );

}

export default ContestCard;
