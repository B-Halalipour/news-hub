// components/Votes.jsx
import { useState } from "react";

function Votes({ initialVotes, articleId }) {
  const [votes, setVotes] = useState(initialVotes);
  const [voteChange, setVoteChange] = useState(0);
  const [error, setError] = useState(null);

  const handleVote = (inc) => {
    setVotes((curr) => curr + inc);
    setVoteChange((curr) => curr + inc);
    setError(null);

    fetch(`https://behnoudhp-news-be.onrender.com/api/articles/${articleId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inc_votes: inc }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Voting failed");
        }
      })
      .catch(() => {
        // Revert if API call fails
        setVotes((curr) => curr - inc);
        setVoteChange((curr) => curr - inc);
        setError("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="vote-controls">
      <button
        onClick={() => handleVote(1)}
        disabled={voteChange > 0}
        aria-label="Upvote article"
      >
        ⬆️
      </button>
      <span className="vote-count">{votes}</span>
      <button
        onClick={() => handleVote(-1)}
        disabled={voteChange < 0}
        aria-label="Downvote article"
      >
        ⬇️
      </button>
      {error && <p className="vote-error">{error}</p>}
    </div>
  );
}

export default Votes;
