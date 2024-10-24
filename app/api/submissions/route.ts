
import prisma from "@/util/prismaDb";
import { NextRequest, NextResponse} from "next/server";



export async function PUT(req:NextRequest) {
   try {
    let {userId,status,problemName}:{userId:string,status:string,problemName:string} = await req.json();
    if(!status){
        return NextResponse.json({message:"No status"})
    }
    // console.log("#############",userId,status,problemName)
    const dataPrisma = await prisma.submissionsProblem.findUnique({
        where:{
            userId:userId,
            slug:problemName
        },
        select:{
            status:true,
            time:true,
        },
    })

    if(!dataPrisma){
        console.log("NO USER IN DB")
    }
    const ISTDate = new Date(new Date().valueOf());
    await prisma.user.update({
        where:{
            id:userId
        },
        data:{
            submission:{
               upsert:{
                where:{
                    slug: problemName,
                },
                create: {
                    slug: problemName,
                    status:[status],
                    time:[ ISTDate]
                  },
                  update: {
                    status: dataPrisma ? [...dataPrisma.status, status] : [status],
                    time: dataPrisma ? [...dataPrisma.time, ISTDate] : [ISTDate],
                  },
                  
               }
            }
        }
    })
    // console.log("SFfs")
    return NextResponse.json({message:"Created"})
    }
    catch (error) {
    return NextResponse.json({error:error},{status:400})
   }
}


export async function POST(req:NextRequest) {
    try {
        await prisma.$connect();
        const {userId,problemName} = await req.json();
        console.log("USERID<PROBLEMS",problemName)
        console.log("USER ID",userId,problemName)
        const resp = await prisma.submissionsProblem.findUnique({
            where:{
                userId:userId,
                slug:problemName
            },
                
            select:{
                slug:true,
                status:true,
                time:true,              
            }
            
        })
        return NextResponse.json({userId,message:resp});
    } catch (error) {
        return NextResponse.json({message:error},{status:400});
    }finally{
        await prisma.$disconnect();
    }
}
