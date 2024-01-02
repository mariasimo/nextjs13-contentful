import { getData } from "./getData";

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
