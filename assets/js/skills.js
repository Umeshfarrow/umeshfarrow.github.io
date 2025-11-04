// skills.js

export const skills = [
  {
    category: "CI/CD Tools",
    items: ["Git", "Jenkins", "SonarQube", "Azure DevOps", "GitHub Actions", "GitLab CI/CD"]
  },
  {
    category: "Containers & Orchestration",
    items: ["Docker", "Docker Compose", "Docker Swarm", "Kubernetes", "Helm"]
  },
  {
    category: "Cloud Platforms",
    items: ["AWS", "Azure", "Orange Cloud"]
  },
  {
    category: "DevOps Tools",
    items: ["Nginx", "Apache", "Tomcat"]
  },
  {
    category: "Infrastructure as Code (IaC)",
    items: ["Terraform", "Helm"]
  },
  {
    category: "Monitoring & Observability",
    items: ["Prometheus", "Grafana", "Zabbix", "OpenTelemetry"]
  },
  {
    category: "Streaming & Queueing Systems",
    items: ["Kafka", "AKHQ", "MongoDB", "RabbitMQ"]
  },
  {
    category: "Operating Systems",
    items: ["Linux (Ubuntu, Mint, Parrot OS)", "Windows (7/10/11/Server)"]
  },
  {
    category: "Hypervisors",
    items: ["VirtualBox", "Hyper-V", "VMware"]
  },
  {
    category: "Programming & Scripting",
    items: ["Bash", "Python"]
  }
];

// Function to render skills dynamically
export const renderSkills = () => {
  const container = document.getElementById("skills-container");
  if (!container) {
    console.error('Skills container not found');
    return;
  }

  container.innerHTML = ""; // clear old content

  skills.forEach(skill => {
    const row = document.createElement("div");
    row.classList.add("skill-row");

    row.innerHTML = `
      <span class="skill-label">[${skill.category}]:</span>
      <span class="skill-value">${skill.items.join(", ")}</span>
    `;

    container.appendChild(row);
  });
}

// Render when DOM is ready
renderSkills();
