import "./Skills.css";
import PageMeta from "../PageMeta/PageMeta";

const skillGroups = [
  {
    name: "CI/CD",
    items: "Jenkins · GitHub Actions · GitLab CI/CD · Azure DevOps · SonarQube",
  },
  {
    name: "Cloud Platforms",
    items: "AWS · Azure · Orange Cloud",
  },
  {
    name: "Containers & Orchestration",
    items: "Docker · Kubernetes · Helm",
  },
  {
    name: "Infrastructure as Code",
    items: "Terraform (Certified) · Ansible",
  },
  {
    name: "Monitoring & Observability",
    items: "Prometheus · Grafana · OpenTelemetry · Zabbix",
  },
  {
    name: "Streaming & Messaging",
    items: "Kafka · RabbitMQ · MongoDB",
  },
  {
    name: "Scripting & Automation",
    items: "Bash · Python",
  },
];

const certifications = [
  {
    name: "HashiCorp Certified: Terraform Associate (003)",
    issuer: "HashiCorp",
    meta: "Issued Aug 2025 · Expires Aug 2027",
  },
  {
    name: "LFS169: Introduction to GitOps",
    issuer: "Linux Foundation",
    meta: "Issued Aug 2025 · Argo CD · Flux V2 · Deployment Automation",
  },
  {
    name: "LFS148: Getting Started with OpenTelemetry",
    issuer: "Linux Foundation",
    meta: "Issued Aug 2025 · Observability · Prometheus · Distributed Tracing",
  },
];

function Skills() {
  return (
    <section className="skills">
      {/* PAGE HEADER */}
      <div className="skills__top">
        <PageMeta number="0.1" label="skills" />
      </div>

      {/* MAIN */}
      <div className="skills__main">
        {/* SECTION TITLE */}
        <div className="skills__heading">
          <h2>Skills_&_credentials</h2>
        </div>

        {/* SKILLS GRID */}
        <div className="skills__grid">
          {skillGroups.map((group) => (
            <div className="skills__cell" key={group.name}>
              <span className="skills__label">{group.name}</span>
              <span className="skills__items">{group.items}</span>
            </div>
          ))}
        </div>

        {/* CERTIFICATIONS */}
        <div className="skills__certs">
          <span className="skills__certs-title">Certifications</span>

          {certifications.map((cert) => (
            <div className="skills__cert" key={cert.name}>
              <span className="skills__cert-name">{cert.name}</span>
              <span className="skills__cert-meta">
                {cert.issuer} · {cert.meta}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;