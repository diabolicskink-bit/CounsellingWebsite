export const blogArticlePresentationDefinitions = {
  antTrail: {
    documentClassName: "blog-article--ant-trail",
    key: "ant-trail",
  },
  fossilRecord: {
    documentClassName: "blog-article--fossil-record",
    key: "fossil-record",
  },
} as const;

type BlogArticlePresentationDefinition =
  (typeof blogArticlePresentationDefinitions)[keyof typeof blogArticlePresentationDefinitions];

export type BlogArticlePresentationKey = BlogArticlePresentationDefinition["key"];

const blogArticlePresentationDefinitionByKey = Object.fromEntries(
  Object.values(blogArticlePresentationDefinitions).map((definition) => [definition.key, definition]),
) as Record<BlogArticlePresentationKey, BlogArticlePresentationDefinition>;

export function getBlogArticlePresentationDefinition(key: string | undefined) {
  if (!key || !isBlogArticlePresentationKey(key)) {
    return undefined;
  }

  return blogArticlePresentationDefinitionByKey[key];
}

export function isBlogArticlePresentationKey(value: string): value is BlogArticlePresentationKey {
  return Object.prototype.hasOwnProperty.call(blogArticlePresentationDefinitionByKey, value);
}
