"use client"
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'


const LandingPage = () => {
  const { data: session } = useSession();
  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to Leet-Forces</h1>
        <p className="text-xl text-gray-700">Your gateway to competitive programming</p>
      </div>

      {session && (
        <div className="bg-gray-100 p-8 rounded-lg shadow-md mb-8 text-center w-80">
         {session.user && 
          <>
           <h2 className="text-2xl font-semibold">{session.user.name}</h2>
           <p className="text-gray-500">{session.user.email}</p>
           </>
         }
        </div>
      )}

      <div className="space-x-4 flex">
        <Link href="/contest">

            Participate in Contest

        </Link>
        <Link href="/problems">
         
            Solve Problems
       
        </Link>
      </div>
    </div>
  )
}

export default LandingPage