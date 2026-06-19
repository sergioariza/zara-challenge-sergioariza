import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PhoneCard } from '../../components/PhoneCard'
import { SearchBar } from '../../components/SearchBar'
import { useDebounce } from '../../hooks/useDebounce'
import { usePhones } from '../../hooks/usePhones'
import styles from './PhoneList.module.scss'

export function PhoneList() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const { phones, loading, error } = usePhones(debouncedSearch)
  const { t } = useTranslation()

  return (
    <main className={styles.page}>
      <SearchBar value={search} onChange={setSearch} resultsCount={phones.length} />
      {loading && <p className={styles.status}>{t('phoneList.loading')}</p>}
      {error && (
        <p className={styles.status} role="alert">
          {error}
        </p>
      )}
      {!loading && !error && (
        <ul className={styles.grid}>
          {phones.map((phone) => (
            <li className={styles.item} key={phone.id}>
              <PhoneCard phone={phone} />
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
