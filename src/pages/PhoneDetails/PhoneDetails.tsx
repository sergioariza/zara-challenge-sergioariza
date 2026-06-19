import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PhoneCard } from '../../components/PhoneCard'
import { ChevronLeftIcon } from '../../icons/ChevronLeftIcon'
import { useCart } from '../../context/CartContext'
import { usePhone } from '../../hooks/usePhone'
import type { ColorOption, StorageOption } from '../../types'
import styles from './PhoneDetails.module.scss'

export function PhoneDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { phone, loading, error } = usePhone(id ?? '')
  const { addItem } = useCart()
  const { t } = useTranslation()

  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null)
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | null>(null)

  if (loading) return <main className={styles.page}><p className={styles.selectorLabel}>{t('phoneDetails.loading')}</p></main>
  if (error || !phone) return <main className={styles.page}><p role="alert">{error ?? t('phoneDetails.notFound')}</p></main>

  const currentImageUrl = selectedColor?.imageUrl ?? phone.colorOptions[0]?.imageUrl ?? ''
  const currentPrice = selectedStorage?.price ?? phone.basePrice
  const canAddToCart = selectedColor !== null && selectedStorage !== null

  const handleAddToCart = () => {
    if (!selectedColor || !selectedStorage) return
    addItem({
      cartItemId: crypto.randomUUID(),
      id: phone.id,
      name: phone.name,
      brand: phone.brand,
      imageUrl: selectedColor.imageUrl,
      selectedColor,
      selectedStorage,
    })
  }

  return (
    <main>
      <button className={styles.back} onClick={() => navigate('/')} aria-label={t('phoneDetails.goBackAriaLabel')}>
        <ChevronLeftIcon />
        {t('phoneDetails.back')}
      </button>

      <section aria-label={t('phoneDetails.phoneSectionAriaLabel')}>
        <div className={styles.productLayout}>
          <div className={styles.imageColumn}>
            <img
              className={styles.image}
              src={currentImageUrl}
              alt={selectedColor
                ? t('phoneDetails.imageAlt', { brand: phone.brand, name: phone.name, color: selectedColor.name })
                : t('phoneDetails.imageAltNoColor', { brand: phone.brand, name: phone.name })
              }
            />
          </div>

          <div className={styles.infoColumn}>
            <div className={styles.titlePrice}>
              <h1 className={styles.name}>{phone.name}</h1>
              <p className={styles.price}>
                {selectedStorage
                  ? t('phoneDetails.price', { price: currentPrice })
                  : t('phoneDetails.priceFrom', { price: phone.basePrice })}
              </p>
            </div>

            <div className={styles.selectors}>
              <div className={styles.selectorGroup}>
                <p className={styles.selectorLabel}>{t('phoneDetails.storageLabel')}</p>
                <div role="group" aria-label={t('phoneDetails.storageAriaLabel')}>
                  {phone.storageOptions.map((storage) => (
                    <button
                      key={storage.capacity}
                      className={styles.storageButton}
                      onClick={() => setSelectedStorage(storage)}
                      aria-pressed={selectedStorage?.capacity === storage.capacity}
                    >
                      {storage.capacity}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.selectorGroup}>
                <p className={styles.selectorLabel}>{t('phoneDetails.colorLabel')}</p>
                <div className={styles.colorButtons} role="group" aria-label={t('phoneDetails.colorAriaLabel')}>
                  {phone.colorOptions.map((color) => (
                    <button
                      key={color.name}
                      className={styles.colorButton}
                      onClick={() => setSelectedColor(color)}
                      aria-pressed={selectedColor?.name === color.name}
                      aria-label={color.name}
                      style={{ backgroundColor: color.hexCode }}
                    />
                  ))}
                </div>
                <p className={styles.selectedColor} aria-live="polite">{selectedColor ? selectedColor.name : ''}</p>
              </div>
            </div>

            <button
              className={styles.addToCart}
              onClick={handleAddToCart}
              disabled={!canAddToCart}
            >
              {t('phoneDetails.addToCart')}
            </button>
          </div>
        </div>
      </section>

      <section className={styles.specsSection} aria-label={t('phoneDetails.specsSectionAriaLabel')}>
        <h2 className={styles.sectionTitle}>{t('phoneDetails.specsHeading')}</h2>
        <dl>
          <div className={styles.specRow}><dt>{t('phoneDetails.specBrand')}</dt><dd>{phone.brand}</dd></div>
          <div className={styles.specRow}><dt>{t('phoneDetails.specName')}</dt><dd>{phone.name}</dd></div>
          <div className={styles.specRow}><dt>{t('phoneDetails.specDescription')}</dt><dd>{phone.description}</dd></div>
          <div className={styles.specRow}><dt>{t('phoneDetails.specScreen')}</dt><dd>{phone.specs.screen}</dd></div>
          <div className={styles.specRow}><dt>{t('phoneDetails.specResolution')}</dt><dd>{phone.specs.resolution}</dd></div>
          <div className={styles.specRow}><dt>{t('phoneDetails.specProcessor')}</dt><dd>{phone.specs.processor}</dd></div>
          <div className={styles.specRow}><dt>{t('phoneDetails.specMainCamera')}</dt><dd>{phone.specs.mainCamera}</dd></div>
          <div className={styles.specRow}><dt>{t('phoneDetails.specSelfieCamera')}</dt><dd>{phone.specs.selfieCamera}</dd></div>
          <div className={styles.specRow}><dt>{t('phoneDetails.specBattery')}</dt><dd>{phone.specs.battery}</dd></div>
          <div className={styles.specRow}><dt>{t('phoneDetails.specOS')}</dt><dd>{phone.specs.os}</dd></div>
          <div className={styles.specRow}><dt>{t('phoneDetails.specRefreshRate')}</dt><dd>{phone.specs.screenRefreshRate}</dd></div>
        </dl>
      </section>

      {phone.similarProducts.length > 0 && (
        <section className={styles.similarSection} aria-label={t('phoneDetails.similarSectionAriaLabel')}>
          <h2 className={styles.sectionTitle}>{t('phoneDetails.similarHeading')}</h2>
          <ul className={styles.carousel}>
            {phone.similarProducts.map((similar) => (
              <li key={similar.id}>
                <PhoneCard phone={similar} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}
