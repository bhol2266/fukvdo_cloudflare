import { NextResponse, NextRequest } from "next/server";
export const config = {
    runtime: 'edge',
}


export default async function handler(req) {


  const body_object = await req.json();


    let href = body_object.href


    return NextResponse.json(href, {
      status: 200,
  });
}


