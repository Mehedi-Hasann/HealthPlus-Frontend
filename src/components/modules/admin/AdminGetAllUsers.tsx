'use client'

import { useState } from "react";
import { UserType } from "@/types/routes.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { updateUserStatus } from "@/actions/admin.actions";
import { toast } from "sonner";

type Props = {
  users: UserType[];
};

export default function AdminGetAllUsers({ users }: Props) {
  // Local state for tracking user status
  const [userStatus, setUserStatus] = useState(
    users.reduce((acc, user) => {
      acc[user.id] = user.userStatus;
      return acc;
    }, {} as Record<string, string>)
  );

  const handleStatusChange = (id: string, newStatus: "ACTIVE" | "BLOCKED" | "DELETED" ) => {
    setUserStatus((prev) => ({
      ...prev,
      [id]: newStatus,
    }));
  };

  const handleSubmit = async(id: string) => {
    const toastId = toast.loading("User Updating....")
    try {
      const status = userStatus[id];
   
      const res = await updateUserStatus(status , id as string);
      toast.success("User Status Update Successfully",{id : toastId})
    } catch (error) {
      toast.error("User Update Failed. Internal Server Error")
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Users</h1>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>IsVerified?</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                {/* User ID */}
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  
                    {user.role}
                  
                </TableCell>
                

                {/* Status select */}
                <TableCell>
                  <select
                    value={userStatus[user.id]}
                    onChange={(e) =>
                      handleStatusChange(
                        user.id,
                        e.target.value as "ACTIVE" | "DELETED" | "BLOCKED"
                      )
                    }
                    className="border rounded px-2 py-1 bg-amber-800"
                  >
                    <option value="ACTIVE" className="text-black">ACTIVE</option>
                    <option value="DELETED" className="text-black">DELETED</option>
                    <option value="BLOCKED" className="text-black">BLOCKED</option>
                  </select>
                </TableCell>

                <TableCell>{user.emailVerified ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <Button onClick={() => handleSubmit(user.id)} size="sm">
                    Submit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}