// certifications.js

export const certifications = [
  {
    title: "LFS169: Introduction to GitOps",
    image: "assets/img/gitops.png",  // Local path to image
    link: "https://www.credly.com/badges/697ce02f-ad98-487b-94bc-7aeb55716b21",
    credentialId: "697ce02f-ad98-487b-94bc-7aeb55716b21",
    issuedDate: "Issued Aug 2025",
  },
  {
    title: "LFS148: Getting Started with OpenTelemetry",
    image: "assets/img/opentelemetry.png",  // Local path to image
    link: "https://www.credly.com/badges/f98e3c3d-92a6-4ead-ae1d-9587f4a1f877",
    credentialId: "f98e3c3d-92a6-4ead-ae1d-9587f4a1f877",
    issuedDate: "Issued Aug 2025",
  },
  {
    title: "Certified Kubernetes Administrator (CKA)",
    image: "assets/img/terraform.png",  // Local path to image
    link: "https://www.credly.com/badges/2c05e1f8-8dbe-478e-8737-e24e50380d62",
    credentialId: "2c05e1f8-8dbe-478e-8737-e24e50380d62",
    issuedDate: "Issued Aug 2025 · Expires Aug 2027",
  },
  {
    title: "HashiCorp Certified: Terraform Associate (003)",
    image: "assets/img/terraform.png",  // Local path to image
    link: "https://www.credly.com/badges/2c05e1f8-8dbe-478e-8737-e24e50380d62",
    credentialId: "2c05e1f8-8dbe-478e-8737-e24e50380d62",
    issuedDate: "Issued Aug 2025 · Expires Aug 2027",
  }
];

// Function to generate HTML for each certification
const generateCertificationHTML = (cert) => {
  return `
    <div class="certification-item">
      <img src="${cert.image}" alt="${cert.title}" class="certification-image" />
      <div class="certification-details">
        <h3 class="certification-title">${cert.title}</h3>
        <p class="certification-date">${cert.issuedDate}</p>
        <p class="certification-id">
          Credential ID: <code>${cert.credentialId}</code>
        </p>
        <a href="${cert.link}" target="_blank" rel="noopener noreferrer" class="verify-link">Verify Badge</a>
      </div>
    </div>
  `;
};

// Function to render certifications
export const renderCertifications = () => {
  const container = document.getElementById('certifications-container');
  if (!container) {
    console.error('Certifications container not found');
    return;
  }

  // Clear previous content if any (optional)
  container.innerHTML = '';

  certifications.forEach(cert => {
    // Generate HTML for each certification
    const certHTML = generateCertificationHTML(cert);

    // Append the HTML to the container
    container.innerHTML += certHTML;
  });
};

// Automatically render certifications when this script is loaded
renderCertifications();
