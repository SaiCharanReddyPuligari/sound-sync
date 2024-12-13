import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";
import {prismaClient} from "@/app/lib/db"
// const YT_REGEX = new RegExp("^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$")
const YT_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com\/(?:watch\?(?!.*\blist=)(?:.*&)?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[?&]\S+)?$/;
//@ts-ignore
import youtubesearchapi from "youtube-search-api";

const CreateSchemeSchema = z.object({
    creatorId : z.string(),
    url: z.string()
})

export async function POST(request:NextRequest) {
    try {
        const data = CreateSchemeSchema.parse(await request.json());
        //const isYt= data.url.includes("youtube");
        const isYt = data.url.match(YT_REGEX);

        if(!isYt) {
            return NextResponse.json({
                message: "Wrong URL ID"
            },{
                status: 411
            })
        }

        const extractedId = data.url.split("?v=")[1];

        const res= await youtubesearchapi.GetVideoDetails(extractedId);
        // console.log(res.title);
        // console.log(res.thumbnail.thumbnails);
        // console.log(JSON.stringify(res.thumbnail.thumbnails));
        const thumbnailss= res.thumbnail.thumbnails;
        thumbnailss.sort((a:{width:number}, b:{width: number})=> a.width<b.width ? -1: 1)
        
        const stream= await prismaClient.stream.create({
           data: {
            userId : data.creatorId,
            url: data.url,
            extractedId,
            type: "YouTube",
            title: res.title ?? "Unable to fecth video",
            imageSmallUrl: (thumbnailss.length > 1 ? thumbnailss[thumbnailss.length-2].url : thumbnailss[thumbnailss.length-1].url) ?? "https://indietips.com/wp-content/uploads/2022/12/Warm-and-Cool-Tones-In-Music.jpg",
            imageBigUrl: thumbnailss[thumbnailss.length-1].url ?? "https://indietips.com/wp-content/uploads/2022/12/Warm-and-Cool-Tones-In-Music.jpg"

           }
        })
        return NextResponse.json({
            message:"added Stream",
            id: stream.id,
        })
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            message: "Error while adding a stream"
        },{
            status: 411
        })
    }
}

export async function GET(request:NextRequest) {
    const creatorId = request.nextUrl.searchParams.get("creatorId");

    const streams = await prismaClient.stream.findMany({
        where:{
            userId: creatorId ?? ""
        }
    })

    return NextResponse.json({
        streams,
    })
}