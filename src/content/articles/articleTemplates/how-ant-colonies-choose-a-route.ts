import { defineArticleTemplate } from "../articleTemplate.ts";

export default defineArticleTemplate({
  slug: "how-ant-colonies-choose-a-route",
  body: `A line of ants moving between a nest and food can look coordinated enough to have been planned. It was not. Each worker responds to local information, while the route becomes a property of the colony.

## A decision without a decision-maker

An individual forager does not hold a map of the whole search. It encounters part of the environment, other ants and chemical traces. A colony can nevertheless adjust how many workers forage and where they go through repeated local interactions rather than central direction.

## Reinforcement makes a route visible

In many ant species, a worker returning from food deposits trail pheromone. Other workers are more likely to follow the stronger trail. If they also find food and reinforce it on the return journey, a small early difference between routes can grow quickly.

The sequence is a feedback loop. No single ant needs to compare every option for the colony to concentrate its effort.

## Strong feedback needs correction

Reinforcement is fast, but speed can make a colony inflexible. A well-established trail may continue attracting workers after conditions change. Experimental work with *Lasius niger* found that crowding at a food source can provide negative feedback, reducing recruitment and helping the colony move away from a poor collective state.

## The colony is the scale of the explanation

Calling the colony intelligent does not mean imagining a hidden commander. The useful explanation sits across two scales: workers follow limited rules and signals; repeated interactions produce an organised result. The route is not selected in one decisive moment. It is continually made and revised.`,
  references: [
    {
      citation: `Gordon Lab. (n.d.). *Evolution and ecology of collective behavior*. Stanford University.`,
      href: "https://web.stanford.edu/~dmgordon/old2/",
    },
    {
      citation: `Grüter, C., Schürch, R., Czaczkes, T. J., Taylor, K., Durance, T., Jones, S. M., & Ratnieks, F. L. W. (2012). Negative feedback enables fast and flexible collective decision-making in ants. *PLOS ONE, 7*(9), e44501.`,
      href: "https://doi.org/10.1371/journal.pone.0044501",
    },
  ],
});
