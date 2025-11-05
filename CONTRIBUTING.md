# Contributing to i18n-countries-continents

Thank you for considering contributing to this project! 🎉

## Ways to Contribute

### 1. 🌍 Add More Countries
Edit `src/data/countries.json` and add new countries following this format:

```json
{
  "code": "XX",
  "continent": "XX",
  "names": {
    "en": "Country Name",
    "fr": "Nom du Pays",
    "es": "Nombre del País",
    "ar": "اسم البلد",
    "nl": "Naam van het Land"
  }
}
```

**Note:** The data is now stored in JSON format for easier editing and maintenance!

### 2. 🗣️ Add More Languages
1. Add the language code to `src/constants.ts`:
```typescript
export const SUPPORTED_LANGUAGES = ["en", "es", "fr", "ar", "nl", "de"] as const;
```

2. Add translations to all countries and continents in:
   - `src/data/countries.json`
   - `src/data/continents.json`

### 3. 🐛 Report Bugs
- Check if the bug already exists in [Issues](https://github.com/ElhourefAissam/i18n-countries-continents/issues)
- Create a new issue with:
  - Clear title
  - Steps to reproduce
  - Expected vs actual behavior
  - Environment details

### 4. 💡 Suggest Features
- Open an issue with the "enhancement" label
- Describe the feature and use case
- Provide examples if possible

### 5. 📝 Improve Documentation
- Fix typos
- Add examples
- Clarify unclear sections
- Translate README to other languages

## Development Setup

### Prerequisites
- Node.js 16+ 
- pnpm (or npm/yarn)
- Git

### Setup Steps

1. **Fork the repository**
   - Click "Fork" on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/i18n-countries-continents.git
   cd i18n-countries-continents
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   ```

4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Make your changes**
   - Edit the code
   - Test your changes

6. **Build the project**
   ```bash
   pnpm build
   ```

7. **Test your changes**
   ```bash
   # Run the test example
   npx tsx test-example.ts
   ```

8. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

9. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

10. **Create a Pull Request**
    - Go to the original repository
    - Click "New Pull Request"
    - Select your branch
    - Fill in the PR template

## Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only
- `style:` Formatting, missing semi-colons, etc.
- `refactor:` Code change that neither fixes a bug nor adds a feature
- `test:` Adding missing tests
- `chore:` Maintain

Examples:
```bash
feat: add Germany to countries list
fix: correct French translation for Japan
docs: update README with new examples
```

## Code Style

- Use TypeScript
- Follow existing code formatting
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

## Testing Checklist

Before submitting a PR, make sure:

- [ ] Code builds without errors (`pnpm build`)
- [ ] No TypeScript errors (`pnpm typecheck`)
- [ ] Test file runs successfully (`npx tsx test-example.ts`)
- [ ] Follows existing code style
- [ ] Commit messages follow conventions
- [ ] PR description explains the changes

## Adding Countries - Quick Reference

### ISO 3166-1 Country Codes
Find codes at: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2

### Continent Codes
- `AF` - Africa
- `AN` - Antarctica
- `AS` - Asia
- `EU` - Europe
- `NA` - North America
- `OC` - Oceania
- `SA` - South America

### Translation Resources
- Google Translate: https://translate.google.com/
- DeepL: https://www.deepl.com/translator
- Native speakers are preferred for accuracy!

## Priority Additions

### Most Requested Countries
- More African countries
- More Asian countries
- More South American countries
- Island nations
- Caribbean countries

### Most Requested Languages
- Portuguese (pt)
- German (de)
- Italian (it)
- Russian (ru)
- Chinese (zh)
- Japanese (ja)
- Hindi (hi)

## Questions?

- Open a [Discussion](https://github.com/ElhourefAissam/i18n-countries-continents/discussions)
- Ask in [Issues](https://github.com/ElhourefAissam/i18n-countries-continents/issues)
- Contact the maintainer

## Code of Conduct

- Be respectful and inclusive
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy towards others

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for making this project better! 🙏
