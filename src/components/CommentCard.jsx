

function CommentCard({ comment }) {
  return (
    <div className="comment-card">
      <p className="comment-body">{comment.body}</p>
      <p className="comment-meta">
        ✍️ {comment.author} | 📅{" "}
        {new Date(comment.created_at).toLocaleDateString()} | 👍 {comment.votes}
      </p>
    </div>
  );
}

export default CommentCard;
