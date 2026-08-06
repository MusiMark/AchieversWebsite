/**
 * Build drawer navigation links by cloning the desktop nav links.
 * Converts `.nav-btn` to `.drawer-btn-link` for mobile styling.
 * @param {HTMLElement} desktopLinks - The <ul> containing desktop nav links
 * @returns {HTMLElement} A <ul> ready for the drawer menu
 */
function buildDrawerLinks(desktopLinks) {
    const drawerList = document.createElement('ul');
    drawerList.className = 'drawer-links';

    desktopLinks.querySelectorAll('a').forEach((link) => {
        const listItem = document.createElement('li');
        const drawerLink = link.cloneNode(true);

        // Replace desktop button class with drawer-specific class
        if (drawerLink.classList.contains('nav-btn')) {
            drawerLink.classList.remove('nav-btn');
            drawerLink.classList.add('drawer-btn-link');
        }

        listItem.appendChild(drawerLink);
        drawerList.appendChild(listItem);
    });

    return drawerList;
}

/**
 * Initialize mobile navigation: hamburger button, drawer overlay,
 * drawer menu, and all open/close behavior.
 */
function initMobileNavigation() {
    const navContainer = document.querySelector('.nav-container');
    const desktopLinks = document.querySelector('.nav-links');
    if (!navContainer || !desktopLinks) return;

    // Create hamburger button if it doesn't exist
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

    // Create drawer overlay if it doesn't exist
    let drawerOverlay = document.getElementById('drawerOverlay');
    if (!drawerOverlay) {
        drawerOverlay = document.createElement('div');
        drawerOverlay.id = 'drawerOverlay';
        drawerOverlay.className = 'drawer-overlay';
        document.body.appendChild(drawerOverlay);
    }

    // Create drawer menu if it doesn't exist
    let drawerMenu = document.getElementById('drawerMenu');
    if (!drawerMenu) {
        drawerMenu = document.createElement('aside');
        drawerMenu.id = 'drawerMenu';
        drawerMenu.className = 'drawer-menu';
        drawerMenu.innerHTML = `
            <div class="drawer-header">
                <div class="drawer-brand">Achievers Mindset Uganda</div>
                <button type="button" class="drawer-close" id="drawerCloseBtn" aria-label="Close navigation menu">
                    <i class="fas fa-times" aria-hidden="true"></i>
                </button>
            </div>
        `;
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

    // Event listeners
    hamburgerBtn.addEventListener('click', () => {
        if (drawerMenu.classList.contains('active')) {
            closeDrawer();
        } else {
            openDrawer();
        }
    });

    drawerCloseBtn?.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);

    // Close drawer when any drawer link is clicked
    drawerMenu.querySelectorAll('a').forEach((drawerLink) => {
        drawerLink.addEventListener('click', closeDrawer);
    });

    // Close on Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && drawerMenu.classList.contains('active')) {
            closeDrawer();
        }
    });
}

/**
 * Initialize the hero slider with auto-advance, navigation buttons,
 * dot indicators, and dynamic title/description text.
 */
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slider .slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const dotsContainer = document.getElementById('dotsSlider');
    const slideTitle = document.getElementById('slideTitle');
    const slideDesc = document.getElementById('slideDesc');

    if (!slides.length || !prevBtn || !nextBtn || !dotsContainer || !slideTitle || !slideDesc) return;

    // Content for each slide
    const slideData = [{
        title: "Empowering Uganda's Young Generation with Life Skills, Mindset & Purpose",
        desc: 'Building confident, emotionally intelligent leaders who thrive in school, work, and life.'
    }, {
        title: 'Unlock Your Potential with AMP',
        desc: 'Learn emotional intelligence, goal setting, and leadership - skills that last a lifetime.'
    }, {
        title: 'Join a Movement of Young Achievers',
        desc: 'Mentorship, workshops, and community support for youth aged 10-25 across Uganda.'
    }];

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

/**
 * Format an ISO date string (YYYY-MM-DD) into an object
 * with `day` (number) and `month` (short string like "Aug").
 * @param {string} dateString - e.g. "2026-08-15"
 * @returns {{ day: number, month: string }}
 */
function formatEventDate(dateString) {
    const eventDate = new Date(`${dateString}T00:00:00`);
    const day = eventDate.getDate();
    const month = eventDate.toLocaleDateString('en-US', { month: 'short' });
    return { day, month };
}

/**
 * Resolve an event details URL. Accepts absolute URLs, root-relative
 * paths, or bare filenames (which get prefixed with `events/`).
 * @param {string} rawUrl
 * @returns {string}
 */
function resolveDetailsUrl(rawUrl) {
    if (!rawUrl) return '#';
    if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://') || rawUrl.startsWith('/')) {
        return rawUrl;
    }
    return `events/${rawUrl}`;
}

/**
 * Bind click handlers to all "Contact for details" buttons
 * so they show an alert with site contact info.
 */
function bindEventContactButtons() {
    document.querySelectorAll('.event-contact-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const contact = window.AchieversSiteData || {};
            const whatsapp = contact.whatsappDisplay || 'WhatsApp';
            const email = contact.emailDisplay || 'email';
            alert(
                `For more information about this event, please reach out via WhatsApp: ${whatsapp} or email ${email}`
            );
        });
    });
}

/**
 * Render the upcoming events cards into the #homeUpcomingEvents container.
 * @param {Array} events - Array of event objects
 */
function renderHomeUpcomingEvents(events) {
    const container = document.getElementById('homeUpcomingEvents');
    if (!container) return;

    if (!events.length) {
        container.innerHTML = '<p>No upcoming events right now. Please check again soon.</p>';
        return;
    }

    container.innerHTML = events
        .map((event) => {
            const dateObj = formatEventDate(event.date);

            // "Contact for details" button (always shown)
            const contactBtn =
                '<button class="btn btn-outline event-contact-btn" style="padding:8px 18px; font-size:0.9rem;">Contact for details</button>';

            // "View details" link (only if detailsUrl exists)
            const detailsLink = event.detailsUrl ?
                `<a class="btn btn-primary" href="${resolveDetailsUrl(event.detailsUrl)}" style="padding:8px 18px; font-size:0.9rem;">View details</a>` :
                '';

            return `
                <div class="home-event-card">
                    <div class="event-date-block">
                        <div class="date-day">${dateObj.day}</div>
                        <div class="date-month">${dateObj.month}</div>
                    </div>
                    <div class="event-info-v3">
                        <h3>${event.name}</h3>
                        <p>${event.location} · ${event.description}</p>
                    </div>
                    <div style="display:flex;flex-direction:column;gap:8px;">
                        ${contactBtn}
                        ${detailsLink}
                    </div>
                </div>
            `;
        })
        .join('');

    // Re-bind contact buttons after injecting new HTML
    bindEventContactButtons();
}

/**
 * Fetch events from events.json, filter to upcoming only,
 * sort by date ascending, and take the first 3.
 */
function initHomeUpcomingEvents() {
    const container = document.getElementById('homeUpcomingEvents');
    if (!container) return;

    fetch('events/events.json')
        .then((response) => {
            if (!response.ok) throw new Error('Unable to load events feed');
            return response.json();
        })
        .then((events) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const upcoming = events
                .filter((event) => {
                    const eventDate = new Date(`${event.date}T00:00:00`);
                    return !Number.isNaN(eventDate.getTime()) && eventDate >= today;
                })
                .sort((a, b) => a.date.localeCompare(b.date))
                .slice(0, 3);

            renderHomeUpcomingEvents(upcoming);
        })
        .catch(() => {
            container.innerHTML =
                '<p>Unable to load upcoming events at the moment. Please try again later.</p>';
        });
}

// ==================== BOOTSTRAP ON DOM READY ====================
document.addEventListener('DOMContentLoaded', () => {
    initMobileNavigation();
    initHeroSlider();
    initHomeUpcomingEvents();
    bindEventContactButtons();
});