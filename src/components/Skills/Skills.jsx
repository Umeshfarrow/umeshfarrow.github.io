import "./Skills.css";
import PageMeta from "../PageMeta/PageMeta";

const stacks = [
  {
    number: "01",
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
    number: "02",
    name: "Containers & Orchestration",
    tags: ["Docker", "Kubernetes", "Helm", "Docker Swarm", "Nginx", "Ingress"],
  },
  {
    number: "03",
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
    number: "04",
    name: "Infrastructure as Code",
    tags: ["Terraform", "Ansible"],
  },
  {
    number: "05",
    name: "Monitoring & Observability",
    tags: ["Prometheus", "Grafana", "OpenTelemetry", "Zabbix"],
  },
  {
    number: "06",
    name: "Streaming & Messaging",
    tags: ["Kafka", "AKHQ", "RabbitMQ", "MongoDB", "MySQL"],
  },
  {
    number: "07",
    name: "Scripting & Automation",
    tags: ["Bash", "Python", "Git"],
  },
];

const certifications = [
  {
    code: "TF-003",
    name: "HashiCorp Certified: Terraform Associate (003)",
    meta: "HashiCorp · Issued Aug 2025 · Expires Aug 2027",
  },
  {
    code: "LFS169",
    name: "LFS169: Introduction to GitOps",
    meta: "Linux Foundation · Issued Aug 2025 · Argo CD · Flux V2 · Deployment Automation",
  },
  {
    code: "LFS148",
    name: "LFS148: Getting Started with OpenTelemetry",
    meta: "Linux Foundation · Issued Aug 2025 · Observability · Prometheus · Distributed Tracing",
  },
];

const totalTags = stacks.reduce((sum, stack) => sum + stack.tags.length, 0);

function Skills() {
  return (
    <section className="skills">
      {/* PAGE HEADER */}
      <div className="skills__top">
        <PageMeta number="0.1" label="stack" />
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

        {/* THE RACK */}
        <div className="skills__table">
          {stacks.map((stack) => (
            <div className="skills__rack" key={stack.number}>
              <div className="skills__rack-label">
                <span className="skills__rack-name">
                  <span className="skills__rack-number">{stack.number}</span>
                  <span className="skills__rack-slash">/</span>
                  {stack.name}
                </span>

                <span className="skills__rack-count">
                  {String(stack.tags.length).padStart(2, "0")}
                </span>
              </div>

              <div className="skills__rack-tags">
                {stack.tags.map((tag) => (
                  <span className="skills__tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
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

          <div className="skills__certs-table">
            {certifications.map((cert, index) => (
              <div className="skills__cert" key={cert.code}>
                <span className="skills__cert-index">
                  CERT / {String(index + 1).padStart(2, "0")}
                </span>

                <span className="skills__cert-code">{cert.code}</span>

                <div className="skills__cert-body">
                  <span className="skills__cert-name">{cert.name}</span>
                  <span className="skills__cert-meta">{cert.meta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;