# Publishing Guide

## Pre-Publishing Checklist

Before publishing to npm, make sure you have completed all these steps:

### 1. ✅ Setup npm Account
- Create an account at https://www.npmjs.com/ if you don't have one
- Verify your email address
- Enable 2FA (Two-Factor Authentication) for security

### 2. ✅ Login to npm
```bash
npm login
```
Enter your npm credentials when prompted.

### 3. ✅ Verify Package Name Availability
```bash
npm view i18n-countries-continents
```
If the package doesn't exist, you're good to go!

### 4. ✅ Build the Package
```bash
pnpm build
```
Make sure there are no errors.

### 5. ✅ Test Locally
```bash
npm pack
```
This creates a tarball you can test locally before publishing.

### 6. ✅ Version Management
Update version in `package.json` based on semantic versioning:
- **Patch** (1.0.X): Bug fixes
- **Minor** (1.X.0): New features (backward compatible)
- **Major** (X.0.0): Breaking changes

```bash
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

### 7. ✅ Publish to npm

**Dry run first (recommended):**
```bash
npm publish --dry-run
```

**Actual publish:**
```bash
npm publish
```

**For scoped packages (optional):**
```bash
npm publish --access public
```

## Post-Publishing

### Verify Your Package
```bash
npm view i18n-countries-continents
```

### Install and Test
```bash
npm install i18n-countries-continents
```

### Create Git Tag
```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

## Package Statistics & Marketing

### Add Badges to README.md
```markdown
[![npm version](https://badge.fury.io/js/i18n-countries-continents.svg)](https://www.npmjs.com/package/i18n-countries-continents)
[![npm downloads](https://img.shields.io/npm/dm/i18n-countries-continents.svg)](https://www.npmjs.com/package/i18n-countries-continents)
[![license](https://img.shields.io/npm/l/i18n-countries-continents.svg)](https://github.com/ElhourefAissam/i18n-countries-continents/blob/master/LICENSE)
```

### Share Your Package
- Twitter/X
- Reddit (r/javascript, r/webdev, r/reactjs, etc.)
- Dev.to
- Your blog or website

## Updating the Package

### For Bug Fixes
```bash
# 1. Fix the bug
# 2. Update CHANGELOG.md
# 3. Bump version
npm version patch
# 4. Rebuild
pnpm build
# 5. Publish
npm publish
# 6. Push to GitHub
git push && git push --tags
```

### For New Features
```bash
# 1. Add feature
# 2. Update README.md if needed
# 3. Update CHANGELOG.md
# 4. Bump version
npm version minor
# 5. Rebuild
pnpm build
# 6. Publish
npm publish
# 7. Push to GitHub
git push && git push --tags
```

## Troubleshooting

### Common Issues

**"Package name already exists"**
- Choose a different name or use a scoped package: `@yourusername/i18n-countries-continents`

**"No permission to publish"**
- Make sure you're logged in: `npm whoami`
- Check package name ownership

**"ENEEDAUTH"**
- Run `npm login` again

**Build fails**
- Check TypeScript errors: `pnpm typecheck`
- Make sure all dependencies are installed: `pnpm install`

## Package.json Important Fields

```json
{
  "name": "i18n-countries-continents",
  "version": "1.0.0",
  "description": "...",
  "main": "dist/index.js",      // CommonJS entry
  "types": "dist/index.d.ts",   // TypeScript definitions
  "files": ["dist"],            // What to include
  "keywords": [...],            // For npm search
  "repository": {...},          // GitHub link
  "license": "MIT"
}
```

## Useful npm Commands

```bash
# Check what files will be published
npm pack --dry-run

# View package info
npm view i18n-countries-continents

# Check outdated dependencies
npm outdated

# Update dependencies
npm update

# Unpublish (within 72 hours)
npm unpublish i18n-countries-continents@1.0.0

# Deprecate a version
npm deprecate i18n-countries-continents@1.0.0 "Please use version 1.0.1"
```

## Best Practices

1. ✅ Always test locally before publishing
2. ✅ Keep CHANGELOG.md updated
3. ✅ Use semantic versioning
4. ✅ Write clear commit messages
5. ✅ Tag releases in git
6. ✅ Respond to issues and PRs
7. ✅ Keep README up to date
8. ✅ Add examples and documentation
9. ✅ Use TypeScript for better DX
10. ✅ Add tests (consider adding Jest or Vitest later)

## Future Improvements

- [ ] Add unit tests (Jest/Vitest)
- [ ] Add CI/CD (GitHub Actions)
- [ ] Add code coverage badges
- [ ] Expand country/continent data
- [ ] Add more languages
- [ ] Create interactive docs site
- [ ] Add validation functions
- [ ] Performance benchmarks
