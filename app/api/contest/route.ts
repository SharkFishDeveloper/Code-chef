
import { NextResponse } from "next/server";
import { getAsync, setAsync } from "../../functions/redisConnect/redis";
import prisma from "@/util/prismaDb";

export async function GET() {
    try {
        const cacheKey = `problems-contest-1`;
        let cachedData = await getAsync(cacheKey);

        if(cachedData!==null){
            console.log("CDATA",cachedData)
            console.log("CONTEST HIT",cachedData ? JSON.parse(cachedData):"")
            const parsedData = cachedData ?  JSON.parse(cachedData):null;
            return NextResponse.json({resp:parsedData},{status:200})
        }
        await prisma.$connect()
        const resp = await prisma.contest.findMany({
            take:4
        });

        try {
            await setAsync(cacheKey,JSON.stringify(resp),"EX",10000)
        } catch (error) {
            console.log("REDIS ERROR",error)
        }
        return NextResponse.json({resp},{status:200})
    } catch (error) {
        return NextResponse.json({message:error},{status:504});
    }finally{
        await prisma.$disconnect()
    }
}