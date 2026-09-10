import Header from "./components/Header/Header";
import Intro from "./components/Intro/Intro";
import Skills from "./components/Skills/Skills";
import Work from "./components/Work/Work";
import Projects from "./components/Projects/Projects";
import Blog from "./components/Blog/Blog";
import Contact from "./components/Contact/Contact";

import "./App.css";

function App() {
  return (
    <main className="site">
      <div className="page-scroll">
        <section className="snap-page snap-page--intro">
          <Header />
          <Intro />
        </section>

        <section className="snap-page" id="skills">
          <Skills />
        </section>

        <section className="snap-page" id="work">
          <Work />
        </section>

        <section className="snap-page" id="projects">
          <Projects />
        </section>

        <section className="snap-page" id="blog">
          <Blog />
        </section>

        <section className="snap-page" id="contact">
          <Contact />
        </section>
      </div>
    </main>
  );
}

export default App;