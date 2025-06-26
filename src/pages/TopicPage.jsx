// pages/TopicPage.jsx
import { useParams, useSearchParams } from "react-router-dom";

import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard"; // You may need this component

function TopicPage() {
  const { topic_slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const sort_by = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://behnoudhp-news-be.onrender.com/api/articles?topic=${topic_slug}&sort_by=${sort_by}&order=${order}`
    )
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching topic articles:", err);
        setIsLoading(false);
      });
  }, [topic_slug, sort_by, order]);

  if (isLoading) return <p>Loading articles...</p>;

  return (
    <>
      <section className="sort-controls">
        <label htmlFor="sort-by">Sort by:</label>
        <select
          id="sort-by"
          value={sort_by}
          onChange={(e) => setSearchParams({ sort_by: e.target.value, order })}
        >
          <option value="created_at">Date</option>
          <option value="votes">Votes</option>
          <option value="comment_count">Comments</option>
        </select>

        <button
          onClick={() => {
            const newOrder = order === "asc" ? "desc" : "asc";
            setSearchParams({ sort_by, order: newOrder });
          }}
        >
          Order: {order === "asc" ? "⬆️ Asc" : "⬇️ Desc"}
        </button>
      </section>

      <section className="topic-page">
        <h1>Topic: {topic_slug}</h1>
        {articles.length === 0 ? (
          <p>No articles found for this topic.</p>
        ) : (
          <div className="articles-container">
            {articles.map((article) => (
              <ArticleCard key={article.article_id} article={article} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default TopicPage;
