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
    meta: "HashiCorp · Issued Aug 2025 · Expires Aug 2027",
  },
  {
    number: "0.1.9",
    code: "LFS169",
    name: "LFS169: Introduction to GitOps",
    meta: "Linux Foundation · Issued Aug 2025 · Argo CD · Flux V2 · Deployment Automation",
  },
  {
    number: "0.1.10",
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

        {/* SYSTEM STATUS CONSOLE */}
        <div className="skills__console">
          {/* WINDOW CHROME */}
          <div className="skills__console-bar">
            <span className="skills__console-dots" aria-hidden="true">
              <span className="skills__console-dot skills__console-dot--busy" />
              <span className="skills__console-dot" />
              <span className="skills__console-dot" />
            </span>

            <span className="skills__console-title">
              system_status — umesh.s
            </span>

            <span className="skills__console-port">0.1 / tty</span>
          </div>

          {/* TERMINAL BODY */}
          <div className="skills__console-body">
            {stacks.map((stack) => (
              <div className="skills__line" key={stack.number}>
                <span className="skills__prompt">~/rack $</span>

                <span className="skills__path">
                  {stack.number}
                  <span className="skills__path-sep">/</span>
                  {stack.name}
                </span>

                <span className="skills__count">
                  +{String(stack.tags.length).padStart(2, "0")}
                </span>

                <span className="skills__tags">
                  {stack.tags.map((tag) => (
                    <span className="skills__tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </span>
              </div>
            ))}

            {/* CREDENTIALS GROUP */}
            <div className="skills__line skills__line--comment">
              <span className="skills__comment"># credentials</span>
            </div>

            {certifications.map((cert) => (
              <div className="skills__line" key={cert.code}>
                <span className="skills__prompt">~/rack $</span>

                <span className="skills__path">CERT / {cert.number}</span>

                <span className="skills__tag">{cert.code}</span>

                <span className="skills__name">{cert.name}</span>

                <span className="skills__cert-meta">{cert.meta}</span>
              </div>
            ))}

            {/* CURSOR TAIL */}
            <div className="skills__line skills__line--tail">
              <span className="skills__prompt">~/rack $</span>

              <span className="skills__cursor" aria-hidden="true">
                ▊
              </span>

              <span className="skills__tail-note">
                — {totalTags} tags · {certifications.length} certs on rack,
                ready.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;