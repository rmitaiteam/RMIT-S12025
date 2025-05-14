'use client'

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function ProfilePageComponent() {
  const [username, setUsername] = useState("johndoe")
  const [email, setEmail] = useState("johndoe@example.com")
  const [avatarSrc, setAvatarSrc] = useState("https://i.pravatar.cc/150?u=a04258114e29026302d")

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarSrc(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission here
    console.log("Form submitted")
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <div className="flex items-center space-x-4 mb-6">
        <Avatar className="w-20 h-20">
          <AvatarImage src={avatarSrc} alt="Profile picture" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-medium">{username}</h2>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </div>
      <Separator className="my-6" />
      <h2 className="text-lg font-medium mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Preferred Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Enter new password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-picture">Profile Picture</Label>
          <Input
            id="profile-picture"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  )
}