import "./Header.css";

function Header() {
  return (
    <header className="header">
      <a className="header__logo" href="/">
        Umesh S
      </a>

      <nav className="header__nav" aria-label="Main navigation">
        <a href="#about">0.1 About</a>
        <a href="#work">0.2 Work</a>
        <a href="#projects">0.3 Projects</a>
        <a href="#contact">0.4 Contact</a>
      </nav>
    </header>
  );
}

export default Header;
