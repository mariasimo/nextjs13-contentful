import { getHomePage } from "@/service/graphql/getData";

export default async function Page() {
  const data = await getHomePage();
  return <main>{JSON.stringify(data)}</main>;
}
