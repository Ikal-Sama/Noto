import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadProfileImage } from "@/components/upload-profile-image";
import { EditPassword } from "@/components/user/edit-password";
import { EditProfile } from "@/components/user/edit-profile";
import { UserDetails } from "@/components/user/user-details";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ProfilePage = async () => {
  const sessionResponse = await auth.api.getSession({
    headers: await headers(),
  });

  const user = sessionResponse?.user ?? null;
  return (
    <div className="py-12">
      <div className="flex justify-between items-center border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-bold text-slate-800">Account Profile</h1>
      </div>
      <div className="mt-5 w-full">
        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            <TabsTrigger value="account">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <UploadProfileImage user={user} />
            <div className="flex justify-center flex-col items-center py-5">
              <UserDetails />
              <div className="mt-16 flex lg:flex-row flex-col gap-5 ">
                <EditProfile user={user} />
                <EditPassword />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="security">Incoming feature...</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
