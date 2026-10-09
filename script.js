const heart = document.getElementById(“heart”);
const decorations = document.getElementById(“decorations”);

const W = window.innerWidth;
const H = window.innerHeight;
const scale = Math.min(W / 36, H / 34, 10);
const cx = W / 2;
const cy = H / 2;

function point(t) {
return {
x: cx + 16 * Math.pow(Math.sin(t), 3) * scale,
y: cy - (
13 * Math.cos(t)
- 5 * Math.cos(2 * t)
- 2 * Math.cos(3 * t)
- Math.cos(4 * t)
) * scale
};
}

const words = [];

function addWord(x, y) {
const el = document.createElement(“span”);
el.className = “word”;
el.textContent = “I love you”;
el.style.left = x + “px”;
el.style.top = y + “px”;
heart.appendChild(el);
words.push(el);
}

const outlineCount = 42;

for (let i = 0; i < outlineCount; i++) {
const p = point(2 * Math.PI * (i + 0.5) / outlineCount);
addWord(p.x, p.y);
}

const boundary = [];

for (let i = 0; i < 1000; i++) {
boundary.push(point(2 * Math.PI * i / 1000));
}

const minY = Math.min(…boundary.map(p => p.y));
const maxY = Math.max(…boundary.map(p => p.y));
const inside = [];

for (let y = minY + 18; y < maxY - 15; y += 19) {
const hits = [];

for (let i = 0; i < boundary.length; i++) {
const a = boundary[i];
const b = boundary[(i + 1) % boundary.length];

if ((a.y <= y && b.y > y) || (b.y <= y && a.y > y)) {
  hits.push(a.x + (y - a.y) * (b.x - a.x) / (b.y - a.y));
}

}

hits.sort((a, b) => a - b);

if (hits.length >= 2) {
const left = hits[0] + 32;
const right = hits[hits.length - 1] - 32;

for (let x = left + 32; x < right; x += 64) {
  inside.push({ x, y });
}

}
}

inside.forEach(p => addWord(p.x, p.y));

const start = performance.now();
const outlineDelay = 75;
const insideStart = outlineCount * outlineDelay + 300;
const insideDelay = 35;
const formationTime = insideStart + inside.length * insideDelay;
const lightSpeed = 45;
const cycleDuration = Math.max(words.length * lightSpeed, 1000);

function animate(now) {
const elapsed = now - start;

words.forEach((word, i) => {
const appearAt = i < outlineCount
? i * outlineDelay
: insideStart + (i - outlineCount) * insideDelay;

if (elapsed >= appearAt) {
  word.style.opacity = "1";
}
if (elapsed >= formationTime && elapsed >= appearAt) {
  const cycleTime = (elapsed - formationTime) % cycleDuration;
  const position = cycleTime / lightSpeed;
  const distance = Math.abs(i - position);
  const circularDistance = Math.min(distance, words.length - distance);
  const glow = Math.max(0, 1 - circularDistance / 3);
  if (glow > 0) {
    word.style.color = `rgb(255, ${Math.round(69 + glow * 186)}, ${Math.round(104 + glow * 151)})`;
    word.style.textShadow = `0 0 ${4 + glow * 12}px rgba(255,255,255,${glow})`;
  } else {
    word.style.color = "#ff4568";
    word.style.textShadow = "0 0 5px rgba(255,35,85,.45)";
  }
}

});

requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

for (let i = 0; i < 12; i++) {
const particle = document.createElement(“span”);
particle.className = “particle”;
particle.textContent = Math.random() > .5 ? “♥” : “♡”;
particle.style.left = Math.random() * 100 + “%”;
particle.style.fontSize = (10 + Math.random() * 13) + “px”;
particle.style.animationDuration = (8 + Math.random() * 9) + “s”;
particle.style.animationDelay = (-Math.random() * 15) + “s”;
decorations.appendChild(particle);
}

for (let i = 0; i < 18; i++) {
const star = document.createElement(“span”);
star.className = “sparkle”;
star.textContent = “✦”;
star.style.left = Math.random() * 100 + “%”;
star.style.top = Math.random() * 100 + “%”;
star.style.animationDelay = Math.random() * 3 + “s”;
star.style.animationDuration = (1.5 + Math.random() * 2) + “s”;
decorations.appendChild(star);
}
