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
import { getBlogPostPath } from "../../content/blog/manifest";
import type { BlogPostReference } from "../../content/blog/postTemplate";
import { blogPosts, type BlogPost } from "../../content/blog/posts";
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

type ReferenceDraft = BlogPostReference & Readonly<{
  id: string;
}>;

type SavedArticlePayload = Readonly<{
  body: string;
  references: readonly BlogPostReference[];
}>;

const idleStatus: SaveStatus = {
  kind: "idle",
  message: "Changes are saved to the article template file.",
};

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

function findPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? blogPosts[0] ?? null;
}

function parseSaveError(payload: unknown) {
  return payload && typeof payload === "object" && typeof (payload as { error?: unknown }).error === "string"
    ? (payload as { error: string }).error
    : "The article could not be saved.";
}

function parseSavedArticle(payload: unknown): SavedArticlePayload {
  if (
    !payload
    || typeof payload !== "object"
    || typeof (payload as { body?: unknown }).body !== "string"
    || !Array.isArray((payload as { references?: unknown }).references)
  ) {
    throw new Error("The article was saved, but the editor received an invalid response.");
  }

  const references = (payload as { references: unknown[] }).references;

  if (references.some((reference) => (
    !reference
    || typeof reference !== "object"
    || typeof (reference as { citation?: unknown }).citation !== "string"
    || typeof (reference as { href?: unknown }).href !== "string"
  ))) {
    throw new Error("The article was saved, but the editor received invalid references.");
  }

  return {
    body: (payload as { body: string }).body,
    references: references as BlogPostReference[],
  };
}

function toReferences(drafts: readonly ReferenceDraft[]): BlogPostReference[] {
  return drafts.map(({ citation, href }) => ({ citation, href }));
}

export default function ArticleEditor() {
  const initialPost = blogPosts[0] ?? null;
  const referenceIdCounter = useRef(initialPost?.references.length ?? 0);
  const editorRef = useRef<HTMLFormElement>(null);
  const [selectedSlug, setSelectedSlug] = useState(initialPost?.slug ?? "");
  const [blocks, setBlocks] = useState<ArticleEditorBlock[]>(
    initialPost ? parseArticleMarkdown(initialPost.body) : [],
  );
  const [referenceDrafts, setReferenceDrafts] = useState<ReferenceDraft[]>(
    initialPost
      ? initialPost.references.map((reference, index) => ({
        ...reference,
        id: `reference-${index}`,
      }))
      : [],
  );
  const [savedBody, setSavedBody] = useState(initialPost?.body ?? "");
  const [savedReferences, setSavedReferences] = useState<readonly BlogPostReference[]>(
    initialPost?.references ?? [],
  );
  const [saveStatus, setSaveStatus] = useState<SaveStatus>(idleStatus);
  const selectedPost = findPost(selectedSlug);
  const markdown = useMemo(() => serializeArticleMarkdown(blocks), [blocks]);
  const references = useMemo(() => toReferences(referenceDrafts), [referenceDrafts]);
  const bodyHasChanges = markdown !== savedBody;
  const referencesHaveChanges = JSON.stringify(references) !== JSON.stringify(savedReferences);
  const hasChanges = bodyHasChanges || referencesHaveChanges;

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

  if (!selectedPost) {
    return (
      <main className="site-page article-editor-page">
        <Container className="article-editor-page__empty">
          <h1>No article templates found.</h1>
        </Container>
      </main>
    );
  }

  const createReferenceDrafts = (items: readonly BlogPostReference[]) => items.map((reference) => ({
    ...reference,
    id: `reference-${referenceIdCounter.current++}`,
  }));

  const loadPost = (post: BlogPost) => {
    setSelectedSlug(post.slug);
    setBlocks(parseArticleMarkdown(post.body));
    setReferenceDrafts(createReferenceDrafts(post.references));
    setSavedBody(post.body);
    setSavedReferences(post.references);
    setSaveStatus(idleStatus);
  };

  const handleArticleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextPost = findPost(event.target.value);

    if (!nextPost || nextPost.slug === selectedPost.slug) {
      return;
    }

    if (hasChanges && !window.confirm("Discard the unsaved changes to this article?")) {
      return;
    }

    loadPost(nextPost);
  };

  const handleBlockChange = (index: number, value: string) => {
    setBlocks((currentBlocks) => currentBlocks.map((block, blockIndex) => (
      blockIndex === index ? { ...block, value } : block
    )));
    setSaveStatus(idleStatus);
  };

  const handleReferenceChange = (
    id: string,
    field: "citation" | "href",
    value: string,
  ) => {
    setReferenceDrafts((currentDrafts) => currentDrafts.map((reference) => (
      reference.id === id ? { ...reference, [field]: value } : reference
    )));
    setSaveStatus(idleStatus);
  };

  const handleAddReference = () => {
    const newReference: ReferenceDraft = {
      citation: "",
      href: "",
      id: `reference-${referenceIdCounter.current++}`,
    };
    setReferenceDrafts((currentDrafts) => [...currentDrafts, newReference]);
    setSaveStatus(idleStatus);

    window.requestAnimationFrame(() => {
      const citationField = editorRef.current?.querySelector<HTMLTextAreaElement>(
        `[data-reference-id="${newReference.id}"]`,
      );
      citationField?.focus();
    });
  };

  const handleRemoveReference = (id: string) => {
    setReferenceDrafts((currentDrafts) => currentDrafts.filter(
      (reference) => reference.id !== id,
    ));
    setSaveStatus(idleStatus);
  };

  const handleSortReferences = () => {
    setReferenceDrafts((currentDrafts) => [...currentDrafts].sort(
      (left, right) => left.citation.localeCompare(right.citation, "en-AU", {
        sensitivity: "base",
      }),
    ));
    setSaveStatus(idleStatus);
  };

  const handleReset = () => {
    if (!hasChanges || window.confirm("Discard all unsaved changes to this article?")) {
      setBlocks(parseArticleMarkdown(savedBody));
      setReferenceDrafts(createReferenceDrafts(savedReferences));
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
      const response = await fetch(`/__dev/article-editor/${encodeURIComponent(selectedPost.slug)}`, {
        body: JSON.stringify({
          ...(bodyHasChanges ? { body: markdown } : {}),
          ...(referencesHaveChanges ? { references } : {}),
        }),
        headers: { "Content-Type": "application/json" },
        method: "PUT",
      });
      const payload = await response.json().catch(() => null) as unknown;

      if (!response.ok) {
        throw new Error(parseSaveError(payload));
      }

      const savedArticle = parseSavedArticle(payload);
      setBlocks(parseArticleMarkdown(savedArticle.body));
      setReferenceDrafts(createReferenceDrafts(savedArticle.references));
      setSavedBody(savedArticle.body);
      setSavedReferences(savedArticle.references);
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
              <select onChange={handleArticleChange} value={selectedPost.slug}>
                {blogPosts.map((post) => (
                  <option key={post.slug} value={post.slug}>
                    {post.title}{post.isSample ? " - sample" : ""}
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
              <p>{selectedPost.topic}</p>
              <h2>{selectedPost.title}</h2>
              <dl>
                <div>
                  <dt>Blocks</dt>
                  <dd>{blocks.length}</dd>
                </div>
                <div>
                  <dt>References</dt>
                  <dd>{referenceDrafts.length}</dd>
                </div>
              </dl>
              <a href={getBlogPostPath(selectedPost.slug)} rel="noreferrer" target="_blank">
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
                      disabled={referenceDrafts.length < 2}
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

                {referenceDrafts.length > 0 ? (
                  <ol className="article-editor-reference-list">
                    {referenceDrafts.map((reference, index) => (
                      <li key={reference.id}>
                        <fieldset>
                          <legend>Reference {index + 1}</legend>
                          <label>
                            <span>APA 7 citation</span>
                            <AutoGrowingTextarea
                              data-reference-id={reference.id}
                              onValueChange={(value) => handleReferenceChange(
                                reference.id,
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
                                reference.id,
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
                            onClick={() => handleRemoveReference(reference.id)}
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
