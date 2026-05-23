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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, UserX, Users, Save } from "lucide-react";

type Props = {
  users: UserType[];
};

export default function AdminGetAllUsers({ users }: Props) {
  const [userStatus, setUserStatus] = useState(
    users.reduce((acc, user) => {
      acc[user.id] = user.userStatus;
      return acc;
    }, {} as Record<string, string>)
  );

  const [userVerification, setUserVerification] = useState(
    users.reduce((acc, user) => {
      acc[user.id] = user.emailVerified;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const handleStatusChange = (id: string, newStatus: "ACTIVE" | "BLOCKED" | "DELETED" ) => {
    setUserStatus((prev) => ({
      ...prev,
      [id]: newStatus,
    }));
  };

  const handleVerificationChange = (id: string, newVerification: boolean) => {
    setUserVerification((prev) => ({
      ...prev,
      [id]: newVerification,
    }));
  };

  const handleSubmit = async(id: string) => {
    const toastId = toast.loading("Updating user...");
    try {
      const status = userStatus[id];
      const verified = userVerification[id];
      await updateUserStatus(status, verified, id);
      toast.success("User updated successfully", { id: toastId });
    } catch (error) {
      toast.error("Failed to update user", { id: toastId });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-purple-500" />
          </div>
          Manage Users
        </h1>
      </div>

      <Card className="p-5 border-border/50 bg-card/40 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-purple-500 via-indigo-400 to-blue-500" />
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-semibold text-muted-foreground py-4 px-6">User ID</TableHead>
                  <TableHead className="font-semibold text-muted-foreground">Name & Email</TableHead>
                  <TableHead className="font-semibold text-muted-foreground">Role</TableHead>
                  <TableHead className="font-semibold text-muted-foreground">Verification</TableHead>
                  <TableHead className="font-semibold text-muted-foreground">Status Control</TableHead>
                  <TableHead className="font-semibold text-muted-foreground text-right px-6">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                        <UserX className="w-8 h-8 opacity-50" />
                        <p>No users found in the system.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="px-6 font-mono text-xs text-muted-foreground">
                        {user.id}
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">{user.name}</span>
                          <span className="text-xs text-muted-foreground">{user.email}</span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge variant="outline" className={`bg-background shadow-sm ${user.role === 'ADMIN' ? 'border-primary text-primary' : 'border-border text-foreground'}`}>
                          {user.role}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <div className="relative inline-flex items-center">
                          <select
                            value={userVerification[user.id] ? "true" : "false"}
                            onChange={(e) =>
                              handleVerificationChange(
                                user.id,
                                e.target.value === "true"
                              )
                            }
                            className={`appearance-none bg-background border text-sm rounded-lg px-3 py-1.5 pr-8 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium ${
                              userVerification[user.id] ? 'border-emerald-500/30 text-emerald-600' : 'border-amber-500/30 text-amber-600'
                            }`}
                          >
                            <option value="true" className="text-foreground">Verified</option>
                            <option value="false" className="text-foreground">Pending</option>
                          </select>
                          <div className="pointer-events-none absolute right-2.5 flex items-center">
                            <svg className={`h-4 w-4 ${
                              userVerification[user.id] ? 'text-emerald-500' : 'text-amber-500'
                            }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="relative inline-flex items-center">
                          <select
                            value={userStatus[user.id]}
                            onChange={(e) =>
                              handleStatusChange(
                                user.id,
                                e.target.value as "ACTIVE" | "DELETED" | "BLOCKED"
                              )
                            }
                            className={`appearance-none bg-background border text-sm rounded-lg px-3 py-1.5 pr-8 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium ${
                              userStatus[user.id] === 'ACTIVE' ? 'border-emerald-500/30 text-emerald-600' :
                              userStatus[user.id] === 'BLOCKED' ? 'border-amber-500/30 text-amber-600' :
                              'border-red-500/30 text-red-600'
                            }`}
                          >
                            <option value="ACTIVE" className="text-foreground">Active</option>
                            <option value="BLOCKED" className="text-foreground">Blocked</option>
                            <option value="DELETED" className="text-foreground">Deleted</option>
                          </select>
                          <div className="pointer-events-none absolute right-2.5 flex items-center">
                            <svg className={`h-4 w-4 ${
                              userStatus[user.id] === 'ACTIVE' ? 'text-emerald-500' :
                              userStatus[user.id] === 'BLOCKED' ? 'text-amber-500' :
                              'text-red-500'
                            }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="text-right px-6">
                        <Button 
                          onClick={() => handleSubmit(user.id)} 
                          size="sm"
                          className="rounded-lg shadow-sm gap-1.5 transition-all"
                        >
                          <Save className="w-3.5 h-3.5" />
                          Save
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}