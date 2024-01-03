import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const requestHeaders = new Headers(request.headers);

  if (!secret || !slug) {
    return new Response("Missing parameters", { status: 400 });
  }

  if (secret !== process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN) {
    return new Response("Invalid token", { status: 401 });
  }

  console.log({ secret, slug });

  // requestHeaders.set(
  //   "Content-Security-Policy",
  //   "default-src 'self' app.contentful.com *.contentful.com"
  // );

  draftMode().enable();
  redirect(`/${slug}`);
}
