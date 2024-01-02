import { getData } from "./getData";

const GET_CUSTOM_PAGE_COLLECTION = `#graphql
  query CustomPageCollection($preview: Boolean) {
    customPageCollection(where: {preview: $preview}) {
        items {
            title
            slug
        }
    }
}
`;

const GET_CUSTOM_PAGE = `#graphql
    query CustomPageCollection($slug: String!, $preview: Boolean) {
        customPageCollection(where: {slug: $slug, preview: $preview}) {
            items {
            title
            }
        }
    }
`;

export async function getAllCustomPages(isDraftMode: boolean = false) {
  // TODO missing type fetched data
  const { data } = await getData(GET_CUSTOM_PAGE_COLLECTION, {
    next: { tags: ["custom"] },
    variables: { preview: isDraftMode },
  });

  return data.customPageCollection;
}

export async function getCustomPage(
  slug: string,
  isDraftMode: boolean = false
) {
  // TODO missing type fetched data
  const { data } = await getData(GET_CUSTOM_PAGE, {
    next: { tags: ["custom"] },
    variables: { slug, preview: isDraftMode },
  });

  return data.customPageCollection.items[0];
}
