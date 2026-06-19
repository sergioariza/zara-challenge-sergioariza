import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCart } from '../../context/CartContext'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { BagIcon } from '../../icons/BagIcon'
import { BagIconFilled } from '../../icons/BagIconFilled'
import { HomeIcon } from '../../icons/HomeIcon'
import styles from './Navbar.module.scss'

export function Navbar() {
  const { totalItems } = useCart()
  const { t } = useTranslation()

  return (
    <nav className={styles.navbar} aria-label={t('navbar.mainNav')}>
      <Link to="/" aria-label={t('navbar.goHome')}>
        <HomeIcon />
      </Link>
      <div className={styles.rightSection}>
        <LanguageSwitcher />
        <Link
          to="/cart"
          className={styles.cartLink}
          aria-label={t('navbar.cart', { count: totalItems })}
        >
          {totalItems > 0 ? <BagIconFilled /> : <BagIcon />}
          <span aria-hidden="true">
            {totalItems}
          </span>
        </Link>
      </div>
    </nav>
  )
}
