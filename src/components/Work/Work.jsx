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
    year: "Sept-2024 → Current",
    linkedin: "https://www.linkedin.com/company/avlinoinc/",
    contribution: [
      "Led DevOps initiatives for AI/ML product lines, ensuring 99.5% uptime and scalable cloud-native applications across cloud environments.",
      "Implemented CI/CD pipelines in Jenkins with SonarQube integration, reducing release cycle time from weekly to daily and cutting deployment errors by 30%.",
      "Standardized infrastructure with Kubernetes, Docker, Helm, and Terraform, improving environment consistency and reducing provisioning time by 40%.",
      "Collaborated with developers and data scientists to enhance workflows, security, and compliance, improving release confidence and delivery speed.",
    ],
  },
  {
    number: "0.2.2",
    organization: "Majorel - (Teleperformance)",
    org_desc: "Outsourcing and Offshoring Consulting.",
    location: "Bengaluru",
    designation: "Senior DevOps engineer",
    year: "Nov-2021 → Sept-2023",
    linkedin: "https://www.linkedin.com/company/majorel-global",
    contribution: [
      "Delivered DevOps solutions for global customer experience platforms, ensuring 24/7 uptime and secure cloud operations.",
      "Designed and maintained CI/CD pipelines across microservice-based applications, reducing deployment risks and accelerating delivery.",
      "Implemented centralized monitoring and logging with Zabbix, improving incident detection and resolution.",
      "Collaborated with cross-functional teams to enhance scalability, reduce cloud costs, and support seamless releases in multi-cloud setups (AWS/Orange cloud).",
    ],
  },
  {
    number: "0.2.1",
    organization: "PRATIAN Technologies (India) Private Limited",
    org_desc:
      "A Digital Business Ecosystem​ powered by Deep Tech and Creativity.",
    location: "Bengaluru",
    designation: "DevOps engineer",
    year: "Nov-2020 → Sept-2021",
    linkedin:
      "https://www.linkedin.com/company/pratian-technologies-india-pvt-ltd",
    contribution: [
      "Built and maintained CI/CD pipelines with Jenkins, integrating SonarQube for automated code quality checks to ensure secure and reliable deployments.",
      "Delivered applications over HTTPS/TLS using Let’s Encrypt, enabling faster, secure releases across Azure and AWS environments.",
      "Deployed Prometheus and Grafana to monitor performance and availability, improving visibility and reducing release risks.",
      "Proactively self-learned Kubernetes and suggested its adoption, driving discussions on scaling, containerization, and future-ready infrastructure.",
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
                <span className="works_number">
                  {work.number}
                </span>

                {/* DESIGNATION */}
                <span className="works_designation">
                  {work.designation}
                </span>

                {/* RIGHT META */}
                <div className="works_meta_right">

                  <span className="works_location">
                    {work.location}
                  </span>

                  <span className="works_separator">
                    *
                  </span>

                  <span className="works_years">
                    {work.year}
                  </span>

                  {work.year.includes("Current") && (
                    <>
                      <span
                        className="works_status_dot"
                        aria-label="Current position"
                      />
                    </>
                  )}

                </div>

              </div>


              {/* COMPANY DESCRIPTION */}
              <div className="work__company">

                <a
                  className="works_org"
                  href={work.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <HoverFill>{work.organization} ↗</HoverFill>
                </a>

                <span className="works_org_separator">
                  -
                </span>

                <span className="works_org_desc">
                  {work.org_desc}
                </span>

              </div>


              {/* CONTRIBUTIONS */}
              <div className="works_contribution">

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