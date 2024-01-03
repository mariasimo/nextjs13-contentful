import { z } from "zod";
import { getData } from "./getData";

export const customPageSchema = z.object({
  title: z.string(),
});

export const customPageCollectionSchema = z.array(
  z.object({
    slug: z.string(),
  })
);

export type CustomPageCollection = z.TypeOf<typeof customPageCollectionSchema>;
export type CustomPage = z.TypeOf<typeof customPageSchema>;

const GET_CUSTOM_PAGE_COLLECTION = `#graphql
  query CustomPageCollection {
    customPageCollection {
      items {
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

export async function getAllCustomPages(): Promise<CustomPageCollection> {
  const { data } = await getData(GET_CUSTOM_PAGE_COLLECTION, {
    next: { tags: ["custom"] },
  });

  const parsed = customPageCollectionSchema.parse(
    data?.customPageCollection?.items
  );

  return parsed;
}

export async function getCustomPage(
  slug: string,
  { preview }: { preview?: boolean }
): Promise<CustomPage | undefined> {
  const { data } = await getData(GET_CUSTOM_PAGE, {
    next: { tags: ["custom"] },
    variables: { slug, preview: !!preview },
    preview,
  });

  const parsed = customPageSchema.safeParse(
    data?.customPageCollection?.items[0]
  );

  if (parsed.success) {
    return parsed.data;
  }
}
