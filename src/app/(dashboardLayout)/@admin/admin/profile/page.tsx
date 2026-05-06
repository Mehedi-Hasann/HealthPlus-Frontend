import { getMyProfile } from "@/actions/customer.actions";
import { ProfileCard } from "@/components/modules/customer/ProfileCard";

export const dynamic = "force-dynamic";

export default async function ProfilePage () {

  const data = await getMyProfile();
  
  const profileData = data?.data?.data;
  
  return (
    <div>
      {profileData ? (
        <ProfileCard data={profileData} />
      ) : (
        <p className="text-muted-foreground">Profile data not available.</p>
      )}
    </div>
  );
}