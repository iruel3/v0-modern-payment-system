"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Search, Phone, MapPin, DollarSign, CheckCircle2, Clock, Filter, Calendar } from "lucide-react"

interface Collection {
  id: string
  clientName: string
  address: string
  amount: number
  phone: string
  status: "pending" | "completed" | "overdue"
  time: string
}

const mockCollections: Collection[] = [
  {
    id: "1",
    clientName: "María González",
    address: "Av. Principal #123, Col. Centro",
    amount: 450,
    phone: "+52 555 123 4567",
    status: "pending",
    time: "10:00 AM",
  },
  {
    id: "2",
    clientName: "Carlos Rodríguez",
    address: "Calle Reforma #456, Col. Norte",
    amount: 320,
    phone: "+52 555 234 5678",
    status: "completed",
    time: "11:30 AM",
  },
  {
    id: "3",
    clientName: "Ana Martínez",
    address: "Blvd. Juárez #789, Col. Sur",
    amount: 580,
    phone: "+52 555 345 6789",
    status: "pending",
    time: "12:00 PM",
  },
  {
    id: "4",
    clientName: "Luis Hernández",
    address: "Av. Insurgentes #234, Col. Este",
    amount: 275,
    phone: "+52 555 456 7890",
    status: "overdue",
    time: "09:00 AM",
  },
  {
    id: "5",
    clientName: "Patricia López",
    address: "Calle Hidalgo #567, Col. Oeste",
    amount: 420,
    phone: "+52 555 567 8901",
    status: "pending",
    time: "02:00 PM",
  },
  {
    id: "6",
    clientName: "Roberto Sánchez",
    address: "Av. Constitución #890, Col. Centro",
    amount: 650,
    phone: "+52 555 678 9012",
    status: "pending",
    time: "03:30 PM",
  },
  {
    id: "7",
    clientName: "Elena Ramírez",
    address: "Calle Morelos #123, Col. Norte",
    amount: 380,
    phone: "+52 555 789 0123",
    status: "completed",
    time: "01:00 PM",
  },
  {
    id: "8",
    clientName: "Jorge Torres",
    address: "Blvd. Independencia #456, Col. Sur",
    amount: 495,
    phone: "+52 555 890 1234",
    status: "pending",
    time: "04:00 PM",
  },
]

interface TodayCollectionsListProps {
  onBack: () => void
}

export function TodayCollectionsList({ onBack }: TodayCollectionsListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "completed" | "overdue">("all")

  const filteredCollections = mockCollections.filter((collection) => {
    const matchesSearch =
      collection.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || collection.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalAmount = filteredCollections.reduce((sum, collection) => sum + collection.amount, 0)
  const pendingCount = filteredCollections.filter((c) => c.status === "pending").length
  const completedCount = filteredCollections.filter((c) => c.status === "completed").length

  const getStatusColor = (status: Collection["status"]) => {
    switch (status) {
      case "completed":
        return "bg-primary/10 text-primary border-primary/20"
      case "overdue":
        return "bg-destructive/10 text-destructive border-destructive/20"
      default:
        return "bg-secondary/10 text-secondary border-secondary/20"
    }
  }

  const getStatusText = (status: Collection["status"]) => {
    switch (status) {
      case "completed":
        return "Cobrado"
      case "overdue":
        return "Atrasado"
      default:
        return "Pendiente"
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
            <h1 className="text-lg font-bold text-foreground">Cobros de Hoy</h1>
            <p className="text-xs text-muted-foreground">
              {new Date().toLocaleDateString("es-MX", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
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
              <p className="text-primary-foreground text-lg font-bold">${totalAmount}</p>
            </div>
          </Card>
          <Card className="bg-card border-border/50">
            <div className="p-3 text-center">
              <p className="text-muted-foreground text-xs mb-1">Pendientes</p>
              <p className="text-foreground text-lg font-bold">{pendingCount}</p>
            </div>
          </Card>
          <Card className="bg-card border-border/50">
            <div className="p-3 text-center">
              <p className="text-muted-foreground text-xs mb-1">Cobrados</p>
              <p className="text-foreground text-lg font-bold">{completedCount}</p>
            </div>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cliente o dirección..."
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
            variant={filterStatus === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("pending")}
            className="rounded-full whitespace-nowrap"
          >
            Pendientes
          </Button>
          <Button
            variant={filterStatus === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("completed")}
            className="rounded-full whitespace-nowrap"
          >
            Cobrados
          </Button>
          <Button
            variant={filterStatus === "overdue" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("overdue")}
            className="rounded-full whitespace-nowrap"
          >
            Atrasados
          </Button>
        </div>
      </div>

      {/* Collections List */}
      <div className="px-4 space-y-3">
        {filteredCollections.map((collection) => (
          <Card key={collection.id} className="overflow-hidden border-border/50 hover:shadow-md transition-shadow">
            <div className="p-4">
              {/* Header with Avatar and Status */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {collection.clientName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground text-balance">{collection.clientName}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <Clock className="h-3 w-3" />
                      <span>{collection.time}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className={`${getStatusColor(collection.status)} text-xs`}>
                  {getStatusText(collection.status)}
                </Badge>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2 mb-3 pl-1">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground text-balance leading-relaxed">{collection.address}</p>
              </div>

              {/* Amount and Contact */}
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Monto a cobrar</p>
                    <p className="text-lg font-bold text-foreground">${collection.amount}</p>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full h-10 w-10 border-primary/20 hover:bg-primary hover:text-primary-foreground bg-transparent"
                  onClick={() => window.open(`tel:${collection.phone}`)}
                >
                  <Phone className="h-4 w-4" />
                </Button>
              </div>

              {/* Action Buttons */}
              {collection.status === "pending" && (
                <div className="flex gap-2 mt-3">
                  <Button className="flex-1 bg-gradient-to-r from-primary to-accent" size="sm">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Marcar como Cobrado
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}

        {filteredCollections.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">No se encontraron cobros</p>
          </div>
        )}
      </div>
    </div>
  )
}
