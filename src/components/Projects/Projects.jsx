import "./Projects.css";
import PageMeta from "../PageMeta/PageMeta";
import { playScroll } from "../../lib/sound";

const projects = [
  {
    number: "0.3.1",
    name: "Aicon",
    role: "Senior DevOps Engineer",
    period: "Oct-2024 → Present",
    description:
      "Container terminal operations and logistics face inefficiencies, limited visibility, and unpredictable cargo movement, leading to delays and higher costs. Data-driven optimization and coordinated planning across yard, equipment, and berth operations give terminals better control, reduce unnecessary moves, improve asset utilization, and lower operational costs while improving overall performance.",
    stack:
      "Kubernetes · Helm · Jenkins · GitHub · Docker · Azure · Kafka · AKHQ · MongoDB · Terraform",
  },
  {
    number: "0.3.2",
    name: "Enliven",
    role: "Senior DevOps Engineer",
    period: "Sep-2021 → Sep-2024",
    description:
      "Leverages big data and analytics to improve customer experience by gaining real-time insights into customer behavior, preferences, and service performance. This enables more personalized interactions, faster issue resolution, and data-driven decisions that enhance service quality, efficiency, and customer satisfaction.",
    stack:
      "Kubernetes · Helm · MySQL · GitLab CI/CD · Nginx · Ingress · AWS · Orange Cloud · Azure · Let's Encrypt · Docker · Terraform",
  },
  {
    number: "0.3.3",
    name: "Learning Cloud",
    role: "DevOps Engineer",
    period: "Feb-2021 → Sep-2021",
    description:
      "Uses data and analytics to improve online learning experiences by analyzing learner behavior, engagement, and performance. These insights help personalize learning paths, optimize course content, and enhance platform effectiveness, enabling better outcomes for learners and educators worldwide.",
    stack:
      "AWS · Azure · Docker · Jenkins · Docker Swarm · Git · MongoDB · Kubernetes · Helm",
  },
  {
    number: "0.3.4",
    name: "Petzy",
    role: "DevOps Engineer",
    period: "Jan-2020 → Sep-2021",
    description:
      "End-to-end DevOps life cycle for a US-based pet healthcare platform, including infrastructure provisioning, deployment automation, and monitoring. Ensured high availability for digital vet consultations and medical records, improving platform reliability and user satisfaction.",
    stack:
      "AWS · Azure · Git · Jenkins · Docker Swarm · MongoDB · Nginx · Bash · Kubernetes · GitLab",
  },
];

function Projects() {
  const activeCount = projects.filter((project) =>
    project.period.includes("Present")
  ).length;

  return (
    <section className="projects">
      {/* PAGE HEADER */}
      <div className="projects__top">
        <PageMeta number="0.3" label="projects" />
      </div>

      {/* MAIN */}
      <div className="projects__main">
        {/* SECTION TITLE */}
        <div className="projects__heading">
          <h2>Project_log</h2>

          <span className="projects__total">
            {String(projects.length).padStart(2, "0")} shipments ·{" "}
            {activeCount} live
          </span>
        </div>

        {/* CARGO MANIFEST CARDS */}
        <div className="projects__list">
          {projects.map((project) => {
            const status = project.period.includes("Present")
              ? "active"
              : "archived";

            return (
              <article
                className="projects__item"
                key={project.number}
                onMouseEnter={playScroll}
              >
                <div className="projects__header">
                  <span className="projects__number">{project.number}</span>

                  <h3 className="projects__name">{project.name}</h3>

                  <span
                    className={`projects__status projects__status--${status}`}
                  >
                    <span className="projects__status-dot" aria-hidden="true" />
                    {status}
                  </span>
                </div>

                <div className="projects__meta">
                  <span className="projects__meta-key">role</span>
                  <span className="projects__meta-value">{project.role}</span>

                  <span className="projects__meta-sep" aria-hidden="true">
                    *
                  </span>

                  <span className="projects__meta-key">period</span>
                  <span className="projects__meta-value">{project.period}</span>
                </div>

                <p className="projects__desc">{project.description}</p>

                <div className="projects__stack">
                  <span className="projects__stack-label">stack</span>

                  <div className="projects__tags">
                    {project.stack.split(" · ").map((tech) => (
                      <span className="projects__tag" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Projects;