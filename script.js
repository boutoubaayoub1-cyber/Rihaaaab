const heart = document.getElementById("heart");
const decorations = document.getElementById("decorations");

const W = window.innerWidth;
const H = window.innerHeight;
const scale = Math.min(W * 0.43, H * 0.32);
const cx = W / 2;
const cy = H * 0.45;

const words = [];
const outlineCount = 64;

function heartPoint(t) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y =
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t);

  return {
    x: cx + (x / 17) * scale,
    y: cy - (y / 17) * scale
  };
}

function addWord(x, y) {
  const el = document.createElement("span");
  el.className = "word";
  el.textContent = "I love you";
  el.style.left = x + "px";
  el.style.top = y + "px";
  heart.appendChild(el);
  words.push(el);
}

// First, draw the outline of the heart.
for (let i = 0; i < outlineCount; i++) {
  const p = heartPoint(
    (2 * Math.PI * i) / outlineCount
  );
  addWord(p.x, p.y);
}

// Calculate the inside of the heart.
const boundary = [];

for (let i = 0; i < 1200; i++) {
  boundary.push(
    heartPoint((2 * Math.PI * i) / 1200)
  );
}

const minY = Math.min(...boundary.map(p => p.y));
const maxY = Math.max(...boundary.map(p => p.y));
const inside = [];

for (let y = minY + 15; y < maxY - 12; y += 17) {
  const intersections = [];

  for (let i = 0; i < boundary.length; i++) {
    const a = boundary[i];
    const b = boundary[(i + 1) % boundary.length];

    if (
      (a.y <= y && b.y > y) ||
      (b.y <= y && a.y > y)
    ) {
      const x =
        a.x + ((y - a.y) * (b.x - a.x)) / (b.y - a.y);

      intersections.push(x);
    }
  }

  intersections.sort((a, b) => a - b);

  if (intersections.length >= 2) {
    const left = intersections[0] + 17;
    const right = intersections[intersections.length - 1] - 17;

    for (let x = left; x < right; x += 56) {
      inside.push({ x, y });
    }
  }
}

// Reveal the words inside, row by row.
inside.forEach(p => addWord(p.x, p.y));

// Animate the gradual reveal and the white light.
const start = performance.now();
const outlineDelay = 55;
const insideStart = outlineCount * outlineDelay + 250;
const insideDelay = 28;

const formationTime =
  insideStart + inside.length * insideDelay + 300;

const lightSpeed = 32;
const cycleDuration = words.length * lightSpeed;

function animate(now) {
  const elapsed = now - start;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    const appearAt =
      i < outlineCount
        ? i * outlineDelay
        : insideStart + (i - outlineCount) * insideDelay;

    if (elapsed < appearAt) {
      continue;
    }

    word.style.opacity = "1";

    if (elapsed < formationTime) {
      continue;
    }

    const position =
      ((elapsed - formationTime) % cycleDuration) / lightSpeed;

    const distance = Math.abs(i - position);
    const circularDistance = Math.min(
      distance,
      words.length - distance
    );

    const glow = Math.max(0, 1 - circularDistance / 4);

    if (glow > 0) {
      word.style.color =
        `rgb(255, ${Math.round(69 + glow * 186)}, ${Math.round(104 + glow * 151)})`;

      word.style.textShadow =
        `0 0 ${5 + glow * 14}px rgba(255,255,255,${glow})`;
    } else {
      word.style.color = "#ff4568";
      word.style.textShadow =
        "0 0 5px rgba(255,35,85,0.6)";
    }
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// Floating hearts.
for (let i = 0; i < 14; i++) {
  const particle = document.createElement("span");
  particle.className = "particle";
  particle.textContent = Math.random() > 0.5 ? "♥" : "♡";
  particle.style.left = Math.random() * 100 + "%";
  particle.style.fontSize = 10 + Math.random() * 12 + "px";
  particle.style.animationDuration = 8 + Math.random() * 8 + "s";
  particle.style.animationDelay = -(Math.random() * 15) + "s";
  decorations.appendChild(particle);
}

// Twinkling stars.
for (let i = 0; i < 20; i++) {
  const star = document.createElement("span");
  star.className = "sparkle";
  star.textContent = "✦";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.fontSize = 8 + Math.random() * 8 + "px";
  star.style.animationDuration = 1.5 + Math.random() * 2 + "s";
  star.style.animationDelay = Math.random() * 3 + "s";
  decorations.appendChild(star);
}
