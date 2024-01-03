import { getData } from "./getData";

const GET_CUSTOM_PAGE_COLLECTION = `#graphql
  query CustomPageCollection {
    customPageCollection {
        items {
            title
            slug
        }
    }
}
`;

const GET_CUSTOM_PAGE = `#graphql
    query CustomPageCollection($slug: String!) {
        customPageCollection(where: {slug: $slug}) {
            items {
              title
            }
        }
    }
`;

export async function getAllCustomPages() {
  // TODO missing type fetched data
  const { data } = await getData(GET_CUSTOM_PAGE_COLLECTION, {
    next: { tags: ["custom"] },
  });

  return data.customPageCollection;
}

export async function getCustomPage(slug: string) {
  // TODO missing type fetched data
  const { data } = await getData(GET_CUSTOM_PAGE, {
    next: { tags: ["custom"] },
    variables: { slug },
  });

  return data.customPageCollection.items[0];
}
