import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import TopicsList from "./TopicsList";
import Loader from "./Loader";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort_by = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setIsLoading(true);

    fetch(
      `https://behnoudhp-news-be.onrender.com/api/articles?sort_by=${sort_by}&order=${order}`
    )
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("❌ Fetch error:", err);
        setIsLoading(false);
      });
  }, [sort_by, order]);

  if (isLoading) return <Loader message="Loading articles..." />;

  return (
    <>
      {/* Topics Section */}
      <div className="topics-wrapper">
        <h2>Topics</h2>
        <TopicsList />
      </div>

      {/* Sorting Controls */}
      <section className="controls-bar">
        <div className="sort-wrapper">
          <label htmlFor="sort-by">Sort by:</label>
          <select
            id="sort-by"
            value={sort_by}
            onChange={(e) =>
              setSearchParams({ sort_by: e.target.value, order })
            }
          >
            <option value="created_at">Date</option>
            <option value="votes">Votes</option>
            <option value="comment_count">Comments</option>
          </select>

          <button
            aria-label="Toggle sort order"
            onClick={() =>
              setSearchParams({
                sort_by,
                order: order === "asc" ? "desc" : "asc",
              })
            }
          >
            Order: {order === "asc" ? "⬆️ Asc" : "⬇️ Desc"}
          </button>
        </div>
      </section>

      {/* Article Cards */}
      <main className="articles-container">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </main>
    </>
  );
}

export default ArticleList;
