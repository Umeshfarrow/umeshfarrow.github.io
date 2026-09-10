import "./Work.css";
import PageMeta from "../PageMeta/PageMeta";
import HoverFill from "../HoverFill/HoverFill";

const works = [
  {
    number: "0.2.3",
    organization: "Avlino",
    org_desc:
      "Transforming Container Terminals: Dynamic Operations - Intent-Driven Solutions.",
    location: "Bengaluru",
    designation: "Senior DevOps engineer",
    year: "Oct-2024 → Present",
    linkedin: "https://www.linkedin.com/company/avlinoinc/",
    contribution: [
      "Led DevOps initiatives for AI/ML product lines, ensuring 99.5% uptime and scalable cloud-native applications across cloud environments.",
      "Implemented CI/CD pipelines in Jenkins with SonarQube integration, reducing release cycle time from weekly to daily and cutting deployment errors by 30%.",
      "Standardized infrastructure with Kubernetes, Docker, Helm, and Terraform, improving environment consistency and reducing provisioning time by 40%.",
      "Built observability stack using Prometheus and Grafana, reducing mean time to resolution by 35% through real-time monitoring and alerting.",
      "Collaborated with developers and data scientists to enhance workflows, security, and compliance, improving release confidence and delivery speed.",
    ],
  },
  {
    number: "0.2.2",
    organization: "Teleperformance (Majorel India)",
    org_desc: "Global customer experience and business services.",
    location: "Bengaluru",
    designation: "Senior DevOps engineer",
    year: "Sep-2021 → Sep-2024",
    linkedin: "https://www.linkedin.com/company/majorel-global",
    contribution: [
      "Delivered DevOps solutions for global customer experience platforms, ensuring 24/7 uptime and secure cloud operations supporting millions of users.",
      "Designed and optimized CI/CD pipelines across microservices, reducing deployment risks and accelerating release frequency by 40%.",
      "Managed Kubernetes clusters and automated infrastructure provisioning, cutting environment setup time by 50%.",
      "Implemented centralized monitoring and logging using Zabbix, reducing incident alerting via MS Teams and response time by 30%.",
      "Partnered with cross-functional teams to optimize multi-cloud deployments (AWS/Orange Cloud), achieving 15% infrastructure cost savings.",
    ],
  },
  {
    number: "0.2.1",
    organization: "Pratian Technologies (India) Pvt Ltd",
    org_desc:
      "A Digital Business Ecosystem powered by Deep Tech and Creativity.",
    location: "Bengaluru",
    designation: "DevOps engineer",
    year: "Jan-2020 → Sep-2021",
    linkedin:
      "https://www.linkedin.com/company/pratian-technologies-india-pvt-ltd",
    contribution: [
      "Built and maintained CI/CD pipelines with Jenkins, integrating SonarQube for automated code checks, reducing deployment errors by 25% and enabling bi-weekly secure releases.",
      "Delivered applications over HTTPS/TLS using Let's Encrypt, improving platform security compliance and increasing customer trust.",
      "Implemented monitoring with Prometheus and Grafana, improving visibility and reducing release risks, cutting downtime by 20%.",
      "Proactively self-learned Kubernetes and advocated its adoption, initiating discussions on scaling, containerization, and future-ready infrastructure.",
    ],
  },
];

function Work() {
  return (
    <section className="work">

      {/* PAGE HEADER */}
      <div className="work__top">
        <PageMeta number="0.2" label="work" />
      </div>

      {/* MAIN */}
      <div className="work__main">

        {/* SECTION TITLE */}
        <div className="work__heading">
          <h2>Experience_log</h2>
        </div>

        {/* EXPERIENCE LIST */}
        <div className="work__list">

          {works.map((work) => (
            <article className="work__item" key={work.number}>

              {/* EXPERIENCE HEADER */}
              <div className="work__header">

                {/* NUMBER */}
                <span className="work__number">
                  {work.number}
                </span>

                {/* DESIGNATION */}
                <span className="work__designation">
                  {work.designation}
                </span>

                {/* RIGHT META */}
                <div className="work__meta-right">

                  <span className="work__location">
                    {work.location}
                  </span>

                  <span className="work__separator">
                    *
                  </span>

                  <span className="work__years">
                    {work.year}
                  </span>

                  {(work.year.includes("Current") || work.year.includes("Present")) && (
                    <span
                      className="work__status-dot"
                      role="img"
                      aria-label="Current position"
                    />
                  )}

                </div>

              </div>


              {/* COMPANY DESCRIPTION */}
              <div className="work__company">

<a
                  className="work__org"
                  href={work.linkedin}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  referrerPolicy="no-referrer"
                >
                  <HoverFill>{work.organization} ↗</HoverFill>
                </a>

                <span className="work__org-separator">
                  -
                </span>

                <span className="work__org-desc">
                  {work.org_desc}
                </span>

              </div>


              {/* CONTRIBUTIONS */}
              <div className="work__contribution">

                {work.contribution.map((item, index) => (
                  <p key={index}>
                    {item}
                  </p>
                ))}

              </div>

            </article>
          ))}

        </div>
      </div>

      {/* IN-PAGE SCROLL */}
      <div className="work__scroll">
        <span>Scroll ↓</span>
      </div>

    </section>
  );
}

export default Work;