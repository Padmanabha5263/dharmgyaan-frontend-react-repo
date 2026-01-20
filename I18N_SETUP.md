# i18n (Internationalization) Setup Guide

## Overview
This project uses **i18next** with **react-i18next** to provide multi-language support. The app currently supports:
- **English** (en)
- **Hindi** (hi)

## Project Structure

### Key Files
- `src/utils/i18n.ts` - i18next configuration
- `public/locales/{language}/common.json` - Translation files
- `src/components/LanguageSwitcher.tsx` - Language selection UI component
- `src/main.tsx` - i18n initialization
- `src/App.tsx` - Suspense fallback for loading translations

### Translation Files Location
```
public/
├── locales/
│   ├── en/
│   │   └── common.json
│   ├── hi/
│   │   └── common.json
```

## Usage

### In React Components
```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return <h1>{t('common.welcomeBack')}</h1>;
}
```

### Language Switcher Component
Import and use the `LanguageSwitcher` component in any page:
```tsx
import LanguageSwitcher from '../components/LanguageSwitcher';

<LanguageSwitcher />
```

This displays a dropdown menu to switch between available languages. The selected language is automatically saved to localStorage.

## Adding New Languages

### Step 1: Create Translation File
Create a new file at `public/locales/{languageCode}/common.json`:
```json
{
  "common": {
    "welcomeBack": "Your translation here",
    "email": "Your translation here",
    ...
  }
}
```

### Step 2: Update Language Switcher
Edit `src/components/LanguageSwitcher.tsx` and add the language to the `languages` array:
```tsx
const languages = [
  { code: 'en', name: t('common.english') },
  { code: 'hi', name: t('common.hindi') },
  { code: 'xx', name: t('common.xx') },  // Add your language
];
```

### Step 3: Update i18n Configuration (if needed)
Edit `src/utils/i18n.ts` if you want to set a different fallback language or modify detection settings.

## Adding New Translation Keys

### Step 1: Add Key to All Language Files
In `public/locales/en/common.json`:
```json
{
  "common": {
    "newKey": "English text"
  }
}
```

In `public/locales/hi/common.json`:
```json
{
  "common": {
    "newKey": "हिंदी पाठ"
  }
}
```

### Step 2: Use in Component
```tsx
<Typography>{t('common.newKey')}</Typography>
```

## Features

### Automatic Language Detection
The app uses `i18next-browser-languagedetector` which automatically detects:
1. localStorage setting (if user previously selected a language)
2. Browser language preference
3. Falls back to English if unavailable

### Local Storage
Selected language is stored in localStorage under the key set by i18next, so users' language preference persists across sessions.

### Suspense Support
The app wraps routes with `<Suspense>` fallback to handle async translation loading.

## Configuration

### i18n Configuration (src/utils/i18n.ts)
```typescript
i18n.init({
  fallbackLng: 'en',           // Default language
  ns: ['common'],              // Namespace for translations
  defaultNS: 'common',         // Default namespace
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json'
  },
  detection: {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage']
  }
});
```

## Tips & Best Practices

1. **Keep keys descriptive**: Use clear, hierarchical naming (e.g., `common.welcomeBack`, `errors.passwordMismatch`)
2. **Update all languages**: Always add translation keys to all language files to avoid missing translations
3. **Use translation keys consistently**: Don't mix translated and non-translated text
4. **Test language switching**: Verify the UI updates correctly when language changes
5. **For dynamic content**: Use interpolation in i18next if you have variables:
   ```json
   { "greeting": "Hello {{name}}" }
   ```
   ```tsx
   {t('common.greeting', { name: 'John' })}
   ```

## Troubleshooting

### Translations Not Showing
- Check that the translation key exists in all language files
- Verify the namespace in your component matches the file name
- Check browser console for i18next errors

### Language Not Switching
- Clear localStorage and try again
- Check that `LanguageSwitcher` component is properly imported
- Verify language files are in `public/locales/{code}/common.json`

### Missing Translations Warning
i18next will warn if a key is missing. Check the browser console for details and add the missing key to the language file.
