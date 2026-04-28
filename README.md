# 🎮 Nimo's Gaming - Ultimate Game Download Platform

> A modern, responsive gaming platform for downloading Android, PPSSPP, PS2, and GTA games with a sleek dark UI and intuitive navigation.

[![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Platform Support](https://img.shields.io/badge/platforms-Android%20%7C%20PPSSPP%20%7C%20PS2%20%7C%20GTA-brightgreen)](README.md)
[![Last Updated](https://img.shields.io/badge/last%20updated-April%202026-blue)](README.md)

---

## 📋 Table of Contents

- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Usage](#-usage)
- [Technologies](#-technologies)
- [Game Platforms](#-game-platforms)
- [File Organization](#-file-organization)
- [Development](#-development)
- [Browser Support](#-browser-support)
- [Contributing](#-contributing)
- [Support](#-support)
- [License](#-license)

---

## ✨ Features

### 🎯 Core Functionality
- **Multi-Platform Support**: Android, PPSSPP, PS2, and GTA games
- **Smart Game Database**: Dynamic game listing with comprehensive metadata
- **Advanced Search**: Real-time game filtering and discovery
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Dark theme with cyan/gold accent colors
- **Fast Loading**: Optimized assets and lazy loading
- **Game Details**: Rating, size, genre, and download information
- **Multiple Download Sources**: Support for multiple download links per game

### 🔍 Search & Filter
- Search games by title
- Filter by platform (Android, PPSSPP, PS2)
- Category-based browsing
- Trending games highlighting
- Featured games section

### 📱 Responsive Features
- Mobile-first design approach
- Touch-friendly interface
- Fast performance on slow connections
- Adaptive layouts for all screen sizes

### 🎨 Design Highlights
- Modern dark theme with vibrant accents
- Smooth animations and transitions
- Glass-morphism effects
- Interactive hover states
- Loading animations
- Smooth scroll behavior

---

## 📁 Project Structure

```
Nimo's Gaming/
├── index.html                 # Homepage
├── Pages/
│   ├── android.html          # Android games page
│   ├── ppsspp.html           # PPSSPP games page
│   ├── ps2.html              # PS2 games page
│   ├── Gta.html              # GTA series page
│   ├── Downloadgta.html      # GTA downloads
│   ├── Download.html         # Download center
│   ├── games-details.html    # Game details view
│   ├── search.html           # Search results
│   ├── categories.html       # Game categories
│   ├── about-us.html         # About page
│   ├── contact.html          # Contact page
│   ├── help.html             # Help/FAQ
│   ├── request.html          # Game request form
│   ├── privacy-policy.html   # Privacy policy
│   ├── terms-of-service.html # Terms of service
│   └── Not-found.html        # 404 page
├── CSS/
│   ├── Style.css             # Main styles
│   ├── GameCards.css         # Game card components
│   ├── Download.css          # Download page (modern)
│   ├── Platform.css          # Platform pages
│   ├── Search.css            # Search page styles
│   ├── Categories.css        # Categories page
│   ├── Gta.css               # GTA page styles
│   ├── Android.css           # Android page styles
│   ├── PPSSPP.css            # PPSSPP page styles
│   ├── Ps2.css               # PS2 page styles
│   ├── ads.css               # Advertisement styles
│   ├── Support.css           # Support/Help styles
│   ├── Legal.css             # Legal pages styles
│   └── 404.css               # Error page styles
├── JS/
│   ├── Main.js               # Main functionality
│   ├── Data.js               # Data handling
│   ├── Details.js            # Game details logic
│   ├── download.js           # Download management
│   ├── Filter.js             # Filtering logic
│   ├── Search.js             # Search functionality
│   ├── Platform.js           # Platform handling
│   ├── Gta.js                # GTA-specific logic
│   ├── Slider.js             # Image/content slider
│   └── ads.js                # Advertisement handling
├── games/
│   └── game-data.json        # Complete game database
├── icon/
│   └── [game-icons]/         # Game cover images
├── ads/
│   ├── leaderboard.html      # Leaderboard ad
│   ├── rectangle.html        # Rectangle ad
│   └── sidebar.html          # Sidebar ad
├── .gitignore                # Git ignore rules
├── README.md                 # This file
└── [Python scripts]/         # Data management scripts

```

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor or IDE (VS Code recommended)
- Git (for version control)
- Python 3.7+ (for data management scripts)

### Quick Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/Nimos-Gaming.git
   cd Nimos-Gaming
   ```

2. **Open in Browser**
   - For local testing: Open `index.html` directly
   - Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js http-server
   npx http-server
   ```

3. **Access the Site**
   - Navigate to `http://localhost:8000`

---

## 💻 Installation

### For GitHub Pages Deployment

1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Nimo's Gaming v1.0"
   git branch -M main
   git remote add origin https://github.com/yourusername/Nimos-Gaming.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Select "Deploy from a branch"
   - Choose `main` branch, `/root` folder
   - Save and wait for deployment

3. **Configure Auto-Deployment**
   - GitHub Pages automatically deploys on push
   - Your site will be live at: `https://yourusername.github.io/Nimos-Gaming`

### Local Installation

1. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/Nimos-Gaming.git
   ```

2. **Navigate to Project**
   ```bash
   cd Nimos-Gaming
   ```

3. **Start Local Server**
   ```bash
   # Option 1: Python 3
   python -m http.server 8000
   
   # Option 2: Python 2
   python -m SimpleHTTPServer 8000
   
   # Option 3: Node.js
   npx http-server -p 8000
   ```

4. **Open Browser**
   - Visit `http://localhost:8000`

---

## 📖 Usage

### Navigating the Site

1. **Home Page**
   - View featured games
   - Quick access to platforms
   - Browse trending games

2. **Platform Pages**
   - Android Games
   - PPSSPP Games
   - PS2 Games
   - GTA Series

3. **Search**
   - Use search bar on any page
   - Filter by platform, genre, rating
   - View trending results

4. **Game Details**
   - Click any game card
   - View ratings, size, description
   - Access download links
   - Check system requirements

5. **Download Center**
   - View all available games
   - Search and filter downloads
   - Access multiple download sources
   - Follow installation guide

### Adding New Games

1. **Edit `games/game-data.json`**
   ```json
   {
     "id": "unique-game-id",
     "title": "Game Title",
     "platform": "android|ppsspp|ps2",
     "genre": "action|rpg|shooter|sports|racing|puzzle|strategy|simulation|fighting|horror|sandbox|battle-royale|multiplayer",
     "size": "XXX MB",
     "rating": "4.5",
     "image": "./icon/game-icon.jpg",
     "description": "Brief game description",
     "trendingScore": 90,
     "featured": true/false,
     "downloadLinks": [
       {
         "name": "Source Name",
         "url": "download-url"
       }
     ]
   }
   ```

2. **Add Game Icon**
   - Place image in `icon/` directory
   - Recommended: 200x300px, JPG/PNG/WebP
   - Update `image` path in JSON

3. **Run Data Scripts** (optional)
   ```bash
   python process_games.py
   python assign_icons.py
   ```

4. **Test & Deploy**
   ```bash
   git add .
   git commit -m "Add new games"
   git push
   ```

---

## 🛠 Technologies

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with custom properties, flexbox, grid
- **JavaScript (ES6+)**: Dynamic content and interactivity
- **Local Storage**: Client-side data caching

### Features
- Responsive Web Design (RWD)
- CSS Custom Properties (Variables)
- CSS Grid & Flexbox
- JavaScript Fetch API
- JSON data format
- Dynamic DOM manipulation

### Performance
- Optimized image loading
- Lazy loading support
- Minified CSS/JS (recommended)
- Fast DOM rendering
- Efficient data structures

---

## 🎮 Game Platforms

### 1. Android Games
- Battle royale, action, RPG titles
- Mobile optimization
- APK downloads with safe sources
- [Browse Android Games](Pages/android.html)

### 2. PPSSPP Games
- PlayStation Portable emulation
- Classic PSP titles
- PPSSPP emulator required
- [Browse PPSSPP Games](Pages/ppsspp.html)

### 3. PS2 Games
- PlayStation 2 classics
- Various genres and eras
- PCSX2 emulator required
- [Browse PS2 Games](Pages/ps2.html)

### 4. GTA Series
- Grand Theft Auto titles
- Multiple platforms
- Dedicated GTA section
- [Browse GTA Games](Pages/Gta.html)

---

## 📊 File Organization

### CSS Organization
```
CSS/
├── Style.css          # Global styles & variables
├── GameCards.css      # Game card components
├── Download.css       # Download page modern styles
├── Platform.css       # Platform page styles
├── Search.css         # Search functionality
├── Categories.css     # Category filtering
├── ads.css            # Advertisement styling
└── [page-specific].css
```

### JavaScript Organization
```
JS/
├── Main.js            # Core app logic
├── Data.js            # Data fetching & processing
├── Details.js         # Game details view
├── Filter.js          # Advanced filtering
├── Search.js          # Search functionality
└── [feature].js
```

### Assets
```
icon/                  # Game cover images
ads/                   # Advertisement templates
games/                 # Game data (JSON)
```

---

## 🔧 Development

### Making Changes

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make Changes**
   - Edit HTML, CSS, or JS files
   - Test locally at `http://localhost:8000`
   - Use browser DevTools for debugging

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

4. **Push to GitHub**
   ```bash
   git push origin feature/your-feature
   ```

5. **Create Pull Request**
   - Go to GitHub repository
   - Click "New Pull Request"
   - Describe changes and submit

### Testing Checklist

- [ ] Test on desktop (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile (iOS Safari, Chrome Mobile)
- [ ] Test on tablet
- [ ] Verify all links work
- [ ] Check game icon display
- [ ] Test search functionality
- [ ] Verify responsive design
- [ ] Check console for errors
- [ ] Test on slow network

### Performance Tips

1. **Optimize Images**
   ```bash
   # Using ImageOptim or similar
   # Max size: 500KB for full resolution
   ```

2. **Minify CSS/JS**
   - Use build tools like Webpack or Parcel
   - Reduce file sizes by 30-50%

3. **Lazy Load Images**
   - Implement native lazy loading
   - Load images on demand

4. **Cache Strategies**
   - Use localStorage for game data
   - Implement service workers for offline support

---

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ✅ Supported |
| Firefox | Latest | ✅ Supported |
| Safari | Latest | ✅ Supported |
| Edge | Latest | ✅ Supported |
| Opera | Latest | ✅ Supported |
| IE 11 | Any | ❌ Not Supported |

---

## 📱 Mobile Support

- **iOS**: Safari 12+
- **Android**: Chrome 90+, Firefox 88+
- **Tablet**: iPad 6+, Samsung Tab S5+
- **Responsive Breakpoints**:
  - Desktop: 1200px+
  - Tablet: 768px - 1199px
  - Mobile: < 768px

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/Nimos-Gaming.git
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Changes**
   - Code should follow existing style
   - Add comments for complex logic
   - Update README if needed

4. **Commit & Push**
   ```bash
   git commit -m "feat: add amazing feature"
   git push origin feature/amazing-feature
   ```

5. **Open Pull Request**
   - Describe your changes
   - Reference any issues
   - Wait for review

### Contribution Guidelines
- Follow HTML5/CSS3/ES6+ best practices
- Keep code DRY (Don't Repeat Yourself)
- Add comments for clarity
- Test thoroughly before submitting
- Follow existing code style
- Update documentation if needed

---

## 📞 Support

### Getting Help

- **Documentation**: Check [README.md](README.md)
- **FAQ**: Visit [Help Page](Pages/help.html)
- **Issues**: Report bugs on [GitHub Issues](https://github.com/yourusername/Nimos-Gaming/issues)
- **Email**: Contact via [Contact Form](Pages/contact.html)

### Reporting Bugs

1. Check if bug already exists
2. Include browser/device info
3. Provide steps to reproduce
4. Share error logs/screenshots
5. Expected vs actual behavior

### Feature Requests

- Describe the feature
- Explain use case
- Share mockups if applicable
- Link related issues

---

## ⚙️ Configuration

### Environment Variables
- No environment variables required
- All configuration is in-app

### Settings
- Theme: Dark mode (default)
- Language: English (default)
- Default platform: All games

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 Nimo's Gaming

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Acknowledgments

- Game data from various sources
- Icons and assets from community
- Inspired by modern gaming platforms
- Built with HTML5, CSS3, and vanilla JavaScript

---

## 📊 Project Stats

- **Total Games**: 200+
- **Platforms**: 4
- **Pages**: 17+
- **Download Sources**: Multiple per game
- **Last Updated**: April 2026
- **GitHub Stars**: ⭐️

---

## 🗺️ Roadmap

### Q2 2026
- [ ] User accounts and favorites
- [ ] Game reviews and ratings
- [ ] Social sharing features
- [ ] Advanced analytics

### Q3 2026
- [ ] Mobile app (React Native)
- [ ] Game recommendations AI
- [ ] Community forums
- [ ] Live chat support

### Q4 2026
- [ ] Cloud saves
- [ ] Multiplayer features
- [ ] Streaming support
- [ ] Premium membership

---

## 📱 Quick Links

- [Home](index.html)
- [Android Games](Pages/android.html)
- [PPSSPP Games](Pages/ppsspp.html)
- [PS2 Games](Pages/ps2.html)
- [GTA Series](Pages/Gta.html)
- [Download Center](Pages/Download.html)
- [Search Games](Pages/search.html)
- [About Us](Pages/about-us.html)
- [Contact](Pages/contact.html)
- [Help](Pages/help.html)

---

<div align="center">

**[⬆ Back to Top](#-nimos-gaming---ultimate-game-download-platform)**

Made with ❤️ by Nimo's Gaming Team

© 2026 Nimo's Gaming. All rights reserved.

</div>
