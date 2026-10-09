alert("JavaScript works!");
const heart = document.getElementById("heart");
const decorations = document.getElementById("decorations");

const W = window.innerWidth;
const H = window.innerHeight;
const cx = W / 2;
const cy = H * 0.44;
const scale = Math.min(W * 0.43, H * 0.34);

const words = [];

function addWord(x, y) {
  const el = document.createElement("span");
  el.className = "word";
  el.textContent = "I love you";
  el.style.left = x + "px";
  el.style.top = y + "px";
  heart.appendChild(el);
  words.push(el);
}

// Create the heart outline
const outlineCount = 65;

for (let i = 0; i < outlineCount; i++) {
  const t = (2 * Math.PI * i) / outlineCount;

  const x = 16 * Math.pow(Math.sin(t), 3);
  const y =
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t);

  addWord(cx + (x / 17) * scale, cy - (y / 17) * scale);
}

// Fill the inside of the heart
const inside = [];

for (let y = -0.9; y <= 0.95; y += 0.14) {
  for (let x = -0.95; x <= 0.95; x += 0.18) {
    const equation =
      Math.pow(x * x + y * y - 1, 3) -
      x * x * Math.pow(y, 3);

    if (equation <= -0.02) {
      inside.push({ x, y });
    }
  }
}

// Reveal the inside gradually
inside.forEach((p) => {
  addWord(cx + p.x * scale, cy - p.y * scale);
});

// Reveal outline first, then the inside
const outlineDelay = 65;
const insideStart = outlineCount * outlineDelay + 250;
const insideDelay = 38;
const start = performance.now();

const formationTime =
  insideStart + inside.length * insideDelay + 500;

function animate(now) {
  const elapsed = now - start;

  words.forEach((word, i) => {
    const appearAt =
      i < outlineCount
        ? i * outlineDelay
        : insideStart + (i - outlineCount) * insideDelay;

    if (elapsed >= appearAt) {
      word.style.opacity = "1";
    }

    if (elapsed >= formationTime && elapsed >= appearAt) {
      const cycleDuration = words.length * 32;
      const cyclePosition =
        ((elapsed - formationTime) % cycleDuration) / 32;

      const distance = Math.abs(i - cyclePosition);
      const circularDistance = Math.min(
        distance,
        words.length - distance
      );

      const glow = Math.max(0, 1 - circularDistance / 4);

      if (glow > 0) {
        word.style.color = `rgb(255, ${Math.round(
          71 + glow * 184
        )}, ${Math.round(120 + glow * 135)})`;

        word.style.textShadow =
          `0 0 ${5 + glow * 14}px rgba(255,255,255,${glow})`;
      } else {
        word.style.color = "#ff4778";
        word.style.textShadow =
          "0 0 6px rgba(255,45,110,.7)";
      }
    }
  });

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// Floating hearts
for (let i = 0; i < 14; i++) {
  const particle = document.createElement("span");

  particle.className = "particle";
  particle.textContent = Math.random() > 0.5 ? "♥" : "♡";
  particle.style.left = Math.random() * 100 + "%";
  particle.style.fontSize = 10 + Math.random() * 14 + "px";
  particle.style.animationDuration = 7 + Math.random() * 9 + "s";
  particle.style.animationDelay = -Math.random() * 15 + "s";

  decorations.appendChild(particle);
}

// Sparkles
for (let i = 0; i < 22; i++) {
  const star = document.createElement("span");

  star.className = "sparkle";
  star.textContent = "✦";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.animationDelay = Math.random() * 3 + "s";
  star.style.animationDuration = 1.5 + Math.random() * 2 + "s";

  decorations.appendChild(star);
}
