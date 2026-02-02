import { useState } from 'react'

import { Button } from '@/shared/ui/atoms/button/Button'
import { Input } from '@/shared/ui/atoms/input/Input'

import styles from './EditProfileForm.module.css'

export function EditProfileForm() {
  const [displayName, setDisplayName] = useState('Alex')
  const [age, setAge] = useState('27')
  const [bio, setBio] = useState('Frontend dev, love coffee and longboarding.')

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault()
        // TODO: wire to mutation when backend exists
        console.log('save profile', { displayName, age: Number(age) || undefined, bio })
      }}
    >
      <label className={styles.label}>
        Display name
        <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
      </label>

      <label className={styles.label}>
        Age
        <Input
          type="number"
          value={age}
          min={18}
          max={99}
          onChange={(e) => setAge(e.target.value)}
        />
        <span className={styles.hint}>Влияет на выдачу и карточки</span>
      </label>

      <label className={styles.label}>
        Bio
        <Input
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell something about yourself"
        />
      </label>

      <div className={styles.actions}>
        <Button type="submit" variant="primary">
          Save
        </Button>
      </div>
    </form>
  )
}
