import { useTranslation } from 'react-i18next'
import styles from './LanguageSwitcher.module.scss'

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'ca', label: 'CAT' },
] as const

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  return (
    <div className={styles.switcher}>
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          className={styles.langButton}
          onClick={() => i18n.changeLanguage(code)}
          aria-pressed={i18n.language === code}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
