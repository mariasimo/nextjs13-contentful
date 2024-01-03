/**
 * This might need to change to a catchAll route depending on the needs of the custom page locations
 * For now i'm keeping things simple and having one single slug segment
 * https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#catch-all-segments
 */

import { getAllCustomPages, getCustomPage } from "@/lib/graphql/customPages";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const data = await getAllCustomPages();

  console.log(data.items);

  // TODO strict type this
  return data.items.map((page: any) => {
    return { customPage: page.slug };
  });
}

export default async function CustomPage({
  params,
}: {
  params: {
    customPage: string;
  };
}) {
  const { isEnabled } = draftMode();

  const customPageData = await getCustomPage(params.customPage, {
    preview: isEnabled,
  });

  if (!customPageData) {
    notFound();
  }

  return (
    <main>
      <h1>{customPageData.title}</h1>
      <p>{JSON.stringify(customPageData)}</p>
    </main>
  );
}
