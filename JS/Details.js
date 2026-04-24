function renderDetails() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const game = games.find(g => g.id === id);

    if (!game) {
        document.querySelector(".page-hero h1").innerText = "Game Not Found";
        document.querySelector(".game-image img").src = "../Icon/placeholder.jpg";
        document.querySelector(".game-info").innerHTML = "<p>Game not found. <a href='../Core Pages ( Main Navigation)/index.html'>Go back</a></p>";
        return;
    }

    // Set page title
    document.title = `${game.title} | Nimo's Gaming`;

    // Hero section
    document.querySelector(".page-hero h1").innerText = game.title;
    document.querySelector("#game-platform").innerText = `Platform: ${game.platform}`;

    // Game image
    document.querySelector(".game-image img").src = game.image;
    document.querySelector(".game-image img").alt = game.title;

    // Game info
    document.querySelector("#game-genre").innerText = game.genre || "Unknown";
    document.querySelector("#game-platform-2").innerText = game.platform || "Unknown";
    document.querySelector("#game-size").innerText = game.size || "Unknown";
    document.querySelector("#game-dev").innerText = game.developer || "Unknown Developer";
    document.querySelector("#game-mode").innerText = "Single/Multi Player";

    // Download button - now uses new modal system
    const downloadLink = document.querySelector("#download-link");
    downloadLink.onclick = (e) => {
        e.preventDefault();
        downloadGame(game.id);
    };
    downloadLink.href = "#"; // No direct link needed
    downloadLink.innerText = `Download ${game.title}`;

    // Show alternative download links
    const linksContainer = document.querySelector("#download-links");
    if (linksContainer && Array.isArray(game.downloadLinks) && game.downloadLinks.length > 1) {
        linksContainer.innerHTML = `
            <p style="margin-top: 12px; color: #666; font-size: 14px;">Available on:</p>
            ${game.downloadLinks.map(link => `
                <a href="${link.url}" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-right: 10px; margin-top: 8px;">
                    ${link.name || link.title || 'Alternative'}
                </a>
            `).join("")}
        `;
    }

    // Description
    document.querySelector("#game-description").innerText = game.description || "No description available.";

    // Rating
    const ratingStars = "★".repeat(Math.floor(parseFloat(game.rating))) + "☆".repeat(5 - Math.floor(parseFloat(game.rating)));
    document.querySelector("#game-rating").innerText = ratingStars;
}

document.addEventListener("DOMContentLoaded", () => {
    if (window.gameDataLoaded && typeof window.gameDataLoaded.then === "function") {
        window.gameDataLoaded.then(renderDetails).catch(renderDetails);
    } else {
        renderDetails();
    }
});