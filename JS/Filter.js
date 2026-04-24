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

            container.innerHTML = "";

            filtered.forEach(game => {
                container.innerHTML += `
                    <div class="game-card">
                        <img src="${game.image}" alt="${game.title}">
                        <h4>${game.title}</h4>
                        <p>${game.genre || 'General'}</p>
                        <p>⭐ ${game.rating || 'N/A'}</p>
                        <button onclick="downloadGame('${game.id}')" class="btn">Download</button>
                    </div>
                `;
            });
        });
    });
}