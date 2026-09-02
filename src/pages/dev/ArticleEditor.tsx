import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type TextareaHTMLAttributes,
} from "react";
import {
  ExternalLink,
  Plus,
  RotateCcw,
  Save,
  SortAsc,
  Trash2,
} from "lucide-react";
import Container from "../../components/Container";
import { getArticlePath } from "../../content/articles/manifest";
import type { ArticleReference } from "../../content/articles/articleTemplate";
import { articles, type Article } from "../../content/articles/articles";
import useDocumentMetadata from "../../hooks/useDocumentMetadata";
import {
  getArticleEditorBlockLabel,
  parseArticleMarkdown,
  serializeArticleMarkdown,
  type ArticleEditorBlock,
} from "./articleEditorMarkdown";
import "./article-editor.css";

type SaveStatus = Readonly<{
  kind: "error" | "idle" | "saved" | "saving";
  message: string;
}>;

type AutoGrowingTextareaProps = Readonly<{
  onValueChange: (value: string) => void;
  value: string;
}> & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value">;

const idleStatus: SaveStatus = {
  kind: "idle",
  message: "Changes are saved to the article template file.",
};
const initialArticle = articles[0] ?? null;
const referenceCollator = new Intl.Collator("en-AU", { sensitivity: "base" });

function resizeTextarea(textarea: HTMLTextAreaElement) {
  textarea.style.height = "0";
  textarea.style.height = `${textarea.scrollHeight}px`;
}

function AutoGrowingTextarea({
  onValueChange,
  value,
  ...textareaProps
}: AutoGrowingTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      resizeTextarea(textarea);
    }
  }, [value]);

  return (
    <textarea
      {...textareaProps}
      onChange={(event) => onValueChange(event.target.value)}
      ref={textareaRef}
      rows={1}
      spellCheck
      value={value}
      wrap="soft"
    />
  );
}

function findArticle(slug: string) {
  return articles.find((article) => article.slug === slug) ?? initialArticle;
}

function parseSaveError(payload: unknown) {
  return payload && typeof payload === "object" && typeof (payload as { error?: unknown }).error === "string"
    ? (payload as { error: string }).error
    : "The article could not be saved.";
}

function referencesMatch(
  left: readonly ArticleReference[],
  right: readonly ArticleReference[],
) {
  return left.length === right.length && left.every((reference, index) => (
    reference.citation === right[index].citation && reference.href === right[index].href
  ));
}

export default function ArticleEditor() {
  const editorRef = useRef<HTMLFormElement>(null);
  const [selectedSlug, setSelectedSlug] = useState(initialArticle?.slug ?? "");
  const [blocks, setBlocks] = useState<ArticleEditorBlock[]>(
    () => initialArticle ? parseArticleMarkdown(initialArticle.body) : [],
  );
  const [references, setReferences] = useState<ArticleReference[]>(
    () => initialArticle ? [...initialArticle.references] : [],
  );
  const [savedBody, setSavedBody] = useState(initialArticle?.body ?? "");
  const [savedReferences, setSavedReferences] = useState<readonly ArticleReference[]>(
    initialArticle?.references ?? [],
  );
  const [saveStatus, setSaveStatus] = useState<SaveStatus>(idleStatus);
  const selectedArticle = findArticle(selectedSlug);
  const markdown = useMemo(() => serializeArticleMarkdown(blocks), [blocks]);
  const hasChanges = markdown !== savedBody
    || !referencesMatch(references, savedReferences);

  useDocumentMetadata(
    "Article editor | Vive Counselling",
    "Developer-only editor for existing article body and reference content.",
  );

  useEffect(() => {
    if (!hasChanges) {
      return;
    }

    const warnBeforeLeaving = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", warnBeforeLeaving);
    return () => window.removeEventListener("beforeunload", warnBeforeLeaving);
  }, [hasChanges]);

  useLayoutEffect(() => {
    const resizeEditorTextareas = () => {
      editorRef.current?.querySelectorAll("textarea").forEach(resizeTextarea);
    };

    resizeEditorTextareas();
    window.addEventListener("resize", resizeEditorTextareas);
    return () => window.removeEventListener("resize", resizeEditorTextareas);
  }, []);

  if (!selectedArticle) {
    return (
      <main className="site-page article-editor-page">
        <Container className="article-editor-page__empty">
          <h1>No article templates found.</h1>
        </Container>
      </main>
    );
  }

  const loadArticle = (article: Article) => {
    setSelectedSlug(article.slug);
    setBlocks(parseArticleMarkdown(article.body));
    setReferences([...article.references]);
    setSavedBody(article.body);
    setSavedReferences(article.references);
    setSaveStatus(idleStatus);
  };

  const handleArticleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextArticle = findArticle(event.target.value);

    if (!nextArticle || nextArticle.slug === selectedArticle.slug) {
      return;
    }

    if (hasChanges && !window.confirm("Discard the unsaved changes to this article?")) {
      return;
    }

    loadArticle(nextArticle);
  };

  const handleBlockChange = (index: number, value: string) => {
    setBlocks((currentBlocks) => currentBlocks.map((block, blockIndex) => (
      blockIndex === index ? { ...block, value } : block
    )));
    setSaveStatus(idleStatus);
  };

  const handleReferenceChange = (
    index: number,
    field: "citation" | "href",
    value: string,
  ) => {
    setReferences((currentReferences) => currentReferences.map((reference, referenceIndex) => (
      referenceIndex === index ? { ...reference, [field]: value } : reference
    )));
    setSaveStatus(idleStatus);
  };

  const handleAddReference = () => {
    setReferences((currentReferences) => [
      ...currentReferences,
      { citation: "", href: "" },
    ]);
    setSaveStatus(idleStatus);

    window.requestAnimationFrame(() => {
      const citationFields = editorRef.current?.querySelectorAll<HTMLTextAreaElement>(
        "[data-reference-citation]",
      );
      citationFields?.item(citationFields.length - 1)?.focus();
    });
  };

  const handleRemoveReference = (index: number) => {
    setReferences((currentReferences) => currentReferences.filter(
      (_reference, referenceIndex) => referenceIndex !== index,
    ));
    setSaveStatus(idleStatus);
  };

  const handleSortReferences = () => {
    setReferences((currentReferences) => [...currentReferences].sort(
      (left, right) => referenceCollator.compare(left.citation, right.citation),
    ));
    setSaveStatus(idleStatus);
  };

  const handleReset = () => {
    if (!hasChanges || window.confirm("Discard all unsaved changes to this article?")) {
      setBlocks(parseArticleMarkdown(savedBody));
      setReferences([...savedReferences]);
      setSaveStatus(idleStatus);
    }
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasChanges || saveStatus.kind === "saving") {
      return;
    }

    setSaveStatus({ kind: "saving", message: "Saving article..." });

    try {
      const response = await fetch(`/__dev/article-editor/${encodeURIComponent(selectedArticle.slug)}`, {
        body: JSON.stringify({ body: markdown, references }),
        headers: { "Content-Type": "application/json" },
        method: "PUT",
      });
      const payload = await response.json().catch(() => null) as unknown;

      if (!response.ok) {
        throw new Error(parseSaveError(payload));
      }

      setSavedBody(markdown);
      setSavedReferences([...references]);
      setSaveStatus({ kind: "saved", message: "Saved to the article template." });
    } catch (error) {
      setSaveStatus({
        kind: "error",
        message: error instanceof Error ? error.message : "The article could not be saved.",
      });
    }
  };

  return (
    <main className="site-page article-editor-page">
      <section className="site-hero site-hero-surface article-editor-page__hero">
        <Container className="article-editor-page__hero-inner">
          <p className="site-hero__eyebrow">Developer tool</p>
          <div>
            <h1>Article editor</h1>
            <p>
              Edit the body as a readable document. Paragraph breaks are handled for you;
              inline Markdown remains visible where it carries meaning.
            </p>
          </div>
        </Container>
      </section>

      <section className="article-editor-page__workspace" aria-label="Article content editor">
        <Container>
          <header className="article-editor-toolbar">
            <label>
              <span>Article</span>
              <select onChange={handleArticleChange} value={selectedArticle.slug}>
                {articles.map((article) => (
                  <option key={article.slug} value={article.slug}>
                    {article.title}{article.isSample ? " - sample" : ""}
                  </option>
                ))}
              </select>
            </label>

            <div className="article-editor-toolbar__actions">
              <p
                aria-live="polite"
                className={`article-editor-status article-editor-status--${saveStatus.kind}`}
              >
                {hasChanges && saveStatus.kind === "idle" ? "Unsaved changes" : saveStatus.message}
              </p>
              <button disabled={!hasChanges || saveStatus.kind === "saving"} onClick={handleReset} type="button">
                <RotateCcw aria-hidden="true" size={16} />
                Reset
              </button>
              <button
                className="article-editor-toolbar__save"
                disabled={!hasChanges || saveStatus.kind === "saving"}
                form="article-editor-form"
                type="submit"
              >
                <Save aria-hidden="true" size={16} />
                {saveStatus.kind === "saving" ? "Saving..." : "Save article"}
              </button>
            </div>
          </header>

          <div className="article-editor-layout">
            <aside className="article-editor-context">
              <p>{selectedArticle.topic}</p>
              <h2>{selectedArticle.title}</h2>
              <dl>
                <div>
                  <dt>Blocks</dt>
                  <dd>{blocks.length}</dd>
                </div>
                <div>
                  <dt>References</dt>
                  <dd>{references.length}</dd>
                </div>
              </dl>
              <a href={getArticlePath(selectedArticle.slug)} rel="noreferrer" target="_blank">
                View published layout
                <ExternalLink aria-hidden="true" size={14} />
              </a>
              <p className="article-editor-context__note">
                This editor changes the body and references. Title and metadata remain in the typed template.
              </p>
            </aside>

            <form
              className="article-editor-document"
              id="article-editor-form"
              onSubmit={handleSave}
              ref={editorRef}
            >
              <div className="article-editor-document__heading">
                <span>Body</span>
                <p>Blank Markdown lines are represented by the spacing between blocks.</p>
              </div>

              <div className="article-editor-blocks">
                {blocks.map((block, index) => (
                  <div
                    className={`article-editor-block article-editor-block--${block.kind}`}
                    key={block.id}
                  >
                    <span aria-hidden="true" className="article-editor-block__type">
                      {getArticleEditorBlockLabel(block)}
                    </span>
                    <AutoGrowingTextarea
                      aria-label={`${getArticleEditorBlockLabel(block)} block ${index + 1}`}
                      onValueChange={(value) => handleBlockChange(index, value)}
                      value={block.value}
                    />
                  </div>
                ))}
              </div>

              <section
                aria-labelledby="article-editor-references-heading"
                className="article-editor-references"
              >
                <div className="article-editor-references__heading">
                  <div>
                    <p>Source list</p>
                    <h2 id="article-editor-references-heading">References</h2>
                  </div>
                  <div className="article-editor-references__actions">
                    <button
                      disabled={references.length < 2}
                      onClick={handleSortReferences}
                      type="button"
                    >
                      <SortAsc aria-hidden="true" size={16} />
                      Sort A-Z
                    </button>
                    <button onClick={handleAddReference} type="button">
                      <Plus aria-hidden="true" size={16} />
                      Add reference
                    </button>
                  </div>
                </div>

                <p className="article-editor-references__guidance">
                  Enter the APA 7 citation without its DOI or URL, then add the canonical DOI
                  link or a stable source page separately. The published article handles the
                  hanging indent and visible link.
                </p>

                {references.length > 0 ? (
                  <ol className="article-editor-reference-list">
                    {references.map((reference, index) => (
                      <li key={index}>
                        <fieldset>
                          <legend>Reference {index + 1}</legend>
                          <label>
                            <span>APA 7 citation</span>
                            <AutoGrowingTextarea
                              data-reference-citation
                              onValueChange={(value) => handleReferenceChange(
                                index,
                                "citation",
                                value,
                              )}
                              required
                              value={reference.citation}
                            />
                          </label>
                          <label>
                            <span>DOI or stable source URL</span>
                            <input
                              inputMode="url"
                              onChange={(event) => handleReferenceChange(
                                index,
                                "href",
                                event.target.value,
                              )}
                              spellCheck={false}
                              required
                              type="url"
                              value={reference.href}
                            />
                          </label>
                          <button
                            aria-label={`Remove reference ${index + 1}`}
                            className="article-editor-reference__remove"
                            onClick={() => handleRemoveReference(index)}
                            type="button"
                          >
                            <Trash2 aria-hidden="true" size={15} />
                            Remove
                          </button>
                        </fieldset>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="article-editor-references__empty">
                    No references yet. Add one when the article relies on an external source.
                  </p>
                )}
              </section>
            </form>
          </div>
        </Container>
      </section>
    </main>
  );
}
