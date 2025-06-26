// pages/TopicPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard"; // You may need this component

function TopicPage() {
  const { topic_slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://behnoudhp-news-be.onrender.com/api/articles?topic=${topic_slug}`)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching topic articles:", err);
        setIsLoading(false);
      });
  }, [topic_slug]);

  if (isLoading) return <p>Loading articles...</p>;

  return (
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
  );
}

export default TopicPage;
