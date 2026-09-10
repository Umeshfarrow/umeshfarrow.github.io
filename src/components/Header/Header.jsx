import "./Header.css";
import { playScroll, stopScroll } from "../../lib/sound";

function Header() {
  const handleAnchorClick = (event) => {
    const hash = event.currentTarget.getAttribute("href");
    if (!hash || !hash.startsWith("#")) return;

    const target = document.querySelector(hash);
    if (!target) return;

    event.preventDefault();

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <header className="header">
      <a className="header__logo" href="/">
        Umesh S
      </a>

      <nav className="header__nav" aria-label="Main navigation">
        <a href="#skills" onMouseEnter={playScroll} onMouseLeave={stopScroll} onClick={handleAnchorClick}>
          0.1 Skills
        </a>
        <a href="#work" onMouseEnter={playScroll} onMouseLeave={stopScroll} onClick={handleAnchorClick}>
          0.2 Work
        </a>
        <a
          href="#projects"
          onMouseEnter={playScroll}
          onMouseLeave={stopScroll}
          onClick={handleAnchorClick}
        >
          0.3 Projects
        </a>
        <a href="#blog" onMouseEnter={playScroll} onMouseLeave={stopScroll} onClick={handleAnchorClick}>
          0.4 Blog
        </a>
        <a href="#contact" onMouseEnter={playScroll} onMouseLeave={stopScroll} onClick={handleAnchorClick}>
          0.5 Contact
        </a>
      </nav>
    </header>
  );
}

export default Header;