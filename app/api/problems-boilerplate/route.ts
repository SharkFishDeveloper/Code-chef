
import { NextRequest, NextResponse } from "next/server";
import { getAsync, setAsync } from "../../functions/redisConnect/redis";
import prisma from "@/util/prismaDb";




export async function POST(req: NextRequest) {
    const { slug, language } = await req.json();



    console.log("CHANGING SLUG LANGUAGE ", slug, language);
    let languagebp;
    switch (language) {
        case "cpp":
            languagebp = "boilerplateCppHalf";
            break;
        case "js":
            languagebp = "boilerplateJavascriptHalf";
            break;
        case "java":
            languagebp = "boilerplateJavaHalf";
            break;
        case "python":
            languagebp = "boilerplatePythonHalf";
            break;
        default:
            return NextResponse.json({ error: 'Invalid language' }, { status: 400 });
    }
    let lanaguagebpf = languagebp.replace("Half", "Full");
    const selectFields = {
        [languagebp]: true,
        [lanaguagebpf]: true
    };
    console.log("----------------------------")
    try {
        const cacheKey = `problem:${slug}`;
        let cachedData = await getAsync(cacheKey);
        const b = cachedData ?  JSON.parse(cachedData as string):null;
        if (cachedData && b[languagebp]) {
            console.log("hit ---------")
            cachedData = cachedData ? JSON.parse(cachedData) : null;

            const responseObject = {
                //@ts-ignore
                boilerplateHalf: cachedData[languagebp],
                //@ts-ignore
                boilerplateFull: cachedData[lanaguagebpf],
            };

            return NextResponse.json({
                message: {
                    responseObject
                }
            }, { status: 200 })
        }
    //    @ts-ignore
       
       let parsedcachedData = cachedData ?  JSON.parse(cachedData):null;
        console.log("NOT HIT")
        await prisma.$connect()
        const resp = await prisma.problems.findUnique({
            where: {
                slug: slug
            },
            select: selectFields
        })
        const responseObject = {
            boilerplateHalf: resp![languagebp],
            boilerplateFull: resp![lanaguagebpf],
        };
        parsedcachedData[languagebp] = resp![languagebp];
        parsedcachedData[lanaguagebpf] = resp![lanaguagebpf];
        console.log("DB---/", parsedcachedData[languagebp])
        await setAsync(cacheKey, JSON.stringify(parsedcachedData));
        return NextResponse.json({ message: responseObject }, { status: 200 })
    }
    catch (error) {
        return NextResponse.json({ error: error }, { status: 404 })
    } finally {
        console.log("")
    }
}