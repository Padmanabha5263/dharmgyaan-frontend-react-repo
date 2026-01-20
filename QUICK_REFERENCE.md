# Quick Reference: Using i18n in DharmGyaan

## Basic Usage in Components

```tsx
import { useTranslation } from 'react-i18next';

export function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('common.welcomeBack')}</h1>
      <p>{t('common.signInToContinue')}</p>
    </div>
  );
}
```

## Add Language Switcher to Any Page

```tsx
import LanguageSwitcher from '../components/LanguageSwitcher';

export function MyPage() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <LanguageSwitcher />
      {/* Rest of page */}
    </Box>
  );
}
```

## All Translation Keys (Copy-Paste Ready)

```
t('common.welcomeBack')
t('common.signInToContinue')
t('common.email')
t('common.password')
t('common.signIn')
t('common.signInWithGoogle')
t('common.noAccount')
t('common.signUp')
t('common.createAccount')
t('common.signUpToContinue')
t('common.fullName')
t('common.confirmPassword')
t('common.passwordsDoNotMatch')
t('common.haveAccount')
t('common.selectReligion')
t('common.chooseReligion')
t('common.startQuiz')
t('common.quiz')
t('common.question')
t('common.of')
t('common.next')
t('common.previous')
t('common.submit')
t('common.results')
t('common.yourScore')
t('common.correctAnswers')
t('common.totalQuestions')
t('common.retakeQuiz')
t('common.goHome')
t('common.loading')
t('common.error')
t('common.success')
t('common.cancel')
t('common.save')
t('common.delete')
t('common.edit')
t('common.language')
t('common.english')
t('common.hindi')
t('common.logout')
t('common.congratulations')
t('common.tryAgain')
t('common.passedExam')
t('common.needMorePractice')
t('common.answerSummary')
t('common.correct')
t('common.incorrect')
```

## File Locations

```
📁 Project Root
├── src/
│   ├── utils/
│   │   └── i18n.ts                    ← i18n config
│   ├── components/
│   │   └── LanguageSwitcher.tsx       ← Language dropdown
│   ├── pages/
│   │   ├── SignIn.tsx                 ← Uses i18n
│   │   ├── SignUp.tsx                 ← Uses i18n
│   │   ├── Quiz.tsx                   ← Uses i18n
│   │   ├── Results.tsx                ← Uses i18n
│   │   └── ReligionSelect.tsx         ← Uses i18n
│   ├── App.tsx                         ← Suspense wrapper
│   └── main.tsx                        ← i18n import
├── public/
│   └── locales/
│       ├── en/
│       │   └── common.json            ← English translations
│       └── hi/
│           └── common.json            ← Hindi translations
└── I18N_SETUP.md                       ← Full documentation
```

## Add New Language (Example: Spanish)

### 1. Create translation file
`public/locales/es/common.json`
```json
{
  "common": {
    "welcomeBack": "¡Bienvenido de nuevo!",
    "email": "Correo electrónico",
    // ... add all 45+ keys
  }
}
```

### 2. Update Language Switcher
Edit `src/components/LanguageSwitcher.tsx`:
```tsx
const languages = [
  { code: 'en', name: t('common.english') },
  { code: 'hi', name: t('common.hindi') },
  { code: 'es', name: t('common.spanish') },  // ← Add this
];
```

### 3. Add Translation Key (if needed)
In `public/locales/en/common.json`:
```json
"spanish": "Spanish"
```
In `public/locales/hi/common.json`:
```json
"spanish": "स्पेनिश"
```

## Common Patterns

### Conditional Translation
```tsx
const message = isCorrect ? t('common.correct') : t('common.incorrect');
```

### Dynamic Content
```tsx
<Typography>{t('common.question')} {questionNumber} {t('common.of')} {totalQuestions}</Typography>
```

### With Material-UI Components
```tsx
<TextField label={t('common.email')} />
<Button>{t('common.signIn')}</Button>
<Typography variant="h4">{t('common.welcomeBack')}</Typography>
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Translation not showing | Check key exists in both en and hi JSON files |
| Language not changing | Clear localStorage, refresh browser |
| Console warning about missing key | Add the key to all language files |
| Switcher not appearing | Import `LanguageSwitcher` component correctly |

## Files Modified
- ✅ src/main.tsx
- ✅ src/App.tsx
- ✅ src/pages/SignIn.tsx
- ✅ src/pages/SignUp.tsx
- ✅ src/pages/Quiz.tsx
- ✅ src/pages/Results.tsx
- ✅ src/pages/ReligionSelect.tsx
- ✅ src/utils/i18n.ts (created)
- ✅ src/components/LanguageSwitcher.tsx (created)
- ✅ public/locales/en/common.json (created)
- ✅ public/locales/hi/common.json (created)

**Everything is ready to go!** 🎉
