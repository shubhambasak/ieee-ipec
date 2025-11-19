# Contributing Guide

Follow this workflow for contributing to the ieee-ipec website.

## 1. Requirements
- GitHub account with 2FA enabled
- SSH key added to GitHub (recommended)
- Node.js and bun installed (project-specific)

## 2. Workflow
### Create a new branch
git checkout -b feature/<yourname>-short-desc

### Make changes → Commit
git add .
git commit -m "feat: short message"

### Push your branch
git push origin feature/<yourname>-short-desc

### Open a Pull Request
- Go to the repo on GitHub  
- Create a PR from your branch → `main`  
- Wait for at least **1 approval**  
- CI must pass before merging

## 3. Branch naming rules
- `feature/<yourname>-something`
- `fix/<yourname>-something`
- `docs/<yourname>-something`
- `chore/<yourname>-something`

## 4. Code rules
- Do not commit `.env` or secrets
- Keep commits small and meaningful
- Use descriptive PR titles

## 5. Getting updates from main
git checkout main
git pull origin main

## 6. If you are mid-work
git stash
git pull
git stash pop
