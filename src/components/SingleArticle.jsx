import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CommentCard from "../components/CommentCard";
import CommentForm from "../components/CommentForm";
import CURRENT_USER from "../utils/currentUser";
import Loader from "./Loader";

function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [votes, setVotes] = useState(0);
  const [voteChange, setVoteChange] = useState(0);
  const [voteError, setVoteError] = useState(null);
  const [articleError, setArticleError] = useState(null);

  useEffect(() => {
    fetch(`https://behnoudhp-news-be.onrender.com/api/articles/${article_id}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data.article);
        setVotes(data.article.votes);
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

  const readableDate = new Date(article?.created_at).toLocaleDateString();

  const handleVote = (inc) => {
    setVotes((curr) => curr + inc);
    setVoteChange((curr) => curr + inc);
    setVoteError(null);

    fetch(`https://behnoudhp-news-be.onrender.com/api/articles/${article_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inc_votes: inc }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Vote request failed");
        }
      })
      .catch(() => {
        setVotes((curr) => curr - inc);
        setVoteChange((curr) => curr - inc);
        setVoteError("Something went wrong. Please try again.");
        setArticleError("Article not found.");
        setIsLoading(false);
      });
  };

  if (isLoading) return <Loader message="Loading article..." />;
  if (!article) return <p>Article not found.</p>;
  if (articleError) return <p className="error-msg">{articleError}</p>;

  return (
    <section className="single-article">
      <h1 className="article-title">{article.title}</h1>
      <div className="article-meta">
        <p><strong>Author:</strong> {article.author}</p>
        <p><strong>Topic:</strong> {article.topic}</p>
        <p><strong>Date:</strong> {readableDate}</p>
      </div>

      <img
        src={article.article_img_url}
        alt={article.title}
        className="article-full-img"
      />
      <p className="article-body">{article.body}</p>

      <section className="vote-controls">
        <button
          onClick={() => handleVote(1)}
          disabled={voteChange > 0}
          aria-label="Upvote"
        >
          ⬆️
        </button>
        <span className="vote-count">{votes}</span>
        <button
          onClick={() => handleVote(-1)}
          disabled={voteChange < 0}
          aria-label="Downvote"
        >
          ⬇️
        </button>
        {voteError && <p className="vote-error">{voteError}</p>}
      </section>

      <p className="comment-count">💬 {article.comment_count} comments</p>

      <section className="comments-section">
        <h2>Comments</h2>
        <CommentForm
          articleId={article.article_id}
          onAddComment={(newComment) => {
            setComments((currComments) => [newComment, ...currComments]);
          }}
        />

        {comments.length === 0 ? (
          <p className="no-comments">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              currentUser={CURRENT_USER.username}
              onDelete={(deletedId) => {
                setComments((curr) =>
                  curr.filter((comment) => comment.comment_id !== deletedId)
                );
              }}
            />
          ))
        )}
      </section>
    </section>
  );
}

export default SingleArticle;
