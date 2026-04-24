document.addEventListener("DOMContentLoaded", () => {
    const startApp = () => {
        const pageType = getPageType();
        const bodyPage = document.body.dataset.page;

        if (pageType === "all" && bodyPage === "home") {
            renderFeaturedGames();
        } else if (["android", "ppsspp", "ps2", "search"].includes(pageType)) {
            renderGames();
        }

        setupSearch();
        setupFilters();
        loadSlider();
    };

    if (window.gameDataLoaded && typeof window.gameDataLoaded.then === "function") {
        window.gameDataLoaded.then(startApp).catch(startApp);
    } else {
        startApp();
    }
});

/* =========================
   GET PAGE TYPE
========================= */
function getPageType() {
    const path = window.location.pathname.toLowerCase();

    if (path.includes("android")) return "android";
    if (path.includes("ppsspp")) return "ppsspp";
    if (path.includes("ps2")) return "ps2";
    if (path.includes("search")) return "search";

    return "all";
}

/* =========================
   RENDER GAMES
========================= */
function renderGames() {
    const pageType = getPageType();
    const container = pageType === "search"
        ? document.getElementById("search-results")
        : document.querySelector(".games-section .container");
    if (!container) return;

    let filteredGames = games;

    if (pageType === "all") {
        filteredGames = games.filter(g => g.featured);
    } else if (pageType !== "search") {
        filteredGames = games.filter(g => g.platform === pageType);
    }

    displayGames(filteredGames, container);
}

/* =========================
   RENDER FEATURED GAMES ON HOME
========================= */
function renderFeaturedGames() {
    const featuredContainer = document.getElementById("featured-games-container");
    if (!featuredContainer) return;

    const featuredGames = games
        .filter(game => game.featured)
        .sort((a, b) => b.trendingScore - a.trendingScore)
        .slice(0, 6);

    if (featuredGames.length === 0) {
        featuredContainer.innerHTML = `
            <div class="empty-state" role="status" aria-live="polite">
                <h3>No featured games available yet.</h3>
                <p>Check back soon for daily highlights and trending releases.</p>
            </div>
        `;
        return;
    }

    featuredContainer.innerHTML = "";
    featuredContainer.setAttribute('role', 'region');
    featuredContainer.setAttribute('aria-label', 'Featured games');

    featuredGames.forEach((game, index) => {
        const card = document.createElement("article");
        card.className = "featured-card";
        card.setAttribute('role', 'article');
        card.style.animationDelay = `${index * 0.1}s`;

        const ratingNum = parseFloat(game.rating) || 0;
        const isTrending = game.trendingScore >= 95;
        const genreIcon = getGenreIcon(game.genre);

        card.innerHTML = `
            <div class="featured-card-image">
                <img src="${game.image}" alt="${game.title} - Featured Game" loading="lazy">
                ${isTrending ? '<span class="trending-badge">🔥 TRENDING</span>' : ''}
                <div class="featured-overlay"></div>
            </div>
            <div class="featured-card-body">
                <div class="card-header">
                    <div class="badge-group">
                        <span class="badge platform-badge" aria-label="Platform">${(game.platform || 'Unknown').toUpperCase()}</span>
                        <span class="badge genre-badge">${genreIcon} ${game.genre || 'Game'}</span>
                    </div>
                </div>
                <h3 class="card-title">${game.title}</h3>
                <p class="card-description">${game.description || 'Explore this top pick from Nimo\'s Gaming.'}</p>
                <div class="featured-meta">
                    <div class="meta-item">
                        <span class="meta-label">Rating</span>
                        <span class="meta-value">⭐ ${game.rating || 'N/A'}/5</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Size</span>
                        <span class="meta-value">${game.size || 'N/A'}</span>
                    </div>
                </div>
                <button onclick="downloadGame('${game.id}')" class="btn btn-primary" aria-label="Download ${game.title}">
                    <span class="btn-icon">⬇️</span>
                    <span class="btn-text">Play Now</span>
                </button>
            </div>
        `;

        featuredContainer.appendChild(card);
    });
}

/* =========================
   DISPLAY GAME CARDS
========================= */
function displayGames(gameList, container) {
    const grid = container.querySelector('.games-grid') || container;
    grid.innerHTML = "";
    grid.classList.add('games-grid');
    grid.setAttribute('role', 'main');

    if (gameList.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" role="status" aria-live="polite">
                <h3>No games found 😔</h3>
                <p>Try a different keyword or explore another platform.</p>
            </div>
        `;
        return;
    }

    gameList.forEach((game, index) => {
        const card = document.createElement("article");
        card.className = "game-card";
        card.setAttribute('role', 'article');
        card.style.animationDelay = `${(index % 12) * 0.06}s`;

        const ratingNum = parseFloat(game.rating) || 0;
        const isTrending = game.trendingScore >= 95;
        const genreIcon = getGenreIcon(game.genre);

        card.innerHTML = `
            <div class="card-image-wrapper">
                <img src="${game.image}" alt="${game.title} - Game Cover" loading="lazy" class="card-image">
                ${isTrending ? '<span class="trending-badge-small">🔥</span>' : ''}
                <div class="card-overlay"></div>
                <button onclick="downloadGame('${game.id}')" class="card-play-btn" aria-label="Download ${game.title}">
                    <span class="play-icon">▶</span>
                </button>
            </div>
            <div class="game-card-body">
                <div class="card-badges">
                    <span class="badge-small">${genreIcon}</span>
                    <span class="badge-rating">⭐ ${game.rating || 'N/A'}</span>
                </div>
                <h4 class="card-title-sm">${game.title}</h4>
                <p class="card-meta">${game.size || 'N/A'}</p>
                <button onclick="downloadGame('${game.id}')" class="btn btn-sm" aria-label="Download ${game.title}">
                    ⬇️ Get Game
                </button>
            </div>
        `;

        grid.appendChild(card);
    });
}

/* =========================
   UTILITY: GET GENRE ICON
========================= */
function getGenreIcon(genre) {
    const icons = {
        'action': '⚔️',
        'adventure': '🗻',
        'fighting': '👊',
        'racing': '🏎️',
        'sports': '⚽',
        'simulation': '🎮',
        'rpg': '🐉',
        'strategy': '♟️',
        'puzzle': '🧩',
        'casual': '🎯'
    };
    return icons[genre?.toLowerCase()] || '🎮';
}

/* =========================
   OPEN GAME DETAILS
========================= */
function openGame(id) {
    window.location.href = `./games-details.html?id=${id}`;
}

/* =========================
   DOWNLOAD GAME (UPGRADED)
========================= */
function downloadGame(id) {
    // Validate input
    if (!id || typeof id !== 'string' || id.trim() === '') {
        showNotification('Invalid game ID', 'error');
        console.error('Invalid game ID provided:', id);
        return;
    }

    const game = games.find(g => g && g.id === id);
    if (!game) {
        showNotification('Game not found. Please try again.', 'error');
        console.warn('Game not found with ID:', id);
        return;
    }

    // Validate game data
    if (!game.title || !game.platform) {
        showNotification('Game data is incomplete. Please try another game.', 'error');
        console.error('Invalid game data:', game);
        return;
    }

    // Show download modal with all options
    if (typeof showDownloadModal === 'function') {
        try {
            showDownloadModal(game);
        } catch (error) {
            console.error('Error showing download modal:', error);
            showNotification('Could not open download dialog. Please try again.', 'error');
        }
    } else {
        // Fallback to download page if modal function not available
        window.location.href = `./Pages/Download.html?id=${encodeURIComponent(id)}`;
    }
}

/* =========================
   SEARCH SYSTEM
========================= */
function setupSearch() {
    const input = document.getElementById("search-input");
    const btn = document.getElementById("search-btn");
    if (!input || !btn) return;

    const triggerSearch = () => {
        const value = input.value.trim().toLowerCase();
        const pageType = getPageType();
        let baseGames = games;

        if (pageType !== "all" && pageType !== "search") {
            baseGames = games.filter(g => g.platform === pageType);
        }

        const results = baseGames.filter(game =>
            game.title.toLowerCase().includes(value) ||
            game.genre.toLowerCase().includes(value)
        );

        const container = document.getElementById("search-results");
        if (container) displayGames(results, container);
    };

    // Check for URL query parameter and perform initial search
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
        input.value = query;
        // Delay search to ensure games are loaded
        setTimeout(triggerSearch, 100);
    }

    btn.addEventListener("click", triggerSearch);
    input.addEventListener("keypress", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            triggerSearch();
        }
    });
}

/* =========================
   FILTER SYSTEM
========================= */
function setupFilters() {
    const buttons = document.querySelectorAll(".filter-buttons button");
    if (!buttons.length) return;

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const category = btn.dataset.genre || btn.innerText.toLowerCase();
            const pageType = getPageType();
            let baseGames = games;

            if (pageType !== "all" && pageType !== "search") {
                baseGames = games.filter(g => g.platform === pageType);
            }

            const filtered = category === "all"
                ? baseGames
                : baseGames.filter(g => g.genre.toLowerCase().includes(category));

            const container = document.querySelector(".games-section .container");
            if (container) displayGames(filtered, container);

            buttons.forEach(button => button.classList.toggle('active', button === btn));
        });
    });
}
