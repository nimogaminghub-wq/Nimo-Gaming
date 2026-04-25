function initSearch() {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");

    if (!searchInput || !searchBtn) return;

    // Real-time search as user types
    searchInput.addEventListener("input", () => {
        performSearch();
    });

    // Search on button click
    searchBtn.addEventListener("click", () => {
        performSearch();
    });

    // Search on Enter key
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            performSearch();
        }
    });
}

function performSearch() {
    const searchInput = document.getElementById("search-input");
    const container = document.getElementById("search-results");

    if (!searchInput || !container) return;

    const query = searchInput.value.toLowerCase().trim();

    if (query === "") {
        container.innerHTML = `
            <div class="empty-state">
                <h3>Start typing to search games...</h3>
                <p>Search by game title, platform, or genre.</p>
            </div>
        `;
        return;
    }

    const results = games.filter(game =>
        game.title.toLowerCase().includes(query) ||
        game.platform.toLowerCase().includes(query) ||
        game.genre.toLowerCase().includes(query) ||
        (game.description && game.description.toLowerCase().includes(query))
    );

    container.innerHTML = "";

    if (results.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No games found for "${query}" 😔</h3>
                <p>Try different keywords or check spelling.</p>
                <a href="./request.html" class="btn">Request This Game</a>
            </div>
        `;
        return;
    }

    // Show search results count
    const resultsHeader = document.createElement("div");
    resultsHeader.className = "search-results-header";
    resultsHeader.innerHTML = `<h3>Found ${results.length} game${results.length !== 1 ? 's' : ''} for "${query}"</h3>`;
    container.appendChild(resultsHeader);

    results.forEach(game => {
        const card = document.createElement("div");
        card.className = "game-card";

        card.innerHTML = `
            <img src="${game.image}" alt="${game.title}" loading="lazy">
            <div class="game-card-body">
                <h4>${game.title}</h4>
                <p class="game-platform">${game.platform.toUpperCase()}</p>
                <p class="game-genre">${game.genre}</p>
                <p class="game-rating">⭐ ${game.rating}</p>
                <div class="game-card-actions">
                    <button onclick="downloadGame('${game.id}')" class="btn">Download</button>
                    <button onclick="openGame('${game.id}')" class="btn btn-secondary">Details</button>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}