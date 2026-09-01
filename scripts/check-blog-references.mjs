import { blogPosts } from "../src/content/blog/posts.ts";
import { assertValidBlogReferences } from "../src/content/blog/referenceValidation.ts";

assertValidBlogReferences(blogPosts);
console.log(`Validated APA 7 reference structure for ${blogPosts.length} article templates.`);
