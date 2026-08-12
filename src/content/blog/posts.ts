export type BlogPost = Readonly<{
  abstract: string;
  author: string;
  body: string;
  description: string;
  isSample?: boolean;
  presentation?: string;
  publishedAt: string;
  slug: string;
  sourceNote?: string;
  title: string;
  topic: string;
  updatedAt?: string;
}>;

const blogSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const blogDateFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});

const publishedBlogPosts: readonly BlogPost[] = [
  {
    abstract:
      "Ant colonies can concentrate their foraging on one route without a leader choosing it. The result emerges from local signals, reinforcement and correction.",
    author: "Joel Griffiths",
    body: `A line of ants moving between a nest and food can look coordinated enough to have been planned. It was not. Each worker responds to local information, while the route becomes a property of the colony.

## A decision without a decision-maker

An individual forager does not hold a map of the whole search. It encounters part of the environment, other ants and chemical traces. A colony can nevertheless adjust how many workers forage and where they go through repeated local interactions rather than central direction.

## Reinforcement makes a route visible

In many ant species, a worker returning from food deposits trail pheromone. Other workers are more likely to follow the stronger trail. If they also find food and reinforce it on the return journey, a small early difference between routes can grow quickly.

The sequence is a feedback loop. No single ant needs to compare every option for the colony to concentrate its effort.

## Strong feedback needs correction

Reinforcement is fast, but speed can make a colony inflexible. A well-established trail may continue attracting workers after conditions change. Experimental work with *Lasius niger* found that crowding at a food source can provide negative feedback, reducing recruitment and helping the colony move away from a poor collective state.

## The colony is the scale of the explanation

Calling the colony intelligent does not mean imagining a hidden commander. The useful explanation sits across two scales: workers follow limited rules and signals; repeated interactions produce an organised result. The route is not selected in one decisive moment. It is continually made and revised.

## References

- [Negative Feedback Enables Fast and Flexible Collective Decision-Making in Ants](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0044501), *PLOS ONE*.
- [The Gordon Lab: ant colonies and systems without central control](https://web.stanford.edu/~dmgordon/old2/), Stanford University.`,
    description:
      "A sample article explaining how ant colonies use local signals, positive feedback and correction to organise a foraging route.",
    isSample: true,
    presentation: "ant-trail",
    publishedAt: "2026-08-12",
    slug: "how-ant-colonies-choose-a-route",
    sourceNote: "Sample article created to demonstrate a subject-specific presentation.",
    title: "How an ant colony chooses a route",
    topic: "Collective behaviour",
  },
  {
    abstract:
      "Bones are only one part of the fossil record. Tracks, nests, skin impressions and surrounding rock can support different claims, while gaps in preservation limit what can be known.",
    author: "Joel Griffiths",
    body: `A mounted dinosaur skeleton can appear complete and self-explanatory. Fossil evidence is usually less complete than the display. Palaeontologists build an account by combining different kinds of remains, their geological context and comparisons with living animals.

## Body fossils

Bones and teeth are body fossils. Their shape can show how joints fitted together, where muscles and ligaments attached, and how an animal may have moved. Teeth and preserved stomach contents can also contribute evidence about diet.

Even a bone is not a direct recording of the whole animal. Skeletons may be incomplete or displaced before burial, and reconstruction depends on anatomical comparison.

## Trace fossils

An animal can leave evidence without leaving its body. Footprints record where an animal moved across a surface. Eggs and nests can indicate reproduction and, in some cases, support cautious interpretations of parental behaviour. Coprolites can preserve material from a meal.

Trace fossils are specific to an event. A footprint records one animal at one moment, not the normal behaviour of an entire species.

## Context changes the reading

The rock around a fossil helps establish age and environment. Sediment, nearby plant fossils and the remains of other animals can contribute to a reconstruction of the setting in which a dinosaur lived.

Comparisons with living animals are also important. Similar bone structures can support an inference about function, but an inference is not the same as direct observation. New specimens can strengthen, narrow or overturn an earlier interpretation.

## What remains uncertain

Fossilisation is rare and selective. Hard tissues preserve more readily than soft tissues, and some environments are much better at burying remains than others. The fossil record therefore gives a biased sample of past life.

The distinction is useful: fossils can provide strong physical evidence, but the confidence of a claim depends on what was preserved, how it was found and how much comparison is required.

## References

- [What is a fossil?](https://www.nhm.ac.uk/discover/what-is-a-fossil.html), Natural History Museum.
- [How palaeontologists learn about dinosaurs](https://www.nhm.ac.uk/discover/what-can-scientists-learn-about-dinosaurs-and-how.html), Natural History Museum.
- [How are dinosaur fossils formed?](https://australian.museum/learn/teachers/learning/dinosaur-fossils/), Australian Museum.`,
    description:
      "A sample article distinguishing the evidence provided by dinosaur body fossils, trace fossils and geological context from later inference.",
    isSample: true,
    presentation: "fossil-record",
    publishedAt: "2026-08-12",
    slug: "what-dinosaur-fossils-can-tell-us",
    sourceNote: "Sample article created to demonstrate a subject-specific presentation.",
    title: "What dinosaur fossils can and cannot tell us",
    topic: "Palaeontology",
  },
];

function validateBlogPosts(posts: readonly BlogPost[]) {
  const seenSlugs = new Set<string>();

  for (const post of posts) {
    if (!blogSlugPattern.test(post.slug)) {
      throw new Error(`Blog post slug must be URL-safe: ${post.slug}`);
    }

    if (seenSlugs.has(post.slug)) {
      throw new Error(`Duplicate blog post slug: ${post.slug}`);
    }

    if (Number.isNaN(Date.parse(`${post.publishedAt}T00:00:00Z`))) {
      throw new Error(`Blog post has an invalid publication date: ${post.slug}`);
    }

    seenSlugs.add(post.slug);
  }
}

validateBlogPosts(publishedBlogPosts);

export const blogPosts = [...publishedBlogPosts].sort((left, right) =>
  right.publishedAt.localeCompare(left.publishedAt),
);

export function getBlogPostPath(slug: string) {
  return `/blog/${slug}`;
}

export function getBlogPostBySlug(slug: string | undefined) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogReadingMinutes(body: string) {
  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(wordCount / 210));
}

export function formatBlogDate(date: string) {
  return blogDateFormatter.format(new Date(`${date}T00:00:00Z`));
}

export function getBlogRouteMetadata() {
  return Object.fromEntries(
    blogPosts.map((post) => [
      getBlogPostPath(post.slug),
      {
        abstract: post.abstract,
        articleSection: post.topic,
        authorName: post.author,
        description: post.description,
        headline: post.title,
        modifiedAt: post.updatedAt ?? post.publishedAt,
        pageType: "article" as const,
        publishedAt: post.publishedAt,
        robots: post.isSample ? "noindex, nofollow" : undefined,
        title: `${post.title} | Vive Counselling`,
      },
    ]),
  );
}
