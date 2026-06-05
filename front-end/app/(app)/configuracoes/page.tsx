"use client"

import { useEffect, useState } from "react"
import { Save, Bell, User, Shield, Palette } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Spinner } from "@/components/ui/spinner"
import { currentUser } from "@/lib/mock-data"
import { getStaffInfosFromCookies } from "@/services/cookies"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState(String)
  const [email, setEmail] = useState(String)

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [statusUpdates, setStatusUpdates] = useState(true)
  const [newOrders, setNewOrders] = useState(true)

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  useEffect( () =>{
    async function setStaffInfos() {
      const userDatas = await getStaffInfosFromCookies();
      setName(userDatas.staffName?userDatas.staffName:'USUARIO')
      setEmail(userDatas.staffEmail?userDatas.staffEmail: 'EMAIL')
    }
    
    setStaffInfos();

  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie suas preferências e configurações da conta
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            Aparência
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Perfil</CardTitle>
              <CardDescription>
                Atualize suas informações pessoais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {currentUser.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Alterar foto
                  </Button>
                  <p className="mt-1 text-xs text-muted-foreground">
                    JPG, GIF ou PNG. Máximo 1MB.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome Completo</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">E-mail</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <Button onClick={handleSave} disabled={isLoading} className="gap-2">
                {isLoading ? (
                  <>
                    <Spinner />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Salvar Alterações
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>
                Configure como deseja receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificações por E-mail</p>
                    <p className="text-sm text-muted-foreground">
                      Receba atualizações importantes por e-mail
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificações Push</p>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações em tempo real no navegador
                    </p>
                  </div>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Atualizações de Status</p>
                    <p className="text-sm text-muted-foreground">
                      Seja notificado quando o status de um pedido mudar
                    </p>
                  </div>
                  <Switch
                    checked={statusUpdates}
                    onCheckedChange={setStatusUpdates}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Novos Pedidos</p>
                    <p className="text-sm text-muted-foreground">
                      Seja notificado quando novos pedidos forem criados
                    </p>
                  </div>
                  <Switch
                    checked={newOrders}
                    onCheckedChange={setNewOrders}
                  />
                </div>
              </div>

              <Button onClick={handleSave} disabled={isLoading} className="gap-2">
                {isLoading ? (
                  <>
                    <Spinner />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Salvar Preferências
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Segurança da Conta</CardTitle>
              <CardDescription>
                Gerencie sua senha e configurações de segurança
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Senha Atual</label>
                  <Input type="password" placeholder="Digite sua senha atual" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nova Senha</label>
                  <Input type="password" placeholder="Digite a nova senha" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirmar Nova Senha</label>
                  <Input type="password" placeholder="Confirme a nova senha" />
                </div>
              </div>

              <Button onClick={handleSave} disabled={isLoading} className="gap-2">
                {isLoading ? (
                  <>
                    <Spinner />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4" />
                    Alterar Senha
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Aparência</CardTitle>
              <CardDescription>
                Personalize a aparência do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <p className="font-medium mb-3">Tema</p>
                  <div className="flex gap-3">
                    <button className="flex flex-col items-center gap-2 rounded-lg border-2 border-primary p-4">
                      <div className="h-12 w-20 rounded bg-white border" />
                      <span className="text-sm">Claro</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 rounded-lg border-2 border-transparent p-4 hover:border-muted">
                      <div className="h-12 w-20 rounded bg-slate-900" />
                      <span className="text-sm">Escuro</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 rounded-lg border-2 border-transparent p-4 hover:border-muted">
                      <div className="h-12 w-20 rounded bg-gradient-to-r from-white to-slate-900" />
                      <span className="text-sm">Sistema</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
