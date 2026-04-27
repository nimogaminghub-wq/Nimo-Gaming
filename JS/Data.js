// =====================================
// GAME DATA LOADER (REAL DATA FROM JSON)
// =====================================

window.games = [];
window.gameDataLoaded = loadGameDataJson();

async function loadGameDataJson() {
    // Show loading indicator
    showLoadingIndicator();

    // Construct correct path based on current location
    // Works from both root (index.html) and Pages folder (android.html)
    const isInPagesFolder = window.location.pathname.includes('/Pages/');
    const jsonPath = isInPagesFolder ? "../games/game-data.json" : "./games/game-data.json";

    try {
        const response = await fetch(jsonPath, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to load game data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Normalize image paths based on current location
        const normalizeImagePath = (imagePath) => {
            if (imagePath.startsWith('http')) return imagePath; // External images unchanged
            // If from root, keep ../icon/ as is (already correct for JSON in games/)
            // If from Pages, convert to ../icon/ format
            if (isInPagesFolder) {
                return imagePath;
            } else {
                // From root: images in JSON use ../icon/, need to convert to ./icon/
                return imagePath.replace(/^\.\.\//, './');
            }
        };

        const normalizeGames = (gameList) => {
            return gameList.map(game => ({
                ...game,
                image: normalizeImagePath(game.image)
            }));
        };

        window.games = [
            ...normalizeGames(data.android || []),
            ...normalizeGames(data.ppsspp || []),
            ...normalizeGames(data.ps2 || [])
        ];

        hideLoadingIndicator();
        return true;
    } catch (error) {
        console.warn("Failed to load game data from JSON, using fallback Data.js content.", error);
        hideLoadingIndicator();
        return false;
    }
}

function showLoadingIndicator() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-indicator';
    loadingDiv.innerHTML = `
        <style>
            #loading-indicator {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                color: white;
                font-family: Arial, sans-serif;
            }
            .loading-spinner {
                text-align: center;
            }
            .spinner {
                width: 40px;
                height: 40px;
                border: 4px solid #f3f3f3;
                border-top: 4px solid #38bdf8;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 15px;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading games...</p>
        </div>
    `;
    document.body.appendChild(loadingDiv);
}

function hideLoadingIndicator() {
    const loadingDiv = document.getElementById('loading-indicator');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

function addGame(platform, game) {
    window.games.push(game);
}

// ===== ACTION =====
addGame("ppsspp", {
    id: "assassins-creed-bloodlines", title: "Assassin's Creed: Bloodlines", platform: "ppsspp", genre: "action", size: "1.2GB", image: "https://via.placeholder.com/300x200?text=AC+Bloodlines", description: "Stealth-action game set after AC1.", trendingScore: 95, featured: true, rating: "4.7", downloadLinks: [
        { title: "Drive", url: "https://drive.google.com/file/d/1HJ5rC_eYW7HX55c9ggBWJSNwBtQxhum2/view" },
        { title: "Romsfun", url: "https://romsfun.com/download/assassins-creed-bloodlines-11131/1" }
    ]
});

addGame("ppsspp", {
    id: "dantes-inferno", title: "Dante's Inferno", platform: "ppsspp", genre: "action", size: "1.3GB", image: "https://via.placeholder.com/300x200?text=Dante", description: "Dark action adventure through hell.", trendingScore: 97, featured: true, rating: "4.8", downloadLinks: [
        { title: "Drive", url: "https://drive.google.com/file/d/1u-ZvKsqlwTTs1FHAuXWMEyQ4ldPjhBQC/view" }
    ]
});

addGame("ppsspp", {
    id: "ghost-rider", title: "Ghost Rider", platform: "ppsspp", genre: "action", size: "800MB", image: "https://via.placeholder.com/300x200?text=Ghost+Rider", description: "Marvel action game.", trendingScore: 88, featured: false, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/ghost-rider-11416/2" }
    ]
});

addGame("ppsspp", {
    id: "manhunt-2", title: "Manhunt 2", platform: "ppsspp", genre: "action", size: "900MB", image: "https://via.placeholder.com/300x200?text=Manhunt+2", description: "Stealth horror action game.", trendingScore: 90, featured: false, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/manhunt-2-11651/1" }
    ]
});

// ===== FIGHTING =====
addGame("ppsspp", {
    id: "dbz-shin-budokai-2", title: "Dragon Ball Z: Shin Budokai 2", platform: "ppsspp", genre: "fighting", size: "700MB", image: "https://via.placeholder.com/300x200?text=DBZ", description: "Dragon Ball fighting game.", trendingScore: 96, featured: true, downloadLinks: [
        { title: "Drive", url: "https://drive.google.com/file/d/1jkmS7cXZZ-zCdXdGBFqCefZW2eZ111qk/view" }
    ]
});

addGame("ppsspp", {
    id: "tekken-7-ppsspp", title: "Tekken 7 (PPSSPP Mod)", platform: "ppsspp", genre: "fighting", size: "1GB", image: "https://via.placeholder.com/300x200?text=Tekken+7", description: "Tekken mod for PSP.", trendingScore: 92, featured: true, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/tekken-7-fated-retribution-round-2-265182/1" }
    ]
});

addGame("ppsspp", {
    id: "tekken-5", title: "Tekken 5", platform: "ppsspp", genre: "fighting", size: "900MB", image: "https://via.placeholder.com/300x200?text=Tekken+5", description: "Classic Tekken fighting.", trendingScore: 93, featured: false, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/tekken-5-2-265174/1" }
    ]
});

addGame("ppsspp", {
    id: "mortal-kombat-unchained", title: "Mortal Kombat: Unchained", platform: "ppsspp", genre: "fighting", size: "1GB", image: "https://via.placeholder.com/300x200?text=MK", description: "Brutal fighting game.", trendingScore: 95, featured: true, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/mortal-kombat-unchained-id2-11201/2" }
    ]
});

// ===== ADVENTURE =====
addGame("ppsspp", {
    id: "crisis-core-ff7", title: "Crisis Core: Final Fantasy VII", platform: "ppsspp", genre: "adventure", size: "1.1GB", image: "https://via.placeholder.com/300x200?text=FF7", description: "Story-driven RPG prequel.", trendingScore: 98, featured: true, downloadLinks: [
        { title: "Drive", url: "https://drive.google.com/file/d/1NyIw8iZtcjX1ybRh-Tpr3iiUgyCGxvhg/view" }
    ]
});

addGame("ppsspp", {
    id: "prince-of-persia-forgotten-sands", title: "Prince of Persia: Forgotten Sands", platform: "ppsspp", genre: "adventure", size: "1GB", image: "https://via.placeholder.com/300x200?text=POP", description: "Platforming adventure.", trendingScore: 90, featured: false, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/prince-of-persia-the-forgotten-sands-11390/1" }
    ]
});

addGame("ppsspp", {
    id: "tomb-raider-legend", title: "Tomb Raider: Legend", platform: "ppsspp", genre: "adventure", size: "800MB", image: "https://via.placeholder.com/300x200?text=Tomb+Raider", description: "Adventure with Lara Croft.", trendingScore: 89, featured: false, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/tomb-raider-legend-11570/1" }
    ]
});

// ===== RACING =====
addGame("ppsspp", {
    id: "midnight-club-3", title: "Midnight Club 3: DUB Edition", platform: "ppsspp", genre: "racing", size: "1.2GB", image: "https://via.placeholder.com/300x200?text=Midnight+Club", description: "Street racing game.", trendingScore: 94, featured: true, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/midnight-club-3-dub-edition-11347/1" }
    ]
});

addGame("ppsspp", {
    id: "nfs-shift", title: "Need for Speed: Shift", platform: "ppsspp", genre: "racing", size: "1GB", image: "https://via.placeholder.com/300x200?text=NFS", description: "Realistic racing.", trendingScore: 91, featured: false, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/need-for-speed-shift-11454/1" }
    ]
});

// ===== SPORTS =====
addGame("ppsspp", {
    id: "pes-2024", title: "eFootball PES 2024", platform: "ppsspp", genre: "sports", size: "1.5GB", image: "https://via.placeholder.com/300x200?text=PES", description: "Football simulation.", trendingScore: 97, featured: true, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/pes-2024-188596/2" }
    ]
});

addGame("ppsspp", {
    id: "pes-2025", title: "eFootball PES 2025", platform: "ppsspp", genre: "sports", size: "1.6GB", image: "https://via.placeholder.com/300x200?text=PES+2025", description: "Updated football game.", trendingScore: 98, featured: true, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/efootball-pes-2025-207676/1" }
    ]
});

addGame("ppsspp", {
    id: "fc-25", title: "EA Sports FC 25", platform: "ppsspp", genre: "sports", size: "1.6GB", image: "https://via.placeholder.com/300x200?text=FC+25", description: "Modern football game.", trendingScore: 99, featured: true, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/ea-sports-fc-25-2-265458/1" }
    ]
});

// ===== GTA SERIES =====
addGame("ppsspp", {
    id: "gta-vice-city-stories", title: "GTA Vice City Stories", platform: "ppsspp", genre: "action", size: "1.3GB", image: "https://via.placeholder.com/300x200?text=GTA+VCS", description: "Open-world GTA game.", trendingScore: 100, featured: true, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/grand-theft-auto-vice-city-stories-11125/1" }
    ]
});

addGame("ppsspp", {
    id: "gta-liberty-city-stories", title: "GTA Liberty City Stories", platform: "ppsspp", genre: "action", size: "1.2GB", image: "https://via.placeholder.com/300x200?text=GTA+LCS", description: "Classic GTA PSP game.", trendingScore: 100, featured: true, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/grand-theft-auto-liberty-city-stories-11170/1" }
    ]
});

addGame("ppsspp", {
    id: "gta-chinatown-wars", title: "GTA Chinatown Wars", platform: "ppsspp", genre: "action", size: "700MB", image: "https://via.placeholder.com/300x200?text=GTA+CTW", description: "Top-down GTA style.", trendingScore: 92, featured: false, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/grand-theft-auto-chinatown-wars-11344/2" }
    ]
});
// ===== MORE PPSSPP GAMES =====

// ===== ADVENTURE / RPG =====
addGame("ppsspp", {
    id: "the-3rd-birthday", title: "The 3rd Birthday", platform: "ppsspp", genre: "adventure", size: "1.2GB", image: "https://via.placeholder.com/300x200?text=3rd+Birthday", description: "Sci-fi action RPG.", trendingScore: 91, featured: false, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/the-3rd-birthday-11158/1" }
    ]
});

addGame("ppsspp", {
    id: "valkyria-chronicles-3", title: "Valkyria Chronicles 3: Extra Edition", platform: "ppsspp", genre: "rpg", size: "1.3GB", image: "https://via.placeholder.com/300x200?text=Valkyria", description: "Tactical RPG war game.", trendingScore: 90, featured: false, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/valkyria-chronicles-3-extra-edition-153537/1" }
    ]
});

// ===== HORROR =====
addGame("ppsspp", {
    id: "silent-hill-origins", title: "Silent Hill: Origins", platform: "ppsspp", genre: "adventure", size: "900MB", image: "https://via.placeholder.com/300x200?text=Silent+Hill", description: "Psychological horror game.", trendingScore: 93, featured: false, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/silent-hill-origins-11362/1" }
    ]
});

addGame("ppsspp", {
    id: "silent-hill-shattered", title: "Silent Hill: Shattered Memories", platform: "ppsspp", genre: "adventure", size: "1GB", image: "https://via.placeholder.com/300x200?text=Silent+Hill+SM", description: "Reimagined horror experience.", trendingScore: 94, featured: false, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/silent-hill-shattered-memories-11368/1" }
    ]
});

// ===== ADVENTURE EXTRA =====
addGame("ppsspp", {
    id: "prince-of-persia-rival-swords", title: "Prince of Persia: Rival Swords", platform: "ppsspp", genre: "adventure", size: "900MB", image: "https://via.placeholder.com/300x200?text=POP+Rival", description: "Classic Prince of Persia gameplay.", trendingScore: 89, featured: false, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/prince-of-persia-rival-swords-11422/1" }
    ]
});

addGame("ppsspp", {
    id: "obscure-aftermath", title: "Obscure: The Aftermath", platform: "ppsspp", genre: "adventure", size: "800MB", image: "https://via.placeholder.com/300x200?text=Obscure", description: "Horror survival game.", trendingScore: 87, featured: false, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/obscure-the-aftermath-11427/1" }
    ]
});

// ===== SPORTS / SIM =====
addGame("ppsspp", {
    id: "gran-turismo", title: "Gran Turismo", platform: "ppsspp", genre: "racing", size: "1.1GB", image: "https://via.placeholder.com/300x200?text=Gran+Turismo", description: "Realistic driving simulator.", trendingScore: 92, featured: false, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/gran-turismo-1-11249/1" }
    ]
});

// ===== ACTION EXTRA =====
addGame("ppsspp", {
    id: "spider-man-3", title: "Spider-Man 3", platform: "ppsspp", genre: "action", size: "900MB", image: "https://via.placeholder.com/300x200?text=Spider-Man", description: "Marvel superhero game.", trendingScore: 91, featured: false, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/spider-man-3-11257/1" }
    ]
});

addGame("ppsspp", {
    id: "metal-gear-peace-walker", title: "Metal Gear Solid: Peace Walker", platform: "ppsspp", genre: "action", size: "1.4GB", image: "https://via.placeholder.com/300x200?text=MGS", description: "Stealth action masterpiece.", trendingScore: 99, featured: true, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/metal-gear-solid-peace-walker-1-11147/1" }
    ]
});
// =====================================
// PS2 GAMES
// =====================================

// ===== ACTION =====
addGame("ps2", {
    id: "god-of-war", title: "God of War", platform: "ps2", genre: "action", size: "4GB", image: "https://via.placeholder.com/300x200?text=GOW", description: "Kratos battles gods in Greek mythology.", trendingScore: 100, featured: true, downloadLinks: [
        { title: "Romsfun 1", url: "https://romsfun.com/download/god-of-war-169969-70788/10" },
        { title: "Romsfun 2", url: "https://romsfun.com/download/god-of-war-169969-70788/3" }
    ]
});

addGame("ps2", {
    id: "god-of-war-2", title: "God of War II", platform: "ps2", genre: "action", size: "4.2GB", image: "https://via.placeholder.com/300x200?text=GOW2", description: "Epic sequel with intense combat.", trendingScore: 100, featured: true, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/god-of-war-ii-12928/14" }
    ]
});

addGame("ps2", {
    id: "gta-san-andreas-ps2", title: "GTA San Andreas", platform: "ps2", genre: "action", size: "4GB", image: "https://via.placeholder.com/300x200?text=GTA+SA", description: "Open-world crime adventure.", trendingScore: 100, featured: true, downloadLinks: [
        { title: "Link 1", url: "https://romsfun.com/download/grand-theft-auto-san-andreas-id-1-12950/10" },
        { title: "Link 2", url: "https://romsfun.com/download/grand-theft-auto-san-andreas-id-1-12950/20" }
    ]
});

addGame("ps2", {
    id: "black", title: "Black", platform: "ps2", genre: "action", size: "3GB", image: "https://via.placeholder.com/300x200?text=Black", description: "FPS shooter with realistic weapons.", trendingScore: 95, featured: false, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/black-14576/2" }
    ]
});

addGame("ps2", {
    id: "god-hand", title: "God Hand", platform: "ps2", genre: "action", size: "2GB", image: "https://via.placeholder.com/300x200?text=God+Hand", description: "Beat 'em up action game.", trendingScore: 92, featured: false, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/god-hand-13011/3" }
    ]
});

addGame("ps2", {
    id: "devil-may-cry", title: "Devil May Cry", platform: "ps2", genre: "action", size: "2.5GB", image: "https://via.placeholder.com/300x200?text=DMC", description: "Demon-hunting action game.", trendingScore: 95, featured: false, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/devil-may-cry-1-14589/2" }
    ]
});

addGame("ps2", {
    id: "devil-may-cry-3", title: "Devil May Cry 3", platform: "ps2", genre: "action", size: "3GB", image: "https://via.placeholder.com/300x200?text=DMC3", description: "Fast-paced combat prequel.", trendingScore: 97, featured: true, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/devil-may-cry-3-dantes-awakening-id2-14828/1" }
    ]
});

addGame("ps2", {
    id: "bully", title: "Bully (Canis Canem Edit)", platform: "ps2", genre: "adventure", size: "3GB", image: "https://via.placeholder.com/300x200?text=Bully", description: "School life open-world game.", trendingScore: 96, featured: true, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/bully-12984/2" }
    ]
});

// ===== RACING =====
addGame("ps2", {
    id: "nfs-underground-2", title: "Need for Speed Underground 2", platform: "ps2", genre: "racing", size: "2GB", image: "https://via.placeholder.com/300x200?text=NFSU2", description: "Street racing classic.", trendingScore: 96, featured: true, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/need-for-speed-underground-2-54135-14795/3" }
    ]
});

addGame("ps2", {
    id: "nfs-most-wanted", title: "Need for Speed Most Wanted", platform: "ps2", genre: "racing", size: "3GB", image: "https://via.placeholder.com/300x200?text=NFS+MW", description: "High-speed police chases.", trendingScore: 98, featured: true, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/need-for-speed-most-wanted-and-black-edition-15062/11" }
    ]
});

addGame("ps2", {
    id: "gran-turismo-4", title: "Gran Turismo 4", platform: "ps2", genre: "racing", size: "4GB", image: "https://via.placeholder.com/300x200?text=GT4", description: "Realistic racing simulator.", trendingScore: 94, featured: false, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/gran-turismo-4-68036-12973/6" }
    ]
});

addGame("ps2", {
    id: "midnight-club-3-ps2", title: "Midnight Club 3", platform: "ps2", genre: "racing", size: "3GB", image: "https://via.placeholder.com/300x200?text=Midnight+Club", description: "Urban racing game.", trendingScore: 95, featured: false, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/midnight-club-3-dub-edition-remix-12968/2" }
    ]
});

// ===== FIGHTING =====
addGame("ps2", {
    id: "dbz-tenkaichi-3", title: "DBZ Budokai Tenkaichi 3", platform: "ps2", genre: "fighting", size: "2GB", image: "https://via.placeholder.com/300x200?text=DBZ", description: "Dragon Ball fighting game.", trendingScore: 99, featured: true, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/dragonball-z-budokai-tenkaichi-3-1-12934/2" }
    ]
});

addGame("ps2", {
    id: "def-jam-ny", title: "Def Jam Fight for NY", platform: "ps2", genre: "fighting", size: "2GB", image: "https://via.placeholder.com/300x200?text=Def+Jam", description: "Street fighting game.", trendingScore: 95, featured: false, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/def-jam-fight-for-ny-3-70729/2" }
    ]
});

addGame("ps2", {
    id: "mk-shaolin-monks", title: "Mortal Kombat Shaolin Monks", platform: "ps2", genre: "fighting", size: "3GB", image: "https://via.placeholder.com/300x200?text=MK", description: "Action-fighting hybrid.", trendingScore: 96, featured: true, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/mortal-kombat-shaolin-monks-ps2-2-106937/3" }
    ]
});

addGame("ps2", {
    id: "mk-armageddon", title: "Mortal Kombat Armageddon", platform: "ps2", genre: "fighting", size: "3GB", image: "https://via.placeholder.com/300x200?text=MK+A", description: "Massive MK roster.", trendingScore: 95, featured: false, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/mortal-kombat-armageddon-id2-14636/2" }
    ]
});

// ===== ADVENTURE =====
addGame("ps2", {
    id: "shadow-colossus", title: "Shadow of the Colossus", platform: "ps2", genre: "adventure", size: "4GB", image: "https://via.placeholder.com/300x200?text=Colossus", description: "Epic boss adventure.", trendingScore: 100, featured: true, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/shadow-of-the-colossus-64993-14607/5" }
    ]
});

addGame("ps2", {
    id: "gta-vice-city", title: "GTA Vice City", platform: "ps2", genre: "action", size: "2GB", image: "https://via.placeholder.com/300x200?text=Vice+City", description: "80s themed GTA.", trendingScore: 98, featured: true, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/grand-theft-auto-vice-city-15552/6" }
    ]
});

addGame("ps2", {
    id: "gta-3", title: "GTA III", platform: "ps2", genre: "action", size: "2GB", image: "https://via.placeholder.com/300x200?text=GTA3", description: "Classic GTA.", trendingScore: 95, featured: false, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/grand-theft-auto-iii-15371/4" }
    ]
});

// ===== STEALTH =====
addGame("ps2", {
    id: "mgs2", title: "Metal Gear Solid 2", platform: "ps2", genre: "action", size: "4GB", image: "https://via.placeholder.com/300x200?text=MGS2", description: "Stealth espionage.", trendingScore: 97, featured: true, downloadLinks: [
        { title: "Romsfun", url: "https://romsfun.com/download/metal-gear-solid-2-sons-of-liberty-88355/2" }
    ]
});

addGame("ps2", {
    id: "mgs3", title: "Metal Gear Solid 3", platform: "ps2", genre: "action", size: "4GB", image: "https://via.placeholder.com/300x200?text=MGS3", description: "Jungle stealth survival.", trendingScore: 100, featured: true, downloadLinks: [
        { title: "Part1", url: "https://romsfun.com/download/metal-gear-solid-3-subsistence-14711/2" },
        { title: "Part2", url: "https://romsfun.com/download/metal-gear-solid-3-subsistence-14711/3" },
        { title: "Part3", url: "https://romsfun.com/download/metal-gear-solid-3-subsistence-14711/4" }
    ]
});
// =====================================
// ANDROID GAMES
// =====================================

addGame("android", {
    id: "free-fire", title: "Free Fire", platform: "android", genre: "action", size: "700MB", image: "https://via.placeholder.com/300x200?text=Free+Fire", description: "Battle royale shooter.", trendingScore: 100, featured: true, downloadLinks: [
        { title: "APKPure", url: "https://m.apkpure.com/garena-free-fire-android-2025/com.dts.freefireth/download" }
    ]
});

addGame("android", {
    id: "mini-militia", title: "Mini Militia", platform: "android", genre: "action", size: "100MB", image: "https://via.placeholder.com/300x200?text=Mini+Militia", description: "Multiplayer shooting game.", trendingScore: 95, featured: false, downloadLinks: [
        { title: "APKPure", url: "https://m.apkpure.com/mini-militia-war-io-app/com.appsomniacs.da2/download" }
    ]
});

addGame("android", {
    id: "shadow-fight-2", title: "Shadow Fight 2", platform: "android", genre: "fighting", size: "150MB", image: "https://via.placeholder.com/300x200?text=Shadow+Fight", description: "Martial arts combat.", trendingScore: 97, featured: true, downloadLinks: [
        { title: "APKPure", url: "https://m.apkpure.com/shadow-fight-2-app/com.nekki.shadowfight/download" }
    ]
});

addGame("android", {
    id: "nfs-no-limits", title: "Need for Speed No Limits", platform: "android", genre: "racing", size: "2GB", image: "https://via.placeholder.com/300x200?text=NFS", description: "Mobile racing game.", trendingScore: 96, featured: true, downloadLinks: [
        { title: "APKPure", url: "https://m.apkpure.com/need-for-speed-no-limits-android/com.ea.game.nfs14_row/download" }
    ]
});

addGame("android", {
    id: "carrom-pool", title: "Carrom Pool", platform: "android", genre: "sports", size: "100MB", image: "https://via.placeholder.com/300x200?text=Carrom", description: "Board game.", trendingScore: 90, featured: false, downloadLinks: [
        { title: "APKPure", url: "https://m.apkpure.com/carrom-pool/com.miniclip.carrom/download" }
    ]
});

addGame("android", {
    id: "theotown", title: "TheoTown", platform: "android", genre: "simulation", size: "200MB", image: "https://via.placeholder.com/300x200?text=TheoTown", description: "City building simulator.", trendingScore: 92, featured: false, downloadLinks: [
        { title: "Drive", url: "https://drive.google.com/file/d/19bFTN9G9byWR1JL1O7HW3pcliU9YRx-U/view" }
    ]
});
/* ================= PS2 ================= */
addGame("ps2", {
    id: "ps2-1",
    title: "God of War II",
    platform: "ps2",
    genre: "action",
    size: "4GB",
    rating: "4.9",
    image: "https://via.placeholder.com/300x200?text=GOW+2",
    downloadLinks: [{ title: "Download", url: "https://romsfun.com/download/god-of-war-ii-12928/14" }]
});

/* keep all your PS2 list */

/* ================= PPSSPP ================= */
addGame("ppsspp", {
    id: "ppsspp-1",
    title: "God of War – Ghost of Sparta",
    platform: "ppsspp",
    genre: "action",
    size: "1.2GB",
    rating: "4.9",
    image: "https://via.placeholder.com/300x200?text=GOW+Sparta",
    downloadLinks: [{ title: "Download", url: "https://drive.google.com/file/d/1f0Vdp2JznTWnfXA5zPbwbL8icWSXtkey/view?usp=drivesdk" }]
});

addGame("ppsspp", {
    id: "ppsspp-2",
    title: "Dante's Inferno",
    platform: "ppsspp",
    genre: "action",
    size: "1GB",
    rating: "4.8",
    image: "https://via.placeholder.com/300x200?text=Dantes+Inferno",
    downloadLinks: [{ title: "Download", url: "https://drive.google.com/file/d/1u-ZvKsqlwTTs1FHAuXWMEyQ4ldPjhBQC/view" }]
});
