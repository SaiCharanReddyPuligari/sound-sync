import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import {prismaClient} from "@/app/lib/db"
import { use } from "react";

export async function GET(request: NextRequest){
    const session = await getServerSession();
        //get rid of the db call here
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
        const creatorId = request.nextUrl.searchParams.get("creatorId");

        const streams = await prismaClient.stream.findMany({
            where:{
                userId: user.id ?? ""
            },
            include:{
                _count:{
                    select:{
                        upvotes: true,
                    }
                },
                upvotes:{
                   where:{
                    userId: user.id
                   } 
                }
            }
        })
    
        return NextResponse.json({
            streams: streams.map(({_count, ...rest})=>({
                ...rest,
                upvotes: _count.upvotes,
            })),
        })
}