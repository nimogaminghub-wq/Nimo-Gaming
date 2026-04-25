// ================= DOWNLOAD BUTTON HANDLER ================= 
document.querySelectorAll(".download-btn").forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        const toastMessage = "🎮 Navigating to download page...";
        showToast(toastMessage, 2000);

        setTimeout(() => {
            window.location.href = this.href;
        }, 800);
    });
});

// ================= GALLERY IMAGE MODAL ================= 
document.querySelectorAll(".grid img").forEach(img => {
    img.addEventListener("click", function () {
        openImageModal(this.src, this.alt);
    });
    img.style.cursor = "pointer";
});

function openImageModal(src, alt) {
    const modal = document.createElement("div");
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        cursor: pointer;
        animation: fadeIn 0.3s ease;
    `;

    const imgElement = document.createElement("img");
    imgElement.src = src;
    imgElement.alt = alt;
    imgElement.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 255, 204, 0.3);
        border: 2px solid #00ffcc;
    `;

    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "&times;";
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 36px;
        background: none;
        border: none;
        color: #00ffcc;
        cursor: pointer;
        font-weight: bold;
        transition: transform 0.2s ease;
    `;

    closeBtn.addEventListener("mouseover", () => {
        closeBtn.style.transform = "scale(1.2)";
    });

    closeBtn.addEventListener("mouseout", () => {
        closeBtn.style.transform = "scale(1)";
    });

    const closeModal = () => {
        modal.style.animation = "fadeOut 0.3s ease";
        setTimeout(() => modal.remove(), 300);
    };

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });

    modal.appendChild(imgElement);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
}

// ================= TOAST NOTIFICATION ================= 
function showToast(message, duration = 3000) {
    const toast = document.createElement("div");
    toast.innerHTML = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00ffcc 0%, #00e6b8 100%);
        color: #000;
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: bold;
        font-size: 14px;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0, 255, 204, 0.3);
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = "slideOutRight 0.3s ease";
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ================= SMOOTH SCROLL FOR NAVIGATION ================= 
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// ================= NAVBAR ACTIVE LINK DETECTION ================= 
document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname;
    document.querySelectorAll(".nav-links a").forEach(link => {
        if (link.pathname === currentPage) {
            link.style.color = "#00ffcc";
            link.style.borderBottom = "2px solid #00ffcc";
        }
    });
});

// ================= SCROLL ANIMATION FOR ELEMENTS ================= 
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = "fadeInUp 0.6s ease forwards";
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll("section, .download-card, .step").forEach(el => {
    el.style.opacity = "0";
    observer.observe(el);
});

// ================= CSS KEYFRAMES FOR ANIMATIONS ================= 
const style = document.createElement("style");
style.innerHTML = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// ================= CONSOLE MESSAGE ================= 
console.log("%cNimo's Gaming - GTA San Andreas Page Loaded!", "color: #00ffcc; font-size: 16px; font-weight: bold;");