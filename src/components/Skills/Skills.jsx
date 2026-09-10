import "./Skills.css";
import PageMeta from "../PageMeta/PageMeta";

const stacks = [
  {
    number: "0.1.1",
    name: "Cloud",
    tags: [
      "AWS EC2",
      "AWS EKS",
      "AWS S3",
      "AWS IAM",
      "AWS VPC",
      "Azure VM",
      "Azure AKS",
      "Azure Blob Storage",
      "Orange Cloud",
    ],
  },
  {
    number: "0.1.2",
    name: "Containers & Orchestration",
    tags: ["Docker", "Kubernetes", "Helm", "Docker Swarm", "Nginx", "Ingress"],
  },
  {
    number: "0.1.3",
    name: "CI/CD",
    tags: [
      "Jenkins",
      "GitHub Actions",
      "GitLab CI/CD",
      "Azure DevOps",
      "SonarQube",
    ],
  },
  {
    number: "0.1.4",
    name: "Infrastructure as Code",
    tags: ["Terraform", "Ansible"],
  },
  {
    number: "0.1.5",
    name: "Monitoring & Observability",
    tags: ["Prometheus", "Grafana", "OpenTelemetry", "Zabbix"],
  },
  {
    number: "0.1.6",
    name: "Streaming & Messaging",
    tags: ["Kafka", "AKHQ", "RabbitMQ", "MongoDB", "MySQL"],
  },
  {
    number: "0.1.7",
    name: "Scripting & Automation",
    tags: ["Bash", "Python", "Git"],
  },
];

const certifications = [
  {
    number: "0.1.8",
    code: "TF-003",
    name: "HashiCorp Certified: Terraform Associate (003)",
    issuer: "HashiCorp",
    issued: "Aug 2025",
    expires: "Aug 2027",
  },
  {
    number: "0.1.9",
    code: "LFS169",
    name: "LFS169: Introduction to GitOps",
    issuer: "Linux Foundation",
    issued: "Aug 2025",
    expires: "—",
    topics: "Argo CD · Flux V2 · Deployment Automation",
  },
  {
    number: "0.1.10",
    code: "LFS148",
    name: "LFS148: Getting Started with OpenTelemetry",
    issuer: "Linux Foundation",
    issued: "Aug 2025",
    expires: "—",
    topics: "Observability · Prometheus · Distributed Tracing",
  },
];

const totalTags = stacks.reduce((sum, stack) => sum + stack.tags.length, 0);

function Skills() {
  return (
    <section className="skills">
      {/* PAGE HEADER */}
      <div className="skills__top">
        <PageMeta number="0.1" label="status" />
      </div>

      {/* MAIN */}
      <div className="skills__main">
        {/* SECTION TITLE */}
        <div className="skills__heading">
          <h2>Stack_on_the_rack</h2>

          <span className="skills__total">
            {String(stacks.length).padStart(2, "0")} stacks / {totalTags} tags
          </span>
        </div>

        {/* STACK CARDS */}
        <div className="skills__grid">
          {stacks.map((stack) => (
            <article className="skills__card" key={stack.number}>
              <header className="skills__card-head">
                <span className="skills__card-number">{stack.number}</span>

                <h3 className="skills__card-name">{stack.name}</h3>

                <span className="skills__card-count">
                  +{String(stack.tags.length).padStart(2, "0")}
                </span>
              </header>

              <div className="skills__tags">
                {stack.tags.map((tag) => (
                  <span className="skills__tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* CREDENTIALS */}
        <div className="skills__certs">
          <div className="skills__certs-heading">
            <h3>Credentials</h3>

            <span className="skills__total">
              {String(certifications.length).padStart(2, "0")} certs
            </span>
          </div>

          <div className="skills__certs-list">
            {certifications.map((cert) => (
              <article className="skills__cert-card" key={cert.code}>
                {/* STAMP + NAME */}
                <div className="skills__cert-top">
                  <div className="skills__cert-stamp">
                    <span className="skills__cert-stamp-check" aria-hidden="true">
                      ✓
                    </span>
                    <span className="skills__cert-code">{cert.code}</span>
                  </div>

                  <div className="skills__cert-main">
                    <span className="skills__cert-index">{cert.number}</span>
                    <h4 className="skills__cert-name">{cert.name}</h4>
                  </div>
                </div>

                {/* PERFORATED STUB — FIELD DATA */}
                <div className="skills__cert-fields">
                  <div className="skills__cert-field">
                    <span className="skills__cert-key">issuer</span>
                    <span className="skills__cert-value">{cert.issuer}</span>
                  </div>

                  <div className="skills__cert-field">
                    <span className="skills__cert-key">issued</span>
                    <span className="skills__cert-value">{cert.issued}</span>
                  </div>

                  <div className="skills__cert-field">
                    <span className="skills__cert-key">valid thru</span>
                    <span className="skills__cert-value">{cert.expires}</span>
                  </div>

                  {cert.topics && (
                    <div className="skills__cert-field skills__cert-field--wide">
                      <span className="skills__cert-key">topics</span>
                      <span className="skills__cert-value">{cert.topics}</span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;