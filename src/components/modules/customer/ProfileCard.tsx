/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { editMyInfo, updateMyAddress } from "@/actions/customer.actions"
import { toast } from "sonner"
import {
  User,
  Mail,
  MapPin,
  Phone,
  Edit2,
  Save,
  X,
  Home,
  Building2,
  Hash,
  MailOpen,
  CheckCircle2,
} from "lucide-react"
import { UpdateAddress } from "@/types/routes.type"

export interface User {
  id: string
  role : string
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

const ADDRESS_FIELDS: {
  key: keyof Address
  label: string
  icon: React.ReactNode
  placeholder: string
}[] = [
  {
    key: "fullName",
    label: "Full Name",
    icon: <User className="w-3.5 h-3.5" />,
    placeholder: "Your full name",
  },
  {
    key: "phone",
    label: "Phone",
    icon: <Phone className="w-3.5 h-3.5" />,
    placeholder: "+1 234 567 8900",
  },
  {
    key: "city",
    label: "City",
    icon: <Building2 className="w-3.5 h-3.5" />,
    placeholder: "Your city",
  },
  {
    key: "area",
    label: "Area",
    icon: <MapPin className="w-3.5 h-3.5" />,
    placeholder: "Your area",
  },
  {
    key: "street",
    label: "Street",
    icon: <Home className="w-3.5 h-3.5" />,
    placeholder: "Street name",
  },
  {
    key: "houseNo",
    label: "House No.",
    icon: <Hash className="w-3.5 h-3.5" />,
    placeholder: "House number",
  },
  {
    key: "postalCode",
    label: "Postal Code",
    icon: <MailOpen className="w-3.5 h-3.5" />,
    placeholder: "Postal / ZIP code",
  },
]

export function ProfileCard({ data }: { data: ProfileData }) {
  console.log("data => ",data)
  const { user, address } = data

  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isEditingAddress, setIsEditingAddress] = useState(false)

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    address: address || {},
    image: user.image,
  })

  const handleInputChange = (
    field: string,
    value: string,
    section?: string
  ) => {
    if (section === "address") {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handleSaveProfile = async () => {
    try {
      const toastId = toast.loading("Saving profile...")
      const result = await editMyInfo({
        name: formData.name,
        email: formData.email,
      })
      if (result.data) {
        toast.success("Profile updated!", { id: toastId })
      } else {
        toast.error(result.error?.message || "Something went wrong", {
          id: toastId,
        })
      }
      setIsEditingProfile(false)
    } catch {
      toast.error("Failed to update profile")
    }
  }

  const handleCancelProfile = () => {
    setFormData((prev) => ({ ...prev, name: user.name, email: user.email }))
    setIsEditingProfile(false)
  }

  const handleSaveAddress = async () => {
    try {
      const toastId = toast.loading("Saving address...")
      const result = await updateMyAddress(formData.address as UpdateAddress)
      if (result.data) {
        toast.success("Address updated!", { id: toastId })
      } else {
        toast.error(result.error?.message || "Something went wrong", {
          id: toastId,
        })
      }
      setIsEditingAddress(false)
    } catch {
      toast.error("Failed to update address")
    }
  }

  const handleCancelAddress = () => {
    setFormData((prev) => ({ ...prev, address: address || {} }))
    setIsEditingAddress(false)
  }

  const hasAddress = Object.values(formData.address || {}).some(
    (v) => v && String(v).trim() !== ""
  )

  const initials = formData.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="max-w-3xl mx-auto space-y-5">

      {/* ── Profile Card ── */}
      <Card className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">

        {/* Hero Banner */}
        <div className="h-28 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 dark:from-emerald-700 dark:via-teal-700 dark:to-emerald-800 relative">
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        <CardContent className="px-6 pb-6">
          {/* Avatar row */}
          <div className="flex items-end justify-between -mt-14 mb-5">
            <div className="relative">
              {/* Outer ring */}
              <div className="w-24 h-24 rounded-full p-[3px] bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg">
                <div className="w-full h-full rounded-full overflow-hidden bg-card flex items-center justify-center">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt={formData.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 select-none">
                      {initials}
                    </span>
                  )}
                </div>
              </div>
              {/* Online dot */}
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-card" />
            </div>

            {/* Edit / Save / Cancel buttons */}
            <div className="flex gap-2">
              {isEditingProfile ? (
                <>
                  <Button
                    size="sm"
                    onClick={handleSaveProfile}
                    className="rounded-xl h-8 px-3 bg-emerald-600 hover:bg-emerald-700 dark:hover:bg-emerald-500 text-white text-xs gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCancelProfile}
                    className="rounded-xl h-8 px-3 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-3.5 h-3.5" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditingProfile(true)}
                  className="rounded-xl h-8 px-3 text-xs gap-1.5 border-border hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          {/* Name & email */}
          {isEditingProfile ? (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Name
                </Label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="h-9 rounded-xl bg-muted/50 border-border focus-visible:ring-emerald-500/50"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Email
                </Label>
                <Input
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="h-9 rounded-xl bg-muted/50 border-border focus-visible:ring-emerald-500/50"
                />
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold text-foreground leading-tight">
                {formData.name}
              </h2>
              <div className="flex items-center gap-1.5 mt-1">
                <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{formData.email}</p>
              </div>
              <div className="mt-3">
                <Badge
                  variant="secondary"
                  className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                >
                  {data.user?.role}
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Address Card ── */}
      <Card className="rounded-2xl border border-border bg-card shadow-sm">
        <CardContent className="p-6">
          {/* Section header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-400/10 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Delivery Address
                </h3>
                <p className="text-xs text-muted-foreground">
                  Used for order shipping
                </p>
              </div>
            </div>

            {hasAddress && !isEditingAddress && (
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Saved
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditingAddress(true)}
                  className="rounded-xl h-8 px-3 text-xs gap-1.5 border-border hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit
                </Button>
              </div>
            )}
          </div>

          <Separator className="mb-5" />

          {hasAddress || isEditingAddress ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ADDRESS_FIELDS.map(({ key, label, icon, placeholder }) => (
                  <div key={key} className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                      {icon}
                      {label}
                    </Label>

                    {isEditingAddress ? (
                      <Input
                        value={(formData.address as any)?.[key] || ""}
                        placeholder={placeholder}
                        onChange={(e) =>
                          handleInputChange(key, e.target.value, "address")
                        }
                        className="h-9 rounded-xl bg-muted/50 border-border focus-visible:ring-emerald-500/50 text-sm"
                      />
                    ) : (
                      <div className="h-9 px-3 flex items-center rounded-xl bg-muted/40 border border-border/50">
                        <p className="text-sm text-foreground truncate">
                          {(formData.address as any)?.[key] || (
                            <span className="text-muted-foreground italic">
                              Not set
                            </span>
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {isEditingAddress && (
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={handleSaveAddress}
                    className="rounded-xl h-9 px-5 bg-emerald-600 hover:bg-emerald-700 dark:hover:bg-emerald-500 text-white text-sm gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Address
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleCancelAddress}
                    className="rounded-xl h-9 px-5 text-sm gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                </div>
              )}
            </>
          ) : (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
                <MapPin className="w-7 h-7 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">
                  No address saved
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Add your delivery address to speed up checkout.
                </p>
              </div>
              <Button
                onClick={() => setIsEditingAddress(true)}
                className="mt-1 rounded-xl h-9 px-5 bg-emerald-600 hover:bg-emerald-700 dark:hover:bg-emerald-500 text-white text-sm gap-2"
              >
                <MapPin className="w-4 h-4" />
                Add Address
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}