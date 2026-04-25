function initFilters() {
    const buttons = document.querySelectorAll(".filter-buttons button");

    if (!buttons.length) return;

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const category = btn.innerText.toLowerCase();

            const filtered = category === "all"
                ? games
                : games.filter(g => g.genre && g.genre.toLowerCase().includes(category));

            const container = document.querySelector(".games-grid");
            if (!container) return;

            container.innerHTML = ""; // Clear existing content

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
                    <button class="btn download-btn" data-game-id="${game.id}">Download</button>
                `;
                fragment.appendChild(card);
            });

            container.appendChild(fragment);

            // Add event listeners to download buttons
            container.querySelectorAll('.download-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    downloadGame(e.target.dataset.gameId);
                });
            });
        });
    });
}