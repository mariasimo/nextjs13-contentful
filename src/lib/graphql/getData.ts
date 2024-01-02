import { isString } from "@/utils/types/isString";

const CONTENTFUL_API_URL = process.env.CONTENTFUL_API_URL;
const CONTENFUL_ACCESS_TOKEN = process.env.CONTENFUL_ACCESS_TOKEN;
const CONTENFUL_PREVIEW_ACCESS_TOKEN =
  process.env.CONTENFUL_PREVIEW_ACCESS_TOKEN;

type GetDataOptions = RequestInit & {
  variables?: { [key: string]: string | boolean };
};

export async function getData(query: string, options?: GetDataOptions) {
  if (!isString(CONTENTFUL_API_URL)) {
    throw new Error("Missing env variable for CONTENTFUL_API_URL");
  }
  if (!isString(CONTENFUL_ACCESS_TOKEN)) {
    throw new Error("Missing env variable for CONTENFUL_ACCESS_TOKEN");
  }
  if (!isString(CONTENFUL_PREVIEW_ACCESS_TOKEN)) {
    throw new Error("Missing env variable for CONTENFUL_ACCESS_TOKEN");
  }

  // TODO missing error validation

  return fetch(CONTENTFUL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        options?.variables?.preview
          ? CONTENFUL_PREVIEW_ACCESS_TOKEN
          : CONTENFUL_ACCESS_TOKEN
      }`,
    },
    body: JSON.stringify({
      query,
      variables: options?.variables,
    }),
    next: options?.next,
    cache: "no-cache",
  }).then((res) => {
    return res.json();
  });
}
