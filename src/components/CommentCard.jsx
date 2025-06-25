import { useState } from "react";

function CommentCard({ comment, currentUser, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = () => {
    setIsDeleting(true);
    setDeleteError(null);

    fetch(
      `https://behnoudhp-news-be.onrender.com/api/comments/${comment.comment_id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        onDelete(comment.comment_id); // Notify parent to remove it
      })
      .catch(() => {
        setDeleteError("Could not delete comment. Please try again.");
        setIsDeleting(false);
      });
  };

  return (
    <div className="comment-card">
      <p className="comment-body">{comment.body}</p>
      <p className="comment-meta">
        ✍️ {comment.author} | 📅{" "}
        {new Date(comment.created_at).toLocaleDateString()} | 👍 {comment.votes}
      </p>

      {currentUser === comment.author && (
        <div className="comment-actions">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="delete-button"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
          {deleteError && <p className="delete-error">{deleteError}</p>}
        </div>
      )}
    </div>
  );
}

export default CommentCard;
