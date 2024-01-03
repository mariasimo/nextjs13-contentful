import { isString } from "@/utils/types/isString";

type GetDataOptions = RequestInit & {
  variables?: { [key: string]: string | boolean };
  preview?: boolean;
};

export async function getData(query: string, options?: GetDataOptions) {
  if (!isString(process.env.CONTENTFUL_SPACE_ID)) {
    throw new Error("Missing env variable for CONTENTFUL_SPACE_ID");
  }
  if (!isString(process.env.CONTENTFUL_ACCESS_TOKEN)) {
    throw new Error("Missing env variable for CONTENTFUL_ACCESS_TOKEN");
  }
  if (!isString(process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN)) {
    throw new Error("Missing env variable for CONTENTFUL_PREVIEW_ACCESS_TOKEN");
  }

  const CONTENTFUL_API_URL = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

  const ACCESS_TOKEN = options?.preview
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.CONTENTFUL_ACCESS_TOKEN;

  // TODO missing error validation

  return fetch(CONTENTFUL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables: options?.variables,
    }),
    next: options?.next,
    cache: process.env.NODE_ENV === "development" ? "no-cache" : "default",
  }).then((res) => {
    return res.json();
  });
}
