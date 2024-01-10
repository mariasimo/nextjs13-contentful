import "server-only";

import { checkStringNotEmpty } from "@/utils/types/checkString";

type GetDataOptions = RequestInit & {
  variables?: { [key: string]: string | boolean };
  preview?: boolean;
  locale?: string;
};

export async function getData(query: string, options?: GetDataOptions) {
  const locale = options?.locale || "es-ES";
  const variables = { ...options?.variables, locale };

  const accessToken = checkStringNotEmpty(
    process.env.CONTENTFUL_ACCESS_TOKEN,
    "Missing env variable for CONTENTFUL_ACCESS_TOKEN"
  );
  const previewAccessToken = checkStringNotEmpty(
    process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    "Missing env variable for CONTENTFUL_PREVIEW_ACCESS_TOKEN"
  );

  const apiUrl = `https://graphql.contentful.com/content/v1/spaces/${checkStringNotEmpty(
    process.env.CONTENTFUL_SPACE_ID,
    "Missing env variable for CONTENTFUL_SPACE_ID"
  )}`;

  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        options?.preview ? previewAccessToken : accessToken
      }`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    next: options?.next,
    cache: process.env.NODE_ENV === "development" ? "no-cache" : "default",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      return res.json();
    })
    .catch((err) => {
      throw new Error(err);
    });
}
