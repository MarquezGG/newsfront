import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch, isLoading }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setError("Please enter a keyword");
      return;
    }

    setError("");
    onSearch(query.trim());
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (error) {
      setError("");
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__input-wrapper">
        <input
          type="text"
          className={`search-form__input ${
            error ? "search-form__input_error" : ""
          }`}
          placeholder="Enter topic"
          value={query}
          onChange={handleInputChange}
        />
        {error && <span className="search-form__error">{error}</span>}
      </div>
      <button
        type="submit"
        className="search-form__button"
        disabled={isLoading}
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default SearchForm;
