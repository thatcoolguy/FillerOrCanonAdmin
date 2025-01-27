import Separator from '@/components/ui/separator';
import ProfileForm from '@/components/sections/settings/profile-form';
import SettingsLayout from '@/components/sections/settings/layout';

export default function SettingsProfilePage() {
  return (
    <SettingsLayout>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>
        <Separator />
        <ProfileForm />
      </div>
    </SettingsLayout>
  );
}

SettingsProfilePage.layout = 'dashboard';
