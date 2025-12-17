import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header({ isLoggedIn, onLoginClick, onLogout, currentUser }) {
  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";

  return (
    <header className={`header ${isSavedNewsPage ? "header_saved-news" : ""}`}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          NewsExplorer
        </Link>
        <Navigation
          isLoggedIn={isLoggedIn}
          onLoginClick={onLoginClick}
          onLogout={onLogout}
          currentUser={currentUser}
          isSavedNewsPage={isSavedNewsPage}
        />
      </div>
    </header>
  );
}

export default Header;
