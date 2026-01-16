export function startTypingEffect({
  elementId = 'typing-role',
  texts = [],
  typingSpeed = 100,
  erasingSpeed = 50,
  delayBetweenTexts = 2000
} = {}) {
  const typingElement = document.getElementById(elementId);
  if (!typingElement || !texts.length) return;

  let textIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < texts[textIndex].length) {
      typingElement.textContent += texts[textIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      // setTimeout(erase, delayBetweenTexts);
      setTimeout(delayBetweenTexts);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typingElement.textContent = texts[textIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(type, typingSpeed);
    }
  }

  type();
}

window.startTypingEffect = startTypingEffect;