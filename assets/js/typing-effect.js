export function startTypingEffect({
  elementId = 'typing-role',
  texts = [],
  typingSpeed = 100,
} = {}) {
  const typingElement = document.getElementById(elementId);
  if (!typingElement || !texts.length) return;

  let charIndex = 0;

  function type() {
    if (charIndex < texts[0].length) {
      typingElement.textContent += texts[0].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    }
  }

  type();
}