"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  DollarSign,
  Users,
  PlusCircle,
  BarChart3,
  UserPlus,
  TrendingUp,
  Menu,
  Bell,
  Settings,
} from "lucide-react"
import { TodayCollectionsList } from "@/components/today-collections-list"
import { OverdueAccountsList } from "@/components/overdue-accounts-list"
import { LoansList } from "@/components/loans-list"
import { ClientsList } from "@/components/clients-list"

interface DashboardCardProps {
  icon: React.ReactNode
  title: string
  badge?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "default"
}

function DashboardCard({ icon, title, badge, onClick, variant = "default" }: DashboardCardProps) {
  const variantStyles = {
    primary: "bg-gradient-to-br from-primary to-accent hover:shadow-lg hover:shadow-primary/20",
    secondary: "bg-gradient-to-br from-secondary to-secondary/80 hover:shadow-lg hover:shadow-secondary/20",
    default: "bg-card hover:shadow-md",
  }

  const iconStyles = {
    primary: "text-primary-foreground",
    secondary: "text-secondary-foreground",
    default: "text-primary",
  }

  const textStyles = {
    primary: "text-primary-foreground",
    secondary: "text-secondary-foreground",
    default: "text-card-foreground",
  }

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-300 cursor-pointer border-border/50 ${variantStyles[variant]}`}
      onClick={onClick}
    >
      <div className="p-6 flex flex-col items-center justify-center gap-4 min-h-[140px]">
        <div className={`${iconStyles[variant]} transition-transform duration-300 hover:scale-110`}>{icon}</div>
        <h3 className={`text-base font-semibold text-center text-balance ${textStyles[variant]}`}>{title}</h3>
        {badge && (
          <Badge variant="secondary" className="absolute top-3 right-3 text-xs">
            {badge}
          </Badge>
        )}
      </div>
    </Card>
  )
}

export function PaymentDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")

  if (activeSection === "daily") {
    return <TodayCollectionsList onBack={() => setActiveSection("dashboard")} />
  }

  if (activeSection === "overdue") {
    return <OverdueAccountsList onBack={() => setActiveSection("dashboard")} />
  }

  if (activeSection === "loans") {
    return <LoansList onBack={() => setActiveSection("dashboard")} />
  }

  if (activeSection === "clients") {
    return <ClientsList onBack={() => setActiveSection("dashboard")} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-lg font-bold text-foreground">PayFlow</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-secondary rounded-full" />
            </Button>
            <Avatar className="h-9 w-9 border-2 border-primary/20">
              <AvatarImage src="/placeholder.svg?height=36&width=36" />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 pb-24">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-1">Bienvenido</h2>
          <p className="text-muted-foreground text-sm">Gestiona tus cobros y préstamos</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="bg-gradient-to-br from-primary to-accent border-0">
            <div className="p-4">
              <p className="text-primary-foreground/80 text-xs mb-1">Balance Total</p>
              <p className="text-primary-foreground text-2xl font-bold">$24,580</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-3 w-3 text-primary-foreground" />
                <span className="text-primary-foreground/90 text-xs">+12.5%</span>
              </div>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-secondary to-secondary/80 border-0">
            <div className="p-4">
              <p className="text-secondary-foreground/80 text-xs mb-1">Cobros Hoy</p>
              <p className="text-secondary-foreground text-2xl font-bold">$3,240</p>
              <div className="flex items-center gap-1 mt-2">
                <Clock className="h-3 w-3 text-secondary-foreground" />
                <span className="text-secondary-foreground/90 text-xs">8 pendientes</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-2 gap-3">
          <DashboardCard
            icon={<Calendar className="h-8 w-8" />}
            title="Cobros del Día"
            badge="12"
            onClick={() => setActiveSection("daily")}
          />
          <DashboardCard
            icon={<Clock className="h-8 w-8" />}
            title="Cuentas Atrasadas"
            badge="5"
            onClick={() => setActiveSection("overdue")}
          />
          <DashboardCard
            icon={<DollarSign className="h-8 w-8" />}
            title="Préstamos"
            onClick={() => setActiveSection("loans")}
          />
          <DashboardCard
            icon={<Users className="h-8 w-8" />}
            title="Clientes"
            onClick={() => setActiveSection("clients")}
          />
          <DashboardCard
            icon={<PlusCircle className="h-8 w-8" />}
            title="Nuevo Préstamo"
            onClick={() => setActiveSection("new-loan")}
            variant="primary"
          />
          <DashboardCard
            icon={<BarChart3 className="h-8 w-8" />}
            title="Estadísticas"
            onClick={() => setActiveSection("stats")}
          />
          <DashboardCard
            icon={<UserPlus className="h-8 w-8" />}
            title="Nuevo Cliente"
            onClick={() => setActiveSection("new-client")}
            variant="secondary"
          />
          <DashboardCard
            icon={<TrendingUp className="h-8 w-8" />}
            title="Gráficos"
            onClick={() => setActiveSection("charts")}
          />
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border/50 px-4 py-3 safe-area-inset-bottom">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2">
            <Calendar className="h-5 w-5" />
            <span className="text-xs">Inicio</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2">
            <BarChart3 className="h-5 w-5" />
            <span className="text-xs">Reportes</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg -mt-6"
          >
            <PlusCircle className="h-7 w-7" />
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2">
            <Users className="h-5 w-5" />
            <span className="text-xs">Clientes</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2">
            <Settings className="h-5 w-5" />
            <span className="text-xs">Ajustes</span>
          </Button>
        </div>
      </nav>
    </div>
  )
}
