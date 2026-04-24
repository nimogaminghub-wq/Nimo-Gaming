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
