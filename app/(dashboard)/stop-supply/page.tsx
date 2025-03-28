"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, AlertTriangle, CheckCircle2, ChevronRight, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { StopSupplyDetail } from "@/components/stop-supply-detail"
import { Badge } from "@/components/ui/badge"
import { DatePickerWithRange } from "@/components/date-range-picker"

export default function StopSupplyPage() {
  const [selectedDealer, setSelectedDealer] = useState<StopSupplyDealer | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Stop Supply View</h1>
        <p className="text-muted-foreground">Monitor and manage dealers with stop supply status</p>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Stop Supply</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stopSupplyDealers.length}</div>
            <p className="text-xs text-muted-foreground">Active stop supply cases</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Overdue Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R {stopSupplyDealers.reduce((sum, dealer) => sum + dealer.overdueAmount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Across all stop supply dealers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Overdue Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                stopSupplyDealers.reduce((sum, dealer) => sum + dealer.overdueDays, 0) / stopSupplyDealers.length,
              )}
            </div>
            <p className="text-xs text-muted-foreground">Days past payment due date</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search dealers..." className="h-9" />
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] h-9">
                  <SelectValue placeholder="Filter by reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reasons</SelectItem>
                  <SelectItem value="payment">Payment Default</SelectItem>
                  <SelectItem value="limit">Credit Limit Breach</SelectItem>
                  <SelectItem value="compliance">Compliance Issue</SelectItem>
                  <SelectItem value="fraud">Suspected Fraud</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <DatePickerWithRange />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Anchor</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Anchors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Anchors</SelectItem>
                    <SelectItem value="standard-bank">Standard Bank</SelectItem>
                    <SelectItem value="sasol">Sasol Limited</SelectItem>
                    <SelectItem value="mtn">MTN Group</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Overdue Days</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="30">30+ days</SelectItem>
                    <SelectItem value="60">60+ days</SelectItem>
                    <SelectItem value="90">90+ days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-0 overflow-auto">
          <div className="w-full min-w-[640px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dealer Cust ID</TableHead>
                  <TableHead>Dealer Name</TableHead>
                  <TableHead>Anchor Name</TableHead>
                  <TableHead>Stop Reason</TableHead>
                  <TableHead>Overdue Days</TableHead>
                  <TableHead>Overdue Amount</TableHead>
                  <TableHead>Stop Supply Days</TableHead>
                  <TableHead>Last Triggered</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stopSupplyDealers.map((dealer) => (
                  <TableRow
                    key={dealer.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelectedDealer(dealer)}
                  >
                    <TableCell className="font-medium">{dealer.id}</TableCell>
                    <TableCell>{dealer.name}</TableCell>
                    <TableCell>{dealer.anchor}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <span>{dealer.stopReason}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={dealer.overdueDays > 60 ? "destructive" : "outline"}>
                        {dealer.overdueDays} days
                      </Badge>
                    </TableCell>
                    <TableCell>R {dealer.overdueAmount.toLocaleString()}</TableCell>
                    <TableCell>{dealer.stopSupplyDays} days</TableCell>
                    <TableCell>{dealer.lastTriggeredDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          Lift Stop
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedDealer(dealer)
                          }}
                        >
                          <ChevronRight className="h-4 w-4" />
                          <span className="sr-only">View details</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedDealer} onOpenChange={(open) => !open && setSelectedDealer(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Stop Supply Details - {selectedDealer?.name}</DialogTitle>
            <DialogDescription>Detailed history of stop supply events for this dealer</DialogDescription>
          </DialogHeader>
          {selectedDealer && <StopSupplyDetail dealer={selectedDealer} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export interface StopSupplyDealer {
  id: string
  name: string
  anchor: string
  stopReason: string
  overdueDays: number
  overdueAmount: number
  stopSupplyDays: number
  lastTriggeredDate: string
  history: StopSupplyHistoryItem[]
}

export interface StopSupplyHistoryItem {
  invoiceNumber: string
  overdueDays: number
  overdueAmount: number
  triggeredDate: string
  emailsSent: number
  anchorConfirmation: boolean
  attachments: Attachment[]
}

export interface Attachment {
  name: string
  type: string
  size: string
  url: string
}

const stopSupplyDealers: StopSupplyDealer[] = [
  {
    id: "DLR004",
    name: "Pretoria Wholesalers",
    anchor: "Sasol Limited",
    stopReason: "Payment Default",
    overdueDays: 45,
    overdueAmount: 125000,
    stopSupplyDays: 15,
    lastTriggeredDate: "2023-11-15",
    history: [
      {
        invoiceNumber: "INV-2023-1045",
        overdueDays: 45,
        overdueAmount: 125000,
        triggeredDate: "2023-11-15",
        emailsSent: 3,
        anchorConfirmation: true,
        attachments: [
          {
            name: "Invoice-2023-1045.pdf",
            type: "PDF",
            size: "256 KB",
            url: "#",
          },
          {
            name: "Payment-Reminder-3.pdf",
            type: "PDF",
            size: "128 KB",
            url: "#",
          },
        ],
      },
      {
        invoiceNumber: "INV-2023-0987",
        overdueDays: 60,
        overdueAmount: 75000,
        triggeredDate: "2023-10-01",
        emailsSent: 4,
        anchorConfirmation: true,
        attachments: [
          {
            name: "Invoice-2023-0987.pdf",
            type: "PDF",
            size: "245 KB",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    id: "DLR008",
    name: "East London Traders",
    anchor: "Standard Bank",
    stopReason: "Credit Limit Breach",
    overdueDays: 30,
    overdueAmount: 85000,
    stopSupplyDays: 10,
    lastTriggeredDate: "2023-11-10",
    history: [
      {
        invoiceNumber: "INV-2023-2156",
        overdueDays: 30,
        overdueAmount: 85000,
        triggeredDate: "2023-11-10",
        emailsSent: 2,
        anchorConfirmation: true,
        attachments: [
          {
            name: "Invoice-2023-2156.pdf",
            type: "PDF",
            size: "312 KB",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    id: "DLR012",
    name: "Nelspruit Distributors",
    anchor: "MTN Group",
    stopReason: "Compliance Issue",
    overdueDays: 90,
    overdueAmount: 45000,
    stopSupplyDays: 30,
    lastTriggeredDate: "2023-11-05",
    history: [
      {
        invoiceNumber: "INV-2023-3267",
        overdueDays: 90,
        overdueAmount: 45000,
        triggeredDate: "2023-11-05",
        emailsSent: 5,
        anchorConfirmation: false,
        attachments: [
          {
            name: "Invoice-2023-3267.pdf",
            type: "PDF",
            size: "198 KB",
            url: "#",
          },
          {
            name: "Compliance-Notice.pdf",
            type: "PDF",
            size: "156 KB",
            url: "#",
          },
        ],
      },
      {
        invoiceNumber: "INV-2023-3102",
        overdueDays: 75,
        overdueAmount: 32000,
        triggeredDate: "2023-10-20",
        emailsSent: 4,
        anchorConfirmation: true,
        attachments: [
          {
            name: "Invoice-2023-3102.pdf",
            type: "PDF",
            size: "187 KB",
            url: "#",
          },
        ],
      },
      {
        invoiceNumber: "INV-2023-2945",
        overdueDays: 60,
        overdueAmount: 28000,
        triggeredDate: "2023-09-15",
        emailsSent: 3,
        anchorConfirmation: true,
        attachments: [
          {
            name: "Invoice-2023-2945.pdf",
            type: "PDF",
            size: "176 KB",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    id: "DLR015",
    name: "Cape Town Supplies",
    anchor: "Standard Bank",
    stopReason: "Payment Default",
    overdueDays: 65,
    overdueAmount: 92000,
    stopSupplyDays: 25,
    lastTriggeredDate: "2023-11-08",
    history: [
      {
        invoiceNumber: "INV-2023-4125",
        overdueDays: 65,
        overdueAmount: 92000,
        triggeredDate: "2023-11-08",
        emailsSent: 4,
        anchorConfirmation: true,
        attachments: [
          {
            name: "Invoice-2023-4125.pdf",
            type: "PDF",
            size: "287 KB",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    id: "DLR023",
    name: "Durban Electronics",
    anchor: "MTN Group",
    stopReason: "Suspected Fraud",
    overdueDays: 15,
    overdueAmount: 150000,
    stopSupplyDays: 5,
    lastTriggeredDate: "2023-11-20",
    history: [
      {
        invoiceNumber: "INV-2023-5432",
        overdueDays: 15,
        overdueAmount: 150000,
        triggeredDate: "2023-11-20",
        emailsSent: 1,
        anchorConfirmation: false,
        attachments: [
          {
            name: "Invoice-2023-5432.pdf",
            type: "PDF",
            size: "325 KB",
            url: "#",
          },
          {
            name: "Fraud-Investigation-Report.pdf",
            type: "PDF",
            size: "512 KB",
            url: "#",
          },
        ],
      },
    ],
  },
]

