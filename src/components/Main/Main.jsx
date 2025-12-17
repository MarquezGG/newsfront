import { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";
import About from "../About/About";
import "./Main.css";

function Main({
  onSearch,
  articles,
  isLoading,
  hasSearched,
  searchError,
  onSaveArticle,
  savedArticles,
  isLoggedIn,
}) {
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    setVisibleCount(3);
  }, [articles]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visibleArticles = articles.slice(0, visibleCount);
  const hasMoreArticles = articles.length > visibleCount;

  return (
    <main className="main">
      <section className="main__hero">
        <div className="main__hero-content">
          <h1 className="main__title">What's going on in the world?</h1>
          <p className="main__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <SearchForm onSearch={onSearch} isLoading={isLoading} />
        </div>
      </section>

      {isLoading && (
        <section className="main__results">
          <Preloader />
        </section>
      )}

      {!isLoading && hasSearched && searchError && (
        <section className="main__results main__results_empty">
          <div className="main__not-found">
            <div className="main__not-found-icon">⚠️</div>
            <h3 className="main__not-found-title">Error</h3>
            <p className="main__not-found-text">{searchError}</p>
          </div>
        </section>
      )}

      {!isLoading && hasSearched && !searchError && articles.length === 0 && (
        <section className="main__results main__results_empty">
          <div className="main__not-found">
            <div className="main__not-found-icon">🔍</div>
            <h3 className="main__not-found-title">Nothing found</h3>
            <p className="main__not-found-text">
              Sorry, but nothing matched your search terms.
            </p>
          </div>
        </section>
      )}

      {!isLoading && !searchError && articles.length > 0 && (
        <section className="main__results">
          <div className="main__results-container">
            <h2 className="main__results-title">Search results</h2>
            <ul className="main__cards">
              {visibleArticles.map((article, index) => (
                <NewsCard
                  key={article.url || index}
                  article={article}
                  onSave={onSaveArticle}
                  isSaved={savedArticles?.some(
                    (saved) => saved.url === article.url
                  )}
                  isLoggedIn={isLoggedIn}
                />
              ))}
            </ul>
            {hasMoreArticles && (
              <button className="main__show-more" onClick={handleShowMore}>
                Show more
              </button>
            )}
          </div>
        </section>
      )}

      <About />
    </main>
  );
}

export default Main;
