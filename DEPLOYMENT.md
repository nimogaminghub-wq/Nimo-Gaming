# 🚀 GitHub Pages Deployment Guide

## Quick Start

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Prerequisites

- GitHub account
- Git installed locally
- Repository created on GitHub

### Step 1: Initial Setup (One-Time)

1. **Create a GitHub Repository**
   ```bash
   # Create a new repository on GitHub.com named "Nimos-Gaming"
   # OR fork this repository
   ```

2. **Add GitHub Remote**
   ```bash
   cd Nimos-Gaming
   git remote add origin https://github.com/YOUR_USERNAME/Nimos-Gaming.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under "Build and deployment":
     - **Source**: Select "GitHub Actions"
     - Click **Save**

### Step 2: Automatic Deployment

Once configured, the site will automatically deploy whenever you:

1. Push commits to the `main` branch
2. Create a pull request to `main`

**The deploy workflow will:**
- Run validation checks
- Build/process files if needed
- Deploy to GitHub Pages
- Create a deployment summary

### Step 3: Access Your Site

After deployment completes, your site will be available at:

```
https://YOUR_USERNAME.github.io/Nimos-Gaming/
```

**For custom domain:**
1. Go to **Settings** → **Pages**
2. Under "Custom domain", enter your domain (e.g., `nimos-gaming.com`)
3. Update DNS records with GitHub's IP addresses (shown on the Pages settings)
4. Enable HTTPS (recommended)

---

## Manual Deployment

If you need to deploy manually without pushing to main:

1. **Update and Commit Locally**
   ```bash
   git add .
   git commit -m "Update content"
   ```

2. **Push to GitHub**
   ```bash
   git push origin main
   ```

3. **Monitor Deployment**
   - Go to repository
   - Click **Actions** tab
   - View workflow run status
   - Check deployment summary

---

## Development Workflow

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/add-new-games
   ```

2. **Make changes**
   - Edit HTML, CSS, JS, or JSON files
   - Test locally: `python -m http.server 8000`
   - Check for errors: `python validate_project.py`

3. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: add new games"
   ```

4. **Push to feature branch**
   ```bash
   git push origin feature/add-new-games
   ```

5. **Create Pull Request**
   - Go to GitHub repository
   - Click "New Pull Request"
   - Select `feature/add-new-games` → `main`
   - Describe changes
   - Click "Create Pull Request"

6. **Review & Merge**
   - Review changes in PR
   - Deploy workflow runs automatically
   - Click "Merge pull request"
   - Delete feature branch

### After Merge

- Deployment workflow automatically runs
- Site updates on GitHub Pages within 1-2 minutes
- Check Actions tab for deployment status

---

## Continuous Integration Checks

The workflow automatically checks for:

- ✅ HTML syntax errors
- ✅ CSS validation
- ✅ JSON file validity
- ✅ Missing image files
- ✅ Broken links
- ✅ Code formatting

**To run checks locally:**
```bash
python validate_project.py
```

---

## Troubleshooting

### Deployment Failed

1. **Check workflow logs**
   - Go to **Actions** tab
   - Click on the failed workflow
   - Review error messages

2. **Common issues:**
   - Invalid JSON syntax: `python -m json.tool games/game-data.json`
   - Missing files: Check paths in HTML and JSON
   - Git conflicts: Pull latest changes first

### Site Not Updating

1. Check if workflow completed successfully
2. Clear browser cache (Ctrl+Shift+Delete)
3. Wait 2-5 minutes for CDN update
4. Check GitHub Pages settings

### Permission Issues

- Ensure repository is not private (or workflows are enabled)
- Check GitHub token in repository secrets
- Verify branch protection rules don't block deployments

---

## GitHub Pages Settings

### Configure Pages

1. Go to **Settings** → **Pages**
2. Choose deployment source:
   - **GitHub Actions** (recommended) - Uses `deploy.yml`
   - **Deploy from a branch** - Manual setup

3. Select branch and folder:
   - Branch: `main` (or `gh-pages` if using separate branch)
   - Folder: `/ (root)`

### Custom Domain

1. Create `CNAME` file in repository root:
   ```
   nimos-gaming.com
   ```

2. Update DNS records:
   - Type: `A` records pointing to GitHub Pages IPs
   - Or: `CNAME` pointing to `username.github.io`

3. Update Pages settings with custom domain

### HTTPS

- Enable HTTPS (automatic for GitHub Pages)
- Check "Enforce HTTPS" in Pages settings
- Wait 24 hours for certificate issuance

---

## Advanced Configuration

### Exclude Files from Deployment

Files listed in `.gitignore` won't be committed or deployed:

```
# .gitignore
node_modules/
*.log
.env
*.tmp
```

### GitHub Actions Secrets

For sensitive information:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add secret (e.g., API keys, tokens)
4. Reference in workflow: `${{ secrets.SECRET_NAME }}`

### Environment Variables

In `.github/workflows/deploy.yml`:
```yaml
env:
  DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
  SITE_URL: https://username.github.io/Nimos-Gaming
```

---

## Rollback Deployment

If you need to revert to a previous version:

1. **Find previous commit**
   ```bash
   git log --oneline
   ```

2. **Reset to previous commit**
   ```bash
   git revert <commit-hash>
   ```
   OR (dangerous - use with caution)
   ```bash
   git reset --hard <commit-hash>
   ```

3. **Force push**
   ```bash
   git push origin main --force
   ```

4. **Deployment reruns automatically**

---

## Monitoring Deployments

### GitHub Actions Dashboard

- View all workflow runs
- Check logs for each step
- Download artifacts if available
- Re-run failed workflows

### Status Badge

Add this to your README to show deployment status:

```markdown
![Deploy Status](https://github.com/YOUR_USERNAME/Nimos-Gaming/actions/workflows/deploy.yml/badge.svg)
```

### Email Notifications

1. Go to **Notifications** settings
2. Enable "Email" notifications
3. Select "Workflow runs"

---

## Best Practices

1. **Test locally first**
   ```bash
   python -m http.server 8000
   ```

2. **Validate before pushing**
   ```bash
   python validate_project.py
   ```

3. **Use meaningful commit messages**
   ```bash
   git commit -m "feat: add 10 new Android games with descriptions"
   ```

4. **Review changes before merging**
   - Check diff in PR
   - Test changes locally
   - Verify images load correctly

5. **Monitor deployment**
   - Check Actions tab after pushing
   - Wait for completion notification
   - Test live site

---

## Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Deployment Documentation](https://docs.github.com/en/pages/getting-started-with-github-pages)

---

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review GitHub Pages [FAQ](https://docs.github.com/en/pages/getting-started-with-github-pages)
3. Create an issue in the repository
4. Contact support

---

## Quick Commands Reference

```bash
# Clone repository
git clone https://github.com/username/Nimos-Gaming.git

# Check status
git status

# Add changes
git add .

# Commit
git commit -m "message"

# Push to main (automatic deployment)
git push origin main

# Create feature branch
git checkout -b feature/name

# Push feature branch
git push origin feature/name

# View logs
git log --oneline

# Validate project
python validate_project.py

# Run local server
python -m http.server 8000
```

---

**Made with ❤️ by Nimo's Gaming**
