import { isString } from "@/utils/types/isString";

const CONTENTFUL_API_URL = process.env.CONTENTFUL_API_URL;
const CONTENFUL_ACCESS_TOKEN = process.env.CONTENFUL_ACCESS_TOKEN;

export async function getData(query: string) {
  if (!isString(CONTENTFUL_API_URL)) {
    throw new Error("Missing env variable for CONTENTFUL_API_URL");
  }
  if (!isString(CONTENFUL_ACCESS_TOKEN)) {
    throw new Error("Missing env variable for CONTENFUL_ACCESS_TOKEN");
  }

  return fetch(CONTENTFUL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CONTENFUL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      query,
    }),
  }).then((res) => {
    return res.json();
  });
}

const GET_HOMEPAGE_DATA = `#graphql
  query {
    home(id: "75I2BhoHcUGSfkCRas4OPl") {
      heroTitle
    }
  }
`;

export async function getHomePage() {
  return getData(GET_HOMEPAGE_DATA);
}
