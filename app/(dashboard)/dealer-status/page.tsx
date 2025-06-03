"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, CheckCircle2, XCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EditDealerDialog, type Dealer } from "@/components/edit-dealer-dialog"
import { Badge } from "@/components/ui/badge"
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination"

export default function DealerStatusPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedAnchor, setSelectedAnchor] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Get unique anchor names for the filter dropdown
  const uniqueAnchors = useMemo(() => {
    return Array.from(new Set(dealerStatusData.map(dealer => dealer.anchor)));
  }, [dealerStatusData]);

  // Filter dealers based on active tab, anchor filter, and search term
  const filteredAndSearchedDealers = useMemo(() => {
    let tempDealers = dealerStatusData;

    // Filter by active tab
    if (activeTab === "inactive") {
      tempDealers = tempDealers.filter(d => d.status === "Inactive");
    }

    // Filter by selected anchor
    if (selectedAnchor !== "all") {
      tempDealers = tempDealers.filter(d => d.anchor === selectedAnchor);
    }

    // Filter by search term
    if (searchTerm) {
      tempDealers = tempDealers.filter(dealer =>
        dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dealer.dealerCustId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return tempDealers;
  }, [dealerStatusData, activeTab, selectedAnchor, searchTerm]);

  // Paginate the filtered dealers
  const paginatedDealers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSearchedDealers.slice(startIndex, endIndex);
  }, [filteredAndSearchedDealers, currentPage, itemsPerPage]);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredAndSearchedDealers.length / itemsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, selectedAnchor, searchTerm]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Credit Noting/ Dealer Status</h1>
        <p className="text-muted-foreground">Manage active and inactive dealers</p>
      </div>

      <Tabs 
        defaultValue={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Dealers</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Select 
              value={selectedAnchor} 
              onValueChange={setSelectedAnchor}
            >
              <SelectTrigger className="w-[180px] h-9">
                <SelectValue placeholder="Filter by anchor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Anchors</SelectItem>
                {uniqueAnchors.map((anchor) => (
                  <SelectItem key={anchor} value={anchor}>
                    {anchor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardHeader className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-2 w-full max-w-sm">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search dealers..." 
                  className="h-9" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-auto">
            <div className="w-full min-w-[640px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dealer Cust ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Anchor</TableHead>
                    <TableHead>Program Name</TableHead>
                    <TableHead>Program Cust ID</TableHead>
                    <TableHead>Sanctioned Limit</TableHead>
                    <TableHead>Utilised Limit</TableHead>
                    <TableHead>Utilisation %</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Smartfin Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Edit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedDealers.map((dealer) => (
                    <TableRow key={dealer.id}>
                      <TableCell className="font-medium">{dealer.dealerCustId}</TableCell>
                      <TableCell>{dealer.name}</TableCell>
                      <TableCell>{dealer.anchor}</TableCell>
                      <TableCell>{dealer.programName}</TableCell>
                      <TableCell>{dealer.programCustId}</TableCell>
                      <TableCell>₹{dealer.sanctionedLimit.toLocaleString()}</TableCell>
                      <TableCell>₹{dealer.utilisedLimit.toLocaleString()}</TableCell>
                      <TableCell>{dealer.utilisationPercentage}%</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center gap-2 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            dealer.status === "Active"
                              ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                              : "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300"
                          }`}
                        >
                          {dealer.status === "Active" ? (
                            <CheckCircle2 className="h-3 w-3" />
                          ) : (
                            <XCircle className="h-3 w-3" />
                          )}
                          {dealer.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={dealer.smartfinStatus === "Active" ? "default" : "outline"}
                          className={dealer.smartfinStatus === "Active" 
                            ? "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300" 
                            : "bg-stone-100 text-stone-700 dark:bg-stone-700 dark:text-stone-300"}
                        >
                          {dealer.smartfinStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>{dealer.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <EditDealerDialog dealer={dealer} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <div className="mt-4 flex justify-center py-4">
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
      </Tabs>
    </div>
  )
}

const dealerStatusData: Dealer[] = [
  {
    id: "DLR001",
    dealerCustId: "RTLHDFC0001",
    name: "Reliance Retail",
    anchor: "HDFC Bank",
    programName: "HDFC Supply Chain Finance",
    programCustId: "SCF-HD-001",
    status: "Active",
    smartfinStatus: "Active",
    lastUpdated: "2023-11-15",
    sanctionedLimit: 1000000,
    utilisedLimit: 750000,
    utilisationPercentage: 75,
  },
  {
    id: "DLR002",
    dealerCustId: "FLPIC0023",
    name: "Flipkart India",
    anchor: "ICICI Bank",
    programName: "ICICI Distributor Finance",
    programCustId: "DF-IC-052",
    status: "Active",
    smartfinStatus: "Active",
    lastUpdated: "2023-11-14",
    sanctionedLimit: 5000000,
    utilisedLimit: 4250000,
    utilisationPercentage: 85,
  },
  {
    id: "DLR003",
    dealerCustId: "AMZAXS0045",
    name: "Amazon Seller Services",
    anchor: "Axis Bank",
    programName: "Axis Channel Finance",
    programCustId: "CF-AXB-045",
    status: "Inactive",
    smartfinStatus: "Inactive",
    lastUpdated: "2023-11-10",
    sanctionedLimit: 7500000,
    utilisedLimit: 6000000,
    utilisationPercentage: 80,
  },
  {
    id: "DLR004",
    dealerCustId: "BIJSBI0078",
    name: "Bijou Electronics",
    anchor: "State Bank of India",
    programName: "SBI Supply Chain Finance",
    programCustId: "SCF-SBI-012",
    status: "Active",
    smartfinStatus: "Inactive",
    lastUpdated: "2023-11-12",
    sanctionedLimit: 1500000,
    utilisedLimit: 900000,
    utilisationPercentage: 60,
  },
  {
    id: "DLR005",
    dealerCustId: "TATRIL0089",
    name: "Tata Electronics",
    anchor: "Reliance Industries",
    programName: "RIL Vendor Financing",
    programCustId: "VF-RIL-021",
    status: "Inactive",
    smartfinStatus: "Active",
    lastUpdated: "2023-11-05",
    sanctionedLimit: 2000000,
    utilisedLimit: 1800000,
    utilisationPercentage: 90,
  },
  {
    id: "DLR006",
    dealerCustId: "BPLHUL0101",
    name: "Best Price Logistics",
    anchor: "Hindustan Unilever",
    programName: "HUL Distributor Finance",
    programCustId: "DF-HUL-067",
    status: "Active",
    smartfinStatus: "Active",
    lastUpdated: "2023-11-03",
    sanctionedLimit: 3500000,
    utilisedLimit: 2100000,
    utilisationPercentage: 60,
  },
  {
    id: "DLR007",
    dealerCustId: "MYNDTCS0112",
    name: "Myntra Designs",
    anchor: "Tata Consultancy Services",
    programName: "TCS Partner Program",
    programCustId: "PP-TCS-105",
    status: "Active",
    smartfinStatus: "Active",
    lastUpdated: "2023-11-01",
    sanctionedLimit: 4000000,
    utilisedLimit: 3600000,
    utilisationPercentage: 90,
  },
  {
    id: "DLR008",
    dealerCustId: "GRSKMB0135",
    name: "Grofers India",
    anchor: "Kotak Mahindra Bank",
    programName: "Kotak Channel Finance",
    programCustId: "CF-KMB-034",
    status: "Inactive",
    smartfinStatus: "Inactive",
    lastUpdated: "2023-10-28",
    sanctionedLimit: 2500000,
    utilisedLimit: 1875000,
    utilisationPercentage: 75,
  },
  {
    id: "DLR009",
    dealerCustId: "BKSAIR0149",
    name: "Booksellers Network",
    anchor: "Bharti Airtel",
    programName: "Airtel Dealer Finance",
    programCustId: "DF-AIR-089",
    status: "Active",
    smartfinStatus: "Active",
    lastUpdated: "2023-10-25",
    sanctionedLimit: 1200000,
    utilisedLimit: 840000,
    utilisationPercentage: 70,
  },
  {
    id: "DLR010",
    dealerCustId: "APPINF0153",
    name: "Appario Retail",
    anchor: "Infosys Limited",
    programName: "Infosys Dealer Finance",
    programCustId: "DF-INF-078",
    status: "Active",
    smartfinStatus: "Inactive",
    lastUpdated: "2023-10-22",
    sanctionedLimit: 3000000,
    utilisedLimit: 2400000,
    utilisationPercentage: 80,
  },
  {
    id: "DLR011",
    dealerCustId: "URBHDFC0169",
    name: "Urban Company",
    anchor: "HDFC Bank",
    programName: "HDFC Supply Chain Finance",
    programCustId: "SCF-HD-001",
    status: "Active",
    smartfinStatus: "Active",
    lastUpdated: "2023-10-20",
    sanctionedLimit: 2800000,
    utilisedLimit: 1680000,
    utilisationPercentage: 60,
  },
  {
    id: "DLR012",
    dealerCustId: "BIGBIC0174",
    name: "BigBasket",
    anchor: "ICICI Bank",
    programName: "ICICI Distributor Finance",
    programCustId: "DF-IC-052",
    status: "Inactive",
    smartfinStatus: "Inactive",
    lastUpdated: "2023-10-18",
    sanctionedLimit: 5500000,
    utilisedLimit: 4950000,
    utilisationPercentage: 90,
  },
  {
    id: "DLR013",
    dealerCustId: "DMTAXS0188",
    name: "DMart",
    anchor: "Axis Bank",
    programName: "Axis Channel Finance",
    programCustId: "CF-AXB-045",
    status: "Active",
    smartfinStatus: "Active",
    lastUpdated: "2023-10-15",
    sanctionedLimit: 6000000,
    utilisedLimit: 4200000,
    utilisationPercentage: 70,
  },
  {
    id: "DLR014",
    dealerCustId: "SWGSBI0196",
    name: "Swiggy",
    anchor: "State Bank of India",
    programName: "SBI Supply Chain Finance",
    programCustId: "SCF-SBI-012",
    status: "Active",
    smartfinStatus: "Active",
    lastUpdated: "2023-10-12",
    sanctionedLimit: 4500000,
    utilisedLimit: 3150000,
    utilisationPercentage: 70,
  },
  {
    id: "DLR015",
    dealerCustId: "ZOMRIL0205",
    name: "Zomato",
    anchor: "Reliance Industries",
    programName: "RIL Vendor Financing",
    programCustId: "VF-RIL-021",
    status: "Inactive",
    smartfinStatus: "Inactive",
    lastUpdated: "2023-10-10",
    sanctionedLimit: 3800000,
    utilisedLimit: 3420000,
    utilisationPercentage: 90,
  },
  {
    id: "DLR016",
    dealerCustId: "NYKAHUL0217",
    name: "Nykaa",
    anchor: "Hindustan Unilever",
    programName: "HUL Distributor Finance",
    programCustId: "DF-HUL-067",
    status: "Active",
    smartfinStatus: "Active",
    lastUpdated: "2023-10-08",
    sanctionedLimit: 2200000,
    utilisedLimit: 1320000,
    utilisationPercentage: 60,
  },
  {
    id: "DLR017",
    dealerCustId: "LNSTCS0229",
    name: "Lenskart",
    anchor: "Tata Consultancy Services",
    programName: "TCS Partner Program",
    programCustId: "PP-TCS-105",
    status: "Active",
    smartfinStatus: "Inactive",
    lastUpdated: "2023-10-05",
    sanctionedLimit: 1800000,
    utilisedLimit: 1440000,
    utilisationPercentage: 80,
  },
  {
    id: "DLR018",
    dealerCustId: "PHRKMB0234",
    name: "PharmEasy",
    anchor: "Kotak Mahindra Bank",
    programName: "Kotak Channel Finance",
    programCustId: "CF-KMB-034",
    status: "Active",
    smartfinStatus: "Active",
    lastUpdated: "2023-10-02",
    sanctionedLimit: 2500000,
    utilisedLimit: 1750000,
    utilisationPercentage: 70,
  },
  {
    id: "DLR019",
    dealerCustId: "CRDAIR0246",
    name: "CarDekho",
    anchor: "Bharti Airtel",
    programName: "Airtel Dealer Finance",
    programCustId: "DF-AIR-089",
    status: "Inactive",
    smartfinStatus: "Inactive",
    lastUpdated: "2023-09-28",
    sanctionedLimit: 1600000,
    utilisedLimit: 1280000,
    utilisationPercentage: 80,
  },
  {
    id: "DLR020",
    dealerCustId: "MMINF0251",
    name: "MakeMyTrip",
    anchor: "Infosys Limited",
    programName: "Infosys Dealer Finance",
    programCustId: "DF-INF-078",
    status: "Active",
    smartfinStatus: "Active",
    lastUpdated: "2023-09-25",
    sanctionedLimit: 3200000,
    utilisedLimit: 2240000,
    utilisationPercentage: 70,
  }
]
