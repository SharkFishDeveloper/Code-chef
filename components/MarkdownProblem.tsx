"use client"
import React, { useEffect, useState } from 'react';
// import { getFile } from '../app/functions/getMdfile';
import MarkdownPreview from '@uiw/react-markdown-preview';
import Pingingloader from './Pingingloader';
// import { useRouter } from 'next/navigation';

// const MarkdownProblem = ({ path }:{ path:string }) => {
const MarkdownProblem = ({ content }:{ content:string }) => {
  // const router = useRouter();
  // const [markdown, setMarkdown] = useState('');
  // const [error, setError] = useState('');
  // const [loading,setLoading] = useState(false);

  // useEffect(()=>{
  //   async  function fetchFile (){
  //     setLoading(true);
  //   try {
      
  //       setError("");
  //       const resp =await getFile(path);
  //       console.log("MD file ##########################",resp);
  //       setMarkdown(resp);
  //   } catch (error:any) {
  //       setError(error);
  //       console.log("Cannot find mark down file !!")
  //       router.replace("/problems");
  //   }finally{
  //     setLoading(false);
  //   }
  //  }
  // const fetchFILE =  async()=>await fetchFile();
  // fetchFILE();
  // },[path])


  return (
    <div>
       <MarkdownPreview source={content} style={{ padding: 16 }} />
      {/* {!loading ? (
        <div className="prose lg:prose-xl dark:prose-gray dark:prose-h2:text-gray-200 dark:prose-h4:text-gray-200 h-[49.3rem]">
        <MarkdownPreview source={content} style={{ padding: 16 }} />
      </div>
      ):(
        <Pingingloader/>
      )} */}
    </div>
  );
};

export default MarkdownProblem;

