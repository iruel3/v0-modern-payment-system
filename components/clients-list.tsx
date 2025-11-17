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
  Mail,
  MapPin,
  DollarSign,
  TrendingUp,
  Filter,
  ChevronDown,
  ChevronUp,
  Calendar,
  CreditCard,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface ClientLoan {
  id: string
  amount: number
  totalAmount: number
  paidAmount: number
  remainingBalance: number
  status: "active" | "completed" | "overdue"
  startDate: string
  nextPaymentDate: string
  nextPaymentAmount: number
}

interface Client {
  id: string
  name: string
  phone: string
  email: string
  address: string
  city: string
  registrationDate: string
  totalLoans: number
  activeLoans: number
  completedLoans: number
  totalBorrowed: number
  totalPaid: number
  currentDebt: number
  paymentHistory: "excellent" | "good" | "regular" | "poor"
  status: "active" | "inactive" | "defaulted"
  loans: ClientLoan[]
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "María González",
    phone: "+52 555 111 2222",
    email: "maria.gonzalez@email.com",
    address: "Av. Insurgentes Sur 1234, Col. Del Valle",
    city: "Ciudad de México",
    registrationDate: "2024-01-15",
    totalLoans: 3,
    activeLoans: 1,
    completedLoans: 2,
    totalBorrowed: 25000,
    totalPaid: 18500,
    currentDebt: 6500,
    paymentHistory: "excellent",
    status: "active",
    loans: [
      {
        id: "L001",
        amount: 10000,
        totalAmount: 11500,
        paidAmount: 4600,
        remainingBalance: 6900,
        status: "active",
        startDate: "2024-11-01",
        nextPaymentDate: "2025-01-30",
        nextPaymentAmount: 958.33,
      },
    ],
  },
  {
    id: "2",
    name: "Carlos Hernández",
    phone: "+52 555 222 3333",
    email: "carlos.hernandez@email.com",
    address: "Calle Reforma 567, Col. Centro",
    city: "Guadalajara",
    registrationDate: "2024-03-20",
    totalLoans: 2,
    activeLoans: 1,
    completedLoans: 1,
    totalBorrowed: 12000,
    totalPaid: 9200,
    currentDebt: 2800,
    paymentHistory: "good",
    status: "active",
    loans: [
      {
        id: "L002",
        amount: 5000,
        totalAmount: 5600,
        paidAmount: 2800,
        remainingBalance: 2800,
        status: "active",
        startDate: "2024-12-01",
        nextPaymentDate: "2025-03-01",
        nextPaymentAmount: 1400,
      },
    ],
  },
  {
    id: "3",
    name: "Ana Martínez",
    phone: "+52 555 333 4444",
    email: "ana.martinez@email.com",
    address: "Blvd. Miguel de Cervantes 890, Col. Moderna",
    city: "Monterrey",
    registrationDate: "2023-11-10",
    totalLoans: 4,
    activeLoans: 1,
    completedLoans: 3,
    totalBorrowed: 45000,
    totalPaid: 36150,
    currentDebt: 8850,
    paymentHistory: "regular",
    status: "active",
    loans: [
      {
        id: "L003",
        amount: 15000,
        totalAmount: 17700,
        paidAmount: 8850,
        remainingBalance: 8850,
        status: "overdue",
        startDate: "2024-10-01",
        nextPaymentDate: "2025-03-01",
        nextPaymentAmount: 1475,
      },
    ],
  },
  {
    id: "4",
    name: "Roberto Silva",
    phone: "+52 555 444 5555",
    email: "roberto.silva@email.com",
    address: "Av. Juárez 321, Col. Juárez",
    city: "Puebla",
    registrationDate: "2024-05-05",
    totalLoans: 1,
    activeLoans: 0,
    completedLoans: 1,
    totalBorrowed: 8000,
    totalPaid: 8800,
    currentDebt: 0,
    paymentHistory: "excellent",
    status: "active",
    loans: [],
  },
  {
    id: "5",
    name: "Laura Ramírez",
    phone: "+52 555 555 6666",
    email: "laura.ramirez@email.com",
    address: "Calle Morelos 456, Col. Centro",
    city: "Querétaro",
    registrationDate: "2024-02-14",
    totalLoans: 2,
    activeLoans: 2,
    completedLoans: 0,
    totalBorrowed: 18000,
    totalPaid: 7200,
    currentDebt: 10800,
    paymentHistory: "good",
    status: "active",
    loans: [
      {
        id: "L004",
        amount: 8000,
        totalAmount: 9200,
        paidAmount: 3680,
        remainingBalance: 5520,
        status: "active",
        startDate: "2024-11-15",
        nextPaymentDate: "2025-02-15",
        nextPaymentAmount: 920,
      },
      {
        id: "L005",
        amount: 10000,
        totalAmount: 11500,
        paidAmount: 3450,
        remainingBalance: 8050,
        status: "active",
        startDate: "2024-12-01",
        nextPaymentDate: "2025-02-01",
        nextPaymentAmount: 1150,
      },
    ],
  },
  {
    id: "6",
    name: "Diego Torres",
    phone: "+52 555 666 7777",
    email: "diego.torres@email.com",
    address: "Av. Universidad 789, Col. Copilco",
    city: "Ciudad de México",
    registrationDate: "2023-08-22",
    totalLoans: 5,
    activeLoans: 0,
    completedLoans: 4,
    totalBorrowed: 35000,
    totalPaid: 32500,
    currentDebt: 2500,
    paymentHistory: "poor",
    status: "defaulted",
    loans: [
      {
        id: "L006",
        amount: 5000,
        totalAmount: 5750,
        paidAmount: 3250,
        remainingBalance: 2500,
        status: "overdue",
        startDate: "2024-08-01",
        nextPaymentDate: "2024-12-01",
        nextPaymentAmount: 575,
      },
    ],
  },
]

interface ClientsListProps {
  onBack: () => void
}

export function ClientsList({ onBack }: ClientsListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive" | "defaulted">("all")
  const [expandedClients, setExpandedClients] = useState<Set<string>>(new Set())

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || client.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalClients = filteredClients.length
  const activeClients = filteredClients.filter((c) => c.status === "active").length
  const totalDebt = filteredClients.reduce((sum, client) => sum + client.currentDebt, 0)

  const getStatusColor = (status: Client["status"]) => {
    switch (status) {
      case "active":
        return "bg-primary/10 text-primary border-primary/20"
      case "inactive":
        return "bg-muted/50 text-muted-foreground border-border"
      default:
        return "bg-destructive/10 text-destructive border-destructive/20"
    }
  }

  const getStatusText = (status: Client["status"]) => {
    switch (status) {
      case "active":
        return "Activo"
      case "inactive":
        return "Inactivo"
      default:
        return "Moroso"
    }
  }

  const getPaymentHistoryColor = (history: Client["paymentHistory"]) => {
    switch (history) {
      case "excellent":
        return "bg-primary/10 text-primary border-primary/20"
      case "good":
        return "bg-secondary/10 text-secondary border-secondary/20"
      case "regular":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      default:
        return "bg-destructive/10 text-destructive border-destructive/20"
    }
  }

  const getPaymentHistoryText = (history: Client["paymentHistory"]) => {
    switch (history) {
      case "excellent":
        return "Excelente"
      case "good":
        return "Bueno"
      case "regular":
        return "Regular"
      default:
        return "Malo"
    }
  }

  const getLoanStatusColor = (status: ClientLoan["status"]) => {
    switch (status) {
      case "completed":
        return "bg-primary/10 text-primary border-primary/20"
      case "active":
        return "bg-secondary/10 text-secondary border-secondary/20"
      default:
        return "bg-destructive/10 text-destructive border-destructive/20"
    }
  }

  const toggleExpanded = (clientId: string) => {
    const newExpanded = new Set(expandedClients)
    if (newExpanded.has(clientId)) {
      newExpanded.delete(clientId)
    } else {
      newExpanded.add(clientId)
    }
    setExpandedClients(newExpanded)
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
            <h1 className="text-lg font-bold text-foreground">Clientes</h1>
            <p className="text-xs text-muted-foreground">{totalClients} clientes registrados</p>
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
              <p className="text-primary-foreground/80 text-xs mb-1">Total</p>
              <p className="text-primary-foreground text-lg font-bold">{totalClients}</p>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-secondary to-secondary/80 border-0">
            <div className="p-3 text-center">
              <p className="text-secondary-foreground/80 text-xs mb-1">Activos</p>
              <p className="text-secondary-foreground text-lg font-bold">{activeClients}</p>
            </div>
          </Card>
          <Card className="bg-card border-border/50">
            <div className="p-3 text-center">
              <p className="text-muted-foreground text-xs mb-1">Deuda Total</p>
              <p className="text-foreground text-lg font-bold">${totalDebt}</p>
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
            variant={filterStatus === "inactive" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("inactive")}
            className="rounded-full whitespace-nowrap"
          >
            Inactivos
          </Button>
          <Button
            variant={filterStatus === "defaulted" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("defaulted")}
            className="rounded-full whitespace-nowrap"
          >
            Morosos
          </Button>
        </div>
      </div>

      {/* Clients List */}
      <div className="px-4 space-y-3">
        {filteredClients.map((client) => {
          const isExpanded = expandedClients.has(client.id)

          return (
            <Card key={client.id} className="overflow-hidden border-border/50 hover:shadow-md transition-shadow">
              <div className="p-4">
                {/* Header with Avatar and Status */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {client.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground text-balance">{client.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <Calendar className="h-3 w-3" />
                        <span>
                          Desde{" "}
                          {new Date(client.registrationDate).toLocaleDateString("es-MX", {
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className={`${getStatusColor(client.status)} text-xs`}>
                    {getStatusText(client.status)}
                  </Badge>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground truncate">{client.email}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-foreground text-balance">
                      {client.address}, {client.city}
                    </span>
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-muted/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <CreditCard className="h-4 w-4 text-primary" />
                      <p className="text-xs text-muted-foreground">Préstamos</p>
                    </div>
                    <p className="text-lg font-bold text-foreground">
                      {client.activeLoans}/{client.totalLoans}
                    </p>
                    <p className="text-xs text-muted-foreground">Activos/Total</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="h-4 w-4 text-secondary" />
                      <p className="text-xs text-muted-foreground">Deuda Actual</p>
                    </div>
                    <p className="text-lg font-bold text-secondary">${client.currentDebt}</p>
                  </div>
                </div>

                {/* Payment History Badge */}
                <div className="flex items-center justify-between mb-3 p-3 bg-muted/20 rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Historial de Pagos</p>
                    <Badge variant="outline" className={`${getPaymentHistoryColor(client.paymentHistory)} text-xs`}>
                      {getPaymentHistoryText(client.paymentHistory)}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">Total Prestado</p>
                    <p className="text-sm font-bold text-foreground">${client.totalBorrowed}</p>
                  </div>
                </div>

                {/* Collapsible Active Loans */}
                {client.loans.length > 0 && (
                  <Collapsible open={isExpanded} onOpenChange={() => toggleExpanded(client.id)}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-full justify-between mb-2">
                        <span className="text-sm font-medium">Préstamos Activos ({client.loans.length})</span>
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2 mb-3">
                      {client.loans.map((loan) => (
                        <div
                          key={loan.id}
                          className={`p-3 rounded-lg border ${
                            loan.status === "overdue"
                              ? "bg-destructive/5 border-destructive/20"
                              : "bg-primary/5 border-primary/20"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {loan.status === "overdue" ? (
                                <AlertCircle className="h-4 w-4 text-destructive" />
                              ) : (
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                              )}
                              <span className="text-sm font-semibold text-foreground">{loan.id}</span>
                            </div>
                            <Badge variant="outline" className={`${getLoanStatusColor(loan.status)} text-xs`}>
                              {loan.status === "overdue" ? "Atrasado" : "Al día"}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <p className="text-muted-foreground">Monto Original</p>
                              <p className="font-semibold text-foreground">${loan.amount}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Saldo Restante</p>
                              <p className="font-semibold text-foreground">${loan.remainingBalance}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Próximo Pago</p>
                              <p className="font-semibold text-foreground">
                                {new Date(loan.nextPaymentDate).toLocaleDateString("es-MX", {
                                  day: "numeric",
                                  month: "short",
                                })}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Monto</p>
                              <p className="font-semibold text-foreground">${loan.nextPaymentAmount.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-3 border-t border-border/50">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => window.open(`tel:${client.phone}`)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Llamar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => window.open(`mailto:${client.email}`)}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-primary to-accent" size="sm">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Ver Detalle
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">No se encontraron clientes</p>
          </div>
        )}
      </div>
    </div>
  )
}
