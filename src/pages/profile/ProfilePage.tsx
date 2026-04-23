import { useNavigate } from '@tanstack/react-router'

import { AppShell } from '@/app/layout/AppShell'

import styles from './ProfilePage.module.css'

const DEMO = {
  displayName: 'Alex',
  age: 27,
  location: 'New York, NY',
  bio: 'Frontend dev, love coffee and longboarding. Looking for people to explore new cities with.',
  photos: [
    'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop',
  ],
  lookingFor: 'Long-term relationship',
  lifestyle: [
    { label: 'Workout', value: 'Often' },
    { label: 'Drinking', value: 'Socially' },
    { label: 'Smoking', value: 'Non-smoker' },
    { label: 'Kids', value: 'Want someday' },
  ],
}

export function ProfilePage() {
  const navigate = useNavigate()

  return (
    <AppShell title="PROFILE" scrollable>
      <div className={styles.page}>

        {/* ── Hero photo ── */}
        <div className={styles.hero}>
          <img src={DEMO.photos[0]} alt={DEMO.displayName} className={styles.heroPhoto} />
          <div className={styles.heroOverlay}>
            <div className={styles.heroName}>
              {DEMO.displayName}<span className={styles.heroAge}>, {DEMO.age}</span>
            </div>
            <div className={styles.heroLocation}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {DEMO.location}
            </div>
          </div>
        </div>

        {/* ── Bio ── */}
        {DEMO.bio && (
          <section className={styles.section}>
            <p className={styles.bio}>{DEMO.bio}</p>
          </section>
        )}

        {/* ── Looking for ── */}
        <section className={styles.section}>
          <span className={styles.sectionLabel}>Looking for</span>
          <span className={styles.pill}>{DEMO.lookingFor}</span>
        </section>

        {/* ── Lifestyle ── */}
        <section className={styles.section}>
          <span className={styles.sectionLabel}>Lifestyle</span>
          <div className={styles.tags}>
            {DEMO.lifestyle.map(item => (
              <div key={item.label} className={styles.tag}>
                <span className={styles.tagLabel}>{item.label}</span>
                <span className={styles.tagValue}>{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── More photos ── */}
        {DEMO.photos.length > 1 && (
          <section className={styles.section}>
            <span className={styles.sectionLabel}>Photos</span>
            <div className={styles.photoGrid}>
              {DEMO.photos.map((src, i) => (
                <div key={i} className={styles.photoSlot}>
                  <img src={src} alt="" className={styles.gridPhoto} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Edit button ── */}
        <button
          className={styles.editBtn}
          onClick={() => navigate({ to: '/profile/edit' })}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          Edit profile & settings
        </button>

        <div className={styles.bottomPad} />
      </div>
    </AppShell>
  )
}
