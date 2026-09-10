import Header from "./components/Header/Header";
import Intro from "./components/Intro/Intro";
import Statement from "./components/Statement/Statement";
import Contact from "./components/Contact/Contact";
import Work from "./components/Work/Work";

import "./App.css";

function App() {
  return (
    <main className="site">
      <div className="page-scroll">
        <section className="snap-page snap-page--intro">
          <Header />
          <Intro />
        </section>

        <section className="snap-page">
          <Work />
        </section>

        {/* <section className="snap-page">
          <Statement />
        </section> */}

        <section className="snap-page">
          <Contact />
        </section>
      </div>
    </main>
  );
}

export default App;
