function loadSlider() {
    const slider = document.querySelector("#slider-container");
    if (!slider) return;

    const trending = games
        .filter(game => game.featured)
        .sort((a, b) => b.trendingScore - a.trendingScore)
        .slice(0, 5);

    if (!trending.length) {
        slider.innerHTML = `
            <div class="slide active">
                <div class="slide-content">
                    <h2>Find your next favorite game</h2>
                    <p>Start exploring today with Nimo's Gaming top picks.</p>
                </div>
            </div>
        `;
        return;
    }

    slider.innerHTML = `
        <div class="slider-wrapper">
            <div class="slides-container">
                ${trending.map((game, index) => `
                    <div class="slide ${index === 0 ? 'active' : ''}">
                        <img src="${game.image}" alt="${game.title}">
                        <div class="slide-content">
                            <h2>${game.title}</h2>
                            <p>${game.description || 'A top-rated game ready for download.'}</p>
                            <button class="btn" onclick="downloadGame('${game.id}')">Download Now</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="slider-controls">
                <button id="prev-slide" aria-label="Previous slide">‹</button>
                <button id="next-slide" aria-label="Next slide">›</button>
            </div>
            <div class="slider-indicators">
                ${trending.map((_, index) => `
                    <button class="slider-dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Slide ${index + 1}"></button>
                `).join('')}
            </div>
        </div>
    `;

    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.slider-dot');
    const prevButton = slider.querySelector('#prev-slide');
    const nextButton = slider.querySelector('#next-slide');
    let currentIndex = 0;
    let slideInterval = null;

    const activateSlide = index => {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentIndex = index;
    };

    const changeSlide = delta => {
        const nextIndex = (currentIndex + delta + slides.length) % slides.length;
        activateSlide(nextIndex);
    };

    const startAutoPlay = () => {
        slideInterval = setInterval(() => changeSlide(1), 6000);
    };

    const stopAutoPlay = () => {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    };

    prevButton.addEventListener('click', () => changeSlide(-1));
    nextButton.addEventListener('click', () => changeSlide(1));

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            activateSlide(Number(dot.dataset.index));
        });
    });

    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);
    document.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft') changeSlide(-1);
        if (event.key === 'ArrowRight') changeSlide(1);
    });

    activateSlide(0);
    startAutoPlay();
}

/* ==========================================
   CAROUSEL SLIDER FOR PLATFORMS
=========================================== */
function loadPlatformCarousels() {
    loadCarouselSlider('slider-android', 'android', 8);
    loadCarouselSlider('slider-ppsspp', 'ppsspp', 8);
    loadCarouselSlider('slider-ps2', 'ps2', 8);
}

function loadCarouselSlider(containerId, platform, limit = 8) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const platformGames = games
        .filter(game => game.platform === platform)
        .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        .slice(0, limit);

    if (!platformGames.length) {
        container.innerHTML = `<p class="empty-state">No ${platform} games available yet.</p>`;
        return;
    }

    container.innerHTML = `
        <div class="carousel-wrapper">
            <button class="carousel-nav carousel-prev" aria-label="Previous games">‹</button>
            <div class="carousel-container">
                <div class="carousel-track">
                    ${platformGames.map(game => `
                        <div class="carousel-card">
                            <div class="game-thumbnail">
                                <img src="${game.image}" alt="${game.title}" loading="lazy">
                                ${game.featured ? '<span class="badge-featured">Featured</span>' : ''}
                            </div>
                            <div class="game-info">
                                <h4 class="game-title">${game.title}</h4>
                                <p class="game-genre">${game.genre}</p>
                                <div class="game-rating">
                                    <span class="stars">⭐ ${game.rating || 'N/A'}</span>
                                    <span class="size">${game.size || 'Unknown'}</span>
                                </div>
                                <button class="btn-small" onclick="downloadGame('${game.id}')">Download</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <button class="carousel-nav carousel-next" aria-label="Next games">›</button>
        </div>
    `;

    setupCarouselControls(container);
}

function setupCarouselControls(container) {
    const track = container.querySelector('.carousel-track');
    const prevBtn = container.querySelector('.carousel-prev');
    const nextBtn = container.querySelector('.carousel-next');
    const cards = container.querySelectorAll('.carousel-card');

    if (!track || !cards.length) return;

    let scrollPosition = 0;
    const cardWidth = 280; // Width of each card
    const gap = 15;
    const maxScroll = (cards.length * (cardWidth + gap)) - container.querySelector('.carousel-container').offsetWidth;

    const updateButtons = () => {
        prevBtn.disabled = scrollPosition <= 0;
        nextBtn.disabled = scrollPosition >= maxScroll;
    };

    const scroll = (direction) => {
        const amount = cardWidth + gap;
        scrollPosition += direction * amount;
        scrollPosition = Math.max(0, Math.min(scrollPosition, maxScroll));
        track.style.transform = `translateX(-${scrollPosition}px)`;
        updateButtons();
    };

    prevBtn.addEventListener('click', () => scroll(-1));
    nextBtn.addEventListener('click', () => scroll(1));

    updateButtons();
}
