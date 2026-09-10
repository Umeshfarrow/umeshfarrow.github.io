import { useState } from "react";
import "./Header.css";
import {
  playScroll,
  playSelect,
  isSoundMuted,
  toggleSound,
} from "../../lib/sound";

function Header() {
  const [muted, setMuted] = useState(isSoundMuted);

  const handleAnchorClick = (event) => {
    playSelect();

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

  const handleToggleSound = () => {
    setMuted(toggleSound());
  };

  return (
    <header className="header">
      <a className="header__logo" href="/">
        Umesh S
      </a>

      <nav className="header__nav" aria-label="Main navigation">
        <a href="#skills" onMouseEnter={playScroll} onClick={handleAnchorClick}>
          0.1 Skills
        </a>
        <a href="#work" onMouseEnter={playScroll} onClick={handleAnchorClick}>
          0.2 Work
        </a>
        <a
          href="#projects"
          onMouseEnter={playScroll}
          onClick={handleAnchorClick}
        >
          0.3 Projects
        </a>
        <a href="#blog" onMouseEnter={playScroll} onClick={handleAnchorClick}>
          0.4 Blog
        </a>
        <a href="#contact" onMouseEnter={playScroll} onClick={handleAnchorClick}>
          0.5 Contact
        </a>
      </nav>

      <button
        className={`header__sound${muted ? " header__sound--muted" : ""}`}
        type="button"
        onClick={handleToggleSound}
        aria-pressed={!muted}
        title={muted ? "Unmute menu sounds" : "Mute menu sounds"}
      >
        {muted ? "snd·off" : "snd·on"}
      </button>
    </header>
  );
}

export default Header;