"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Shield, Download, Eye, FileText, AlertTriangle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

// Define the dealer data interface
interface DealerFLDGData {
  dealerId: string;
  dealerName: string;
  anchorName: string;
  programName: string;
  programCustId: string;
  overdueDays: number;
  overdueAmount: number;
  fldgInvocationDays: number;
  lastInvocation: string | null;
  isInvoked: boolean;
}

function FLDGHistoryDialog({ dealer }: { dealer: DealerFLDGData }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Eye className="h-4 w-4" />
          <span className="sr-only">View FLDG History</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>FLDG Invocation History - {dealer.dealerName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Invocation History</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>2023-10-30: Invoked for ₹ 200,000</li>
              <li>2023-09-15: Invoked for ₹ 150,000</li>
              <li>2023-08-01: Invoked for ₹ 100,000</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Emails Sent</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>2023-10-30: Email sent to dealer and anchor</li>
              <li>2023-09-15: Reminder email sent</li>
              <li>2023-08-01: Initial invocation email sent</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function FLDGViewPage() {
  const [dealerStatuses, setDealerStatuses] = useState(
    dealerFldgData.reduce((acc, dealer) => ({
      ...acc,
      [dealer.dealerId]: dealer.isInvoked || false
    }), {} as Record<string, boolean>)
  )
  
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  
  const itemsPerPage = 10
  
  // Filter dealers based on search query
  const filteredDealers = dealerFldgData.filter(dealer => 
    dealer.dealerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dealer.dealerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dealer.programName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dealer.programCustId.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  // Get paginated results
  const totalPages = Math.ceil(filteredDealers.length / itemsPerPage)
  const paginatedDealers = filteredDealers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleInvocationToggle = (dealerId: string) => {
    setDealerStatuses(prev => ({
      ...prev,
      [dealerId]: !prev[dealerId]
    }))
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">FLDG View</h1>
        <p className="text-muted-foreground">Monitor First Loss Default Guarantee status across anchors</p>
      </div>

      <Tabs defaultValue="dealers">
        <TabsList className="mb-4">
          <TabsTrigger value="dealers">Dealer-wise View</TabsTrigger>
          <TabsTrigger value="anchors">Anchor-wise View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dealers">
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
              </div>
          </CardHeader>
            <CardContent className="p-0 overflow-auto">
              <div className="w-full min-w-[1000px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Dealer Cust ID</TableHead>
                      <TableHead>Dealer Name</TableHead>
                      <TableHead>Anchor Name</TableHead>
                      <TableHead>Overdue Days</TableHead>
                      <TableHead>Overdue Amount</TableHead>
                      <TableHead>FLDG Invocation Days</TableHead>
                      <TableHead>Last Invocation</TableHead>
                      <TableHead>FLDG Invoked</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedDealers.map((item) => (
                      <TableRow key={item.dealerId}>
                        <TableCell className="font-medium">{item.dealerId}</TableCell>
                        <TableCell>{item.dealerName}</TableCell>
                        <TableCell>{item.anchorName}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={item.overdueDays > 60 ? "destructive" : item.overdueDays > 30 ? "secondary" : "outline"}
                          >
                            {item.overdueDays} days
                          </Badge>
                        </TableCell>
                        <TableCell>₹ {item.overdueAmount.toLocaleString()}</TableCell>
                        <TableCell>{item.fldgInvocationDays} days</TableCell>
                        <TableCell>{item.lastInvocation || "N/A"}</TableCell>
                        <TableCell>
                          <Switch
                            checked={dealerStatuses[item.dealerId]}
                            onCheckedChange={() => handleInvocationToggle(item.dealerId)}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <FLDGHistoryDialog dealer={item} />
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
        </TabsContent>
        
        <TabsContent value="anchors">
      <Card>
        <CardHeader className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search anchors..." className="h-9" />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-auto">
          <div className="w-full min-w-[640px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Anchor</TableHead>
                  <TableHead>FLDG Amount</TableHead>
                  <TableHead>Utilized</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Utilization %</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fldgData.map((item) => (
                  <TableRow key={item.anchor}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        {item.anchor}
                      </div>
                    </TableCell>
                        <TableCell>₹ {item.totalAmount.toLocaleString()}</TableCell>
                        <TableCell>₹ {item.utilized.toLocaleString()}</TableCell>
                        <TableCell>₹ {item.available.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={item.utilizationPercentage} className="h-2 w-20" />
                        <span>{item.utilizationPercentage}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Eye className="h-4 w-4" />
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const fldgData = [
  {
    anchor: "HDFC Bank",
    totalAmount: 10000000,
    utilized: 3500000,
    available: 6500000,
    utilizationPercentage: 35,
    lastUpdated: "2023-11-15",
  },
  {
    anchor: "Tata Motors",
    totalAmount: 5000000,
    utilized: 2250000,
    available: 2750000,
    utilizationPercentage: 45,
    lastUpdated: "2023-11-14",
  },
  {
    anchor: "Reliance Industries",
    totalAmount: 7500000,
    utilized: 2625000,
    available: 4875000,
    utilizationPercentage: 35,
    lastUpdated: "2023-11-13",
  },
  {
    anchor: "State Bank of India",
    totalAmount: 2500000,
    utilized: 375000,
    available: 2125000,
    utilizationPercentage: 15,
    lastUpdated: "2023-11-12",
  },
]

const dealerFldgData: DealerFLDGData[] = [
  {
    dealerId: "DLR001",
    dealerName: "Sharma Electronics",
    anchorName: "HDFC Bank",
    programName: "Supply Chain Finance",
    programCustId: "SCF2023-001",
    overdueDays: 75,
    overdueAmount: 850000,
    fldgInvocationDays: 15,
    lastInvocation: "2023-10-30",
    isInvoked: true,
  },
  {
    dealerId: "DLR002",
    dealerName: "Patel Distributors",
    anchorName: "Reliance Industries",
    programName: "Vendor Financing",
    programCustId: "VF2023-045",
    overdueDays: 45,
    overdueAmount: 325000,
    fldgInvocationDays: 5,
    lastInvocation: null,
    isInvoked: false,
  },
  {
    dealerId: "DLR003",
    dealerName: "Singh Auto Parts",
    anchorName: "Tata Motors",
    programName: "Dealer Financing",
    programCustId: "DF2023-089",
    overdueDays: 60,
    overdueAmount: 480000,
    fldgInvocationDays: 7,
    lastInvocation: null,
    isInvoked: false,
  },
  {
    dealerId: "DLR004",
    dealerName: "Agarwal Traders",
    anchorName: "HDFC Bank",
    programName: "Supply Chain Finance",
    programCustId: "SCF2023-078",
    overdueDays: 30,
    overdueAmount: 275000,
    fldgInvocationDays: 3,
    lastInvocation: null,
    isInvoked: false,
  },
  {
    dealerId: "DLR005",
    dealerName: "Mehta Enterprises",
    anchorName: "State Bank of India",
    programName: "Vendor Financing",
    programCustId: "VF2023-112",
    overdueDays: 90,
    overdueAmount: 650000,
    fldgInvocationDays: 30,
    lastInvocation: "2023-11-01",
    isInvoked: true,
  },
  {
    dealerId: "DLR006",
    dealerName: "Gupta Hardware",
    anchorName: "Reliance Industries",
    programName: "Supply Chain Finance",
    programCustId: "SCF2023-156",
    overdueDays: 15,
    overdueAmount: 120000,
    fldgInvocationDays: 2,
    lastInvocation: null,
    isInvoked: false,
  },
  {
    dealerId: "DLR007",
    dealerName: "Joshi Electronics",
    anchorName: "HDFC Bank",
    programName: "Distributor Financing",
    programCustId: "DF2023-201",
    overdueDays: 55,
    overdueAmount: 780000,
    fldgInvocationDays: 10,
    lastInvocation: "2023-10-25",
    isInvoked: true,
  },
  {
    dealerId: "DLR008",
    dealerName: "Kumar Supplies",
    anchorName: "Tata Motors",
    programName: "Dealer Financing",
    programCustId: "DF2023-245",
    overdueDays: 40,
    overdueAmount: 420000,
    fldgInvocationDays: 8,
    lastInvocation: null,
    isInvoked: false,
  },
  {
    dealerId: "DLR009",
    dealerName: "Reddy Motors",
    anchorName: "State Bank of India",
    programName: "Vendor Financing",
    programCustId: "VF2023-298",
    overdueDays: 85,
    overdueAmount: 950000,
    fldgInvocationDays: 20,
    lastInvocation: "2023-11-05",
    isInvoked: true,
  },
  {
    dealerId: "DLR010",
    dealerName: "Choudhary Traders",
    anchorName: "Reliance Industries",
    programName: "Supply Chain Finance",
    programCustId: "SCF2023-312",
    overdueDays: 25,
    overdueAmount: 180000,
    fldgInvocationDays: 5,
    lastInvocation: null,
    isInvoked: false,
  },
  {
    dealerId: "DLR011",
    dealerName: "Iyer Electronics",
    anchorName: "HDFC Bank",
    programName: "Distributor Financing",
    programCustId: "DF2023-367",
    overdueDays: 70,
    overdueAmount: 560000,
    fldgInvocationDays: 12,
    lastInvocation: "2023-10-18",
    isInvoked: true,
  },
  {
    dealerId: "DLR012",
    dealerName: "Sharma Distributors",
    anchorName: "Tata Motors",
    programName: "Dealer Financing",
    programCustId: "DF2023-389",
    overdueDays: 35,
    overdueAmount: 290000,
    fldgInvocationDays: 7,
    lastInvocation: null,
    isInvoked: false,
  },
  {
    dealerId: "DLR013",
    dealerName: "Patel Auto Parts",
    anchorName: "State Bank of India",
    programName: "Vendor Financing",
    programCustId: "VF2023-425",
    overdueDays: 80,
    overdueAmount: 720000,
    fldgInvocationDays: 18,
    lastInvocation: "2023-11-03",
    isInvoked: true,
  },
  {
    dealerId: "DLR014",
    dealerName: "Verma Enterprises",
    anchorName: "Reliance Industries",
    programName: "Supply Chain Finance",
    programCustId: "SCF2023-467",
    overdueDays: 20,
    overdueAmount: 150000,
    fldgInvocationDays: 4,
    lastInvocation: null,
    isInvoked: false,
  },
  {
    dealerId: "DLR015",
    dealerName: "Mishra Traders",
    anchorName: "HDFC Bank",
    programName: "Distributor Financing",
    programCustId: "DF2023-512",
    overdueDays: 65,
    overdueAmount: 510000,
    fldgInvocationDays: 11,
    lastInvocation: "2023-10-20",
    isInvoked: true,
  },
  {
    dealerId: "DLR016",
    dealerName: "Bansal Electronics",
    anchorName: "Tata Motors",
    programName: "Dealer Financing",
    programCustId: "DF2023-534",
    overdueDays: 30,
    overdueAmount: 240000,
    fldgInvocationDays: 6,
    lastInvocation: null,
    isInvoked: false,
  },
  {
    dealerId: "DLR017",
    dealerName: "Kapoor Supplies",
    anchorName: "State Bank of India",
    programName: "Vendor Financing",
    programCustId: "VF2023-578",
    overdueDays: 75,
    overdueAmount: 680000,
    fldgInvocationDays: 15,
    lastInvocation: "2023-10-28",
    isInvoked: true,
  },
  {
    dealerId: "DLR018",
    dealerName: "Malhotra Traders",
    anchorName: "Reliance Industries",
    programName: "Supply Chain Finance",
    programCustId: "SCF2023-612",
    overdueDays: 15,
    overdueAmount: 130000,
    fldgInvocationDays: 3,
    lastInvocation: null,
    isInvoked: false,
  },
  {
    dealerId: "DLR019",
    dealerName: "Khanna Motors",
    anchorName: "HDFC Bank",
    programName: "Distributor Financing",
    programCustId: "DF2023-645",
    overdueDays: 60,
    overdueAmount: 490000,
    fldgInvocationDays: 9,
    lastInvocation: "2023-10-15",
    isInvoked: true,
  },
  {
    dealerId: "DLR020",
    dealerName: "Agarwal Enterprises",
    anchorName: "Tata Motors",
    programName: "Dealer Financing",
    programCustId: "DF2023-678",
    overdueDays: 25,
    overdueAmount: 200000,
    fldgInvocationDays: 5,
    lastInvocation: null,
    isInvoked: false,
  },
  {
    dealerId: "DLR021",
    dealerName: "Desai Trading Co.",
    anchorName: "State Bank of India",
    programName: "Vendor Financing",
    programCustId: "VF2023-712",
    overdueDays: 70,
    overdueAmount: 630000,
    fldgInvocationDays: 14,
    lastInvocation: "2023-10-22",
    isInvoked: true,
  },
  {
    dealerId: "DLR022",
    dealerName: "Bajaj Industries",
    anchorName: "Reliance Industries",
    programName: "Supply Chain Finance",
    programCustId: "SCF2023-745",
    overdueDays: 10,
    overdueAmount: 110000,
    fldgInvocationDays: 2,
    lastInvocation: null,
    isInvoked: false,
  },
  {
    dealerId: "DLR023",
    dealerName: "Menon Distributors",
    anchorName: "HDFC Bank",
    programName: "Distributor Financing",
    programCustId: "DF2023-789",
    overdueDays: 55,
    overdueAmount: 450000,
    fldgInvocationDays: 8,
    lastInvocation: "2023-10-10",
    isInvoked: true,
  },
  {
    dealerId: "DLR024",
    dealerName: "Saxena Enterprises",
    anchorName: "Tata Motors",
    programName: "Dealer Financing",
    programCustId: "DF2023-823",
    overdueDays: 20,
    overdueAmount: 180000,
    fldgInvocationDays: 4,
    lastInvocation: null,
    isInvoked: false,
  },
  {
    dealerId: "DLR025",
    dealerName: "Rao Technologies",
    anchorName: "State Bank of India",
    programName: "Vendor Financing",
    programCustId: "VF2023-867",
    overdueDays: 65,
    overdueAmount: 580000,
    fldgInvocationDays: 12,
    lastInvocation: "2023-11-07",
    isInvoked: true,
  },
  {
    dealerId: "DLR026",
    dealerName: "Nair Supplies",
    anchorName: "Reliance Industries",
    programName: "Supply Chain Finance",
    programCustId: "SCF2023-901",
    overdueDays: 5,
    overdueAmount: 90000,
    fldgInvocationDays: 1,
    lastInvocation: null,
    isInvoked: false,
  }
]
