"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, TrendingDown, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

export default function ProgramReviewPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchField, setSearchField] = useState("name")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter data based on search term and field
  const filteredData = useMemo(() => {
    return programData.filter(anchor => {
      if (!searchTerm) return true;
      
      const term = searchTerm.toLowerCase();
      if (searchField === "name") {
        return anchor.name.toLowerCase().includes(term);
      } else if (searchField === "programCustId") {
        return anchor.programCustId.toLowerCase().includes(term);
      }
      return true;
    });
  }, [searchTerm, searchField]);

  // Paginate the filtered data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Program Review</h1>
        <p className="text-muted-foreground">Monitor anchor-wise program performance and utilization</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Anchor Program Status</CardTitle>
              <CardDescription>Review limit utilization and overdue status by anchor</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search..." 
                  className="pl-8" 
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1) // Reset to first page on search
                  }}
                />
              </div>
              <Select 
                value={searchField} 
                onValueChange={(value) => {
                  setSearchField(value)
                  setCurrentPage(1) // Reset to first page on search field change
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Search by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Anchor Name</SelectItem>
                  <SelectItem value="programCustId">Program Cust ID</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Anchor Name</TableHead>
                <TableHead>Program Name</TableHead>
                <TableHead>Program Cust ID</TableHead>
                <TableHead>Number of Dealers</TableHead>
                <TableHead>Limit Sanctioned</TableHead>
                <TableHead>Limit Utilized</TableHead>
                <TableHead>Utilization %</TableHead>
                <TableHead>Overdue Amount</TableHead>
                <TableHead>Overdue Dealers</TableHead>
                <TableHead>% Overdue</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={11} className="text-center py-4">No matching records found</TableCell>
                </TableRow>
              ) : (
                paginatedData.map((anchor, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{anchor.name}</TableCell>
                    <TableCell>{anchor.programName}</TableCell>
                    <TableCell>{anchor.programCustId}</TableCell>
                    <TableCell>{anchor.numberOfDealers}</TableCell>
                    <TableCell>₹ {anchor.limitSanctioned.toLocaleString()}</TableCell>
                    <TableCell>₹ {anchor.limitUtilized.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={anchor.utilizationPercentage} className="w-16" />
                        <span>{anchor.utilizationPercentage}%</span>
                      </div>
                    </TableCell>
                    <TableCell>₹ {anchor.overdueAmount.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <TrendingDown className={`h-4 w-4 ${anchor.overdueDealers > 5 ? "text-destructive" : "text-muted-foreground"}`} />
                        {anchor.overdueDealers} dealers
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={anchor.overduePercentage > 10 ? "destructive" : "outline"}>
                        {anchor.overduePercentage}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {anchor.overduePercentage > 10 && (
                        <div className="flex items-center gap-2 text-destructive">
                          <AlertCircle className="h-4 w-4" />
                          <span>High Risk</span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          
          {totalPages > 1 && (
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
          )}
        </CardContent>
      </Card>
    </div>
  )
}

const programData = [
  {
    name: "HDFC Bank",
    programName: "Supply Chain Finance",
    programCustId: "SCF-001",
    numberOfDealers: 45,
    limitSanctioned: 50000000,
    limitUtilized: 35000000,
    utilizationPercentage: 70,
    overdueAmount: 2500000,
    overdueDealers: 3,
    overduePercentage: 7,
  },
  {
    name: "Tata Motors",
    programName: "Dealer Financing",
    programCustId: "DF-002",
    numberOfDealers: 78,
    limitSanctioned: 75000000,
    limitUtilized: 60000000,
    utilizationPercentage: 80,
    overdueAmount: 9000000,
    overdueDealers: 8,
    overduePercentage: 15,
  },
  {
    name: "Reliance Industries",
    programName: "Vendor Financing",
    programCustId: "VF-003",
    numberOfDealers: 92,
    limitSanctioned: 100000000,
    limitUtilized: 85000000,
    utilizationPercentage: 85,
    overdueAmount: 12000000,
    overdueDealers: 10,
    overduePercentage: 14,
  },
  {
    name: "State Bank of India",
    programName: "Supply Chain Finance",
    programCustId: "SCF-004",
    numberOfDealers: 35,
    limitSanctioned: 40000000,
    limitUtilized: 20000000,
    utilizationPercentage: 50,
    overdueAmount: 1000000,
    overdueDealers: 2,
    overduePercentage: 5,
  },
  {
    name: "ICICI Bank",
    programName: "Supply Chain Finance",
    programCustId: "SCF-005",
    numberOfDealers: 52,
    limitSanctioned: 60000000,
    limitUtilized: 45000000,
    utilizationPercentage: 75,
    overdueAmount: 3000000,
    overdueDealers: 4,
    overduePercentage: 6,
  },
  {
    name: "Mahindra & Mahindra",
    programName: "Dealer Financing",
    programCustId: "DF-006",
    numberOfDealers: 65,
    limitSanctioned: 70000000,
    limitUtilized: 55000000,
    utilizationPercentage: 78,
    overdueAmount: 4500000,
    overdueDealers: 5,
    overduePercentage: 8,
  },
  {
    name: "Bajaj Auto",
    programName: "Dealer Financing",
    programCustId: "DF-007",
    numberOfDealers: 48,
    limitSanctioned: 45000000,
    limitUtilized: 30000000,
    utilizationPercentage: 67,
    overdueAmount: 2000000,
    overdueDealers: 3,
    overduePercentage: 7,
  },
  {
    name: "Axis Bank",
    programName: "Supply Chain Finance",
    programCustId: "SCF-008",
    numberOfDealers: 39,
    limitSanctioned: 55000000,
    limitUtilized: 40000000,
    utilizationPercentage: 73,
    overdueAmount: 3500000,
    overdueDealers: 4,
    overduePercentage: 9,
  },
  {
    name: "Maruti Suzuki",
    programName: "Dealer Financing",
    programCustId: "DF-009",
    numberOfDealers: 85,
    limitSanctioned: 90000000,
    limitUtilized: 75000000,
    utilizationPercentage: 83,
    overdueAmount: 8000000,
    overdueDealers: 9,
    overduePercentage: 11,
  },
  {
    name: "Airtel",
    programName: "Vendor Financing",
    programCustId: "VF-010",
    numberOfDealers: 42,
    limitSanctioned: 50000000,
    limitUtilized: 38000000,
    utilizationPercentage: 76,
    overdueAmount: 2800000,
    overdueDealers: 3,
    overduePercentage: 7,
  },
  {
    name: "Larsen & Toubro",
    programName: "Vendor Financing",
    programCustId: "VF-011",
    numberOfDealers: 58,
    limitSanctioned: 65000000,
    limitUtilized: 50000000,
    utilizationPercentage: 77,
    overdueAmount: 4200000,
    overdueDealers: 5,
    overduePercentage: 8,
  },
  {
    name: "Kotak Mahindra Bank",
    programName: "Supply Chain Finance",
    programCustId: "SCF-012",
    numberOfDealers: 32,
    limitSanctioned: 35000000,
    limitUtilized: 25000000,
    utilizationPercentage: 71,
    overdueAmount: 1800000,
    overdueDealers: 2,
    overduePercentage: 7,
  },
  {
    name: "Hero MotoCorp",
    programName: "Dealer Financing",
    programCustId: "DF-013",
    numberOfDealers: 72,
    limitSanctioned: 80000000,
    limitUtilized: 65000000,
    utilizationPercentage: 81,
    overdueAmount: 7500000,
    overdueDealers: 8,
    overduePercentage: 12,
  },
  {
    name: "Infosys",
    programName: "Vendor Financing",
    programCustId: "VF-014",
    numberOfDealers: 38,
    limitSanctioned: 45000000,
    limitUtilized: 32000000,
    utilizationPercentage: 71,
    overdueAmount: 2200000,
    overdueDealers: 3,
    overduePercentage: 7,
  },
  {
    name: "Wipro",
    programName: "Vendor Financing",
    programCustId: "VF-015",
    numberOfDealers: 35,
    limitSanctioned: 40000000,
    limitUtilized: 28000000,
    utilizationPercentage: 70,
    overdueAmount: 1900000,
    overdueDealers: 2,
    overduePercentage: 7,
  },
  {
    name: "Yes Bank",
    programName: "Supply Chain Finance",
    programCustId: "SCF-016",
    numberOfDealers: 29,
    limitSanctioned: 30000000,
    limitUtilized: 20000000,
    utilizationPercentage: 67,
    overdueAmount: 1600000,
    overdueDealers: 2,
    overduePercentage: 8,
  },
  {
    name: "TVS Motors",
    programName: "Dealer Financing",
    programCustId: "DF-017",
    numberOfDealers: 55,
    limitSanctioned: 60000000,
    limitUtilized: 48000000,
    utilizationPercentage: 80,
    overdueAmount: 5200000,
    overdueDealers: 6,
    overduePercentage: 11,
  },
  {
    name: "Adani Group",
    programName: "Vendor Financing",
    programCustId: "VF-018",
    numberOfDealers: 62,
    limitSanctioned: 70000000,
    limitUtilized: 56000000,
    utilizationPercentage: 80,
    overdueAmount: 6500000,
    overdueDealers: 7,
    overduePercentage: 12,
  },
  {
    name: "IndusInd Bank",
    programName: "Supply Chain Finance",
    programCustId: "SCF-019",
    numberOfDealers: 31,
    limitSanctioned: 35000000,
    limitUtilized: 26000000,
    utilizationPercentage: 74,
    overdueAmount: 2100000,
    overdueDealers: 3,
    overduePercentage: 8,
  },
  {
    name: "Hyundai Motors India",
    programName: "Dealer Financing",
    programCustId: "DF-020",
    numberOfDealers: 68,
    limitSanctioned: 75000000,
    limitUtilized: 62000000,
    utilizationPercentage: 83,
    overdueAmount: 7000000,
    overdueDealers: 8,
    overduePercentage: 11,
  }
]
