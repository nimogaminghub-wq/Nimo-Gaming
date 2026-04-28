# 🛠️ VS Code Setup Guide

## Installation & Initial Setup

### 1. Install VS Code Extensions

These extensions are recommended for optimal development experience:

**Essential:**
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) - Local development server
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Code formatting
- [HTML CSS Support](https://marketplace.visualstudio.com/items?itemName=ecmel.vscode-html-css) - HTML/CSS support

**Recommended:**
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) - Git integration
- [JSON Validator](https://marketplace.visualstudio.com/items?itemName=Appsilon.json-validator) - JSON validation
- [VS Code Icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons) - File icons
- [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) - API testing
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) - Spell checking

**Install Command:**
```bash
# You can also install from the Extensions marketplace in VS Code
code --install-extension ritwickdey.LiveServer
code --install-extension esbenp.prettier-vscode
code --install-extension ecmel.vscode-html-css
code --install-extension eamodio.gitlens
code --install-extension Appsilon.json-validator
```

### 2. Configure VS Code Settings

Settings are already configured in `.vscode/settings.json`

**Key Settings:**
- Auto-format on save
- 2-space indentation
- Trim trailing whitespace
- Insert final newline
- HTML, CSS, JS validation enabled

### 3. Configure Git

```bash
# Set Git user
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default branch
git config --global init.defaultBranch main

# Enable credential caching (for HTTPS)
git config --global credential.helper cache
```

---

## Workflow Setup

### 1. Clone Repository

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/Nimos-Gaming.git

# Navigate to project
cd Nimos-Gaming

# Open in VS Code
code .
```

### 2. Install Dependencies (Optional)

If you want to use build tools:

```bash
# Initialize Node.js project (optional)
npm init -y

# Install dev dependencies
npm install --save-dev prettier eslint live-server
```

### 3. Start Development Server

**Option 1: Using Live Server Extension**
1. Right-click on `index.html`
2. Select "Open with Live Server"
3. Browser opens at `http://127.0.0.1:5500`

**Option 2: Using Python**
```bash
python -m http.server 8000
# Navigate to http://localhost:8000
```

**Option 3: Using Node.js**
```bash
npm install -g http-server
http-server -p 8000
```

---

## Daily Development Tasks

### Adding New Games

1. **Edit game-data.json**
   ```bash
   # Open games/game-data.json
   # Add new game entry:
   {
     "id": "unique-id",
     "title": "Game Title",
     "platform": "android|ppsspp|ps2",
     "genre": "action",
     "size": "XXX MB",
     "rating": 4.5,
     "image": "./icon/game-image.jpg",
     "description": "Game description",
     "featured": false,
     "downloadLinks": [
       {
         "name": "APKPure",
         "url": "https://..."
       }
     ]
   }
   ```

2. **Add Game Image**
   ```bash
   # Copy image to icon/ directory
   # Image should be ~200x300px, JPG or PNG
   ```

3. **Validate**
   ```bash
   python validate_project.py
   ```

4. **Test Locally**
   - Start live server
   - Navigate to appropriate platform page
   - Verify game appears correctly
   - Test download links

### Making Code Changes

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make changes**
   - Edit files in VS Code
   - Prettier auto-formats on save
   - Live Server shows changes in real-time

3. **Validate changes**
   ```bash
   python validate_project.py
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: describe your changes"
   git push origin feature/your-feature
   ```

5. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Describe changes
   - Request review if needed

### Debugging

**VS Code Debugger for Chrome**
1. Install [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
2. Add breakpoints in VS Code
3. Press F5 to start debugging

**Browser DevTools**
1. Press F12 in browser
2. Check Console for errors
3. Inspect elements for styling issues
4. Check Network tab for asset loading

**Common Issues:**
- Images not showing: Check file paths in JSON
- Styling not applying: Clear browser cache (Ctrl+Shift+Delete)
- JavaScript not running: Check browser console for errors
- Git issues: Check git status (`git status`)

---

## File Organization Tips

### Quick Navigation

Press `Ctrl+P` to quick-open files:
- `index.html` - Homepage
- `CSS/Style.css` - Main styles
- `JS/Main.js` - Main functionality
- `games/game-data.json` - Game database

### Search

Press `Ctrl+Shift+F` to search across all files:
- Find game by title: `"title": "Game Name"`
- Find broken links: `href="broken"`
- Find console.logs: `console.log`

### File Structure

```
Nimo's Gaming/
├── .github/           # GitHub configuration
├── .vscode/           # VS Code settings
├── CSS/               # Stylesheets
├── JS/                # JavaScript files
├── Pages/             # HTML pages
├── ads/               # Ad components
├── games/             # Game data (JSON)
├── icon/              # Game images
├── index.html         # Homepage
├── README.md          # Documentation
└── [config files]     # Git, validation, etc.
```

---

## Best Practices

### Code Style

- Use 2-space indentation
- Add meaningful class/id names
- Comment complex logic
- Follow existing patterns
- Use semantic HTML

### Commits

```bash
# Good commit message
git commit -m "feat: add 5 new Android games with descriptions"

# Bad commit message
git commit -m "update"

# Types: feat, fix, docs, style, refactor, perf, ci
```

### Testing

Before pushing:
```bash
# 1. Validate code
python validate_project.py

# 2. Test locally
# - Check all links work
# - Verify images display
# - Test on mobile (DevTools)
# - Check console for errors

# 3. Commit and push
git push origin feature-branch
```

---

## Performance Tips

### Optimize Images
```bash
# Use ImageOptim or similar tools
# Keep images < 500KB
# Use appropriate format (JPG for photos, PNG for graphics, WebP for modern)
```

### CSS/JS Optimization
- Minimize CSS/JS in production
- Remove unused code
- Combine files if possible
- Use CSS variables for consistency

### Caching
- Leverage browser caching
- Use service workers for offline support
- Cache game data in localStorage

---

## Git Workflow with VS Code

### VS Code Git Integration

1. **View Changes**: Click Source Control icon (Ctrl+Shift+G)
2. **Stage Changes**: Click + next to file
3. **Commit**: Type message and press Ctrl+Enter
4. **Push**: Click ... → Push
5. **Pull**: Click ... → Pull

### Useful Git Commands

```bash
# View status
git status

# View diff
git diff

# View logs
git log --oneline

# Stash changes
git stash

# Undo last commit (local only)
git reset --soft HEAD~1

# Create new branch
git checkout -b feature/name

# Switch branches
git checkout main

# Delete branch
git branch -d feature/name
```

---

## Troubleshooting

### Extension Issues

**Live Server not working:**
```bash
# Restart VS Code
# Check firewall settings
# Use alternative server: python -m http.server 8000
```

**Prettier not formatting:**
```bash
# Check if file is saved
# Ensure Prettier is installed
# Check .vscode/settings.json configuration
```

**Git errors:**
```bash
# Reset to clean state
git reset --hard HEAD

# Remove lock file
rm .git/index.lock

# Reconfigure git
git config user.name "Your Name"
git config user.email "email@example.com"
```

### Performance Issues

**VS Code running slow:**
- Disable unused extensions
- Check for processes consuming resources
- Increase memory allocation
- Update VS Code to latest version

**Live Server not updating:**
- Check file save status
- Reload browser (F5 or Ctrl+R)
- Restart Live Server
- Check firewall/antivirus blocking

---

## Useful Commands

```bash
# Show hidden files (.gitignore, .vscode, etc.)
# Press Ctrl+Shift+. in VS Code

# Format entire file
Ctrl+Shift+P → Format Document

# Format selection
Ctrl+K Ctrl+F

# Delete line
Ctrl+Shift+K

# Comment/uncomment
Ctrl+/

# Multi-cursor editing
Ctrl+D (select next instance)
Ctrl+Shift+L (select all instances)

# Go to file
Ctrl+P

# Go to line
Ctrl+G

# Find and replace
Ctrl+H

# Open terminal
Ctrl+`

# Split editor
Ctrl+\ or Ctrl+K Ctrl+\
```

---

## Extensions Recommendations by Task

**For Game Content:**
- JSONValidator - Validate game-data.json
- Live Server - Test changes locally

**For Styling:**
- HTML CSS Support - CSS autocomplete
- Color Picker - Pick colors visually
- Thunder Client - Test CSS changes

**For Version Control:**
- GitLens - Advanced Git features
- Git Graph - Visualize git history
- Github Pull Requests - Manage PRs in VS Code

**For Documentation:**
- Markdown All in One - Markdown support
- Spell Checker - Catch typos

---

## Resources

- [VS Code Documentation](https://code.visualstudio.com/docs)
- [VS Code Shortcuts](https://code.visualstudio.com/docs/getstarted/keybindings)
- [Git Documentation](https://git-scm.com/doc)
- [HTML/CSS/JS References](https://developer.mozilla.org)

---

**Happy Coding! 🚀**
