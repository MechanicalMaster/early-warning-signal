"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Edit } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

export type Anchor = {
  id: string
  name: string
  industry: string
  psmName: string // renamed from contactPerson
  status: string
  programName: string
  programCustId: string
  anchorCustId: string
  region: string
  phone?: string
  address?: string
  anchorEmails?: string[]
  stopSupplyRule?: string
  fldgInvocationRule?: string
}

export default function AnchorMasterPage() {
  // State variables
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState<"programName" | "programCustId">("programName");
  const [selectedPsm, setSelectedPsm] = useState("all");

  // Get unique PSM names for filter dropdown
  const uniquePsmNames = useMemo(() => {
    return Array.from(new Set(anchors.map(anchor => anchor.psmName)));
  }, []);

  // Filter anchors based on search term, search field, and selected PSM
  const filteredAnchors = useMemo(() => {
    let filtered = anchors;
    
    // Filter by PSM
    if (selectedPsm !== "all") {
      filtered = filtered.filter(anchor => anchor.psmName === selectedPsm);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(anchor => 
        anchor[searchField].toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [anchors, searchTerm, searchField, selectedPsm]);

  // Paginate filtered anchors
  const itemsPerPage = 10;
  const paginatedAnchors = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAnchors.slice(startIndex, endIndex);
  }, [filteredAnchors, currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredAnchors.length / itemsPerPage);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Anchor Master</h1>
          <p className="text-muted-foreground">Manage anchor entities and their details</p>
        </div>
      </div>

      <Card>
        <CardHeader className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-2 w-full">
                <Select 
                  value={searchField}
                  onValueChange={(value: "programName" | "programCustId") => setSearchField(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Search by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="programName">Program Name</SelectItem>
                    <SelectItem value="programCustId">Program Cust ID</SelectItem>
                  </SelectContent>
                </Select>
                <Input 
                  placeholder={`Search by ${searchField}...`} 
                  className="h-9"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page when searching
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Select
                value={selectedPsm}
                onValueChange={(value) => {
                  setSelectedPsm(value);
                  setCurrentPage(1); // Reset to first page when filtering
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by PSM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All PSMs</SelectItem>
                  {uniquePsmNames.map((psm) => (
                    <SelectItem key={psm} value={psm}>
                      {psm}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-auto">
          <div className="w-full min-w-[640px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Anchor ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Program Name</TableHead>
                  <TableHead>Program Cust ID</TableHead>
                  <TableHead>Anchor Cust ID</TableHead>
                  <TableHead>PSM Name</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedAnchors.map((anchor) => (
                  <TableRow key={anchor.id}>
                    <TableCell className="font-medium">{anchor.id}</TableCell>
                    <TableCell>{anchor.name}</TableCell>
                    <TableCell>{anchor.industry}</TableCell>
                    <TableCell>{anchor.programName}</TableCell>
                    <TableCell>{anchor.programCustId}</TableCell>
                    <TableCell>{anchor.anchorCustId}</TableCell>
                    <TableCell>{anchor.psmName}</TableCell>
                    <TableCell>{anchor.region}</TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          anchor.status === "Active"
                            ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                            : "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300"
                        }`}
                      >
                        {anchor.status}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/anchor-master/${anchor.id}`}>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit {anchor.name}</span>
                        </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 py-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink 
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
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

export const anchors: Anchor[] = [
  {
    id: "ANC001",
    name: "HDFC Bank",
    industry: "Banking",
    psmName: "Rajesh Kumar",
    programName: "HDFC Supply Chain Finance",
    programCustId: "SCF-HD-001",
    anchorCustId: "HDFC0001234",
    region: "Mumbai",
    status: "Active",
    phone: "+91 22 6731 6000",
    address: "HDFC Bank House, Senapati Bapat Marg, Lower Parel, Mumbai 400013",
    anchorEmails: [
      "finance@hdfcbank.com",
      "support@hdfcbank.com",
      "info@hdfcbank.com"
    ]
  },
  {
    id: "ANC002",
    name: "Reliance Industries",
    industry: "Energy",
    psmName: "Anand Sharma",
    programName: "RIL Vendor Financing",
    programCustId: "VF-RIL-021",
    anchorCustId: "RIL9876543",
    region: "Mumbai",
    status: "Active",
    phone: "+91 22 3555 5000",
    address: "Maker Chambers IV, 222 Nariman Point, Mumbai 400021",
    anchorEmails: [
      "vendor.finance@ril.com", 
      "treasury@ril.com"
    ]
  },
  {
    id: "ANC003",
    name: "Tata Consultancy Services",
    industry: "IT Services",
    psmName: "Priya Mehta",
    programName: "TCS Partner Program",
    programCustId: "PP-TCS-105",
    anchorCustId: "TCS5643210",
    region: "Mumbai",
    status: "Active",
    phone: "+91 22 6778 9999",
    address: "TCS House, Raveline Street, Fort, Mumbai 400001",
    anchorEmails: [
      "partner.finance@tcs.com", 
      "corporate@tcs.com"
    ]
  },
  {
    id: "ANC004",
    name: "ICICI Bank",
    industry: "Banking",
    psmName: "Vikram Singh",
    programName: "ICICI Distribution Finance",
    programCustId: "DF-IC-052",
    anchorCustId: "ICICI7890123",
    region: "Mumbai",
    status: "Active",
    phone: "+91 22 2653 1414",
    address: "ICICI Bank Towers, Bandra-Kurla Complex, Mumbai 400051",
    anchorEmails: [
      "finance@icicibank.com",
      "support@icicibank.com"
    ]
  },
  {
    id: "ANC005",
    name: "Infosys Limited",
    industry: "IT Services",
    psmName: "Sunil Nair",
    programName: "Infosys Dealer Finance",
    programCustId: "DF-INF-078",
    anchorCustId: "INF4560987",
    region: "Bangalore",
    status: "Active",
    phone: "+91 80 2852 0261",
    address: "Electronics City, Hosur Road, Bangalore 560100",
    anchorEmails: [
      "dealer.finance@infosys.com",
      "partners@infosys.com"
    ]
  },
  {
    id: "ANC006",
    name: "Kotak Mahindra Bank",
    industry: "Banking",
    psmName: "Neha Gupta",
    programName: "Kotak Channel Finance",
    programCustId: "CF-KMB-034",
    anchorCustId: "KMB2345678",
    region: "Mumbai",
    status: "Active",
    phone: "+91 22 6166 0001",
    address: "27BKC, G Block, Bandra Kurla Complex, Mumbai 400051",
    anchorEmails: [
      "channel.finance@kotak.com",
      "treasury@kotak.com"
    ]
  },
  {
    id: "ANC007",
    name: "Hindustan Unilever",
    industry: "FMCG",
    psmName: "Ravi Desai",
    programName: "HUL Distributor Finance",
    programCustId: "DF-HUL-067",
    anchorCustId: "HUL3456789",
    region: "Mumbai",
    status: "Active",
    phone: "+91 22 3983 0000",
    address: "Unilever House, B.D. Sawant Marg, Chakala, Mumbai 400099",
    anchorEmails: [
      "distributor.finance@hul.com",
      "commercial@hul.com"
    ]
  },
  {
    id: "ANC008",
    name: "State Bank of India",
    industry: "Banking",
    psmName: "Ramesh Patel",
    programName: "SBI Supply Chain Finance",
    programCustId: "SCF-SBI-012",
    anchorCustId: "SBI9087654",
    region: "Mumbai",
    status: "Active",
    phone: "+91 22 2274 0000",
    address: "State Bank Bhavan, Madame Cama Road, Mumbai 400021",
    anchorEmails: [
      "scf@sbi.co.in",
      "corporate@sbi.co.in"
    ]
  },
  {
    id: "ANC009",
    name: "Bharti Airtel",
    industry: "Telecommunications",
    psmName: "Kiran Reddy",
    programName: "Airtel Dealer Finance",
    programCustId: "DF-AIR-089",
    anchorCustId: "AIR6789012",
    region: "Delhi",
    status: "Active",
    phone: "+91 11 4666 6100",
    address: "Bharti Crescent, 1 Nelson Mandela Road, Vasant Kunj, New Delhi 110070",
    anchorEmails: [
      "dealer.finance@airtel.com",
      "treasury@airtel.com"
    ]
  },
  {
    id: "ANC010",
    name: "Axis Bank",
    industry: "Banking",
    psmName: "Sanjay Kapoor",
    programName: "Axis Channel Finance",
    programCustId: "CF-AXB-045",
    anchorCustId: "AXB1092837",
    region: "Mumbai",
    status: "Inactive",
    phone: "+91 22 2425 2525",
    address: "Axis House, Wadia International Centre, Worli, Mumbai 400025",
    anchorEmails: [
      "channel.finance@axisbank.com",
      "corporate@axisbank.com"
    ]
  },
  {
    id: "ANC011",
    name: "ITC Limited",
    industry: "Conglomerate",
    psmName: "Arvind Joshi",
    programName: "ITC Distributor Program",
    programCustId: "DP-ITC-023",
    anchorCustId: "ITC5432109",
    region: "Kolkata",
    status: "Active",
    phone: "+91 33 2288 9371",
    address: "Virginia House, 37 J.L. Nehru Road, Kolkata 700071",
    anchorEmails: [
      "distributor.program@itc.in",
      "finance@itc.in"
    ]
  },
  {
    id: "ANC012",
    name: "Larsen & Toubro",
    industry: "Engineering",
    psmName: "Ajay Malhotra",
    programName: "L&T Vendor Finance",
    programCustId: "VF-LNT-056",
    anchorCustId: "LNT2109876",
    region: "Mumbai",
    status: "Active",
    phone: "+91 22 6752 5656",
    address: "L&T House, Ballard Estate, Mumbai 400001",
    anchorEmails: [
      "vendor.finance@larsentoubro.com",
      "treasury@larsentoubro.com"
    ]
  },
  {
    id: "ANC013",
    name: "Bajaj Finance",
    industry: "Financial Services",
    psmName: "Deepika Ahuja",
    programName: "Bajaj Retailer Finance",
    programCustId: "RF-BAF-091",
    anchorCustId: "BAF8765432",
    region: "Pune",
    status: "Active",
    phone: "+91 20 3054 0000",
    address: "Akurdi, Pune 411035",
    anchorEmails: [
      "retailer.finance@bajajfinserv.in",
      "support@bajajfinserv.in"
    ]
  },
  {
    id: "ANC014",
    name: "HCL Technologies",
    industry: "IT Services",
    psmName: "Vivek Bhatia",
    programName: "HCL Partner Financing",
    programCustId: "PF-HCL-037",
    anchorCustId: "HCL3217890",
    region: "Noida",
    status: "Active",
    phone: "+91 120 430 2000",
    address: "Plot No. 3A, Sector 126, Noida 201304",
    anchorEmails: [
      "partner.finance@hcl.com",
      "treasury@hcl.com"
    ]
  },
  {
    id: "ANC015",
    name: "Asian Paints",
    industry: "Manufacturing",
    psmName: "Rahul Jain",
    programName: "Asian Paints Dealer Program",
    programCustId: "DP-ASP-076",
    anchorCustId: "ASP4321098",
    region: "Mumbai",
    status: "Active",
    phone: "+91 22 6212 1000",
    address: "6A Shantinagar, Santacruz East, Mumbai 400055",
    anchorEmails: [
      "dealer.program@asianpaints.com",
      "finance@asianpaints.com"
    ]
  },
  {
    id: "ANC016",
    name: "Mahindra & Mahindra",
    industry: "Automotive",
    psmName: "Vikas Agarwal",
    programName: "Mahindra Supplier Finance",
    programCustId: "SF-MNM-019",
    anchorCustId: "MNM7654321",
    region: "Mumbai",
    status: "Active",
    phone: "+91 22 2490 1441",
    address: "Mahindra Towers, G.M. Bhosale Marg, Worli, Mumbai 400018",
    anchorEmails: [
      "supplier.finance@mahindra.com",
      "treasury@mahindra.com"
    ]
  },
  {
    id: "ANC017",
    name: "Titan Company",
    industry: "Consumer Goods",
    psmName: "Shreya Malik",
    programName: "Titan Retailer Finance",
    programCustId: "RF-TCL-082",
    anchorCustId: "TCL5678901",
    region: "Bangalore",
    status: "Active",
    phone: "+91 80 6704 7000",
    address: "Golden Enclave, Tower A, Airport Road, Bangalore 560017",
    anchorEmails: [
      "retailer.finance@titan.co.in",
      "accounts@titan.co.in"
    ]
  },
  {
    id: "ANC018",
    name: "Sun Pharmaceutical",
    industry: "Pharmaceuticals",
    psmName: "Gaurav Mishra",
    programName: "Sun Pharma Distributor Finance",
    programCustId: "DF-SUN-048",
    anchorCustId: "SUN8901234",
    region: "Mumbai",
    status: "Inactive",
    phone: "+91 22 4324 4324",
    address: "Sun House, CTS No. 201 B/1, Western Express Highway, Goregaon East, Mumbai 400063",
    anchorEmails: [
      "distributor.finance@sunpharma.com",
      "accounts@sunpharma.com"
    ]
  },
  {
    id: "ANC019",
    name: "NTPC Limited",
    industry: "Power Generation",
    psmName: "Manish Sinha",
    programName: "NTPC Vendor Program",
    programCustId: "VP-NTPC-063",
    anchorCustId: "NTPC7890123",
    region: "Delhi",
    status: "Active",
    phone: "+91 11 2436 7072",
    address: "NTPC Bhawan, SCOPE Complex, 7 Institutional Area, Lodhi Road, New Delhi 110003",
    anchorEmails: [
      "vendor.program@ntpc.co.in",
      "finance@ntpc.co.in"
    ]
  },
  {
    id: "ANC020",
    name: "Bajaj Auto",
    industry: "Automotive",
    psmName: "Amit Verma",
    programName: "Bajaj Dealer Finance",
    programCustId: "DF-BAL-029",
    anchorCustId: "BAL2345678",
    region: "Pune",
    status: "Active",
    phone: "+91 20 2714 6999",
    address: "Mumbai-Pune Road, Akurdi, Pune 411035",
    anchorEmails: [
      "dealer.finance@bajajauto.co.in",
      "accounts@bajajauto.co.in"
    ]
  }
]
