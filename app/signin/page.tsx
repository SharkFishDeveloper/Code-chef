"use client";
import React, {  useState } from "react";
import  github from "../../util/images/github.png"
import google from "../../util/images/google-symbol.png"
import Image from "next/image";
import { signIn } from "next-auth/react";
import {useRouter } from 'next/navigation';
// import { useSearchParams } from 'next/navigation'
 

const Login = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (provider:string) => {
    // return alert("error");
    try {
      const result = await signIn(provider,{callbackUrl:"/"});
      // await new Promise.resolve(()=>setTimeout(()=>),{1000})
      console.log("Login result:", result?.url); // Log for debugging

      if(result){
        if (result?.error || !result.ok) {
          setErrorMessage(result.error || "An error occurred during sign-in.");
          alert("Oops! There was an error during sign-in."); // Optional user notification
        } else {
          router.push("/"); // Redirect to homepage on success
        }
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setErrorMessage("Something went wrong during sign-in. Please try again.");
    }
  };

  // useEffect(() => {
  //   if (error) {
  //     setErrorMessage("Something went wrong during sign-in. Please try again.");
  //     console.log(searchParams.get('error'))
  //     router.replace("/");
  //   }
    
  // }, [error]);
  
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-yellow-200 p-8 rounded-lg shadow-lg max-w-sm w-full">
      {errorMessage && (
          <div className="mb-4 text-red-600 text-center">
            {errorMessage}
          </div>
        )}
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Login</h1>
        <div className="space-y-4">
          <button
            onClick={() =>{
                handleLogin('google');
            }}
            className="flex items-center justify-center bg-white text-gray-900 px-6 py-3 rounded-md shadow-md hover:bg-gray-100 w-full"
          >
            <Image src={google} alt="Google" height={24} width={24} className="mr-3" />
            Sign in with Google
          </button>
          <button
            onClick={() =>{
               handleLogin('github')
            }}
            className="flex items-center justify-center bg-gray-900 text-white px-6 py-3 rounded-md shadow-md hover:bg-gray-800 w-full"
          >
            <Image src={github} alt="GitHub" height={24} width={24} className="mr-3" />
            Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
