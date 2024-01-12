import { getHomePage } from "@/lib/graphql/homePage";

export default async function Page({
  params,
}: {
  params: {
    locale: string;
  };
}) {
  const data = await getHomePage(params.locale);
  return <main>{JSON.stringify(data)}</main>;
}
