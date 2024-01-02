import { getHomePage } from "@/lib/graphql/homePage";

export default async function Page() {
  const data = await getHomePage();
  return <main>{JSON.stringify(data)}</main>;
}
