import { isString } from "@/utils/types/isString";

type GetDataOptions = RequestInit & {
  variables?: { [key: string]: string | boolean };
};

export async function getData(query: string, options?: GetDataOptions) {
  if (!isString(process.env.CONTENTFUL_SPACE_ID)) {
    throw new Error("Missing env variable for CONTENTFUL_SPACE_ID");
  }
  if (!isString(process.env.CONTENTFUL_ACCESS_TOKEN)) {
    throw new Error("Missing env variable for CONTENTFUL_ACCESS_TOKEN");
  }

  const CONTENTFUL_API_URL = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;
  const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

  // TODO missing error validation

  console.log("options", options);

  return fetch(CONTENTFUL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables: options?.variables,
    }),
    next: options?.next,
  }).then((res) => {
    return res.json();
  });
}
