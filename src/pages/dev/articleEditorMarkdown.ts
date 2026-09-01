export type ArticleEditorBlockKind =
  | "code"
  | "heading"
  | "list"
  | "paragraph"
  | "quote"
  | "table";

export type ArticleEditorBlock = Readonly<{
  id: string;
  kind: ArticleEditorBlockKind;
  marker?: string;
  value: string;
}>;

function classifyBlock(source: string, index: number): ArticleEditorBlock {
  const headingMatch = source.match(/^(#{2,6})\s+([\s\S]*)$/);

  if (headingMatch && !headingMatch[2].includes("\n")) {
    return {
      id: `article-editor-block-${index + 1}`,
      kind: "heading",
      marker: headingMatch[1],
      value: headingMatch[2],
    };
  }

  const lines = source.split("\n");
  const nonEmptyLines = lines.filter((line) => line.trim());
  const kind: ArticleEditorBlockKind = source.startsWith("```") || source.startsWith("~~~")
    ? "code"
    : nonEmptyLines.every((line) => /^\s*(?:[-*+] |\d+[.)] )/.test(line))
      ? "list"
      : nonEmptyLines.every((line) => /^\s*>/.test(line))
        ? "quote"
        : lines.length > 1 && /^\s*\|/.test(lines[0])
          ? "table"
          : "paragraph";

  return {
    id: `article-editor-block-${index + 1}`,
    kind,
    value: source,
  };
}

export function parseArticleMarkdown(markdown: string): ArticleEditorBlock[] {
  return markdown
    .replace(/\r\n?/g, "\n")
    .trim()
    .split(/\n{2,}/)
    .filter((source) => source.trim())
    .map(classifyBlock);
}

export function serializeArticleMarkdown(blocks: readonly ArticleEditorBlock[]) {
  return blocks
    .map((block) => {
      const value = block.value.trim();

      if (!value) {
        return "";
      }

      return block.kind === "heading" && block.marker
        ? `${block.marker} ${value}`
        : value;
    })
    .filter(Boolean)
    .join("\n\n");
}

export function getArticleEditorBlockLabel(block: ArticleEditorBlock) {
  if (block.kind === "heading") {
    return block.marker?.toUpperCase() ?? "Heading";
  }

  return {
    code: "Code",
    list: "List",
    paragraph: "Paragraph",
    quote: "Quote",
    table: "Table",
  }[block.kind];
}
