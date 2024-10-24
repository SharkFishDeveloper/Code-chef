import React from 'react'
import Link from 'next/link';



const ProblemCard = ({title,level,index}:{title:string,level:string,index:string}) =>
   { 
  const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1);
  const formattedLevel = level.charAt(0).toUpperCase() + level.slice(1);
  return (
    <div className="h-[10rem] w-[18rem] bg-gray-800 my-2 rounded-md p-5 hover:scale-105 transition-transform duration-300 hover:bg-gray-700 cursor-pointer shadow-2xl">
      <p className="font-semibold text-lg text-white">{index}. {formattedTitle}</p>
      <p className="text-white mt-2">Difficulty - <span className={`font-bold ${getLevelColor(level)}`}>{formattedLevel}</span></p>
      <div className="h-8 w-32 bg-blue-500 hover:bg-blue-700 text-white flex justify-center items-center rounded-md cursor-pointer mt-4 transition-colors duration-300" 
       >

        <Link href={{pathname:`/problems/${title}`}}>View problem</Link>
      </div>
    </div>
  );
};

const getLevelColor = (level:string) => {
  switch (level.toLowerCase()) {
    case 'easy':
      return 'text-green-400';
    case 'medium':
      return 'text-yellow-400';
    case 'hard':
      return 'text-red-400';
    default:
      return 'text-gray-400';
  }
};

export default ProblemCard