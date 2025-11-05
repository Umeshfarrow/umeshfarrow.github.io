// projects.js

export const projects = [
  {
    title: "Aicon",
    role: "Senior DevOps Engineer",
    description:
      "A smart port logistics platform optimizing terminal operations by automating container yard management, fleet dispatch, and berth scheduling. This platform improves real-time coordination between port activities, reducing turnaround time and operational costs.",
    technologies: [
      "Kubernetes",
      "Jenkins (CI/CD)",
      "GitHub",
      "Docker",
      "Azure",
      "Kafka",
      "AKHQ",
      "MongoDB",
    ],
  },
  {
    title: "Enliven",
    role: "Senior DevOps Engineer",
    description:
      "A KYC and document processing platform focused on secure, scalable identity verification. Managed backend infrastructure ensuring high availability and performance.",
    technologies: [
      "Kubernetes",
      "MySQL",
      "GitLab CI/CD",
      "Nginx",
      "Ingress",
      "Orange Cloud",
      "Azure",
      "Let’s Encrypt",
      "Docker",
    ],
  },
  {
    title: "Learning Cloud",
    role: "DevOps Engineer",
    description:
      "Browser-based online coding IDE platform serving 100,000+ concurrent users. Managed containerized infrastructure and implemented CI/CD pipelines with autoscaling.",
    technologies: [
      "Docker",
      "Jenkins",
      "Docker Swarm",
      "Git",
      "Azure",
      "MongoDB",
    ],
  },
  {
    title: "Petzy",
    role: "DevOps Engineer",
    description:
      "US-based pet healthcare platform offering digital vet consultations and care management. Set up complete DevOps lifecycle including infrastructure provisioning, deployment automation, and monitoring.",
    technologies: [
      "Git",
      "Jenkins",
      "Docker Swarm",
      "MongoDB",
      "Nginx",
      "Bash",
      "Kubernetes",
      "Docker",
      "GitLab",
    ],
  },
];

export function renderProjects() {
  const wrapper = document.getElementById('projects-wrapper');
  if (!wrapper) return;

  wrapper.innerHTML = ''; // Clear previous content

  projects.forEach((project) => {
    const container = document.createElement('div');

    container.innerHTML = `
      <h3>${project.title} | ${project.role}</h3>
      <p>${project.description}</p>
      <p>${project.technologies.join(' · ')}</p>
    `;

    wrapper.appendChild(container);
  });
}

