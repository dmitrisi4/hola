import { AppShell } from '@/app/layout/AppShell';
import { ProfileCard } from '@/widgets/card/ProfileCard';
import { EditProfileForm } from '@/features/profile/edit-profile/ui/EditProfileForm';
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
