import { NextResponse } from "next/server";

import { getAllPhotos } from "@/lib/photi-data";

export async function GET() {
    const data = await getAllPhotos()
    return NextResponse.json(data)
}