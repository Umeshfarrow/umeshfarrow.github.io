import "./Contact.css";
import PageMeta from "../PageMeta/PageMeta";
import HoverFill from "../HoverFill/HoverFill";

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact__top">
        <PageMeta number="0.4" label="Contact" />
      </div>

      <div className="contact__main">
        <div className="contact__left">
          <h2 className="contact__title">Let's talk code</h2>
          <p>
            Ping me in LinkedIn. I'm in IST and I try to reply within a day.
          </p>

          <div className="contact__info">
            <a href="tel:+919538984603">
              <span>phone</span>
              <span>✆</span>
              <span>+91 9538984603</span>
              <span>↗</span>
            </a>

            <a href="mailto:kelsakarya@gmail.com">
              <span>email</span>
              <span>✉</span>
              <span>kelsakarya@gmail.com</span>
              <span>↗</span>
            </a>

            <a
              href="https://linkedin.com/in/umeshfarrow"
              target="_blank"
              rel="noopener noreferrer nofollow"
              referrerPolicy="no-referrer"
            >
              <span>linkedin</span>
              <span>in</span>
              <span>linkedin.com/in/umeshfarrow</span>
              <span>↗</span>
            </a>

            <a
              href="https://github.com/Umeshfarrow"
              target="_blank"
              rel="noopener noreferrer nofollow"
              referrerPolicy="no-referrer"
            >
              <span>github</span>
              <span>◉</span>
              <span>github.com/Umeshfarrow</span>
              <span>↗</span>
            </a>
          </div>

          <div className="contact__info">
            <div>
              <span>geo</span>
              <span>⌖</span>
              <span>Bengaluru, India</span>
              <span>IST</span>
            </div>
          </div>

          <div className="contact__info">
            <div>
              <span>education</span>
              <span>◆</span>
              <span>MCA · The Oxford College of Science</span>
              <span>2015-2018</span>
            </div>
            <div>
              <span>education</span>
              <span>◆</span>
              <span>BCA · BES College</span>
              <span>2012-2015</span>
            </div>
          </div>

          <HoverFill>
            <a
              href="/Umesh_S_Resume.pdf"
              download="Umesh_S_Resume.pdf"
              className="contact__resume"
            >
              <span>Download Resume ↓</span>
            </a>
          </HoverFill>
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
        <a href="mailto:kelsakarya@gmail.com">kelsakarya@gmail.com</a>

        <a href="mailto:kelsakarya@gmail.com">Get in touch ↗</a>
      </div>
    </section>
  );
}

export default Contact;