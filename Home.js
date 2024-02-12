// script.js

let currentIndex = 0;
let intervalId;

function showSlide(index) {
    const slides = document.querySelector('.carousel-slides');
    const indicators = document.querySelectorAll('.indicator');

    slides.style.transform = `translateX(-${index * 100}%)`;

    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    const totalSlides = document.querySelectorAll('.carousel-slide').length;
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
}

function prevSlide() {
    const totalSlides = document.querySelectorAll('.carousel-slide').length;
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
}

function startCarousel() {
    intervalId = setInterval(nextSlide, 3000); // Change slide every 3 seconds (adjust as needed)
}

function stopCarousel() {
    clearInterval(intervalId);
}

document.addEventListener('DOMContentLoaded', function () {
    showSlide(currentIndex);

    document.getElementById('nextBtn').addEventListener('click', function () {
        stopCarousel();
        nextSlide();
    });

    document.getElementById('prevBtn').addEventListener('click', function () {
        stopCarousel();
        prevSlide();
    });

    const indicatorsContainer = document.querySelector('.carousel-indicators');
    const totalSlides = document.querySelectorAll('.carousel-slide').length;

    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        indicator.addEventListener('click', function () {
            stopCarousel();
            showSlide(i);
        });
        indicatorsContainer.appendChild(indicator);
    }

    startCarousel();
});
