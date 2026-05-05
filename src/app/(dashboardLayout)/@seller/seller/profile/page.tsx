import { getMyProfile } from "@/actions/customer.actions";
import { ProfileCard } from "@/components/modules/customer/ProfileCard";

export const dynamic = "force-dynamic";

export default async function ProfilePage () {

  const data = await getMyProfile();
  console.log("Data from Customer : ",data);
  
  return (
    
    <div className="">

      <ProfileCard data={data.data.data} />

    </div>
    
  );
}