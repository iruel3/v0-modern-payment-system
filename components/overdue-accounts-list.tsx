"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Search,
  Phone,
  AlertCircle,
  DollarSign,
  Calendar,
  TrendingDown,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface OverduePayment {
  date: string
  amount: number
  daysOverdue: number
}

interface OverdueAccount {
  id: string
  clientName: string
  phone: string
  totalDebt: number
  overduePayments: OverduePayment[]
  lateFee: number
  daysOverdue: number
  riskLevel: "low" | "medium" | "high"
}

const mockOverdueAccounts: OverdueAccount[] = [
  {
    id: "1",
    clientName: "Pedro Ramírez",
    phone: "+52 555 111 2222",
    totalDebt: 1850,
    overduePayments: [
      { date: "2025-01-05", amount: 450, daysOverdue: 30 },
      { date: "2025-02-05", amount: 450, daysOverdue: 0 },
    ],
    lateFee: 135,
    daysOverdue: 30,
    riskLevel: "high",
  },
  {
    id: "2",
    clientName: "Sofía Mendoza",
    phone: "+52 555 222 3333",
    totalDebt: 980,
    overduePayments: [
      { date: "2025-01-20", amount: 320, daysOverdue: 15 },
      { date: "2025-02-20", amount: 320, daysOverdue: 0 },
    ],
    lateFee: 48,
    daysOverdue: 15,
    riskLevel: "medium",
  },
  {
    id: "3",
    clientName: "Miguel Ángel Torres",
    phone: "+52 555 333 4444",
    totalDebt: 2450,
    overduePayments: [
      { date: "2024-12-15", amount: 580, daysOverdue: 51 },
      { date: "2025-01-15", amount: 580, daysOverdue: 21 },
      { date: "2025-02-15", amount: 580, daysOverdue: 0 },
    ],
    lateFee: 232,
    daysOverdue: 51,
    riskLevel: "high",
  },
  {
    id: "4",
    clientName: "Gabriela Flores",
    phone: "+52 555 444 5555",
    totalDebt: 720,
    overduePayments: [{ date: "2025-01-28", amount: 275, daysOverdue: 7 }],
    lateFee: 19.25,
    daysOverdue: 7,
    riskLevel: "low",
  },
  {
    id: "5",
    clientName: "Fernando Castro",
    phone: "+52 555 555 6666",
    totalDebt: 1560,
    overduePayments: [
      { date: "2025-01-10", amount: 420, daysOverdue: 25 },
      { date: "2025-02-10", amount: 420, daysOverdue: 0 },
    ],
    lateFee: 105,
    daysOverdue: 25,
    riskLevel: "medium",
  },
]

interface OverdueAccountsListProps {
  onBack: () => void
}

export function OverdueAccountsList({ onBack }: OverdueAccountsListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRisk, setFilterRisk] = useState<"all" | "low" | "medium" | "high">("all")
  const [expandedAccounts, setExpandedAccounts] = useState<Set<string>>(new Set())

  const filteredAccounts = mockOverdueAccounts.filter((account) => {
    const matchesSearch = account.clientName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterRisk === "all" || account.riskLevel === filterRisk
    return matchesSearch && matchesFilter
  })

  const totalDebt = filteredAccounts.reduce((sum, account) => sum + account.totalDebt, 0)
  const totalLateFees = filteredAccounts.reduce((sum, account) => sum + account.lateFee, 0)
  const highRiskCount = filteredAccounts.filter((a) => a.riskLevel === "high").length

  const getRiskColor = (risk: OverdueAccount["riskLevel"]) => {
    switch (risk) {
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20"
      case "medium":
        return "bg-secondary/10 text-secondary border-secondary/20"
      default:
        return "bg-muted/50 text-muted-foreground border-border"
    }
  }

  const getRiskText = (risk: OverdueAccount["riskLevel"]) => {
    switch (risk) {
      case "high":
        return "Alto Riesgo"
      case "medium":
        return "Riesgo Medio"
      default:
        return "Bajo Riesgo"
    }
  }

  const toggleExpanded = (accountId: string) => {
    const newExpanded = new Set(expandedAccounts)
    if (newExpanded.has(accountId)) {
      newExpanded.delete(accountId)
    } else {
      newExpanded.add(accountId)
    }
    setExpandedAccounts(newExpanded)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center gap-3 px-4 py-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">Cuentas Atrasadas</h1>
            <p className="text-xs text-muted-foreground">{filteredAccounts.length} cuentas con pagos vencidos</p>
          </div>
          <Button variant="ghost" size="icon">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="px-4 py-4 space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <Card className="bg-gradient-to-br from-destructive to-destructive/80 border-0">
            <div className="p-3 text-center">
              <p className="text-destructive-foreground/80 text-xs mb-1">Deuda Total</p>
              <p className="text-destructive-foreground text-lg font-bold">${totalDebt}</p>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-secondary to-secondary/80 border-0">
            <div className="p-3 text-center">
              <p className="text-secondary-foreground/80 text-xs mb-1">Mora Total</p>
              <p className="text-secondary-foreground text-lg font-bold">${totalLateFees.toFixed(2)}</p>
            </div>
          </Card>
          <Card className="bg-card border-border/50">
            <div className="p-3 text-center">
              <p className="text-muted-foreground text-xs mb-1">Alto Riesgo</p>
              <p className="text-foreground text-lg font-bold">{highRiskCount}</p>
            </div>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cliente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border/50"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Button
            variant={filterRisk === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterRisk("all")}
            className="rounded-full whitespace-nowrap"
          >
            Todos
          </Button>
          <Button
            variant={filterRisk === "high" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterRisk("high")}
            className="rounded-full whitespace-nowrap"
          >
            Alto Riesgo
          </Button>
          <Button
            variant={filterRisk === "medium" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterRisk("medium")}
            className="rounded-full whitespace-nowrap"
          >
            Riesgo Medio
          </Button>
          <Button
            variant={filterRisk === "low" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterRisk("low")}
            className="rounded-full whitespace-nowrap"
          >
            Bajo Riesgo
          </Button>
        </div>
      </div>

      {/* Overdue Accounts List */}
      <div className="px-4 space-y-3">
        {filteredAccounts.map((account) => {
          const isExpanded = expandedAccounts.has(account.id)
          return (
            <Card key={account.id} className="overflow-hidden border-border/50 hover:shadow-md transition-shadow">
              <div className="p-4">
                {/* Header with Avatar and Risk Badge */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-destructive/20">
                      <AvatarFallback className="bg-destructive/10 text-destructive font-semibold">
                        {account.clientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground text-balance">{account.clientName}</h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <AlertCircle className="h-3 w-3" />
                        <span>{account.daysOverdue} días de atraso</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className={`${getRiskColor(account.riskLevel)} text-xs`}>
                    {getRiskText(account.riskLevel)}
                  </Badge>
                </div>

                {/* Debt Summary */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-muted/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="h-4 w-4 text-destructive" />
                      <p className="text-xs text-muted-foreground">Deuda Total</p>
                    </div>
                    <p className="text-lg font-bold text-foreground">${account.totalDebt}</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingDown className="h-4 w-4 text-secondary" />
                      <p className="text-xs text-muted-foreground">Mora Acumulada</p>
                    </div>
                    <p className="text-lg font-bold text-secondary">${account.lateFee.toFixed(2)}</p>
                  </div>
                </div>

                {/* Collapsible Overdue Payments */}
                <Collapsible open={isExpanded} onOpenChange={() => toggleExpanded(account.id)}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-full justify-between mb-2">
                      <span className="text-sm font-medium">Pagos Atrasados ({account.overduePayments.length})</span>
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 mb-3">
                    {account.overduePayments.map((payment, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          payment.daysOverdue > 0
                            ? "bg-destructive/5 border-destructive/20"
                            : "bg-muted/30 border-border"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {new Date(payment.date).toLocaleDateString("es-MX", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                            {payment.daysOverdue > 0 && (
                              <p className="text-xs text-destructive">{payment.daysOverdue} días vencido</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-foreground">${payment.amount}</p>
                          {payment.daysOverdue > 0 && (
                            <Badge
                              variant="outline"
                              className="bg-destructive/10 text-destructive border-destructive/20 text-xs mt-1"
                            >
                              Vencido
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-3 border-t border-border/50">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => window.open(`tel:${account.phone}`)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Llamar
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-primary to-accent" size="sm">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Registrar Pago
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}

        {filteredAccounts.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">No se encontraron cuentas atrasadas</p>
          </div>
        )}
      </div>
    </div>
  )
}
