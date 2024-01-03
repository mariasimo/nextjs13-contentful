import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

const allowedOrigins = ["https://app.contentful.com"];

export async function POST(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const secret = requestHeaders.get("x-vercel-reval-key");
  const tag = request.nextUrl.searchParams.get("tag");

  if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }
  if (!tag) {
    return NextResponse.json({ message: "Missing tags" }, { status: 401 });
  }

  revalidateTag(tag);

  return NextResponse.json({ revalidated: true, now: Date.now() });
}

export async function OPTIONS(request: NextRequest) {
  let origin: string = "*";
  if (process.env.NODE_ENV === "production") {
    origin = request.headers.get("Origin") || "";
    if (origin && !allowedOrigins.includes(origin)) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }
  }

  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
