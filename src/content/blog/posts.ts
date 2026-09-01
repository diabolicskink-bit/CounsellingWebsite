import {
  blogPostMetadata,
  type BlogPostMetadata,
  type BlogPostSlug,
} from "./manifest.ts";

export type BlogPost = Readonly<BlogPostMetadata & {
  body: string;
}>;

const blogPostBodies = {
  "what-is-kink-affirming-therapy": `Kink-affirming therapy starts with a simple premise: kink, BDSM and fetish interests are not evidence that something has gone wrong. But “I won't judge you” is a low bar.

A kink-affirming therapist needs enough cultural and clinical knowledge to understand BDSM and power-exchange relationships without forcing them through conventional assumptions about sex, intimacy or partnership. They also need to recognise when kink is relevant to trauma, consent, coercion, shame, boundaries or relationship difficulties without deciding that kink itself caused the problem.

Kink-affirming therapy is not therapy that has already decided kink is healthy. It is therapy that does not begin by assuming kink is unhealthy.

## A neutral starting point is not an empty one

Psychology and psychiatry have a complicated history with unconventional sexuality. Sadism, masochism and fetishism have all been interpreted through models of pathology, including disturbed development, aggression, trauma and unconscious conflict.

Contemporary research does not support treating consensual BDSM involvement as a general sign of psychological disorder.

A [representative Australian survey of 19,307 people](https://doi.org/10.1111/j.1743-6109.2008.00795.x) found that 1.8 per cent of sexually active respondents reported taking part in BDSM during the previous year. They were no more likely to report sexual coercion, sexual difficulties, unhappiness or anxiety. Men who participated in BDSM reported lower psychological distress than other men in the sample.

A later [online comparison of 902 BDSM practitioners and 434 control participants](https://doi.org/10.1111/jsm.12192) found that the BDSM group scored more favourably on several measures, including neuroticism, openness, rejection sensitivity and subjective wellbeing.

These studies should not be made to say more than they can. They do not show that BDSM causes better mental health or that every BDSM practitioner is psychologically healthy. Some research is cross-sectional, some uses self-selected community samples, and studies do not always define BDSM in the same way. A [systematic review of the evidence](https://doi.org/10.1016/j.esxm.2019.02.002) found a much more nuanced picture than older theories of pathology, while also identifying substantial gaps in what is known.

Modern diagnostic practice makes a related distinction. The presence of an atypical sexual interest is not enough by itself to constitute a mental disorder. Distress, impairment, harm or risk to others is central to the distinction between a paraphilia and a paraphilic disorder in the [DSM framework](https://www.psychiatry.org/File%20Library/Psychiatrists/Practice/DSM/APA_DSM-5-Paraphilic-Disorders.pdf).

The useful question is not simply whether a person's sexuality is unusual. It is what that sexuality means, how it functions in their life, whether it is consensual, and whether it is connected with distress or harm.

## Does kink come from trauma?

Sexuality does not develop in a sealed compartment. It can intersect with attachment, learning, shame, fantasy, identity, emotional regulation and earlier relationships. For an individual person, traumatic experiences may become connected with what they later find erotic.

That possibility is different from assuming that BDSM interests are generally caused by trauma. Research does not support that broader claim, and the [clinical guidelines for working with clients involved in kink](https://doi.org/10.1080/0092623X.2023.2232801) specifically caution therapists against making it.

Consider someone who enjoys submission and also grew up around controlling behaviour. It is easy to construct a neat story in which adult submission repeats an earlier experience of powerlessness. But consensually deciding when, where and with whom to surrender control may be psychologically very different from having control taken away. It could involve trust, relief from responsibility, intimacy, eroticism, mastery or several meanings at once.

Humiliation might play with existing shame, transform it, intensify it or simply provide a particular sexual stimulus. Dominance might involve authority, responsibility, performance, caretaking or being trusted with another person's vulnerability.

Sometimes there will be a meaningful connection with a person's history. Sometimes there will not. A therapist can ask the questions without deciding the answers in advance. The work is to investigate meaning, not assign one.

## Consent needs more than a label

Many BDSM communities give consent an unusually explicit place. Negotiation, limits, safewords, aftercare and discussions of risk are part of the culture around many forms of BDSM. A [review of consent in BDSM](https://doi.org/10.1177/1079063219842847) describes informed, mutual consent as one of the central distinctions between consensual BDSM and abuse.

A culture of consent is not immunity from coercion. People can be pressured in kink relationships. A safeword can be ignored. Agreed boundaries can be crossed. Someone may consent because they fear losing a relationship, or find that a power dynamic they chose has become increasingly difficult to renegotiate.

Pain, restraint, humiliation or an explicit hierarchy do not by themselves tell us that something is abusive. BDSM language and the existence of a safeword do not by themselves tell us that a relationship is safe. More useful questions include:

- Can each person express disagreement without fear?
- What happens when somebody changes their mind?
- Can rules and boundaries be renegotiated?
- Are limits and safewords respected consistently?
- Does saying no carry consequences for the relationship?
- Has agreed authority expanded into parts of life that were never actually chosen?

Competent assessment avoids two opposite errors: mistaking consensual power exchange for abuse, and mistaking the language of BDSM for proof that abuse is not happening.

## Acceptance and competence are not the same

A therapist can sincerely hold no negative attitudes towards BDSM while knowing very little about it. Acceptance is preferable to hostility or judgement, but it does not remove the practical consequences of that gap in knowledge.

In a [US survey of 766 therapists](https://doi.org/10.1080/19419899.2012.655255), 76 per cent had worked with at least one client who practised BDSM, while only 48 per cent considered themselves competent to work in the area. It is older, self-reported US data rather than a measure of current Australian training, but it illustrates the difference between encountering kink and understanding it.

Without basic cultural knowledge, the client can become responsible for educating the therapist. There is nothing wrong with asking what a collar means in a particular relationship. That question belongs to the person and the work. Needing a client to explain what a collar is because the therapist has never encountered a D/s relationship is different.

Basic literacy lets therapy reach the psychologically interesting part.

The clinical guidelines describe degrees of competence ranging from kink-friendly to kink-aware and kink-knowledgeable. The labels matter less than the principle. A therapist does not need encyclopaedic knowledge of every fetish or subculture. They do need enough knowledge to recognise the limits of their competence, seek appropriate education or supervision, and avoid filling gaps with assumptions.

## Stigma can become part of the problem

Research into experiences of therapy and healthcare suggests that some kink-involved people anticipate or encounter stigma, and that this can affect what they disclose.

An [early study of psychotherapy experiences](https://doi.org/10.1300/J082v50n02_15) documented accounts of therapists over-focusing on BDSM, making prejudicial comments, expecting clients to educate them or treating kink as something that needed to stop. A later [US qualitative healthcare study](https://doi.org/10.1016/j.jsxm.2016.09.019) involved 115 kink-oriented participants; fewer than half had disclosed kink to their current healthcare provider, with anticipated stigma the most common reason for not doing so.

A [small study of rural kink-oriented Tasmanians](https://doi.org/10.1080/00918369.2022.2036531) with pre-existing mental health conditions found that nearly 83 per cent had withheld their kink from a mental health professional because they feared stigma or discrimination. The sample is not representative of everyone involved in kink, but the degree of caution reported is difficult to dismiss.

Distress about a fetish or desire does not always mean the desire itself is causing harm. A person may fear that it makes them damaged, dangerous or incapable of a healthy relationship. They may expect disclosure to change how a partner, friend or therapist sees them. They may have spent years keeping sexuality separate from the rest of their life because secrecy felt safer.

Distress arising from an interest and distress arising around an interest can arrive in therapy sounding very similar. They may require very different conversations.

## Kink does not need to take over therapy

Someone can be submissive and be grieving a parent. They can be in a 24/7 power-exchange relationship and have social anxiety. A person who attends BDSM events can become depressed, struggle with work or find a relationship painful for reasons that have little to do with kink.

When a therapist regards kink as intrinsically suspect, it can exert a gravitational pull on the whole therapy. Trauma becomes the explanation for BDSM interests. Relationship problems become evidence that power exchange is dysfunctional. Anxiety or low self-worth is attributed to sexuality without enough evidence connecting them.

The opposite error is to declare kink irrelevant before listening. Dominance or submission may intersect with responsibility, control, dependency or vulnerability. Sexual shame can connect with a much older fear of being judged. Surrender can be both deeply wanted and frightening. The particular vulnerability involved in kink may expose difficulties with trust very clearly.

These possibilities can be valuable to explore, especially in attachment-informed or psychodynamic work. An interpretation is useful only when it fits the person.

The point of an affirming approach is not to protect kink from psychological exploration. It is to remove the predetermined conclusion so genuine exploration can begin.

## What kink-affirming therapy looks like in practice

There is no separate therapeutic technique called kink-affirming therapy. A therapist might work psychodynamically, through attachment theory, with CBT, in a person-centred way or through another approach. The difference lies in the assumptions and knowledge they bring to the work.

A kink-affirming therapist should be able to hear that someone enjoys being controlled without immediately inferring helplessness, or that someone enjoys controlling without immediately inferring pathology. They should understand that consensual inequality within a power-exchange relationship is not the same as an absence of agency, while still recognising when a person's agency is being eroded.

They should be able to explore trauma without assuming it caused kink, and explore kink without insisting trauma could never be relevant. They should also be comfortable with the possibility that kink is simply not what needs attention.

In my [kink and BDSM counselling at Vive](/kink-bdsm-counselling), I bring significant expertise and extensive lived experience within kink communities. You do not need to translate the basic language or defend why a practice, fetish or power dynamic might matter to you. Nor will I assume that every experience was healthy simply because it happened under the name of kink.

I work psychodynamically, with an attachment-informed approach. If power, shame, consent, trauma, desire or relationships are relevant, we can examine them carefully. If kink has nothing to do with why you want counselling, it does not have to become the price of admission to the rest of the work.

The goal is not to give kink a permanently positive interpretation. It is to give it an accurate one.

## References

- American Psychiatric Association. (2013). [*Paraphilic disorders*](https://www.psychiatry.org/File%20Library/Psychiatrists/Practice/DSM/APA_DSM-5-Paraphilic-Disorders.pdf).
- De Neef, N., Coppens, V., Huys, W., & Morrens, M. (2019). [Bondage-discipline, dominance-submission and sadomasochism (BDSM) from an integrative biopsychosocial perspective: A systematic review](https://doi.org/10.1016/j.esxm.2019.02.002). *Sexual Medicine, 7*(2), 129–144.
- Dunkley, C. R., & Brotto, L. A. (2020). [The role of consent in the context of BDSM](https://doi.org/10.1177/1079063219842847). *Sexual Abuse, 32*(6), 657–678.
- Kelsey, K., Stiles, B. L., Spiller, L., & Diekhoff, G. M. (2013). [Assessment of therapists' attitudes towards BDSM](https://doi.org/10.1080/19419899.2012.655255). *Psychology & Sexuality, 4*(3), 255–267.
- Kolmes, K., Stock, W., & Moser, C. (2006). [Investigating bias in psychotherapy with BDSM clients](https://doi.org/10.1300/J082v50n02_15). *Journal of Homosexuality, 50*(2–3), 301–324.
- Reynish, T. D., Hoang, H., Bridgman, H., & Nic Giolla Easpaig, B. (2023). [Kink-oriented people and exogenous oppressions: Understanding mental health and related service use in a rural context](https://doi.org/10.1080/00918369.2022.2036531). *Journal of Homosexuality, 70*(8), 1479–1502.
- Richters, J., de Visser, R. O., Rissel, C. E., Grulich, A. E., & Smith, A. M. A. (2008). [Demographic and psychosocial features of participants in bondage and discipline, “sadomasochism” or dominance and submission (BDSM): Data from a national survey](https://doi.org/10.1111/j.1743-6109.2008.00795.x). *The Journal of Sexual Medicine, 5*(7), 1660–1668.
- Sprott, R. A., Herbitter, C., Grant, P., Moser, C., & Kleinplatz, P. J. (2023). [Clinical guidelines for working with clients involved in kink](https://doi.org/10.1080/0092623X.2023.2232801). *Journal of Sex & Marital Therapy, 49*(8), 978–995.
- Waldura, J. F., Arora, I., Randall, A. M., Farala, J. P., & Sprott, R. A. (2016). [Fifty shades of stigma: Exploring the health care experiences of kink-oriented patients](https://doi.org/10.1016/j.jsxm.2016.09.019). *The Journal of Sexual Medicine, 13*(12), 1918–1929.
- Wismeijer, A. A. J., & van Assen, M. A. L. M. (2013). [Psychological characteristics of BDSM practitioners](https://doi.org/10.1111/jsm.12192). *The Journal of Sexual Medicine, 10*(8), 1943–1952.`,
  "how-ant-colonies-choose-a-route": `A line of ants moving between a nest and food can look coordinated enough to have been planned. It was not. Each worker responds to local information, while the route becomes a property of the colony.

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
  "what-dinosaur-fossils-can-tell-us": `A mounted dinosaur skeleton can appear complete and self-explanatory. Fossil evidence is usually less complete than the display. Palaeontologists build an account by combining different kinds of remains, their geological context and comparisons with living animals.

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
} as const satisfies Record<BlogPostSlug, string>;

export const blogPosts: readonly BlogPost[] = blogPostMetadata.map((post) => ({
  ...post,
  body: blogPostBodies[post.slug],
}));

export function getBlogPostBySlug(slug: string | undefined) {
  return blogPosts.find((post) => post.slug === slug);
}
