import ArticleMarkdown from "../ArticleMarkdown";
import type { BlogPost } from "../posts";
import "./dinosaur-fossil.css";

export default function DinosaurFossilArticle({ post }: { post: BlogPost }) {
  return (
    <div className="fossil-article">
      <aside className="fossil-article__evidence-key" aria-label="Fossil evidence categories">
        <div>
          <span aria-hidden="true">01</span>
          <p>
            <strong>Body</strong>
            Bone, teeth and preserved tissue
          </p>
        </div>
        <div>
          <span aria-hidden="true">02</span>
          <p>
            <strong>Trace</strong>
            Tracks, nests and coprolites
          </p>
        </div>
        <div>
          <span aria-hidden="true">03</span>
          <p>
            <strong>Context</strong>
            Rock, age and nearby remains
          </p>
        </div>
      </aside>

      <ArticleMarkdown
        body={post.body}
        className="blog-article__prose fossil-article__prose"
      />
    </div>
  );
}
