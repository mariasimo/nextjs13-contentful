import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const secret = requestHeaders.get("x-vercel-reval-key");
  const tag = request.nextUrl.searchParams.get("tag");

  console.log("enters on the revalidate function", secret, tag);

  if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }
  if (!tag) {
    return NextResponse.json({ message: "Missing tags" }, { status: 401 });
  }

  console.log("revalidate");
  revalidateTag(tag);

  return NextResponse.json(
    { revalidated: true, now: Date.now() },
    { status: 200 }
  );
}
