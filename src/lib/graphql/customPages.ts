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
  query CustomPageCollection($slug: String!, $preview: Boolean) {
      customPageCollection(where: {slug: $slug}, preview: $preview) {
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

export async function getCustomPage(
  slug: string,
  { preview }: { preview?: boolean }
) {
  // TODO missing type fetched data
  const { data } = await getData(GET_CUSTOM_PAGE, {
    next: { tags: ["custom"] },
    variables: { slug, preview: !!preview },
    preview,
  });

  return data.customPageCollection.items[0];
}
