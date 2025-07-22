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
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

export default function StopSupplyPage() {
  const [selectedDealer, setSelectedDealer] = useState<StopSupplyDealer | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  
  const itemsPerPage = 10
  
  // Filter and paginate dealers
  const filteredDealers = stopSupplyDealers.filter(dealer => 
    dealer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dealer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dealer.programName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dealer.programCustId.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const totalPages = Math.ceil(filteredDealers.length / itemsPerPage)
  const paginatedDealers = filteredDealers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Stop Supply View</h1>
        <p className="text-muted-foreground">Monitor and manage dealers with stop supply status</p>
      </div>

      <Card>
        <CardHeader className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search dealers..." 
                className="h-9"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1) // Reset to first page on search
                }}
              />
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
                  <TableHead>Overdue Days</TableHead>
                  <TableHead>Overdue Amount</TableHead>
                  <TableHead>Stop Supply Days</TableHead>
                  <TableHead>Last Triggered</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedDealers.map((dealer) => (
                  <TableRow
                    key={dealer.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelectedDealer(dealer)}
                  >
                    <TableCell className="font-medium">{dealer.id}</TableCell>
                    <TableCell>{dealer.name}</TableCell>
                    <TableCell>{dealer.anchor}</TableCell>
                    <TableCell>
                      <Badge variant={dealer.overdueDays > 60 ? "destructive" : "outline"}>
                        {dealer.overdueDays} days
                      </Badge>
                    </TableCell>
                    <TableCell>₹ {dealer.overdueAmount.toLocaleString()}</TableCell>
                    <TableCell>{dealer.stopSupplyDays} days</TableCell>
                    <TableCell>{dealer.lastTriggeredDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
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
          
          <div className="flex items-center justify-center py-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage > 1) setCurrentPage(currentPage - 1)
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(i + 1)
                      }}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
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
  programName: string
  programCustId: string
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
    id: "DLR001",
    name: "Sharma Electronics",
    anchor: "HDFC Bank",
    programName: "Supply Chain Finance",
    programCustId: "SCF2023-001",
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
    id: "DLR002",
    name: "Patel Distributors",
    anchor: "Tata Motors",
    programName: "Dealer Financing",
    programCustId: "DF2023-045",
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
    id: "DLR003",
    name: "Singh Auto Parts",
    anchor: "Reliance Industries",
    programName: "Vendor Financing",
    programCustId: "VF2023-089",
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
    ],
  },
  {
    id: "DLR004",
    name: "Agarwal Traders",
    anchor: "ICICI Bank",
    programName: "Supply Chain Finance",
    programCustId: "SCF2023-078",
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
    id: "DLR005",
    name: "Mehta Enterprises",
    anchor: "Mahindra & Mahindra",
    programName: "Dealer Financing",
    programCustId: "DF2023-112",
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
        ],
      },
    ],
  },
  {
    id: "DLR006",
    name: "Gupta Hardware",
    anchor: "State Bank of India",
    programName: "Vendor Financing",
    programCustId: "VF2023-156",
    overdueDays: 40,
    overdueAmount: 110000,
    stopSupplyDays: 12,
    lastTriggeredDate: "2023-11-12",
    history: [
      {
        invoiceNumber: "INV-2023-6789",
        overdueDays: 40,
        overdueAmount: 110000,
        triggeredDate: "2023-11-12",
        emailsSent: 3,
        anchorConfirmation: true,
        attachments: [
          {
            name: "Invoice-2023-6789.pdf",
            type: "PDF",
            size: "275 KB",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    id: "DLR007",
    name: "Joshi Electronics",
    anchor: "Airtel",
    programName: "Distributor Financing",
    programCustId: "DF2023-201",
    overdueDays: 55,
    overdueAmount: 78000,
    stopSupplyDays: 18,
    lastTriggeredDate: "2023-11-07",
    history: [
      {
        invoiceNumber: "INV-2023-7123",
        overdueDays: 55,
        overdueAmount: 78000,
        triggeredDate: "2023-11-07",
        emailsSent: 4,
        anchorConfirmation: true,
        attachments: [
          {
            name: "Invoice-2023-7123.pdf",
            type: "PDF",
            size: "302 KB",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    id: "DLR008",
    name: "Kumar Supplies",
    anchor: "Axis Bank",
    programName: "Supply Chain Finance",
    programCustId: "SCF2023-145",
    overdueDays: 25,
    overdueAmount: 65000,
    stopSupplyDays: 8,
    lastTriggeredDate: "2023-11-17",
    history: [
      {
        invoiceNumber: "INV-2023-8456",
        overdueDays: 25,
        overdueAmount: 65000,
        triggeredDate: "2023-11-17",
        emailsSent: 2,
        anchorConfirmation: false,
        attachments: [
          {
            name: "Invoice-2023-8456.pdf",
            type: "PDF",
            size: "265 KB",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    id: "DLR009",
    name: "Reddy Motors",
    anchor: "Bajaj Auto",
    programName: "Dealer Financing",
    programCustId: "DF2023-178",
    overdueDays: 70,
    overdueAmount: 135000,
    stopSupplyDays: 22,
    lastTriggeredDate: "2023-11-03",
    history: [
      {
        invoiceNumber: "INV-2023-9234",
        overdueDays: 70,
        overdueAmount: 135000,
        triggeredDate: "2023-11-03",
        emailsSent: 5,
        anchorConfirmation: true,
        attachments: [
          {
            name: "Invoice-2023-9234.pdf",
            type: "PDF",
            size: "315 KB",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    id: "DLR010",
    name: "Choudhary Traders",
    anchor: "Reliance Industries",
    programName: "Vendor Financing",
    programCustId: "VF2023-223",
    overdueDays: 35,
    overdueAmount: 95000,
    stopSupplyDays: 10,
    lastTriggeredDate: "2023-11-14",
    history: [
      {
        invoiceNumber: "INV-2023-1098",
        overdueDays: 35,
        overdueAmount: 95000,
        triggeredDate: "2023-11-14",
        emailsSent: 3,
        anchorConfirmation: true,
        attachments: [
          {
            name: "Invoice-2023-1098.pdf",
            type: "PDF",
            size: "295 KB",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    id: "DLR011",
    name: "Iyer Electronics",
    anchor: "HDFC Bank",
    programName: "Supply Chain Finance",
    programCustId: "SCF2023-189",
    overdueDays: 60,
    overdueAmount: 102000,
    stopSupplyDays: 20,
    lastTriggeredDate: "2023-11-05",
    history: [
      {
        invoiceNumber: "INV-2023-1176",
        overdueDays: 60,
        overdueAmount: 102000,
        triggeredDate: "2023-11-05",
        emailsSent: 4,
        anchorConfirmation: true,
        attachments: [
          {
            name: "Invoice-2023-1176.pdf",
            type: "PDF",
            size: "280 KB",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    id: "DLR012",
    name: "Sharma Distributors",
    anchor: "Tata Motors",
    programName: "Dealer Financing",
    programCustId: "DF2023-234",
    overdueDays: 50,
    overdueAmount: 115000,
    stopSupplyDays: 15,
    lastTriggeredDate: "2023-11-10",
    history: [
      {
        invoiceNumber: "INV-2023-1267",
        overdueDays: 50,
        overdueAmount: 115000,
        triggeredDate: "2023-11-10",
        emailsSent: 3,
        anchorConfirmation: true,
        attachments: [
          {
            name: "Invoice-2023-1267.pdf",
            type: "PDF",
            size: "310 KB",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    id: "DLR013",
    name: "Patel Auto Parts",
    anchor: "Maruti Suzuki",
    programName: "Vendor Financing",
    programCustId: "VF2023-267",
    overdueDays: 85,
    overdueAmount: 155000,
    stopSupplyDays: 28,
    lastTriggeredDate: "2023-10-30",
    history: [
      {
        invoiceNumber: "INV-2023-1345",
        overdueDays: 85,
        overdueAmount: 155000,
        triggeredDate: "2023-10-30",
        emailsSent: 6,
        anchorConfirmation: true,
        attachments: [
          {
            name: "Invoice-2023-1345.pdf",
            type: "PDF",
            size: "328 KB",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    id: "DLR014",
    name: "Verma Enterprises",
    anchor: "ICICI Bank",
    programName: "Supply Chain Finance",
    programCustId: "SCF2023-289",
    overdueDays: 20,
    overdueAmount: 75000,
    stopSupplyDays: 7,
    lastTriggeredDate: "2023-11-18",
    history: [
      {
        invoiceNumber: "INV-2023-1432",
        overdueDays: 20,
        overdueAmount: 75000,
        triggeredDate: "2023-11-18",
        emailsSent: 2,
        anchorConfirmation: false,
        attachments: [
          {
            name: "Invoice-2023-1432.pdf",
            type: "PDF",
            size: "290 KB",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    id: "DLR015",
    name: "Mishra Traders",
    anchor: "Mahindra & Mahindra",
    programName: "Dealer Financing",
    programCustId: "DF2023-312",
    overdueDays: 75,
    overdueAmount: 130000,
    stopSupplyDays: 25,
    lastTriggeredDate: "2023-11-01",
    history: [
      {
        invoiceNumber: "INV-2023-1521",
        overdueDays: 75,
        overdueAmount: 130000,
        triggeredDate: "2023-11-01",
        emailsSent: 5,
        anchorConfirmation: true,
        attachments: [
          {
            name: "Invoice-2023-1521.pdf",
            type: "PDF",
            size: "305 KB",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    id: "DLR016",
    name: "Bansal Electronics",
    anchor: "State Bank of India",
    programName: "Vendor Financing",
    programCustId: "VF2023-334",
    overdueDays: 30,
    overdueAmount: 82000,
    stopSupplyDays: 10,
    lastTriggeredDate: "2023-11-15",
    history: [
      {
        invoiceNumber: "INV-2023-1634",
        overdueDays: 30,
        overdueAmount: 82000,
        triggeredDate: "2023-11-15",
        emailsSent: 2,
        anchorConfirmation: true,
        attachments: [
          {
            name: "Invoice-2023-1634.pdf",
            type: "PDF",
            size: "270 KB",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    id: "DLR017",
    name: "Kapoor Supplies",
    anchor: "Airtel",
    programName: "Distributor Financing",
    programCustId: "DF2023-356",
    overdueDays: 55,
    overdueAmount: 97000,
    stopSupplyDays: 18,
    lastTriggeredDate: "2023-11-07",
    history: [
      {
        invoiceNumber: "INV-2023-1743",
        overdueDays: 55,
        overdueAmount: 97000,
        triggeredDate: "2023-11-07",
        emailsSent: 4,
        anchorConfirmation: true,
        attachments: [
          {
            name: "Invoice-2023-1743.pdf",
            type: "PDF",
            size: "285 KB",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    id: "DLR018",
    name: "Malhotra Traders",
    anchor: "Axis Bank",
    programName: "Supply Chain Finance",
    programCustId: "SCF2023-378",
    overdueDays: 40,
    overdueAmount: 88000,
    stopSupplyDays: 12,
    lastTriggeredDate: "2023-11-12",
    history: [
      {
        invoiceNumber: "INV-2023-1856",
        overdueDays: 40,
        overdueAmount: 88000,
        triggeredDate: "2023-11-12",
        emailsSent: 3,
        anchorConfirmation: true,
        attachments: [
          {
            name: "Invoice-2023-1856.pdf",
            type: "PDF",
            size: "275 KB",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    id: "DLR019",
    name: "Khanna Motors",
    anchor: "Bajaj Auto",
    programName: "Dealer Financing",
    programCustId: "DF2023-390",
    overdueDays: 65,
    overdueAmount: 125000,
    stopSupplyDays: 22,
    lastTriggeredDate: "2023-11-03",
    history: [
      {
        invoiceNumber: "INV-2023-1923",
        overdueDays: 65,
        overdueAmount: 125000,
        triggeredDate: "2023-11-03",
        emailsSent: 4,
        anchorConfirmation: true,
        attachments: [
          {
            name: "Invoice-2023-1923.pdf",
            type: "PDF",
            size: "300 KB",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    id: "DLR020",
    name: "Agarwal Enterprises",
    anchor: "Reliance Industries",
    programName: "Vendor Financing",
    programCustId: "VF2023-412",
    overdueDays: 35,
    overdueAmount: 105000,
    stopSupplyDays: 10,
    lastTriggeredDate: "2023-11-14",
    history: [
      {
        invoiceNumber: "INV-2023-2034",
        overdueDays: 35,
        overdueAmount: 105000,
        triggeredDate: "2023-11-14",
        emailsSent: 3,
        anchorConfirmation: true,
        attachments: [
          {
            name: "Invoice-2023-2034.pdf",
            type: "PDF",
            size: "290 KB",
            url: "#",
          },
        ],
      },
    ],
  }
]
