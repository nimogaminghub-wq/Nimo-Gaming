// =====================================
// ADVANCED DOWNLOAD SYSTEM v2.0
// Enhanced with performance optimizations
// =====================================

// Performance cache
const Cache = {
    data: new Map(),
    ttl: 5 * 60 * 1000, // 5 minutes
    set(key, value) {
        this.data.set(key, { value, timestamp: Date.now() });
    },
    get(key) {
        const item = this.data.get(key);
        if (!item) return null;
        if (Date.now() - item.timestamp > this.ttl) {
            this.data.delete(key);
            return null;
        }
        return item.value;
    },
    clear() {
        this.data.clear();
    }
};

// Download Manager Configuration
const DownloadManager = {
    config: {
        enabled: true,
        analytics: 'local', // 'console', 'local', 'custom'
        autoTrack: true,
        maxQueueSize: 10,
        downloadTimeout: 30000
    },

    queue: [],
    history: [],

    // Track download events with debouncing
    trackDownload(gameData, linkData, eventType = 'click') {
        if (!this.config.enabled) return;

        // Validate inputs
        if (!gameData || !gameData.id || !linkData) {
            console.warn('Invalid tracking data');
            return;
        }

        const trackingData = {
            gameId: gameData.id,
            gameTitle: gameData.title || 'Unknown',
            platform: gameData.platform || 'Unknown',
            linkName: linkData.name || linkData.title || 'Unknown',
            linkUrl: linkData.url || '',
            event: eventType,
            timestamp: new Date().toISOString(),
            page: window.location.pathname
        };

        // Add to history
        this.history.push(trackingData);
        if (this.history.length > 100) this.history.shift();

        // Save to localStorage
        try {
            localStorage.setItem('downloadHistory', JSON.stringify(this.history));
        } catch (error) {
            console.warn('Failed to save download history:', error);
        }

        switch (this.config.analytics) {
            case 'console':
                console.log('📥 Download tracked:', trackingData);
                break;
            case 'local':
                this.saveToLocalStorage(trackingData);
                break;
            case 'custom':
                this.sendToAnalyticsServer(trackingData);
                break;
        }
    },

    // Save to localStorage for offline tracking
    saveToLocalStorage(data) {
        const downloads = JSON.parse(localStorage.getItem('gameDownloads') || '[]');
        downloads.push(data);
        localStorage.setItem('gameDownloads', JSON.stringify(downloads.slice(-100)));
    },

    // Send to custom analytics server
    sendToAnalyticsServer(data) {
        fetch('/api/analytics/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).catch(err => console.error('Analytics error:', err));
    },

    // Add to download queue
    addToQueue(gameData, linkData) {
        if (this.queue.length >= this.config.maxQueueSize) {
            showNotification('Download queue is full. Please wait.', 'warning');
            return false;
        }

        const queueItem = {
            id: gameData.id,
            title: gameData.title,
            link: linkData.url,
            status: 'queued',
            timestamp: new Date().toISOString()
        };

        this.queue.push(queueItem);
        showNotification(`Added "${gameData.title}" to download queue`, 'success');
        return true;
    },

    // Get download statistics
    getStats() {
        return {
            totalDownloads: this.history.length,
            gamesDownloaded: new Set(this.history.map(h => h.gameId)).size,
            popularGames: this.getMostDownloaded(5),
            downloadsByPlatform: this.getDownloadsByPlatform()
        };
    },

    getMostDownloaded(limit = 5) {
        const games = {};
        this.history.forEach(h => {
            games[h.gameTitle] = (games[h.gameTitle] || 0) + 1;
        });
        return Object.entries(games)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([title, count]) => ({ title, count }));
    },

    getDownloadsByPlatform() {
        const platforms = {};
        this.history.forEach(h => {
            platforms[h.platform] = (platforms[h.platform] || 0) + 1;
        });
        return platforms;
    },

    // Initialize download system
    init() {
        this.loadHistory();
        this.setupEventListeners();
        console.log('✅ Download Manager initialized');

        // Validate global games data
        if (!window.games || !Array.isArray(window.games)) {
            console.warn('⚠️ Game data not properly initialized');
            window.games = [];
        }
    },

    loadHistory() {
        try {
            const saved = localStorage.getItem('gameDownloads');
            if (saved) {
                this.history = JSON.parse(saved);
            }
        } catch (error) {
            console.warn('Failed to load download history:', error);
            this.history = [];
            localStorage.removeItem('gameDownloads');
        }
    },

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-download]')) {
                e.preventDefault();
                const gameId = e.target.getAttribute('data-download');
                const linkIndex = e.target.getAttribute('data-link-index');

                // Validation
                if (!gameId || gameId.trim() === '') {
                    showNotification('Invalid game ID', 'error');
                    return;
                }

                handleDownloadClick(gameId, linkIndex);
            }
        });
    }
};

// Show notification popup
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Create and show download modal
function showDownloadModal(game) {
    const modal = document.createElement('div');
    modal.className = 'download-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'modal-title-' + game.id);
    modal.setAttribute('aria-modal', 'true');

    // Ensure downloadLinks exists and has proper structure
    const links = Array.isArray(game.downloadLinks) ? game.downloadLinks : [];

    modal.innerHTML = `
        <div class="download-modal-content">
            <button class="modal-close" onclick="this.closest('.download-modal').remove()" aria-label="Close dialog">✕</button>
            <div class="modal-header">
                <img src="${game.image}" alt="${game.title} - Game Cover" class="modal-game-image">
                <div class="modal-info">
                    <h2 id="modal-title-${game.id}">${game.title}</h2>
                    <p class="modal-platform" aria-label="Platform">📱 ${(game.platform || 'Unknown').toUpperCase()}</p>
                </div>
            </div>
            <div class="modal-body">
                <div class="game-stats" role="region" aria-label="Game Statistics">
                    <span>⭐ ${game.rating || 'N/A'}</span>
                    <span>📦 ${game.size || 'Unknown'}</span>
                    <span>📂 ${(game.genre || 'General').charAt(0).toUpperCase() + (game.genre || 'general').slice(1)}</span>
                </div>
                <p class="game-description">${game.description || 'No description available.'}</p>
                <h3>Download Options:</h3>
                <div class="download-options" role="list">
                    ${links.length > 0 ? links.map((link, idx) => {
        const linkName = link.name || link.title || 'Download Link ' + (idx + 1);
        const linkUrl = link.url || '#';
        return `
                        <a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="download-option-btn" 
                           role="listitem"
                           data-download="${game.id}" data-link-index="${idx}"
                           onclick="DownloadManager.trackDownload(${JSON.stringify({ id: game.id, title: game.title, platform: game.platform })}, ${JSON.stringify(link)}, 'start'); return true;">
                            <span class="option-name">${linkName}</span>
                            <span class="option-arrow">→</span>
                        </a>
                    `}).join('') : '<p style="color: #94a3b8; padding: 10px;">No download links available.</p>'}
                </div>
                <p class="safety-note">⚠️ Download only from trusted sources. Always scan files for viruses.</p>
            </div>
        </div>
    `;

    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 5000;
        animation: fadeIn 0.3s ease-out;
    `;

    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });

    // Close on Escape key
    const closeOnEscape = (e) => {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', closeOnEscape);
        }
    };
    document.addEventListener('keydown', closeOnEscape);
}

// Handle download click
function handleDownloadClick(gameId, linkIndex = 0) {
    const game = window.games?.find(g => g.id === gameId);
    if (!game) {
        showNotification('Game not found', 'error');
        return;
    }

    showDownloadModal(game);
}

// Direct download function
async function directDownload(gameId, linkIndex = 0) {
    const game = window.games?.find(g => g.id === gameId);
    if (!game) {
        showNotification('Game not found', 'error');
        return;
    }

    const links = Array.isArray(game.downloadLinks) ? game.downloadLinks : [];
    if (!links[linkIndex]) {
        showNotification('Invalid download link', 'error');
        return;
    }

    const link = links[linkIndex];
    const linkUrl = link.url || link.link || '#';

    if (!linkUrl || linkUrl === '#') {
        showNotification('Download link unavailable', 'error');
        return;
    }

    DownloadManager.trackDownload(game, link, 'start');
    window.open(linkUrl, '_blank', 'noopener,noreferrer');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    DownloadManager.init();
});

// Export for global use
window.DownloadManager = DownloadManager;
window.handleDownloadClick = handleDownloadClick;
window.directDownload = directDownload;
window.showNotification = showNotification;
