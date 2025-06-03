"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination"
import { useState, useMemo } from "react"

export default function AnchorExpiryPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredAnchors = useMemo(() => {
    return anchorData.filter(anchor => {
      // Calculate status for filtering
      let status = "";
      if (anchor.shortRenewal) status = "Short Renewed";
      else if (anchor.daysToExpiry <= 0) status = "Expired";
      else if (anchor.daysToExpiry > 0 && anchor.daysToExpiry <= 30) status = "Expiring Soon";
      else status = "Active";

      if (selectedStatus === "all") return true;
      return status === selectedStatus;
    });
  }, [anchorData, selectedStatus]);

  const paginatedAnchors = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAnchors.slice(startIndex, endIndex);
  }, [filteredAnchors, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAnchors.length / itemsPerPage);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Anchor Expiry</h1>
        <p className="text-muted-foreground">Track anchor limit setup and expiry dates</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Anchor Limit Expiry Status</CardTitle>
              <CardDescription>Monitor anchors approaching their limit expiry date</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search anchors..." className="pl-8" />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Expired">Expired</SelectItem>
                  <SelectItem value="Short Renewed">Short Renewed</SelectItem>
                  <SelectItem value="Expiring Soon">Expiring Soon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Anchor Name</TableHead>
                  <TableHead>Anchor Cust ID</TableHead>
                  <TableHead>Program Name</TableHead>
                  <TableHead>Program Cust ID</TableHead>
                  <TableHead>Limit Setup Date</TableHead>
                  <TableHead>Limit Expiry Date</TableHead>
                  <TableHead>Days to Expiry</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Short Renewal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedAnchors.map((anchor, index) => {
                  let currentStatus = "";
                  let statusBadgeVariant: "outline" | "destructive" | "default" | "secondary" | null | undefined = "outline"; // Default variant
                  let statusBadgeClasses = ""; // For custom styling

                  if (anchor.shortRenewal) {
                    currentStatus = "Short Renewed";
                    statusBadgeClasses = "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
                  } else if (anchor.daysToExpiry <= 0) {
                    currentStatus = "Expired";
                    statusBadgeClasses = "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
                  } else if (anchor.daysToExpiry > 0 && anchor.daysToExpiry <= 30) {
                    currentStatus = "Expiring Soon";
                    statusBadgeVariant = "destructive"; // Uses existing red styling
                  } else {
                    currentStatus = "Active";
                    statusBadgeClasses = "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
                  }
                  
                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{anchor.name}</TableCell>
                      <TableCell>{anchor.anchorCustId}</TableCell>
                      <TableCell>{anchor.programName}</TableCell>
                      <TableCell>{anchor.programCustId}</TableCell>
                      <TableCell>{anchor.setupDate}</TableCell>
                      <TableCell>{anchor.expiryDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {anchor.daysToExpiry} days
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusBadgeVariant} className={statusBadgeClasses}>
                          {currentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {anchor.shortRenewal ? "Yes" : "No"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} 
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                      <Button 
                        variant={currentPage === i + 1 ? "default" : "outline"} 
                        size="sm" 
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} 
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
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

const anchorData = [
  {
    name: "HDFC Bank",
    anchorCustId: "HDFC0001234",
    programName: "HDFC Supply Chain Finance",
    programCustId: "SCF-HD-001",
    setupDate: "2023-06-15",
    expiryDate: "2024-06-14",
    daysToExpiry: 15,
    shortRenewal: false,
  },
  {
    name: "Reliance Industries",
    anchorCustId: "RIL9876543",
    programName: "RIL Vendor Financing",
    programCustId: "VF-RIL-021",
    setupDate: "2023-08-01",
    expiryDate: "2024-07-31",
    daysToExpiry: 62,
    shortRenewal: false,
  },
  {
    name: "Tata Consultancy Services",
    anchorCustId: "TCS5643210",
    programName: "TCS Partner Program",
    programCustId: "PP-TCS-105",
    setupDate: "2023-09-15",
    expiryDate: "2024-09-14",
    daysToExpiry: 108,
    shortRenewal: false,
  },
  {
    name: "ICICI Bank",
    anchorCustId: "ICICI7890123",
    programName: "ICICI Distribution Finance",
    programCustId: "DF-IC-052",
    setupDate: "2023-05-01",
    expiryDate: "2024-04-30",
    daysToExpiry: -10,
    shortRenewal: true,
  },
  {
    name: "Infosys Limited",
    anchorCustId: "INF4560987",
    programName: "Infosys Dealer Finance",
    programCustId: "DF-INF-078",
    setupDate: "2023-07-01",
    expiryDate: "2024-06-30",
    daysToExpiry: 31,
    shortRenewal: false,
  },
  {
    name: "Kotak Mahindra Bank",
    anchorCustId: "KMB2345678",
    programName: "Kotak Channel Finance",
    programCustId: "CF-KMB-034",
    setupDate: "2023-04-15",
    expiryDate: "2024-04-14",
    daysToExpiry: -15,
    shortRenewal: false,
  },
  {
    name: "Hindustan Unilever",
    anchorCustId: "HUL3456789",
    programName: "HUL Distributor Finance",
    programCustId: "DF-HUL-067",
    setupDate: "2023-10-20",
    expiryDate: "2024-10-19",
    daysToExpiry: 143,
    shortRenewal: false,
  },
  {
    name: "State Bank of India",
    anchorCustId: "SBI9087654",
    programName: "SBI Supply Chain Finance",
    programCustId: "SCF-SBI-012",
    setupDate: "2023-11-05",
    expiryDate: "2024-11-04",
    daysToExpiry: 159,
    shortRenewal: false,
  },
  {
    name: "Bharti Airtel",
    anchorCustId: "AIR6789012",
    programName: "Airtel Dealer Finance",
    programCustId: "DF-AIR-089",
    setupDate: "2023-06-30",
    expiryDate: "2024-06-29",
    daysToExpiry: 30,
    shortRenewal: true,
  },
  {
    name: "Axis Bank",
    anchorCustId: "AXB1092837",
    programName: "Axis Channel Finance",
    programCustId: "CF-AXB-045",
    setupDate: "2023-03-10",
    expiryDate: "2024-03-09",
    daysToExpiry: -40,
    shortRenewal: false,
  },
  {
    name: "ITC Limited",
    anchorCustId: "ITC5432109",
    programName: "ITC Distributor Program",
    programCustId: "DP-ITC-023",
    setupDate: "2023-05-25",
    expiryDate: "2024-05-24",
    daysToExpiry: 0,
    shortRenewal: false,
  },
  {
    name: "Larsen & Toubro",
    anchorCustId: "LNT2109876",
    programName: "L&T Vendor Finance",
    programCustId: "VF-LNT-056",
    setupDate: "2023-07-20",
    expiryDate: "2024-07-19",
    daysToExpiry: 50,
    shortRenewal: false,
  },
  {
    name: "Bajaj Finance",
    anchorCustId: "BAF8765432",
    programName: "Bajaj Retailer Finance",
    programCustId: "RF-BAF-091",
    setupDate: "2023-09-01",
    expiryDate: "2024-08-31",
    daysToExpiry: 93,
    shortRenewal: false,
  },
  {
    name: "HCL Technologies",
    anchorCustId: "HCL3217890",
    programName: "HCL Partner Financing",
    programCustId: "PF-HCL-037",
    setupDate: "2023-04-22",
    expiryDate: "2024-04-21",
    daysToExpiry: -8,
    shortRenewal: true,
  },
  {
    name: "Asian Paints",
    anchorCustId: "ASP4321098",
    programName: "Asian Paints Dealer Program",
    programCustId: "DP-ASP-076",
    setupDate: "2023-10-10",
    expiryDate: "2024-10-09",
    daysToExpiry: 133,
    shortRenewal: false,
  },
  {
    name: "Mahindra & Mahindra",
    anchorCustId: "MNM7654321",
    programName: "Mahindra Supplier Finance",
    programCustId: "SF-MNM-019",
    setupDate: "2023-06-05",
    expiryDate: "2024-06-04",
    daysToExpiry: 5,
    shortRenewal: true,
  },
  {
    name: "Titan Company",
    anchorCustId: "TCL5678901",
    programName: "Titan Retailer Finance",
    programCustId: "RF-TCL-082",
    setupDate: "2023-08-15",
    expiryDate: "2024-08-14",
    daysToExpiry: 76,
    shortRenewal: false,
  },
  {
    name: "Sun Pharmaceutical",
    anchorCustId: "SUN8901234",
    programName: "Sun Pharma Distributor Finance",
    programCustId: "DF-SUN-048",
    setupDate: "2023-11-20",
    expiryDate: "2024-11-19",
    daysToExpiry: 174,
    shortRenewal: false,
  },
  {
    name: "NTPC Limited",
    anchorCustId: "NTPC7890123",
    programName: "NTPC Vendor Program",
    programCustId: "VP-NTPC-063",
    setupDate: "2023-03-15",
    expiryDate: "2024-03-14",
    daysToExpiry: -35,
    shortRenewal: true,
  },
  {
    name: "Bajaj Auto",
    anchorCustId: "BAL2345678",
    programName: "Bajaj Dealer Finance",
    programCustId: "DF-BAL-029",
    setupDate: "2023-07-10",
    expiryDate: "2024-07-09",
    daysToExpiry: 40,
    shortRenewal: false,
  }
]
