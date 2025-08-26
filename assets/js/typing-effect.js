const text = "Building scalable infrastructure, one pipeline at a time...";
let i = 0;
const speed = 60;
const typingTarget = document.getElementById("typing-text");

function typeWriter() {
  if (i < text.length) {
    typingTarget.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
typeWriter();
