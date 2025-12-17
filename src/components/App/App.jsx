import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import * as api from "../../utils/api";
import "./App.css";

function App() {
  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState("");

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      api
        .checkToken(token)
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
          return api.getSavedArticles(token);
        })
        .then((articles) => {
          setSavedArticles(articles || []);
        })
        .catch((err) => {
          console.error("Token validation failed:", err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setHasSearched(true);
    setSearchError("");
    setArticles([]);

    try {
      const results = await api.searchNews(query);
      setArticles(results);
    } catch (error) {
      console.error("Search error:", error);
      setSearchError(
        "Sorry, something went wrong during the request. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const { token } = await api.login(
        credentials.email,
        credentials.password
      );
      const user = await api.checkToken(token);
      setIsLoggedIn(true);
      setCurrentUser(user);
      setIsLoginModalOpen(false);

      const articles = await api.getSavedArticles(token);
      setSavedArticles(articles || []);
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message || "Login failed");
    }
  };

  const handleRegister = async (userData) => {
    try {
      await api.register(userData.email, userData.password, userData.name);
      setIsRegisterModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.message || "Registration failed");
    }
  };

  const handleLogout = () => {
    api.logout();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSavedArticles([]);
  };

  const handleSaveArticle = async (article) => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }

    const token = localStorage.getItem("jwt");
    const isAlreadySaved = savedArticles.some(
      (saved) => saved.url === article.url
    );

    try {
      if (isAlreadySaved) {
        const savedArticle = savedArticles.find(
          (saved) => saved.url === article.url
        );
        if (savedArticle && savedArticle._id) {
          await api.deleteArticle(savedArticle._id, token);
          setSavedArticles(
            savedArticles.filter((saved) => saved.url !== article.url)
          );
        }
      } else {
        const savedArticle = await api.saveArticle(article, token);
        setSavedArticles([...savedArticles, savedArticle]);
      }
    } catch (error) {
      console.error("Save article error:", error);
    }
  };

  const handleDeleteArticle = async (article) => {
    const token = localStorage.getItem("jwt");

    try {
      if (article._id) {
        await api.deleteArticle(article._id, token);
      }
      setSavedArticles(
        savedArticles.filter((saved) => saved.url !== article.url)
      );
    } catch (error) {
      console.error("Delete article error:", error);
    }
  };

  const openLoginModal = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const openRegisterModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const closeModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
    setIsSuccessModalOpen(false);
  };

  const handleSuccessSignIn = () => {
    setIsSuccessModalOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <div className="app">
      <Header
        isLoggedIn={isLoggedIn}
        onLoginClick={openLoginModal}
        onLogout={handleLogout}
        isSavedNewsPage={isSavedNewsPage}
        currentUser={currentUser}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Main
              onSearch={handleSearch}
              articles={articles}
              isLoading={isLoading}
              hasSearched={hasSearched}
              searchError={searchError}
              onSaveArticle={handleSaveArticle}
              savedArticles={savedArticles}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route
          path="/saved-news"
          element={
            <SavedNews
              savedArticles={savedArticles}
              onDeleteArticle={handleDeleteArticle}
              currentUser={currentUser}
            />
          }
        />
      </Routes>

      <Footer />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeModals}
        onLogin={handleLogin}
        onSwitchToRegister={openRegisterModal}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={closeModals}
        onRegister={handleRegister}
        onSwitchToLogin={openLoginModal}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={closeModals}
        onSignInClick={handleSuccessSignIn}
      />
    </div>
  );
}

export default App;
