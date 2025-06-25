import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CommentCard from "../components/CommentCard";

function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`https://behnoudhp-news-be.onrender.com/api/articles/${article_id}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data.article);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching article:", err);
        setIsLoading(false);
      });
  }, [article_id]);

  useEffect(() => {
    fetch(
      `https://behnoudhp-news-be.onrender.com/api/articles/${article_id}/comments`
    )
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments);
      })
      .catch((err) => {
        console.error("Error fetching comments:", err);
      });
  }, [article_id]);

  if (isLoading) return <p>Loading article...</p>;
  if (!article) return <p>Article not found.</p>;

  const readableDate = new Date(article.created_at).toLocaleDateString();

  return (
    <section className="single-article">
      <h1>{article.title}</h1>
      <p>
        <strong>Author:</strong> {article.author} | <strong>Topic:</strong>{" "}
        {article.topic}
      </p>
      <p>
        <strong>Date:</strong> {readableDate}
      </p>
      <img
        src={article.article_img_url}
        alt={article.title}
        className="article-full-img"
      />
      <p className="article-body">{article.body}</p>
      <p>
        💬 {article.comment_count} comments | 👍 {article.votes} votes
      </p>

      <section className="comments-section">
        <h2>Comments</h2>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <CommentCard key={comment.comment_id} comment={comment} />
          ))
        )}
      </section>
    </section>
  );
}

export default SingleArticle;
