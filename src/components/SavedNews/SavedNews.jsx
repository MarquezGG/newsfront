import NewsCard from "../NewsCard/NewsCard";
import "./SavedNews.css";

function SavedNews({ savedArticles, onDeleteArticle, currentUser }) {
  const getKeywordsSummary = () => {
    if (!savedArticles || savedArticles.length === 0) return "";

    const keywords = savedArticles
      .map((article) => article.keyword)
      .filter(Boolean);
    const uniqueKeywords = [...new Set(keywords)];

    if (uniqueKeywords.length === 0) return "";
    if (uniqueKeywords.length === 1) return uniqueKeywords[0];
    if (uniqueKeywords.length === 2) return uniqueKeywords.join(" and ");

    const displayedKeywords = uniqueKeywords.slice(0, 2);
    const remainingCount = uniqueKeywords.length - 2;
    return `${displayedKeywords.join(", ")}, and ${remainingCount} other${
      remainingCount > 1 ? "s" : ""
    }`;
  };

  return (
    <div className="saved-news">
      <section className="saved-news__header">
        <div className="saved-news__header-container">
          <p className="saved-news__label">Saved articles</p>
          <h1 className="saved-news__title">
            {currentUser?.name || "User"}, you have {savedArticles?.length || 0}{" "}
            saved article{savedArticles?.length !== 1 ? "s" : ""}
          </h1>
          {savedArticles?.length > 0 && (
            <p className="saved-news__keywords">
              By keywords:{" "}
              <span className="saved-news__keywords-list">
                {getKeywordsSummary()}
              </span>
            </p>
          )}
        </div>
      </section>

      <section className="saved-news__articles">
        <div className="saved-news__articles-container">
          {savedArticles && savedArticles.length > 0 ? (
            <ul className="saved-news__cards">
              {savedArticles.map((article, index) => (
                <NewsCard
                  key={index}
                  article={article}
                  showKeyword={true}
                  onDelete={onDeleteArticle}
                  isLoggedIn={true}
                />
              ))}
            </ul>
          ) : (
            <div className="saved-news__empty">
              <p className="saved-news__empty-text">
                You haven't saved any articles yet. Search for news and save
                articles you like!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default SavedNews;
