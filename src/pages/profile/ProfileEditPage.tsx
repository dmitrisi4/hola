import { useNavigate } from '@tanstack/react-router'
import { useRef, useState } from 'react'

import { AppShell } from '@/app/layout/AppShell'
import {
  LIFESTYLE_LABELS,
  LIFESTYLE_OPTIONS,
  type LifestyleKey,
  type LocalProfile,
  LOOKING_FOR_OPTIONS,
  readLocalProfile,
  writeLocalProfile,
} from '@/entities/profile/model/localProfile'
import { Button, ChoicePills, SectionBlock } from "@/modules/ui-kit"

import styles from './ProfileEditPage.module.css'

export function ProfileEditPage() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState<LocalProfile>(() => readLocalProfile())
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null)
  const [editingField, setEditingField] = useState<string | null>(null)
  const [tempValue, setTempValue] = useState('')
  const [isSaved, setIsSaved] = useState(false)
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
    setProfile((prev) => {
      const photos = [...prev.photos]
      if (pendingSlot === -1) {
        photos[0] = url
      } else {
        photos[pendingSlot + 1] = url
      }
      return { ...prev, photos }
    })
    setPendingSlot(null)
    setIsSaved(false)
    e.target.value = ''
  }

  const makePrimary = (index: number) => {
    setProfile((prev) => {
      const photos = [...prev.photos]
      const [main] = photos.splice(index + 1, 1)
      photos.unshift(main)
      return { ...prev, photos }
    })
    setIsSaved(false)
  }

  const removePhoto = (index: number) => {
    setProfile((prev) => {
      const photos = [...prev.photos]
      photos.splice(index + 1, 1)
      photos.push(null)
      return { ...prev, photos }
    })
    setIsSaved(false)
  }

  const startEdit = (field: string, value: string) => {
    setEditingField(field)
    setTempValue(value)
  }

  const commitEdit = (field: keyof LocalProfile) => {
    setProfile((prev) => ({ ...prev, [field]: tempValue }))
    setEditingField(null)
    setIsSaved(false)
  }

  const setLifestyle = (field: LifestyleKey, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
    setIsSaved(false)
  }

  const saveProfile = () => {
    writeLocalProfile(profile)
    setEditingField(null)
    setIsSaved(true)
  }

  const saveAndGoBack = () => {
    writeLocalProfile(profile)
    void navigate({ to: '/profile' })
  }

  return (
    <AppShell title="EDIT PROFILE" scrollable onBack={() => navigate({ to: '/profile' })}>
      <div className={styles.page}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={onFileChange}
        />

        <div className={styles.photoGrid}>
          <div className={styles.photoMain}>
            {profile.photos[0] ? <img src={profile.photos[0]} alt="Profile" className={styles.photo} /> : null}
            <button type="button" className={styles.photoEditBtn} aria-label="Change photo" onClick={() => openFilePicker(-1)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </button>
          </div>

          {profile.photos.slice(1).map((src, index) => (
            <div
              key={index}
              className={`${styles.photoSlot} ${!src ? styles.photoSlotEmpty : ''}`}
              onMouseEnter={() => (src ? setHoveredSlot(index) : undefined)}
              onMouseLeave={() => setHoveredSlot(null)}
              onClick={() => (!src ? openFilePicker(index) : undefined)}
            >
              {src ? (
                <>
                  <img src={src} alt="" className={styles.photo} />
                  {hoveredSlot === index ? (
                    <div className={styles.photoOverlay}>
                      <button type="button" className={styles.overlayBtn} onClick={() => makePrimary(index)} title="Make primary">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        Main
                      </button>
                      <button
                        type="button"
                        className={`${styles.overlayBtn} ${styles.overlayBtnDanger}`}
                        onClick={() => removePhoto(index)}
                        title="Delete"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : null}
                </>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              )}
            </div>
          ))}
        </div>

        <SectionBlock title="About me">
          <div className={styles.section}>
          <EditableField
            editingField={editingField}
            field="displayName"
            label="Name"
            value={profile.displayName}
            tempValue={tempValue}
            onStartEdit={startEdit}
            onTempValueChange={setTempValue}
            onCommit={commitEdit}
          />
          <EditableField
            editingField={editingField}
            field="age"
            label="Age"
            value={profile.age}
            tempValue={tempValue}
            inputType="number"
            onStartEdit={startEdit}
            onTempValueChange={setTempValue}
            onCommit={commitEdit}
          />
          <EditableField
            editingField={editingField}
            field="location"
            label="Location"
            value={profile.location}
            tempValue={tempValue}
            onStartEdit={startEdit}
            onTempValueChange={setTempValue}
            onCommit={commitEdit}
          />
          <EditableField
            editingField={editingField}
            field="height"
            label="Height"
            value={profile.height || 'Add height'}
            rawValue={profile.height}
            tempValue={tempValue}
            placeholder="e.g. 181 cm"
            onStartEdit={startEdit}
            onTempValueChange={setTempValue}
            onCommit={commitEdit}
          />
          <EditableField
            editingField={editingField}
            field="bio"
            label="Bio"
            value={profile.bio || 'Write something about yourself…'}
            rawValue={profile.bio}
            tempValue={tempValue}
            multiline
            onStartEdit={startEdit}
            onTempValueChange={setTempValue}
            onCommit={commitEdit}
          />
          </div>
        </SectionBlock>

        <SectionBlock title="Looking for">
          <div className={styles.section}>
          <ChoicePills
            value={profile.lookingFor}
            onChange={(value) => {
              setProfile((prev) => ({ ...prev, lookingFor: value }))
              setIsSaved(false)
            }}
            options={LOOKING_FOR_OPTIONS.map((option) => ({ value: option.value, label: option.label }))}
          />
          </div>
        </SectionBlock>

        <SectionBlock title="Lifestyle">
          <div className={styles.section}>
          {Object.entries(LIFESTYLE_OPTIONS).map(([field, options]) => (
            <div key={field} className={styles.lifestyleRow}>
              <span className={styles.lifestyleLabel}>{LIFESTYLE_LABELS[field as LifestyleKey]}</span>
              <ChoicePills
                value={profile[field as LifestyleKey]}
                onChange={(value) => setLifestyle(field as LifestyleKey, value)}
                options={options.map((option) => ({ value: option, label: option }))}
                size="sm"
                className={styles.lifestyleChips}
              />
            </div>
          ))}
          </div>
        </SectionBlock>

        <SectionBlock
          title="Save changes"
          description="Changes are stored locally on this device until the backend profile flow is wired."
          tone="emotion"
          className={styles.actionsSection}
        >
          <div className={styles.actions}>
            <Button type="button" onClick={saveProfile}>
              {isSaved ? 'Saved' : 'Save draft'}
            </Button>
            <Button type="button" variant="primary" onClick={saveAndGoBack}>
              Save and return
            </Button>
          </div>
          <p className={styles.statusMessage} role="status" aria-live="polite">
            {isSaved ? 'Profile changes saved locally.' : ''}
          </p>
        </SectionBlock>

        <div className={styles.bottomPad} />
      </div>
    </AppShell>
  )
}

function EditableField({
  editingField,
  field,
  label,
  value,
  rawValue,
  tempValue,
  placeholder,
  inputType = 'text',
  multiline = false,
  onStartEdit,
  onTempValueChange,
  onCommit,
}: {
  editingField: string | null
  field: keyof LocalProfile
  label: string
  value: string
  rawValue?: string
  tempValue: string
  placeholder?: string
  inputType?: React.HTMLInputTypeAttribute
  multiline?: boolean
  onStartEdit: (field: string, value: string) => void
  onTempValueChange: (value: string) => void
  onCommit: (field: keyof LocalProfile) => void
}) {
  const isEditing = editingField === field

  return (
    <div className={`${styles.field} ${multiline ? styles.fieldColumn : ''}`}>
      <span className={styles.fieldLabel}>{label}</span>
      {isEditing ? (
        <div className={styles.fieldEdit}>
          {multiline ? (
            <textarea
              className={`${styles.fieldInput} ${styles.fieldTextarea}`}
              value={tempValue}
              onChange={(event) => onTempValueChange(event.target.value)}
              autoFocus
              rows={3}
            />
          ) : (
            <input
              className={styles.fieldInput}
              value={tempValue}
              onChange={(event) => onTempValueChange(event.target.value)}
              autoFocus
              type={inputType}
              min={inputType === 'number' ? 18 : undefined}
              max={inputType === 'number' ? 99 : undefined}
              placeholder={placeholder}
            />
          )}
          <button type="button" className={styles.fieldSave} onClick={() => onCommit(field)}>
            Save
          </button>
        </div>
      ) : (
        <button
          type="button"
          className={`${styles.fieldValue} ${multiline ? styles.fieldValueBio : ''}`}
          onClick={() => onStartEdit(field, rawValue ?? value)}
        >
          <span>{value}</span>
          <PenIcon />
        </button>
      )}
    </div>
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
