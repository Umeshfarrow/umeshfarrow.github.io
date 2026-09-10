import "./intro.css";
import PageMeta from "../PageMeta/PageMeta";
import Metrics from "../Metrics/Metrics";
import HoverFill from "../HoverFill/HoverFill";

function Intro() {

  // Dynamically update years of experiences
  const start = new Date("2020-01-01");
  const now = new Date();

  const totalMonths =
    (now.getFullYear() - start.getFullYear()) * 12 +
    now.getMonth() - start.getMonth();

  const experience = `${Math.floor(totalMonths / 12)} years and ${
    totalMonths % 12
  } months`;


  return (
    <section className="intro">
      {/* TOP */}
      <div className="intro__top">
        <PageMeta
          number="0.0"
          label="introducing"
        />
      </div>

      {/* MAIN */}
      <div className="intro__main">
        <div className="intro__left">
          <h2>Bridging design & <HoverFill>Technology</HoverFill></h2>
        </div>

        <div className="intro__right">
          <p>
            Hey! I'm a Senior DevOps Engineer with {experience} years of experience designing and automating end-to-end software delivery pipelines across AWS, Azure,
            and hybrid cloud platforms. Proven expertise in building CI/CD pipelines (Jenkins, GitHub Actions, GitLab), integrating SonarQube for automated
            code quality checks, and deploying secure applications using Let's Encrypt (TLS/HTTPS). Certified in Terraform with strong skills in Docker,
            Kubernetes, and GitOps practices to drive scalable, resilient infrastructure. Experienced in observability tools (Prometheus, Grafana,
            OpenTelemetry), enabling 99.9% uptime and reducing release cycles. Passionate about building future-ready infrastructure that is automated,
            secure, and cost-efficient.
          </p>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="intro__bottom">
        <div className="intro__metrics">
          <Metrics />
        </div>

        <span className="intro__scroll">
          Scroll ↓
        </span>
      </div>
    </section>
  );
}

export default Intro;
