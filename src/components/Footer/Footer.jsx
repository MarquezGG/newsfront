import { Link } from "react-router-dom";
import githubIcon from "../../assets/github.svg";
import linkedinIcon from "../../assets/LinkedIn.svg";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          © 2025 Supersite, Powered by News API
        </p>

        <nav className="footer__nav">
          <ul className="footer__links">
            <li className="footer__link-item">
              <Link to="/" className="footer__link">
                Home
              </Link>
            </li>
            <li className="footer__link-item">
              <a
                href="https://tripleten.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                TripleTen
              </a>
            </li>
          </ul>

          <ul className="footer__social">
            <li className="footer__social-item">
              <a
                href="https://github.com/MarquezGG"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="GitHub"
              >
                <img
                  src={githubIcon}
                  alt="GitHub"
                  className="footer__social-icon"
                />
              </a>
            </li>
            <li className="footer__social-item">
              <a
                href="https://www.linkedin.com/in/eduard-petrosian-778392aa/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="LinkedIn"
              >
                <img
                  src={linkedinIcon}
                  alt="LinkedIn"
                  className="footer__social-icon"
                />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
