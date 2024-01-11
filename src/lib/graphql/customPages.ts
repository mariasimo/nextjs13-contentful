import { z } from "zod";
import { getData } from "./_getData";

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
  query CustomPageCollection($slug: String!, $preview: Boolean, $locale: String) {
      customPageCollection(where: {slug: $slug}, preview: $preview, locale: $locale) {
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

  const parsed = customPageCollectionSchema.safeParse(
    data?.customPageCollection?.items
  );

  if (parsed.success) {
    return parsed.data;
  }

  throw new Error("Error parsing custom page slugs data");
}

export async function getCustomPage(
  slug: string,
  { preview, locale }: { preview?: boolean; locale?: string }
): Promise<CustomPage | undefined> {
  const { data } = await getData(GET_CUSTOM_PAGE, {
    next: { tags: ["custom"] },
    variables: { slug, preview: !!preview },
    locale,
    preview,
  });

  const parsed = customPageSchema.safeParse(
    data?.customPageCollection?.items[0]
  );

  if (parsed.success) {
    return parsed.data;
  }
}
