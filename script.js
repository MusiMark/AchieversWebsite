// Hero Slider Logic
const slides = document.querySelectorAll('.hero-slider .slide');
const prevBtn = document.querySelector('.prev-slide');
const nextBtn = document.querySelector('.next-slide');
const dotsContainer = document.getElementById('dotsSlider');
const slideTitle = document.getElementById('slideTitle');
const slideDesc = document.getElementById('slideDesc');

// Slide content per index
const slideData = [
{ title: "Empowering Young Leaders Across Uganda", desc: "Life skills, mentorship, and real-world confidence for youth aged 10-25. Join a movement that transforms communities." },
{ title: "Build Skills That Last a Lifetime", desc: "From emotional intelligence to career planning — AMP gives you the tools to thrive in school, work, and life." },
{ title: "Mentorship That Changes Everything", desc: "Get matched with inspiring mentors who guide you to unlock your full potential and become an achiever." }
];

let currentSlide = 0;
let autoInterval;

function updateSlider(index) {
slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
});
slideTitle.textContent = slideData[index].title;
slideDesc.textContent = slideData[index].desc;
const dots = document.querySelectorAll('.dot');
dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
});
}

function createDots() {
dotsContainer.innerHTML = '';
slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (idx === currentSlide) dot.classList.add('active');
    dot.addEventListener('click', () => {
    clearInterval(autoInterval);
    currentSlide = idx;
    updateSlider(currentSlide);
    startAutoSlide();
    });
    dotsContainer.appendChild(dot);
});
}

function nextSlide() {
currentSlide = (currentSlide + 1) % slides.length;
updateSlider(currentSlide);
}

function prevSlide() {
currentSlide = (currentSlide - 1 + slides.length) % slides.length;
updateSlider(currentSlide);
}

function startAutoSlide() {
if (autoInterval) clearInterval(autoInterval);
autoInterval = setInterval(() => {
    nextSlide();
}, 6000);
}

prevBtn.addEventListener('click', () => {
clearInterval(autoInterval);
prevSlide();
startAutoSlide();
});
nextBtn.addEventListener('click', () => {
clearInterval(autoInterval);
nextSlide();
startAutoSlide();
});

createDots();
updateSlider(0);
startAutoSlide();

// Email Subscription
const subscribeBtn = document.getElementById('subscribeBtn');
const emailInput = document.getElementById('subEmail');
subscribeBtn.addEventListener('click', () => {
const email = emailInput.value.trim();
if (email && email.includes('@') && email.includes('.')) {
    alert(`🎉 Thanks for subscribing! You'll receive AMP updates and free guides.`);
    emailInput.value = '';
} else {
    alert('Please enter a valid email address.');
}
});

// Buttons alerts (demo)
document.getElementById('registerHeroBtn')?.addEventListener('click', () => alert('Registration portal opens soon! Stay tuned.'));
document.getElementById('workshopHeroBtn')?.addEventListener('click', () => alert('Contact us at +256 700 123456 to book a school workshop.'));
