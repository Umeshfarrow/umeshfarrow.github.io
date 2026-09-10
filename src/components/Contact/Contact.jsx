import "./Contact.css";
import PageMeta from "../PageMeta/PageMeta";
import HoverFill from "../HoverFill/HoverFill";
import { playScroll, stopScroll } from "../../lib/sound";

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact__top">
        <PageMeta number="0.5" label="Contact" />
      </div>

      <div className="contact__main">
        <div className="contact__left">
          <h2 className="contact__title">Let's talk code</h2>
          <p>
            Ping me in LinkedIn. I'm in IST and I try to reply within a day.
          </p>

          {/* CHANNELS */}
          <div className="contact__group">
            <span className="contact__group-label">channels</span>

            <a
              className="contact__card"
              href="tel:+919538984603"
              onMouseEnter={playScroll}
              onMouseLeave={stopScroll}
              
            >
              <span className="contact__card-icon" aria-hidden="true">
                ✆
              </span>
              <span className="contact__card-key">phone</span>
              <span className="contact__card-value">+91 9538984603</span>
              <span className="contact__card-action" aria-hidden="true">
                ↗
              </span>
            </a>

            <a
              className="contact__card"
              href="mailto:kelsakarya@gmail.com"
              onMouseEnter={playScroll}
              onMouseLeave={stopScroll}
              
            >
              <span className="contact__card-icon" aria-hidden="true">
                ✉
              </span>
              <span className="contact__card-key">email</span>
              <span className="contact__card-value">kelsakarya@gmail.com</span>
              <span className="contact__card-action" aria-hidden="true">
                ↗
              </span>
            </a>

            <a
              className="contact__card"
              href="https://linkedin.com/in/umeshfarrow"
              target="_blank"
              rel="noopener noreferrer nofollow"
              referrerPolicy="no-referrer"
              onMouseEnter={playScroll}
              onMouseLeave={stopScroll}
              
            >
              <span className="contact__card-icon" aria-hidden="true">
                in
              </span>
              <span className="contact__card-key">linkedin</span>
              <span className="contact__card-value">
                linkedin.com/in/umeshfarrow
              </span>
              <span className="contact__card-action" aria-hidden="true">
                ↗
              </span>
            </a>

            <a
              className="contact__card"
              href="https://github.com/Umeshfarrow"
              target="_blank"
              rel="noopener noreferrer nofollow"
              referrerPolicy="no-referrer"
              onMouseEnter={playScroll}
              onMouseLeave={stopScroll}
              
            >
              <span className="contact__card-icon" aria-hidden="true">
                ◉
              </span>
              <span className="contact__card-key">github</span>
              <span className="contact__card-value">
                github.com/Umeshfarrow
              </span>
              <span className="contact__card-action" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>

          {/* GEO */}
          <div className="contact__group">
            <span className="contact__group-label">geo</span>

            <div className="contact__card" onMouseEnter={playScroll}
              onMouseLeave={stopScroll}>
              <span className="contact__card-icon" aria-hidden="true">
                ⌖
              </span>
              <span className="contact__card-key">location</span>
              <span className="contact__card-value">Bengaluru, India</span>
              <span className="contact__card-tag">IST</span>
            </div>
          </div>

          {/* EDUCATION */}
          <div className="contact__group">
            <span className="contact__group-label">education</span>

            <div className="contact__card" onMouseEnter={playScroll}
              onMouseLeave={stopScroll}>
              <span className="contact__card-icon" aria-hidden="true">
                ◆
              </span>
              <span className="contact__card-key">MCA</span>
              <span className="contact__card-value">
                The Oxford College of Science
              </span>
              <span className="contact__card-tag">2015-2018</span>
            </div>

            <div className="contact__card" onMouseEnter={playScroll}
              onMouseLeave={stopScroll}>
              <span className="contact__card-icon" aria-hidden="true">
                ◆
              </span>
              <span className="contact__card-key">BCA</span>
              <span className="contact__card-value">BES College</span>
              <span className="contact__card-tag">2012-2015</span>
            </div>
          </div>

          {/* DOWNLOAD */}
          <div className="contact__group">
            <a
              href="/Umesh_S_Resume.pdf"
              download="Umesh_S_Resume.pdf"
              className="contact__card contact__card--action"
              onMouseEnter={playScroll}
              onMouseLeave={stopScroll}
              
            >
              <span className="contact__card-icon" aria-hidden="true">
                ↓
              </span>
              <span className="contact__card-value">Download Resume</span>
              <span className="contact__card-tag">PDF</span>
            </a>
          </div>
        </div>

        <div className="contact__right">
          <div className="contact_border">
            <HoverFill className="contact__portrait">
              <img
                src="/images/portrait.png"
                alt="Portrait"
                width="800"
                height="1000"
                loading="lazy"
                decoding="async"
              />
            </HoverFill>
          </div>
        </div>
      </div>

      <div className="contact__links">
        <a
          href="mailto:kelsakarya@gmail.com"
          onMouseEnter={playScroll}
              onMouseLeave={stopScroll}
          
        >
          kelsakarya@gmail.com
        </a>

        <a
          href="mailto:kelsakarya@gmail.com"
          onMouseEnter={playScroll}
              onMouseLeave={stopScroll}
          
        >
          Get in touch ↗
        </a>
      </div>
    </section>
  );
}

export default Contact;