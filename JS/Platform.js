function renderPlatform(platform) {
    const container = document.querySelector(".games-grid");
    if (!container) return;

    const filtered = games.filter(g => g.platform === platform);

    container.innerHTML = "";

    // Use DocumentFragment for better performance
    const fragment = document.createDocumentFragment();

    filtered.forEach(game => {
        const card = document.createElement("div");
        card.className = "game-card";
        card.innerHTML = `
            <img src="${game.image}" alt="${game.title}">
            <h4>${game.title}</h4>
            <p>${game.genre || 'General'}</p>
            <p>⭐ ${game.rating || 'N/A'}</p>
            <div class="game-card-actions">
                <button class="btn download-btn" data-game-id="${game.id}">Download</button>
                <button class="btn btn-secondary details-btn" data-game-id="${game.id}">Details</button>
            </div>
        `;
        fragment.appendChild(card);
    });

    container.appendChild(fragment);

    // Add event listeners
    container.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            downloadGame(e.target.dataset.gameId);
        });
    });

    container.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            goToDetails(e.target.dataset.gameId);
        });
    });
}

/* Go to details */
function goToDetails(id) {
    window.location.href = `./games-details.html?id=${id}`;
}