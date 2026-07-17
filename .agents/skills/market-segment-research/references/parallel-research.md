# Parallel market research

Use this reference only when the parent market-segment-research agent delegates
independent evidence streams, geographies, samples, or research questions to
subagents.

## Create a task folder

Create one folder for the research run:

```text
docs/market-research/working/<YYYY-MM-DD>--<segment-slug>--<operation-slug>/
```

Use short lowercase hyphenated slugs. If the path already exists for another
run, append `-2`, `-3`, and so on rather than overwriting it.

Assign each subagent one unique lowercase hyphenated Markdown filename that
describes its subtask, such as `query-landscape.md`, `demand-evidence.md`,
`provider-sample.md`, `directories.md`, or `market-structure.md`. Use one writer
per file. Never ask concurrent agents to append to the same file.

## Divide work by a genuinely independent unit

Good delegation boundaries include:

- a defined query set and search interface;
- one demand dataset or tool family;
- a specified provider or competitor sample;
- one directory, marketplace, or taxonomy group;
- one geography or delivery market; or
- one official-data or market-structure question.

Do not split work so that each agent independently builds an undefined
competitor set or uses incompatible sampling rules for the same comparison.
The parent defines shared terms, repeated fields, dates, and inclusion rules
before delegation.

## Give each subagent a bounded brief

Include in every delegated task:

- the segment inclusion and exclusion boundary;
- the exact research question or evidence stream;
- relevant geography, delivery mode, observation window, and date;
- the sample rule, result depth, repeated fields, metric definitions, or tool
  scope required for comparability;
- the exact assigned working-file path;
- the requirement to follow `research-method.md` and the research boundary;
- the requirement to record sources, URLs or stable identifiers, observation
  dates, methods, access limits, and substantive findings; and
- the instruction not to edit any canonical dossier, index, final source IDs,
  other working file, or unrelated project material.

Allow any useful working-file structure and as much detail as needed. Do not
require polished dossier prose, a fixed length, or final IDs. A message to the
parent may summarise the work but does not replace the assigned file.

When different subagents are contributing rows to one eventual comparison,
give all of them the same field definitions and coding values. Prefer assigning
whole non-overlapping samples rather than asking concurrent agents to modify a
shared table.

## Integrate as the parent

Read every assigned file before synthesis. If a subagent finishes without
writing its file, send a follow-up request and do not accept the subtask as
complete until the file exists or the agent is genuinely unable to continue.
Keep partial files from interrupted or unsuccessful work.

Inspect original sources before integrating exact figures, prices, quotations,
calculation inputs, or unusually consequential claims. Check that:

- sample rules and denominators match the assigned brief;
- counts reproduce the underlying rows;
- dates, geographies, units, tools, and result types are comparable;
- provider claims and directory classifications remain attributed;
- demand measures have not been inferred from visibility or supply proxies;
  and
- conflicting observations are explained rather than averaged away.

Resolve duplicate sources and providers. Assign final `Q##`, `D##`, `C##`,
`T##`, and `M##` IDs only in the canonical dossier. Only the parent may edit the
indexed dossier, its source register, or the market-research index during
delegated work.

## Retain and ignore working files

At task completion, do not delete, move, rename, tidy, truncate, or overwrite
the task folder or its files. Keep them as ordinary Git-tracked project files
so the user can inspect and delete them later. In the final handoff, list the
task folder and state whether any packet remained partial or unintegrated.

Working files are not reusable research authority. Future tasks, downstream
skills, and later research runs must not read, cite, refresh, or infer from them
unless the user explicitly requests their inspection or the same parent task is
continuing. Use indexed market dossiers and their source registers for normal
downstream work.
