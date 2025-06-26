import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ArticleList from "./components/ArticleList";
import SingleArticle from "./components/SingleArticle";
import TopicsList from "./components/TopicsList";
import TopicPage from "./pages/TopicPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/articles" />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="/topics/:topic_slug" element={<TopicPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
