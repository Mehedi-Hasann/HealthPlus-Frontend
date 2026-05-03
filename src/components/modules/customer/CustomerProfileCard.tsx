/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { editMyInfo, updateMyAddress } from "@/actions/customer.actions"
import { toast } from "sonner"
import { User, Mail, MapPin, Phone, Edit, Save, X } from "lucide-react"
import { UpdateAddress } from "@/types/routes.type"

export interface User {
  id: string
  name: string
  email: string
  image: string | null
}

export interface Address {
  fullName?: string
  phone?: string
  city?: string
  area?: string
  street?: string
  houseNo?: string
  postalCode?: string
}

export interface ProfileData {
  user: User
  address?: Address | null
}

export function CustomerProfileCard({ data }: { data: ProfileData }) {
  console.log("Customer Profile Data : ",data)
  const { user, address } = data

  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isEditingAddress, setIsEditingAddress] = useState(false)

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    address: address || {}
  })

  const handleInputChange = (field: string, value: string, section?: string) => {
    if (section === "address") {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value }
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handleSaveProfile = async () => {
    try {
      const toastId = toast.loading("Updating Profile...")
      const result = await editMyInfo({ name: formData.name, email: formData.email })
      if(result.data){
        toast.success("Profile Updated Successfully", { id: toastId })
      }else{
        toast.error(result.error?.message || "Something Went Wrong", { id: toastId })
      }
      setIsEditingProfile(false)
    } catch {
      toast.error("Failed to Update Profile")
    }
  }

  const handleCancelProfile = () => {
    setFormData((prev) => ({
      ...prev,
      name: user.name,
      email: user.email
    }))
    setIsEditingProfile(false)
  }

  const handleSaveAddress = async () => {
    try {
      const toastId = toast.loading("Updating Address...")
      const result = await updateMyAddress(formData.address as UpdateAddress)
      if(result.data){
        toast.success("Address Updated Successfully", { id: toastId })
      }else{
        toast.error(result.error?.message || "Something Went Wrong", { id: toastId })
      }
      setIsEditingAddress(false)
    } catch {
      toast.error("Failed to Update Address")
    }
  }

  const handleCancelAddress = () => {
    setFormData((prev) => ({
      ...prev,
      address: address || {}
    }))
    setIsEditingAddress(false)
  }

  return (
    <div className="max-w-3xl mx-auto p-3 space-y-4">

      {/* Profile Section */}
      <Card className="shadow-xl rounded-3xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader className="text-center pb-2">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-28 h-28 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {formData.name.charAt(0).toUpperCase()}
              </div>

              {!isEditingProfile && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 rounded-full p-2 shadow-md"
                  onClick={() => setIsEditingProfile(true)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="space-y-3 w-full max-w-md">
              <div className="flex items-center justify-center space-x-2">
                <User className="w-5 h-5 text-muted-foreground" />
                {isEditingProfile ? (
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="text-center text-xl font-semibold border-2"
                  />
                ) : (
                  <h2 className="text-2xl font-bold">{formData.name}</h2>
                )}
              </div>

              <div className="flex items-center justify-center space-x-2">
                <Mail className="w-5 h-5 text-muted-foreground" />
                {isEditingProfile ? (
                  <Input
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="text-center border-2"
                  />
                ) : (
                  <p className="text-lg text-muted-foreground">{formData.email}</p>
                )}
              </div>
            </div>
          </div>
        </CardHeader>

        {isEditingProfile && (
          <CardContent className="text-center space-x-4">
            <Button onClick={handleSaveProfile} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={handleCancelProfile}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </CardContent>
        )}
      </Card>

      {/* Address Section */}
      <Card className="shadow-xl rounded-3xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>Address Information</span>
            </CardTitle>

            {(Object.keys(formData.address || {}).length > 0) && !isEditingAddress && (
              <Button size="sm" variant="outline" onClick={() => setIsEditingAddress(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* 🔥 FIXED CONDITION */}
          {(Object.keys(formData.address || {}).length > 0) || isEditingAddress ? (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {["fullName","phone","city","area","street","houseNo","postalCode"].map((key) => (
                <div key={key} className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground capitalize flex items-center space-x-1">
                    {key === "fullName" && <User className="w-4 h-4" />}
                    {key === "phone" && <Phone className="w-4 h-4" />}
                    {key === "city" && <MapPin className="w-4 h-4" />}
                    <span>{key.replace(/([A-Z])/g, " $1")}</span>
                  </Label>

                  {isEditingAddress ? (
                    <Input
                      value={(formData.address as any)?.[key] || ""}
                      onChange={(e) =>
                        handleInputChange(key, e.target.value, "address")
                      }
                    />
                  ) : (
                    <p className="text-sm font-medium p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                      {(formData.address as any)?.[key] || "Not provided"}
                    </p>
                  )}
                </div>
              ))}

            </div>

          ) : (
            <div className="text-center py-12">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                No address information available.
              </p>

              {/* 🔥 FIXED BUTTON */}
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    address: prev.address || {}
                  }))
                  setIsEditingAddress(true)
                }}
              >
                Add Address
              </Button>
            </div>
          )}

          {isEditingAddress && (
            <div className="text-center space-x-4 mt-6">
              <Button onClick={handleSaveAddress} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={handleCancelAddress}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}