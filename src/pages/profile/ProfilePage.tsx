import { AppShell } from '@/app/layout/AppShell';
import { EditProfileForm } from '@/features/profile/edit-profile/ui/EditProfileForm';
import { ProfileCard } from '@/widgets/card/ProfileCard';

import styles from './ProfilePage.module.css'

export function ProfilePage() {
  return (
    <AppShell title="Profile">
      <div className={styles.wrap}>
        <ProfileCard />
        <EditProfileForm />
      </div>
    </AppShell>
  );
}
