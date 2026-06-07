"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { UsersTable } from "@/components/users/users-table"
import { UserDialog, NewUserButton } from "@/components/users/user-dialog"
import { mockUsers } from "@/lib/mock-data"
import type { UserSys } from "@/lib/types"

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UserSys | null>(null)

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleEditUser = (user: UserSys) => {
    setEditingUser(user)
    setDialogOpen(true)
  }

  const handleNewUser = () => {
    setEditingUser(null)
    setDialogOpen(true)
  }

  const handleSaveUser = async (userData: Partial<UserSys>) => {
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (editingUser) {
      // Update existing user
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id ? { ...u, ...userData } : u
        )
      )
    } else {
      // Create new user
      const newUser: UserSys = {
        id: userData.id,
        name: userData.name || "",
        email: userData.email || "",
        role: userData.role ||undefined,
        avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${userData.name}`,
        createdAt: new Date(),
      }
      setUsers((prev) => [...prev, newUser])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Usuários</h1>
          <p className="text-muted-foreground">
            Gerencie os usuários do sistema
          </p>
        </div>
        <NewUserButton onClick={handleNewUser} />
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome ou e-mail..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="text-sm text-muted-foreground">
        {filteredUsers.length} usuário{filteredUsers.length !== 1 && "s"} encontrado{filteredUsers.length !== 1 && "s"}
      </div>

      <UsersTable users={filteredUsers} onEditUser={handleEditUser} />

      <UserDialog
        user={editingUser}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSaveUser}
      />
    </div>
  )
}
