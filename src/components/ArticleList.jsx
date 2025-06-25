import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://behnoudhp-news-be.onrender.com/api/articles")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Data fetched:", data);
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("❌ Fetch error:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading articles...</p>;

  return (
    <main className="articles-container">
      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </main>
  );
}

export default ArticleList;
