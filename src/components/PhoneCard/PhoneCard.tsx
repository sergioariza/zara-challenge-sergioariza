import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { ProductListItem } from '../../types'
import styles from './PhoneCard.module.scss'

interface PhoneCardProps {
  phone: ProductListItem
}

export function PhoneCard({ phone }: PhoneCardProps) {
  const { t } = useTranslation()

  return (
    <Link
      to={`/phone/${phone.id}`}
      className={styles.link}
      aria-label={t('phoneCard.ariaLabel', { brand: phone.brand, name: phone.name, price: phone.basePrice })}
    >
      <div className={styles.background} />
      <article className={styles.card}>
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={phone.imageUrl}
            alt={`${phone.brand} ${phone.name}`}
          />
        </div>
        <p className={styles.brand}>{phone.brand}</p>
        <div className={styles.namePrice}>
          <p className={styles.name}>{phone.name}</p>
          <p className={styles.price}>{phone.basePrice} EUR</p>
        </div>
      </article>
    </Link>
  )
}
