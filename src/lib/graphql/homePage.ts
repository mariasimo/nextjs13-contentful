import { getData } from "./_getData";

const GET_HOMEPAGE_DATA = `#graphql
  query GetHomePage($locale: String) {
    home(id: "75I2BhoHcUGSfkCRas4OPl", locale: $locale) {
      heroTitle
    }
  }
`;

export async function getHomePage(locale?: Locale) {
  return getData(GET_HOMEPAGE_DATA, { locale });
}
