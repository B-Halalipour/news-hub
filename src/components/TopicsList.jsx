
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TopicsList() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://behnoudhp-news-be.onrender.com/api/topics")
      .then((res) => res.json())
      .then((data) => {
        setTopics(data.topics);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching topics:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading topics...</p>;

  return (
    <nav className="topics-nav">
      <h2>Topics</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TopicsList;
