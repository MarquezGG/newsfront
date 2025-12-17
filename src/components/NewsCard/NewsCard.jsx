import "./NewsCard.css";

function NewsCard({
  article,
  onSave,
  isSaved,
  isLoggedIn,
  showKeyword,
  onDelete,
}) {
  const { title, description, publishedAt, source, urlToImage, url, keyword } =
    article;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSave) {
      onSave(article);
    }
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) {
      onDelete(article);
    }
  };

  return (
    <li className="news-card">
      {showKeyword && keyword && (
        <span className="news-card__keyword">{keyword}</span>
      )}

      <div className="news-card__actions">
        {showKeyword ? (
          <>
            <button
              className="news-card__action-btn news-card__action-btn_delete"
              onClick={handleDeleteClick}
              aria-label="Remove article"
            >
              <span className="news-card__tooltip">Remove from saved</span>
            </button>
          </>
        ) : (
          <button
            className={`news-card__action-btn news-card__action-btn_save ${
              isSaved ? "news-card__action-btn_saved" : ""
            } ${!isLoggedIn ? "news-card__action-btn_inactive" : ""}`}
            onClick={handleSaveClick}
            aria-label={isSaved ? "Article saved" : "Save article"}
          >
            {!isLoggedIn && (
              <span className="news-card__tooltip">
                Sign in to save articles
              </span>
            )}
          </button>
        )}
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="news-card__link"
      >
        <div
          className="news-card__image"
          style={{
            backgroundImage: urlToImage ? `url(${urlToImage})` : "none",
          }}
        >
          {!urlToImage && <span className="news-card__no-image">No Image</span>}
        </div>

        <div className="news-card__content">
          <time className="news-card__date">{formatDate(publishedAt)}</time>
          <h3 className="news-card__title">{title}</h3>
          <p className="news-card__description">{description}</p>
          <span className="news-card__source">{source?.name || source}</span>
        </div>
      </a>
    </li>
  );
}

export default NewsCard;
