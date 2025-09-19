function loadComponent(url, placeholderId) {
    return fetch(url)
        .then(response => response.text())
        .then(data => {
            const placeholder = document.getElementById(placeholderId);
            if (placeholder) {
                if (placeholderId === 'head-placeholder') {
                    placeholder.outerHTML = data;
                } else {
                    placeholder.innerHTML = data;
                }
            }
        });
}

function initMatrixAnimation() {
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

    function animate() {
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

        requestAnimationFrame(animate);
    }

    animate();
}

document.addEventListener('DOMContentLoaded', () => {
    Promise.all([
        loadComponent('header.html', 'header-placeholder'),
        loadComponent('footer.html', 'footer-placeholder')
    ]).then(() => {
        initMatrixAnimation();

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

        // Carousel Logic
        const track = document.querySelector('.carousel-track');
        if (track) {
            const slides = Array.from(track.children);
            const nextButton = document.querySelector('.carousel-button.next');
            const prevButton = document.querySelector('.carousel-button.prev');
            const slideWidth = slides.length > 0 ? slides[0].getBoundingClientRect().width : 0;

            // Clone first and last slides
            const firstClone = slides[0].cloneNode(true);
            const lastClone = slides[slides.length - 1].cloneNode(true);

            firstClone.id = 'first-clone';
            lastClone.id = 'last-clone';

            track.appendChild(firstClone);
            track.insertBefore(lastClone, slides[0]);

            const allSlides = Array.from(track.children);

            // Initial position
            let currentIndex = 1;
            track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

            const moveToSlide = (index) => {
                track.style.transition = 'transform 0.5s ease-in-out';
                track.style.transform = `translateX(-${slideWidth * index}px)`;
                currentIndex = index;
            };

            track.addEventListener('transitionend', () => {
                if (allSlides[currentIndex].id === 'first-clone') {
                    track.style.transition = 'none';
                    currentIndex = 1;
                    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
                }

                if (allSlides[currentIndex].id === 'last-clone') {
                    track.style.transition = 'none';
                    currentIndex = allSlides.length - 2;
                    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
                }
            });

            // When I click left, move slides to the left
            prevButton.addEventListener('click', e => {
                moveToSlide(currentIndex - 1);
            });

            // When I click right, move slides to the right
            nextButton.addEventListener('click', e => {
                moveToSlide(currentIndex + 1);
            });

            // Autoplay
            setInterval(() => {
                moveToSlide(currentIndex + 1);
            }, 50000); // 50 seconds
        }
    });
});