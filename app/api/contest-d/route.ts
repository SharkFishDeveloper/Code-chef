import prisma from "@/util/prismaDb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        await prisma.$connect();
        const {userId,contest} = await req.json()
        const user  = await prisma.user.findUnique({
            where:{
                id:userId
            },select:{
                type:true
            }
        })
        if(user?.type === "ADMIN"){
            await prisma.contest.delete({
                where:{
                    name:contest
                }
            })
        }
        return NextResponse.json({user},{status:200})
    } catch (error) {
        return NextResponse.json({message:error},{status:504});
    }finally{
        await prisma.$disconnect()
    }
}