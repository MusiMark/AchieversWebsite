// Hero Slider Logic
const slides = document.querySelectorAll('.hero-slider .slide');
const prevBtn = document.querySelector('.prev-slide');
const nextBtn = document.querySelector('.next-slide');
const dotsContainer = document.getElementById('dotsSlider');
const slideTitle = document.getElementById('slideTitle');
const slideDesc = document.getElementById('slideDesc');

const slideData = [
{ title: "Empowering Uganda's Young Generation with Life Skills, Mindset & Purpose", desc: "Building confident, emotionally intelligent leaders who thrive in school, work, and life." },
{ title: "Unlock Your Potential with AMP", desc: "Learn emotional intelligence, goal setting, and leadership — skills that last a lifetime." },
{ title: "Join a Movement of Young Achievers", desc: "Mentorship, workshops, and community support for youth aged 10-25 across Uganda." }
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

function nextSlide() { currentSlide = (currentSlide + 1) % slides.length; updateSlider(currentSlide); }
function prevSlide() { currentSlide = (currentSlide - 1 + slides.length) % slides.length; updateSlider(currentSlide); }
function startAutoSlide() { if (autoInterval) clearInterval(autoInterval); autoInterval = setInterval(() => { nextSlide(); }, 6000); }

prevBtn.addEventListener('click', () => { clearInterval(autoInterval); prevSlide(); startAutoSlide(); });
nextBtn.addEventListener('click', () => { clearInterval(autoInterval); nextSlide(); startAutoSlide(); });

createDots();
updateSlider(0);
startAutoSlide();

// Invite School button alert
document.getElementById('inviteSchoolHeroBtn')?.addEventListener('click', () => {
alert("📞 Contact us on WhatsApp: +256 700 123456 or email hello@amp.ug to invite AMP to your school. We'll respond within 24 hours.");
});

// Event contact buttons
const contactBtns = document.querySelectorAll('.event-contact-btn');
contactBtns.forEach(btn => {
btn.addEventListener('click', () => {
    alert("For more information about this event, please reach out via WhatsApp: +256 700 123456 or email hello@amp.ug");
});
});
