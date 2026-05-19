"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import type { User, UserRole } from "@/lib/types"

interface UserDialogProps {
  user?: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (userData: Partial<User>) => Promise<void>
}

export function UserDialog({ user, open, onOpenChange, onSave }: UserDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<UserRole>("employee")

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setRole(user.role)
    } else {
      setName("")
      setEmail("")
      setRole("employee")
    }
  }, [user])

  const handleSubmit = async () => {
    setIsLoading(true)
    await onSave({ name, email, role })
    setIsLoading(false)
    onOpenChange(false)
  }

  const isEditing = !!user

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Usuário" : "Novo Usuário"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Atualize as informações do usuário"
              : "Preencha os dados para criar um novo usuário"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nome Completo</label>
            <Input
              placeholder="Digite o nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">E-mail</label>
            <Input
              type="email"
              placeholder="usuario@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Perfil</label>
            <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="employee">Funcionário</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Administradores têm acesso total ao sistema. Funcionários podem gerenciar apenas pedidos.
            </p>
          </div>

          {!isEditing && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Senha Inicial</label>
              <Input type="password" placeholder="Digite a senha" />
              <p className="text-xs text-muted-foreground">
                O usuário poderá alterar a senha após o primeiro acesso.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading || !name || !email}>
            {isLoading ? (
              <>
                <Spinner className="mr-2" />
                Salvando...
              </>
            ) : isEditing ? (
              "Salvar Alterações"
            ) : (
              "Criar Usuário"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function NewUserButton({ onClick }: { onClick: () => void }) {
  return (
    <Button className="gap-2" onClick={onClick}>
      <Plus className="h-4 w-4" />
      Novo Usuário
    </Button>
  )
}
