import { getHomePage } from "@/lib/graphql/homePage";

export default async function Page({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  const data = await getHomePage();
  return <main>{JSON.stringify(data)}</main>;
}
