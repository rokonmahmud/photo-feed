import { NextResponse } from "next/server";
import getConfig from "next/config";
import { getPhotoById } from "@/lib/photi-data";

export async function get(request, {params}) {
    const photoID = params?.id
    const data = getPhotoById(photoID)
    return NextResponse.json(data)
}