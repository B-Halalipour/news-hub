import { useState } from "react";

function CommentForm({ articleId, onAddComment }) {
  const [commentBody, setCommentBody] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedBody = commentBody.trim();
    if (!trimmedBody) {
      setError("Comment cannot be empty.");
      return;
    }

    setIsPosting(true);
    setError(null);

    const newComment = {
      username: "grumpy19", // Replace with CURRENT_USER.username when auth is added
      body: trimmedBody,
    };

    fetch(
      `https://behnoudhp-news-be.onrender.com/api/articles/${articleId}/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to post comment");
        return res.json();
      })
      .then(({ comment }) => {
        onAddComment(comment);
        setCommentBody("");
      })
      .catch(() => {
        setError("Something went wrong. Please try again.");
      })
      .finally(() => {
        setIsPosting(false);
      });
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <label htmlFor="comment">Add a comment</label>
      <textarea
        id="comment"
        rows={4}
        placeholder="Write your comment..."
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
        disabled={isPosting}
        required
      />
      <button type="submit" disabled={isPosting || !commentBody.trim()}>
        {isPosting ? "Posting..." : "Submit"}
      </button>
      {error && <p className="comment-error">{error}</p>}
    </form>
  );
}

export default CommentForm;
