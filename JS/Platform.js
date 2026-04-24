function renderPlatform(platform) {
    const container = document.querySelector(".games-grid");
    if (!container) return;

    const filtered = games.filter(g => g.platform === platform);

    container.innerHTML = "";

    filtered.forEach(game => {
        container.innerHTML += `
            <div class="game-card">
                <img src="${game.image}" alt="${game.title}">
                <h4>${game.title}</h4>
                <p>${game.genre || 'General'}</p>
                <p>⭐ ${game.rating || 'N/A'}</p>
                <div class="game-card-actions">
                    <button onclick="downloadGame('${game.id}')" class="btn">Download</button>
                    <button onclick="goToDetails('${game.id}')" class="btn btn-secondary">Details</button>
                </div>
            </div>
        `;
    });
}

/* Go to details */
function goToDetails(id) {
    window.location.href = `../Game System Pages/game-details.html?id=${id}`;
}