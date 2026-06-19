import { useTranslation } from 'react-i18next'
import styles from './SearchBar.module.scss'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  resultsCount: number
}

export function SearchBar({ value, onChange, resultsCount }: SearchBarProps) {
  const { t } = useTranslation()

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <input
          name="search"
          className={styles.input}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t('search.placeholder')}
          aria-label={t('search.ariaLabel')}
        />
      </div>
      <p className={styles.results} aria-live="polite">
        {t('search.resultCount', { count: resultsCount })}
      </p>
    </div>
  )
}
