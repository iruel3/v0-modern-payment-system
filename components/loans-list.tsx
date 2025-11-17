"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Search,
  Phone,
  DollarSign,
  Calendar,
  TrendingUp,
  Filter,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  Percent,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface Payment {
  number: number
  date: string
  amount: number
  status: "paid" | "pending" | "overdue"
  paidDate?: string
}

interface Loan {
  id: string
  clientName: string
  phone: string
  loanAmount: number
  interestRate: number
  totalAmount: number
  paidAmount: number
  remainingBalance: number
  startDate: string
  endDate: string
  paymentFrequency: "weekly" | "biweekly" | "monthly"
  totalPayments: number
  paidPayments: number
  payments: Payment[]
  status: "active" | "completed" | "defaulted"
}

const mockLoans: Loan[] = [
  {
    id: "1",
    clientName: "María González",
    phone: "+52 555 111 2222",
    loanAmount: 10000,
    interestRate: 15,
    totalAmount: 11500,
    paidAmount: 4600,
    remainingBalance: 6900,
    startDate: "2024-11-01",
    endDate: "2025-05-01",
    paymentFrequency: "biweekly",
    totalPayments: 12,
    paidPayments: 5,
    payments: [
      { number: 1, date: "2024-11-15", amount: 958.33, status: "paid", paidDate: "2024-11-15" },
      { number: 2, date: "2024-11-30", amount: 958.33, status: "paid", paidDate: "2024-11-30" },
      { number: 3, date: "2024-12-15", amount: 958.33, status: "paid", paidDate: "2024-12-15" },
      { number: 4, date: "2024-12-30", amount: 958.33, status: "paid", paidDate: "2024-12-30" },
      { number: 5, date: "2025-01-15", amount: 958.33, status: "paid", paidDate: "2025-01-15" },
      { number: 6, date: "2025-01-30", amount: 958.33, status: "pending" },
      { number: 7, date: "2025-02-15", amount: 958.33, status: "pending" },
      { number: 8, date: "2025-03-01", amount: 958.33, status: "pending" },
      { number: 9, date: "2025-03-15", amount: 958.33, status: "pending" },
      { number: 10, date: "2025-03-30", amount: 958.33, status: "pending" },
      { number: 11, date: "2025-04-15", amount: 958.33, status: "pending" },
      { number: 12, date: "2025-05-01", amount: 958.33, status: "pending" },
    ],
    status: "active",
  },
  {
    id: "2",
    clientName: "Carlos Hernández",
    phone: "+52 555 222 3333",
    loanAmount: 5000,
    interestRate: 12,
    totalAmount: 5600,
    paidAmount: 2800,
    remainingBalance: 2800,
    startDate: "2024-12-01",
    endDate: "2025-04-01",
    paymentFrequency: "monthly",
    totalPayments: 4,
    paidPayments: 2,
    payments: [
      { number: 1, date: "2025-01-01", amount: 1400, status: "paid", paidDate: "2025-01-01" },
      { number: 2, date: "2025-02-01", amount: 1400, status: "paid", paidDate: "2025-02-01" },
      { number: 3, date: "2025-03-01", amount: 1400, status: "pending" },
      { number: 4, date: "2025-04-01", amount: 1400, status: "pending" },
    ],
    status: "active",
  },
  {
    id: "3",
    clientName: "Ana Martínez",
    phone: "+52 555 333 4444",
    loanAmount: 15000,
    interestRate: 18,
    totalAmount: 17700,
    paidAmount: 8850,
    remainingBalance: 8850,
    startDate: "2024-10-01",
    endDate: "2025-10-01",
    paymentFrequency: "monthly",
    totalPayments: 12,
    paidPayments: 6,
    payments: [
      { number: 1, date: "2024-11-01", amount: 1475, status: "paid", paidDate: "2024-11-01" },
      { number: 2, date: "2024-12-01", amount: 1475, status: "paid", paidDate: "2024-12-01" },
      { number: 3, date: "2025-01-01", amount: 1475, status: "paid", paidDate: "2025-01-01" },
      { number: 4, date: "2025-02-01", amount: 1475, status: "paid", paidDate: "2025-02-01" },
      { number: 5, date: "2025-03-01", amount: 1475, status: "overdue" },
      { number: 6, date: "2025-04-01", amount: 1475, status: "pending" },
      { number: 7, date: "2025-05-01", amount: 1475, status: "pending" },
      { number: 8, date: "2025-06-01", amount: 1475, status: "pending" },
      { number: 9, date: "2025-07-01", amount: 1475, status: "pending" },
      { number: 10, date: "2025-08-01", amount: 1475, status: "pending" },
      { number: 11, date: "2025-09-01", amount: 1475, status: "pending" },
      { number: 12, date: "2025-10-01", amount: 1475, status: "pending" },
    ],
    status: "active",
  },
  {
    id: "4",
    clientName: "Roberto Silva",
    phone: "+52 555 444 5555",
    loanAmount: 8000,
    interestRate: 10,
    totalAmount: 8800,
    paidAmount: 8800,
    remainingBalance: 0,
    startDate: "2024-06-01",
    endDate: "2024-12-01",
    paymentFrequency: "monthly",
    totalPayments: 6,
    paidPayments: 6,
    payments: [
      { number: 1, date: "2024-07-01", amount: 1466.67, status: "paid", paidDate: "2024-07-01" },
      { number: 2, date: "2024-08-01", amount: 1466.67, status: "paid", paidDate: "2024-08-01" },
      { number: 3, date: "2024-09-01", amount: 1466.67, status: "paid", paidDate: "2024-09-01" },
      { number: 4, date: "2024-10-01", amount: 1466.67, status: "paid", paidDate: "2024-10-01" },
      { number: 5, date: "2024-11-01", amount: 1466.67, status: "paid", paidDate: "2024-11-01" },
      { number: 6, date: "2024-12-01", amount: 1466.67, status: "paid", paidDate: "2024-12-01" },
    ],
    status: "completed",
  },
]

interface LoansListProps {
  onBack: () => void
}

export function LoansList({ onBack }: LoansListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "completed">("all")
  const [expandedLoans, setExpandedLoans] = useState<Set<string>>(new Set())

  const filteredLoans = mockLoans.filter((loan) => {
    const matchesSearch = loan.clientName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || loan.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const activeLoans = filteredLoans.filter((l) => l.status === "active")
  const totalLent = activeLoans.reduce((sum, loan) => sum + loan.loanAmount, 0)
  const totalCollected = activeLoans.reduce((sum, loan) => sum + loan.paidAmount, 0)
  const totalRemaining = activeLoans.reduce((sum, loan) => sum + loan.remainingBalance, 0)

  const getStatusColor = (status: Loan["status"]) => {
    switch (status) {
      case "completed":
        return "bg-primary/10 text-primary border-primary/20"
      case "active":
        return "bg-secondary/10 text-secondary border-secondary/20"
      default:
        return "bg-destructive/10 text-destructive border-destructive/20"
    }
  }

  const getStatusText = (status: Loan["status"]) => {
    switch (status) {
      case "completed":
        return "Completado"
      case "active":
        return "Activo"
      default:
        return "Moroso"
    }
  }

  const getPaymentStatusColor = (status: Payment["status"]) => {
    switch (status) {
      case "paid":
        return "bg-primary/10 text-primary border-primary/20"
      case "overdue":
        return "bg-destructive/10 text-destructive border-destructive/20"
      default:
        return "bg-muted/50 text-muted-foreground border-border"
    }
  }

  const getPaymentStatusIcon = (status: Payment["status"]) => {
    switch (status) {
      case "paid":
        return <CheckCircle2 className="h-4 w-4" />
      case "overdue":
        return <Clock className="h-4 w-4 text-destructive" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const toggleExpanded = (loanId: string) => {
    const newExpanded = new Set(expandedLoans)
    if (newExpanded.has(loanId)) {
      newExpanded.delete(loanId)
    } else {
      newExpanded.add(loanId)
    }
    setExpandedLoans(newExpanded)
  }

  const getFrequencyText = (frequency: Loan["paymentFrequency"]) => {
    switch (frequency) {
      case "weekly":
        return "Semanal"
      case "biweekly":
        return "Quincenal"
      case "monthly":
        return "Mensual"
    }
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
            <h1 className="text-lg font-bold text-foreground">Préstamos</h1>
            <p className="text-xs text-muted-foreground">{filteredLoans.length} préstamos registrados</p>
          </div>
          <Button variant="ghost" size="icon">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="px-4 py-4 space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <Card className="bg-gradient-to-br from-primary to-accent border-0">
            <div className="p-3 text-center">
              <p className="text-primary-foreground/80 text-xs mb-1">Prestado</p>
              <p className="text-primary-foreground text-lg font-bold">${totalLent}</p>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-secondary to-secondary/80 border-0">
            <div className="p-3 text-center">
              <p className="text-secondary-foreground/80 text-xs mb-1">Cobrado</p>
              <p className="text-secondary-foreground text-lg font-bold">${totalCollected}</p>
            </div>
          </Card>
          <Card className="bg-card border-border/50">
            <div className="p-3 text-center">
              <p className="text-muted-foreground text-xs mb-1">Por Cobrar</p>
              <p className="text-foreground text-lg font-bold">${totalRemaining}</p>
            </div>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar préstamo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border/50"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("all")}
            className="rounded-full whitespace-nowrap"
          >
            Todos
          </Button>
          <Button
            variant={filterStatus === "active" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("active")}
            className="rounded-full whitespace-nowrap"
          >
            Activos
          </Button>
          <Button
            variant={filterStatus === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("completed")}
            className="rounded-full whitespace-nowrap"
          >
            Completados
          </Button>
        </div>
      </div>

      {/* Loans List */}
      <div className="px-4 space-y-3">
        {filteredLoans.map((loan) => {
          const isExpanded = expandedLoans.has(loan.id)
          const progressPercentage = (loan.paidAmount / loan.totalAmount) * 100

          return (
            <Card key={loan.id} className="overflow-hidden border-border/50 hover:shadow-md transition-shadow">
              <div className="p-4">
                {/* Header with Avatar and Status Badge */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {loan.clientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground text-balance">{loan.clientName}</h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {new Date(loan.startDate).toLocaleDateString("es-MX", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className={`${getStatusColor(loan.status)} text-xs`}>
                    {getStatusText(loan.status)}
                  </Badge>
                </div>

                {/* Loan Details Grid */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-muted/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <p className="text-xs text-muted-foreground">Monto Prestado</p>
                    </div>
                    <p className="text-lg font-bold text-foreground">${loan.loanAmount}</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Percent className="h-4 w-4 text-secondary" />
                      <p className="text-xs text-muted-foreground">Interés</p>
                    </div>
                    <p className="text-lg font-bold text-secondary">{loan.interestRate}%</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Progreso de Pago</span>
                    <span className="text-xs font-semibold text-foreground">
                      {loan.paidPayments}/{loan.totalPayments} pagos
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-primary font-semibold">Pagado: ${loan.paidAmount}</span>
                    <span className="text-xs text-muted-foreground">Restante: ${loan.remainingBalance}</span>
                  </div>
                </div>

                {/* Loan Info */}
                <div className="flex items-center justify-between mb-3 p-3 bg-muted/20 rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Total a Pagar</p>
                    <p className="text-xl font-bold text-foreground">${loan.totalAmount}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">Frecuencia</p>
                    <Badge variant="outline" className="text-xs">
                      {getFrequencyText(loan.paymentFrequency)}
                    </Badge>
                  </div>
                </div>

                {/* Collapsible Payment Schedule */}
                <Collapsible open={isExpanded} onOpenChange={() => toggleExpanded(loan.id)}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-full justify-between mb-2">
                      <span className="text-sm font-medium">Calendario de Pagos</span>
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 mb-3">
                    {loan.payments.map((payment) => (
                      <div
                        key={payment.number}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          payment.status === "paid"
                            ? "bg-primary/5 border-primary/20"
                            : payment.status === "overdue"
                              ? "bg-destructive/5 border-destructive/20"
                              : "bg-muted/30 border-border"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {getPaymentStatusIcon(payment.status)}
                          <div>
                            <p className="text-sm font-medium text-foreground">Pago #{payment.number}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(payment.date).toLocaleDateString("es-MX", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                            {payment.paidDate && (
                              <p className="text-xs text-primary">
                                Pagado:{" "}
                                {new Date(payment.paidDate).toLocaleDateString("es-MX", {
                                  day: "numeric",
                                  month: "short",
                                })}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-foreground">${payment.amount.toFixed(2)}</p>
                          <Badge variant="outline" className={`${getPaymentStatusColor(payment.status)} text-xs mt-1`}>
                            {payment.status === "paid"
                              ? "Pagado"
                              : payment.status === "overdue"
                                ? "Vencido"
                                : "Pendiente"}
                          </Badge>
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
                    onClick={() => window.open(`tel:${loan.phone}`)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Llamar
                  </Button>
                  {loan.status === "active" && (
                    <Button className="flex-1 bg-gradient-to-r from-primary to-accent" size="sm">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Registrar Pago
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          )
        })}

        {filteredLoans.length === 0 && (
          <div className="text-center py-12">
            <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">No se encontraron préstamos</p>
          </div>
        )}
      </div>
    </div>
  )
}
