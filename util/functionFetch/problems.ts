"use server"

import prisma from "../prismaDb";

const fetchProblems =async ()=>{
    try {
        const data = await prisma.problems.findMany({
            take:10,
            select:{
                slug:true,
                level:true,
            }
        });
        return {message:data,status:"200",error:null};
    } catch (error) {
        return {message:[],status:"400",error:error}
    }
}

export default fetchProblems;