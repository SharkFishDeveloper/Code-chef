"use server"

import { NextRequest, NextResponse} from "next/server";
import { getAsync, setAsync } from '../../functions/redisConnect/redis';  
import prisma from "@/util/prismaDb";



export async function POST(req:NextRequest){
    const {slug} =  await req.json();
    console.log(slug);
    try {
        const cacheKey = `problem:${slug}`;
        let cachedData = await getAsync(cacheKey);
            if (cachedData) {
            cachedData = JSON.parse(cachedData);
            //@ts-ignore
            const description = cachedData.description;
            //@ts-ignore
            const boilerplatehalfcode = cachedData.boilerplateCppHalf;
            //@ts-ignore
            const test_cases = cachedData.test_cases;
            //@ts-ignore
            const test_cases_ans = cachedData.test_cases_ans;
            //@ts-ignore
            const boilerplatefullcode = cachedData.boilerplateCppFull;
            //@ts-ignore
            console.log("Cache hit ------",new Date());
            return  NextResponse.json({message:{
                description,
                boilerplatehalfcode,
                boilerplatefullcode,
                test_cases,
                test_cases_ans
            }},{status:200})
          }else{
            console.log("")
          }

        prisma.$connect();
        let problems = await prisma.problems.findUnique({where:{
            slug:slug,
        },
        select:{
        description:true,
        boilerplateCppHalf:true,
        test_cases:true,
        test_cases_ans:true,
        boilerplateCppFull:true
        }});

        await setAsync(cacheKey, JSON.stringify(problems));
    

        return  NextResponse.json({message:{
            description:problems?.description,
            boilerplatehalfcode:problems?.boilerplateCppHalf,
            boilerplatefullcode:problems?.boilerplateCppFull,
            test_cases:problems?.test_cases,
            test_cases_ans:problems?.test_cases_ans
        }},{status:200})
    } catch (error) {
        return  NextResponse.json({error:error},{status:400})
    }
}
prisma.$disconnect();