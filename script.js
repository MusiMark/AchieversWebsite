function buildDrawerLinks(desktopLinks) {
    const drawerList = document.createElement('ul');
    drawerList.className = 'drawer-links';

    desktopLinks.querySelectorAll('a').forEach((link) => {
        const listItem = document.createElement('li');
        const drawerLink = link.cloneNode(true);

        if (drawerLink.classList.contains('nav-btn')) {
            drawerLink.classList.remove('nav-btn');
            drawerLink.classList.add('drawer-btn-link');
        }

        listItem.appendChild(drawerLink);
        drawerList.appendChild(listItem);
    });

    return drawerList;
}

function initMobileNavigation() {
    const navContainer = document.querySelector('.nav-container');
    const desktopLinks = document.querySelector('.nav-links');
    if (!navContainer || !desktopLinks) {
        return;
    }

    let hamburgerBtn = document.getElementById('hamburgerBtn');
    if (!hamburgerBtn) {
        hamburgerBtn = document.createElement('button');
        hamburgerBtn.type = 'button';
        hamburgerBtn.id = 'hamburgerBtn';
        hamburgerBtn.className = 'hamburger';
        hamburgerBtn.setAttribute('aria-label', 'Toggle navigation menu');
        hamburgerBtn.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
        navContainer.appendChild(hamburgerBtn);
    }

    let drawerOverlay = document.getElementById('drawerOverlay');
    let drawerMenu = document.getElementById('drawerMenu');

    if (!drawerOverlay) {
        drawerOverlay = document.createElement('div');
        drawerOverlay.id = 'drawerOverlay';
        drawerOverlay.className = 'drawer-overlay';
        document.body.appendChild(drawerOverlay);
    }

    if (!drawerMenu) {
        drawerMenu = document.createElement('aside');
        drawerMenu.id = 'drawerMenu';
        drawerMenu.className = 'drawer-menu';
        drawerMenu.innerHTML = [
            '<div class="drawer-header">',
            '  <div class="drawer-brand">Achievers Uganda</div>',
            '  <button type="button" class="drawer-close" id="drawerCloseBtn" aria-label="Close navigation menu">',
            '    <i class="fas fa-times" aria-hidden="true"></i>',
            '  </button>',
            '</div>'
        ].join('');
        drawerMenu.appendChild(buildDrawerLinks(desktopLinks));
        document.body.appendChild(drawerMenu);
    }

    const drawerCloseBtn = document.getElementById('drawerCloseBtn');
    const hamburgerIcon = hamburgerBtn.querySelector('i');

    function openDrawer() {
        drawerMenu.classList.add('active');
        drawerOverlay.classList.add('active');
        hamburgerIcon.classList.remove('fa-bars');
        hamburgerIcon.classList.add('fa-times');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        drawerMenu.classList.remove('active');
        drawerOverlay.classList.remove('active');
        hamburgerIcon.classList.remove('fa-times');
        hamburgerIcon.classList.add('fa-bars');
        document.body.style.overflow = '';
    }

    hamburgerBtn.addEventListener('click', () => {
        if (drawerMenu.classList.contains('active')) {
            closeDrawer();
            return;
        }
        openDrawer();
    });

    drawerCloseBtn?.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);

    drawerMenu.querySelectorAll('a').forEach((drawerLink) => {
        drawerLink.addEventListener('click', closeDrawer);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && drawerMenu.classList.contains('active')) {
            closeDrawer();
        }
    });
}

function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slider .slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const dotsContainer = document.getElementById('dotsSlider');
    const slideTitle = document.getElementById('slideTitle');
    const slideDesc = document.getElementById('slideDesc');

    if (!slides.length || !prevBtn || !nextBtn || !dotsContainer || !slideTitle || !slideDesc) {
        return;
    }

    const slideData = [
        {
            title: "Empowering Uganda's Young Generation with Life Skills, Mindset & Purpose",
            desc: 'Building confident, emotionally intelligent leaders who thrive in school, work, and life.'
        },
        {
            title: 'Unlock Your Potential with AMP',
            desc: 'Learn emotional intelligence, goal setting, and leadership - skills that last a lifetime.'
        },
        {
            title: 'Join a Movement of Young Achievers',
            desc: 'Mentorship, workshops, and community support for youth aged 10-25 across Uganda.'
        }
    ];

    let currentSlide = 0;
    let autoInterval;

    function updateSlider(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        slideTitle.textContent = slideData[index].title;
        slideDesc.textContent = slideData[index].desc;

        dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        slides.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (idx === currentSlide) {
                dot.classList.add('active');
            }
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
        if (autoInterval) {
            clearInterval(autoInterval);
        }
        autoInterval = setInterval(nextSlide, 6000);
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
}

function bindEventContactButtons() {
    document.querySelectorAll('.event-contact-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const contact = window.AchieversSiteData || {};
            alert(
                `For more information about this event, please reach out via WhatsApp: ${contact.whatsappDisplay || 'WhatsApp'} or email ${contact.emailDisplay || 'email'}`
            );
        });
    });
}

function resolveDetailsUrl(rawUrl) {
    if (!rawUrl) {
        return '#';
    }

    if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://') || rawUrl.startsWith('/')) {
        return rawUrl;
    }

    return `events/${rawUrl}`;
}

function formatEventDate(dateString) {
    const eventDate = new Date(`${dateString}T00:00:00`);
    return eventDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

function renderHomeUpcomingEvents(events) {
    const eventsGrid = document.getElementById('homeUpcomingEvents');
    if (!eventsGrid) {
        return;
    }

    if (!events.length) {
        eventsGrid.innerHTML = '<p>No upcoming events right now. Please check again soon.</p>';
        return;
    }

    eventsGrid.innerHTML = events
        .map((eventItem) => {
            const contactButton =
                '<button class="btn btn-outline event-contact-btn" style="margin-top: 16px; padding: 8px 20px; border-color: var(--red); color: var(--red);">Contact for details</button>';

            const detailLink = eventItem.detailsUrl
                ? `<a class="btn btn-primary" href="${resolveDetailsUrl(eventItem.detailsUrl)}" style="margin-top: 12px;">View details</a>`
                : '';

            return [
                '<div class="event-card">',
                '  <div class="event-info">',
                `    <span class="event-date1"><i class="far fa-calendar-alt"></i> ${formatEventDate(eventItem.date)}</span>`,
                `    <h3>${eventItem.name}</h3>`,
                `    <p>${eventItem.location}</p>`,
                `    <p>${eventItem.description}</p>`,
                `    ${contactButton}`,
                `    ${detailLink}`,
                '  </div>',
                '</div>'
            ].join('');
        })
        .join('');

    bindEventContactButtons();
}

function initHomeUpcomingEvents() {
    const eventsGrid = document.getElementById('homeUpcomingEvents');
    if (!eventsGrid) {
        return;
    }

    fetch('events/events.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Unable to load events feed');
            }
            return response.json();
        })
        .then((events) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const nextEvents = events
                .filter((eventItem) => {
                    const eventDate = new Date(`${eventItem.date}T00:00:00`);
                    return !Number.isNaN(eventDate.getTime()) && eventDate >= today;
                })
                .sort((a, b) => a.date.localeCompare(b.date))
                .slice(0, 3);

            renderHomeUpcomingEvents(nextEvents);
        })
        .catch(() => {
            eventsGrid.innerHTML = '<p>Unable to load upcoming events at the moment. Please try again later.</p>';
        });
}

function initInviteButton() {
    const inviteButton = document.getElementById('inviteSchoolHeroBtn');
    if (!inviteButton) {
        return;
    }

    inviteButton.addEventListener('click', () => {
        const contact = window.AchieversSiteData || {};
        alert(
            `Contact us on WhatsApp: ${contact.whatsappDisplay || 'WhatsApp'} or email ${contact.emailDisplay || 'email'} to invite AMP to your school. We will respond within 24 hours.`
        );
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initMobileNavigation();
    initHeroSlider();
    initHomeUpcomingEvents();
    initInviteButton();
    bindEventContactButtons();
});
