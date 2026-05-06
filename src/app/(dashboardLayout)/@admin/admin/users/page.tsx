import { getAllUsers } from "@/actions/admin.actions";
import AdminGetAllUsers from "@/components/modules/admin/AdminGetAllUsers";
export const dynamic = "force-dynamic";

export default async function AllUsersPage () {

  const {data} = await getAllUsers();
  
  
  const users = data?.data || [];
  
  return (
    <div>
      <AdminGetAllUsers users={users} />
    </div>
  );
}