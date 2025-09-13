const canvas = document.getElementById('matrix-canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';

const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width / fontSize;

const rainDrops = [];

for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
}

const draw = () => {
    context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#0F0';
    context.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

setInterval(draw, 30);

document.addEventListener('DOMContentLoaded', () => {
    // --- Typing animation (existing code) ---
    const nameElement = document.getElementById('name');
    const nameText = "Joaquim Silva";
    if (nameElement) {
        function typeWriter(text, i) {
            if (i < text.length) {
                nameElement.innerHTML = text.substring(0, i + 1);
                setTimeout(() => typeWriter(text, i + 1), 150);
            } else {
                setTimeout(erase, 20000);
            }
        }

        function erase() {
            let text = nameElement.innerHTML;
            let i = text.length;
            if (i > 0) {
                nameElement.innerHTML = text.substring(0, i - 1);
                setTimeout(erase, 100);
            } else {
                setTimeout(() => typeWriter(nameText, 0), 500);
            }
        }
        typeWriter(nameText, 0);
    }
});