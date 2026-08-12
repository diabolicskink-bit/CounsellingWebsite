import ArticleMarkdown from "../ArticleMarkdown";
import type { BlogPost } from "../posts";
import "./ant-route.css";

export default function AntRouteArticle({ post }: { post: BlogPost }) {
  return (
    <div className="ant-article">
      <section className="ant-article__model" aria-labelledby="ant-route-model-title">
        <header>
          <p>Foraging route model</p>
          <h2 id="ant-route-model-title">Signal, reinforcement, correction</h2>
        </header>
        <ol>
          <li>
            <span>01</span>
            A worker finds food.
          </li>
          <li>
            <span>02</span>
            Its return journey leaves a chemical trail.
          </li>
          <li>
            <span>03</span>
            Successful trips strengthen the route.
          </li>
          <li>
            <span>04</span>
            Crowding and change can weaken recruitment.
          </li>
        </ol>
      </section>

      <ArticleMarkdown body={post.body} className="blog-article__prose ant-article__prose" />
    </div>
  );
}
