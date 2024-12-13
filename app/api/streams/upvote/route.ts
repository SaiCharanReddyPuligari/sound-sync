import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod';

const UpvoteSchema = z.object({
    streamId : z.string(),
})

export default async function POST(request:NextRequest) {
    const session = await getServerSession();
    const user = await prismaClient.user.findFirst({
        where:{
            email: session?.user?.email ?? ""
        }
    });

    if(!user){
        return NextResponse.json({
            message: "Unauthorizes user"
        },{
            status: 483
        })
    }

    try {
        const data = UpvoteSchema.parse(await request.json());
        await prismaClient.upvote.create({
            data:{
                userId: user.id,
                streamId: data.streamId,
            }
        })
    } catch (error) {
        return NextResponse.json({
            message: "Error in upvoting"
        },{
            status: 483
        })
    }
}