import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  const {
    article_id,
    title,
    author,
    topic,
    created_at,
    comment_count,
    votes,
    article_img_url,
  } = article;

  const readableDate = new Date(created_at).toLocaleDateString();

  return (
    <Link to={`/articles/${article_id}`} className="article-card-link">
      <article className="article-card">
        <img
          src={article_img_url}
          alt={title}
          className="article-image"
          onError={(e) => {
            e.target.src = "https://placekitten.com/300/200";
          }}
        />

        <div className="article-content">
          <h2>{title}</h2>
          <p>
            👤 {author} | 🏷️ {topic}
          </p>
          <p>📅 {readableDate}</p>
          <p>
            💬 {comment_count} | 👍 {votes}
          </p>
        </div>
      </article>
    </Link>
  );
}

export default ArticleCard;
