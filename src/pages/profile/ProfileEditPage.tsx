import { useRef, useState } from 'react'

import { useNavigate } from '@tanstack/react-router'

import { AppShell } from '@/app/layout/AppShell'

import styles from './ProfileEditPage.module.css'

/* ─── Local types ─────────────────────────────────────── */
type LookingFor = 'relationship' | 'something-casual' | 'new-friends' | 'not-sure'

interface ProfileState {
  displayName: string
  age: string
  bio: string
  location: string
  height: string
  lookingFor: LookingFor | ''
  workout: string
  smoking: string
  drinking: string
  kids: string
}

/* ─── Option maps ─────────────────────────────────────── */
const LOOKING_FOR_OPTIONS: { value: LookingFor; label: string }[] = [
  { value: 'relationship', label: 'Long-term relationship' },
  { value: 'something-casual', label: 'Something casual' },
  { value: 'new-friends', label: 'New friends' },
  { value: 'not-sure', label: 'Still figuring it out' },
]

const LIFESTYLE_OPTIONS: Record<string, string[]> = {
  workout: ['Every day', 'Often', 'Sometimes', 'Never'],
  smoking: ['Non-smoker', 'Sometimes', 'Smoker'],
  drinking: ['Never', 'Rarely', 'Socially', 'Frequently'],
  kids: ["Want someday", "Don't want", 'Have & want more', 'Have & done', 'Not sure'],
}

const LIFESTYLE_LABELS: Record<string, string> = {
  workout: 'Workout',
  smoking: 'Smoking',
  drinking: 'Drinking',
  kids: 'Kids',
}

/* ─── Subcomponents ───────────────────────────────────── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className={styles.sectionTitle}>{children}</h3>
}

/* ─── Main page ───────────────────────────────────────── */
export function ProfileEditPage() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState<ProfileState>({
    displayName: 'Alex',
    age: '27',
    bio: 'Frontend dev, love coffee and longboarding. Looking for people to explore new cities with.',
    location: 'New York, NY',
    height: '181 cm',
    lookingFor: 'relationship',
    workout: 'Often',
    smoking: 'Non-smoker',
    drinking: 'Socially',
    kids: 'Want someday',
  })

  const [photos, setPhotos] = useState<(string | null)[]>([
    'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop',
    null,
    null,
    null,
    null,
  ])
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null)

  const makePrimary = (index: number) => {
    setPhotos(prev => {
      const next = [...prev]
      const [main] = next.splice(index + 1, 1)
      next.unshift(main)
      return next
    })
  }

  const removePhoto = (index: number) => {
    setPhotos(prev => {
      const next = [...prev]
      next.splice(index + 1, 1)
      next.push(null)
      return next
    })
  }

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [pendingSlot, setPendingSlot] = useState<number | null>(null)

  const openFilePicker = (slotIndex: number) => {
    setPendingSlot(slotIndex)
    fileInputRef.current?.click()
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || pendingSlot === null) return
    const url = URL.createObjectURL(file)
    setPhotos(prev => {
      const next = [...prev]
      next[pendingSlot + 1] = url
      return next
    })
    setPendingSlot(null)
    e.target.value = ''
  }

  const [editingField, setEditingField] = useState<string | null>(null)
  const [tempValue, setTempValue] = useState('')

  const startEdit = (field: string, value: string) => {
    setEditingField(field)
    setTempValue(value)
  }

  const commitEdit = (field: keyof ProfileState) => {
    setProfile(prev => ({ ...prev, [field]: tempValue }))
    setEditingField(null)
  }

  const setLifestyle = (field: keyof ProfileState, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  return (
    <AppShell title="EDIT PROFILE" scrollable onBack={() => navigate({ to: '/profile' })}>
      <div className={styles.page}>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={onFileChange}
        />

        {/* ── Photo grid ── */}
        <div className={styles.photoGrid}>
          {/* Main photo */}
          <div className={styles.photoMain}>
            {photos[0] && <img src={photos[0]} alt="Profile" className={styles.photo} />}
            <button className={styles.photoEditBtn} aria-label="Change photo">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </button>
          </div>

          {/* Secondary photos (index 1–5 in state → slots 0–4) */}
          {photos.slice(1).map((src, i) => (
            <div
              key={i}
              className={`${styles.photoSlot} ${!src ? styles.photoSlotEmpty : ''}`}
              onMouseEnter={() => src ? setHoveredSlot(i) : undefined}
              onMouseLeave={() => setHoveredSlot(null)}
              onClick={() => !src ? openFilePicker(i) : undefined}
            >
              {src ? (
                <>
                  <img src={src} alt="" className={styles.photo} />
                  {hoveredSlot === i && (
                    <div className={styles.photoOverlay}>
                      <button
                        className={styles.overlayBtn}
                        onClick={() => makePrimary(i)}
                        title="Make primary"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        Main
                      </button>
                      <button
                        className={`${styles.overlayBtn} ${styles.overlayBtnDanger}`}
                        onClick={() => removePhoto(i)}
                        title="Delete"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              )}
            </div>
          ))}
        </div>

        {/* ── About ── */}
        <section className={styles.section}>
          <SectionTitle>About me</SectionTitle>

          {/* Name */}
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Name</span>
            {editingField === 'displayName' ? (
              <div className={styles.fieldEdit}>
                <input
                  className={styles.fieldInput}
                  value={tempValue}
                  onChange={e => setTempValue(e.target.value)}
                  autoFocus
                />
                <button className={styles.fieldSave} onClick={() => commitEdit('displayName')}>Save</button>
              </div>
            ) : (
              <button className={styles.fieldValue} onClick={() => startEdit('displayName', profile.displayName)}>
                {profile.displayName}
                <PenIcon />
              </button>
            )}
          </div>

          {/* Age */}
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Age</span>
            {editingField === 'age' ? (
              <div className={styles.fieldEdit}>
                <input
                  className={styles.fieldInput}
                  type="number"
                  min={18}
                  max={99}
                  value={tempValue}
                  onChange={e => setTempValue(e.target.value)}
                  autoFocus
                />
                <button className={styles.fieldSave} onClick={() => commitEdit('age')}>Save</button>
              </div>
            ) : (
              <button className={styles.fieldValue} onClick={() => startEdit('age', profile.age)}>
                {profile.age}
                <PenIcon />
              </button>
            )}
          </div>

          {/* Location */}
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Location</span>
            {editingField === 'location' ? (
              <div className={styles.fieldEdit}>
                <input
                  className={styles.fieldInput}
                  value={tempValue}
                  onChange={e => setTempValue(e.target.value)}
                  autoFocus
                />
                <button className={styles.fieldSave} onClick={() => commitEdit('location')}>Save</button>
              </div>
            ) : (
              <button className={styles.fieldValue} onClick={() => startEdit('location', profile.location)}>
                {profile.location}
                <PenIcon />
              </button>
            )}
          </div>

          {/* Height */}
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Height</span>
            {editingField === 'height' ? (
              <div className={styles.fieldEdit}>
                <input
                  className={styles.fieldInput}
                  value={tempValue}
                  onChange={e => setTempValue(e.target.value)}
                  autoFocus
                  placeholder="e.g. 181 cm"
                />
                <button className={styles.fieldSave} onClick={() => commitEdit('height')}>Save</button>
              </div>
            ) : (
              <button className={styles.fieldValue} onClick={() => startEdit('height', profile.height)}>
                {profile.height || 'Add height'}
                <PenIcon />
              </button>
            )}
          </div>

          {/* Bio */}
          <div className={`${styles.field} ${styles.fieldColumn}`}>
            <span className={styles.fieldLabel}>Bio</span>
            {editingField === 'bio' ? (
              <div className={styles.fieldEdit}>
                <textarea
                  className={`${styles.fieldInput} ${styles.fieldTextarea}`}
                  value={tempValue}
                  onChange={e => setTempValue(e.target.value)}
                  autoFocus
                  rows={3}
                />
                <button className={styles.fieldSave} onClick={() => commitEdit('bio')}>Save</button>
              </div>
            ) : (
              <button className={`${styles.fieldValue} ${styles.fieldValueBio}`} onClick={() => startEdit('bio', profile.bio)}>
                <span>{profile.bio || 'Write something about yourself…'}</span>
                <PenIcon />
              </button>
            )}
          </div>
        </section>

        {/* ── Looking for ── */}
        <section className={styles.section}>
          <SectionTitle>Looking for</SectionTitle>
          <div className={styles.chipGrid}>
            {LOOKING_FOR_OPTIONS.map(opt => (
              <button
                key={opt.value}
                className={`${styles.chip} ${profile.lookingFor === opt.value ? styles.chipActive : ''}`}
                onClick={() => setProfile(p => ({ ...p, lookingFor: opt.value }))}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        {/* ── Lifestyle ── */}
        <section className={styles.section}>
          <SectionTitle>Lifestyle</SectionTitle>
          {Object.entries(LIFESTYLE_OPTIONS).map(([field, options]) => (
            <div key={field} className={styles.lifestyleRow}>
              <span className={styles.lifestyleLabel}>{LIFESTYLE_LABELS[field]}</span>
              <div className={styles.lifestyleChips}>
                {options.map(opt => (
                  <button
                    key={opt}
                    className={`${styles.chipSm} ${profile[field as keyof ProfileState] === opt ? styles.chipActive : ''}`}
                    onClick={() => setLifestyle(field as keyof ProfileState, opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>

        <div className={styles.bottomPad} />
      </div>
    </AppShell>
  )
}

function PenIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}
