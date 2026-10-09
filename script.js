
const heart = document.getElementById("heart");
const decorations = document.getElementById("decorations");

heart.innerHTML = "";

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
  const el = document.createElement("span");
  el.className = "word";
  el.textContent = "I love you";
  el.style.left = x + "px";
  el.style.top = y + "px";
  heart.appendChild(el);
  words.push(el);
}

// حدود القلب
const outlineCount = 42;

for (let i = 0; i < outlineCount; i++) {
  const p = point(2 * Math.PI * (i + 0.5) / outlineCount);
  addWord(p.x, p.y);
}

// حساب داخل القلب
const boundary = [];
