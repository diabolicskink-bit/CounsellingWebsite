# Parallel research

Use this reference only when the parent audience-research agent delegates
independent evidence streams or research questions to subagents.

## Create a task folder

Create one folder for the research run:

```text
docs/research/working/<YYYY-MM-DD>--<audience-slug>--<operation-slug>/
```

Use short lowercase hyphenated slugs. If that path already exists for another
run, append `-2`, `-3`, and so on rather than reusing or overwriting it. Apply
this convention prospectively; do not move or rename existing flat working
packets merely to match it.

Assign each subagent one unique lowercase hyphenated Markdown filename that
describes its subtask, such as `formal-evidence.md`, `public-experience.md`, or
`community-accounts.md`. Use one writer per file. Never ask concurrent agents
to append to the same file.

## Give each subagent a bounded brief

Include in every delegated task:

- the audience inclusion and exclusion boundary;
- the research question or evidence stream to investigate;
- relevant geography, service setting, and time period;
- the exact assigned working-file path;
- the requirement to follow `research-approach.md` and the research boundary;
- the instruction to write substantive findings to the assigned file and not
  edit any canonical dossier, index, source IDs, or other working file.

Allow the subagent to write as much as useful in any format. Do not require the
dossier structure, polished prose, a fixed length, or final source IDs. Require
enough citations, URLs or stable source identifiers, extracted findings, exact
data, and source context for the parent to understand and use the material. A
message to the parent may summarise the work but does not replace the required
file.

## Integrate as the parent

Read every assigned file before synthesis. If a subagent finishes without
writing its file, send it a follow-up request and do not accept the subtask as
complete until the file exists or the agent is genuinely unable to continue.
Keep partial files from interrupted or unsuccessful work.

Open the original source before using an exact figure, quotation, or unusually
consequential claim in the canonical dossier. Do not impose a broader sampling
quota or audit process. Resolve duplicate leads and preserve meaningful
disagreement. Assign or reconcile final `F##`, `W##`, and `P##` IDs only in the
canonical dossier. Leave unselected or incomplete material in the working file
only.

Only the parent may edit the indexed dossier, its source register, or the
research index during delegated work.

## Retain and ignore working files

At task completion, do not delete, move, rename, tidy, truncate, or overwrite
the task folder or its files. Keep them as ordinary Git-tracked project files so
the user can inspect and delete them later. In the final handoff, list the task
folder and state whether any packet remained partial or unintegrated.

Working files are not reusable research authority. Future tasks, downstream
skills, and later research runs must not read, cite, refresh, or infer from them
unless the user explicitly requests their inspection or the same parent task is
continuing. Use the indexed dossiers and their source registers for all normal
downstream work.
