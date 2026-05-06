import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { userService } from "@/services/user.service";
import { getMyProfile } from "@/actions/customer.actions";

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await userService.getSession();
  const role = session?.data?.user?.role || "";
  // console.log(session.data?.user.userId);

  const profileResponse = await getMyProfile();
  const profileData = profileResponse?.data?.data;
  
  // console.log(profileData?.user);


  return (
    <div suppressHydrationWarning={true} className="flex flex-col min-h-screen">
      <Navbar 
        userEmail={profileData?.user?.email} 
        userName={profileData?.user?.name} 
        userAvatar={profileData?.user?.image} 
        userRole={role} 
      />
        <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}