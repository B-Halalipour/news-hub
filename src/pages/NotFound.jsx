import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="error-page">
      <h2>404 - Page Not Found</h2>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/articles">Go back to homepage</Link>
    </section>
  );
}

export default NotFound;
