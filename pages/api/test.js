
import { NextResponse, NextRequest } from "next/server";


export default async function handler(req, res) {


    const body = await req.json();

    const result = {
        message: body.href,
      };
      return NextResponse.json(result, {
        status: 200,
      });
}


export const config = {
    runtime: 'edge',
}
