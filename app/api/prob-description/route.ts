"use server"

import { NextRequest, NextResponse} from "next/server";
import prisma from "@/util/prismaDb";
import { getAsync, setAsync } from '../../functions/redisConnect/redis';  



export async function POST(req:NextRequest){
    const {slug} =  await req.json();
    try {

        const cacheKey = `problem:${slug}`;
        let cachedData = await getAsync(cacheKey);
            if (cachedData) {
            cachedData = JSON.parse(cachedData);
            //@ts-ignore
            const description = cachedData.description;
            //@ts-ignore
            const test_cases = cachedData.test_cases;
            //@ts-ignore
            const test_cases_ans = cachedData.test_cases_ans;
            //@ts-ignore
            console.log("Cache hit in PROBLEMS",new Date());
            return  NextResponse.json({message:{
                description,
                test_cases,
                test_cases_ans
            }},{status:200})
          }else{
            console.log("NOT HIT PROBLEMS")
          }


        await prisma.$connect()
        let problems = await prisma.problems.findUnique({where:{
            slug:slug,
        },
        select:{
        description:true,
        test_cases:true,
        test_cases_ans:true,
        }});

        const problemsForCache = problems;

        await setAsync(cacheKey, JSON.stringify(problemsForCache));



        return  NextResponse.json({message:{
            description:problems?.description,
            test_cases:problems?.test_cases,
            test_cases_ans:problems?.test_cases_ans
        }},{status:200})
    } catch (error) {
        return  NextResponse.json({error:error},{status:400})
    }finally{
        prisma.$disconnect();
    }
}