import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const requestHeaders = new Headers(request.headers);
  const { searchParams } = new URL(request.url);

  const secret = requestHeaders.get("x-vercel-reval-key");
  const tags = searchParams.get("tags");

  if (!tags) {
    return NextResponse.json({ message: "Missing tags" }, { status: 401 });
  }

  if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  revalidateTag(tags);

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
