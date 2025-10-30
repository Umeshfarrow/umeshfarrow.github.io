// experience.js
export const experienceData = [
  {
    company: "Avlino",
    website: "https://www.avlino.com",
    title: "Senior DevOps Engineer",
    location: "Bengaluru",
    duration: "Oct 2024 - Present",
    achievements: [
      "Led DevOps initiatives for AI/ML product lines, ensuring 70.5% uptime and scalable cloud-native applications across cloud environments.",
      "Implemented CI/CD pipelines in Jenkins with SonarQube integration, reducing release cycle time from weekly to daily and cutting deployment errors by 30%.",
      "Standardized infrastructure with Kubernetes, Docker, Helm, and Terraform, improving environment consistency and reducing provisioning time by 40%.",
      "Built observability stack using Prometheus and Grafana, reducing mean time to resolution by 35% through real-time monitoring and alerting.",
      "Collaborated with developers and data scientists to enhance workflows, security, and compliance, improving release confidence and delivery speed."
    ]
  },
  {
    company: "Teleperformance (Majorel India)",
    website: "https://www.teleperformance.com",
    title: "Senior DevOps Engineer",
    location: "Bengaluru",
    duration: "Sep 2021 - Sep 2024",
    achievements: [
      "Delivered DevOps solutions for global customer experience platforms, ensuring 24/7 uptime and secure cloud operations supporting millions of users.",
      "Designed and optimized CI/CD pipelines across microservices, reducing deployment risks and accelerating release frequency by 40%.",
      "Managed Kubernetes clusters and automated infrastructure provisioning, cutting environment setup time by 50%.",
      "Implemented centralized monitoring and logging using Zabbix, reducing incident alerting via MS Teams and response time by 30%."
    ]
  },
  {
    company: "Pratian Technologies (India) Pvt Ltd",
    website: "https://www.pratian.com",
    title: "DevOps Engineer",
    location: "Bengaluru",
    duration: "Jan 2020 - Sep 2021",
    achievements: [
      "Built and maintained CI/CD pipelines with Jenkins, integrating SonarQube for automated code checks, reducing deployment errors by 25% and enabling bi-weekly secure releases.",
      "Delivered applications over HTTPS/TLS using Let’s Encrypt, improving platform security compliance and increasing customer trust.",
      "Implemented monitoring with Prometheus and Grafana, improving visibility and reducing release risks, cutting downtime by 20%.",
      "Proactively self-learned Kubernetes and advocated its adoption, initiating discussions on scaling, containerization, and future-ready infrastructure."
    ]
  }
];


//  logic

export function renderExperience() {
  const wrapper = document.getElementById('experience-wrapper');
  if (!wrapper) return;

  wrapper.innerHTML = ''; // Clear previous content

  experienceData.forEach((item) => {
    const container = document.createElement("div");

    container.innerHTML = `
      <h3 class="text-xl font-semibold">
        <a href="${item.website}" target="_blank" rel="noopener noreferrer">${item.company}</a>
      </h3>
      <div class="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 gap-2">
        <span class="font-medium">${item.title}</span>
        <span>- ${item.location}</span>
        <span>| ${item.duration}</span>
      </div>
      <ul class="list-disc list-inside mt-2 space-y-1">
        ${item.achievements.map(point => `<li>${point}</li>`).join("")}
      </ul>
    `;

    wrapper.appendChild(container);
  });
}
