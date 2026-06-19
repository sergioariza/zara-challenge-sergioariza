import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCart } from '../../context/CartContext'
import styles from './Cart.module.scss'

export function Cart() {
  const { items, removeItem, totalPrice } = useCart()
  const { t } = useTranslation()

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.heading}>{t('cart.heading', { total: items.length })}</h1>

        {items.length > 0 && (
          <ul className={styles.itemList}>
            {items.map((item) => (
              <li className={styles.item} key={item.cartItemId}>
                <img
                  className={styles.itemImage}
                  src={item.imageUrl}
                  alt={`${item.brand} ${item.name}`}
                />
                <div className={styles.itemInfo}>
                  <div className={styles.itemDetails}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemVariant}>
                      {item.selectedStorage.capacity} | {item.selectedColor.name}
                    </p>
                    <p className={styles.itemPrice}>{item.selectedStorage.price} EUR</p>
                  </div>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeItem(item.cartItemId)}
                    aria-label={t('cart.removeAriaLabel', { brand: item.brand, name: item.name })}
                  >
                    {t('cart.remove')}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer className={styles.footer}>
        {items.length > 0 && (
          <div className={styles.totalXS}>
            <span>{t('cart.total', { price: totalPrice })}</span>
          </div>
        )}
        <div className={styles.footerButtons}>
          <Link to="/" className={styles.continueButton}>
            {t('cart.continueShopping')}
          </Link>
          <div className={styles.payWrapper}>
            {items.length > 0 && (
              <div className={styles.total}>
                <span>{t('cart.total', { price: totalPrice })}</span>
              </div>
            )}
            {items.length > 0 && (
              <button className={styles.payButton}>{t('cart.pay')}</button>
            )}
          </div>
        </div>
      </footer>
    </main>
  )
}
