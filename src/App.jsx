import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ArticleList from "./components/ArticleList";
import SingleArticle from "./components/SingleArticle";
import TopicsList from "./components/TopicsList";
import TopicPage from "./pages/TopicPage";
import NotFound from "./pages/NotFound";
import DarkModeToggle from "./components/DarkModeToggle";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if (localStorage.getItem("dark-mode") === "true") {
      document.body.classList.add("dark-mode");
    }
  }, []);

  return (
    <BrowserRouter>
      <header>
        <h1>📰 News Portal</h1>
        <DarkModeToggle />
      </header>

      <Routes>
        <Route path="/" element={<Navigate to="/articles" />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="/topics/:topic_slug" element={<TopicPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ScrollToTopButton />
    </BrowserRouter>
  );
}

export default App;
