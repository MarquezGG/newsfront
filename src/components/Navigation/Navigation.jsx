import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation({
  isLoggedIn,
  onLoginClick,
  onLogout,
  currentUser,
  isSavedNewsPage,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLoginClick = () => {
    closeMobileMenu();
    onLoginClick();
  };

  const handleLogout = () => {
    closeMobileMenu();
    onLogout();
  };

  return (
    <nav className={`navigation ${isSavedNewsPage ? "navigation_dark" : ""}`}>
      <button
        className={`navigation__menu-toggle ${
          isMobileMenuOpen ? "navigation__menu-toggle_open" : ""
        }`}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <span className="navigation__menu-toggle-line"></span>
        <span className="navigation__menu-toggle-line"></span>
      </button>

      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navigation__link ${isActive ? "navigation__link_active" : ""}`
            }
          >
            Home
          </NavLink>
        </li>

        {isLoggedIn && (
          <li className="navigation__item">
            <NavLink
              to="/saved-news"
              className={({ isActive }) =>
                `navigation__link ${isActive ? "navigation__link_active" : ""}`
              }
            >
              Saved articles
            </NavLink>
          </li>
        )}

        <li className="navigation__item">
          {isLoggedIn ? (
            <button
              className="navigation__button navigation__button_logged-in"
              onClick={onLogout}
            >
              <span className="navigation__username">
                {currentUser?.name || "User"}
              </span>
              <span className="navigation__logout-icon"></span>
            </button>
          ) : (
            <button className="navigation__button" onClick={onLoginClick}>
              Sign in
            </button>
          )}
        </li>
      </ul>

      {isMobileMenuOpen && (
        <div
          className="navigation__mobile-overlay"
          onClick={closeMobileMenu}
        ></div>
      )}
      <div
        className={`navigation__mobile-menu ${
          isMobileMenuOpen ? "navigation__mobile-menu_open" : ""
        }`}
      >
        <div className="navigation__mobile-header">
          <span className="navigation__mobile-logo">NewsExplorer</span>
          <button
            className="navigation__close-button"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <span className="navigation__close-line"></span>
            <span className="navigation__close-line"></span>
          </button>
        </div>
        <ul className="navigation__mobile-list">
          <li className="navigation__mobile-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `navigation__mobile-link ${
                  isActive ? "navigation__mobile-link_active" : ""
                }`
              }
              onClick={closeMobileMenu}
            >
              Home
            </NavLink>
          </li>

          {isLoggedIn && (
            <li className="navigation__mobile-item">
              <NavLink
                to="/saved-news"
                className={({ isActive }) =>
                  `navigation__mobile-link ${
                    isActive ? "navigation__mobile-link_active" : ""
                  }`
                }
                onClick={closeMobileMenu}
              >
                Saved articles
              </NavLink>
            </li>
          )}

          <li className="navigation__mobile-item">
            {isLoggedIn ? (
              <button
                className="navigation__mobile-button navigation__mobile-button_logged-in"
                onClick={handleLogout}
              >
                <span className="navigation__username">
                  {currentUser?.name || "User"}
                </span>
                <span className="navigation__logout-icon navigation__logout-icon_mobile"></span>
              </button>
            ) : (
              <button
                className="navigation__mobile-button"
                onClick={handleLoginClick}
              >
                Sign in
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
