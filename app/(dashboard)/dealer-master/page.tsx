"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"
import { EditDealerMasterDialog, type DealerMaster } from "@/components/edit-dealer-master-dialog"
import { anchors } from "@/app/(dashboard)/anchor-master/page"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

export default function DealerMasterPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter dealers based on search term
  const filteredDealers = useMemo(() => {
    if (!searchTerm) return dealers;
    
    return dealers.filter(dealer => 
      dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      dealer.dealerCustId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Paginate the filtered dealers
  const paginatedDealers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredDealers.slice(startIndex, endIndex);
  }, [filteredDealers, currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredDealers.length / itemsPerPage);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dealer Master</h1>
          <p className="text-muted-foreground">Manage dealer entities and their details</p>
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
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
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
                  <TableHead>Credit Limit</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedDealers.map((dealer) => {
                  // Find the matching anchor to get anchorEmails
                  const matchingAnchor = anchors.find((a: { name: string }) => a.name === dealer.anchor);
                  const anchorEmails = matchingAnchor?.anchorEmails || [];
                  
                  return (
                    <TableRow key={dealer.id}>
                      <TableCell className="font-medium">{dealer.dealerCustId}</TableCell>
                      <TableCell>{dealer.name}</TableCell>
                      <TableCell>{dealer.anchor}</TableCell>
                      <TableCell>{dealer.programName}</TableCell>
                      <TableCell>{dealer.programCustId}</TableCell>
                      <TableCell>₹ {dealer.creditLimit.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <EditDealerMasterDialog dealer={dealer} anchorEmails={anchorEmails} />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
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
                  
                  {[...Array(totalPages)].map((_, i) => (
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

const dealers: DealerMaster[] = [
  {
    id: "DLR001",
    dealerCustId: "RTLHDFC0001",
    name: "Reliance Retail",
    anchor: "Standard Bank",
    programName: "Standard Bank Supply Chain Finance",
    programCustId: "SCF-SB-001",
    contactPerson: "James Wilson",
    contactEmail: "james.wilson@standardbank.co.za",
    creditLimit: 500000,
    status: "Active",
    fldgInvocationEmails: ["finance@standardbank.co.za"],
    stopSupplyInvocationEmails: ["support@standardbank.co.za"]
  },
  {
    id: "DLR002",
    dealerCustId: "FLPSHOP0023",
    name: "Flipkart India",
    anchor: "Shoprite Holdings",
    programName: "Shoprite Distributor Finance",
    programCustId: "DF-SH-052",
    contactPerson: "Lerato Molefe",
    contactEmail: "l.molefe@shoprite.co.za",
    creditLimit: 750000,
    status: "Active",
    fldgInvocationEmails: ["retail@shoprite.co.za"],
    stopSupplyInvocationEmails: ["orders@shoprite.co.za"]
  },
  {
    id: "DLR003",
    dealerCustId: "AMZMTN0045",
    name: "Amazon Seller Services",
    anchor: "MTN Group",
    programName: "MTN Partner Program",
    programCustId: "PP-MTN-105",
    contactPerson: "Raj Patel",
    contactEmail: "raj.patel@mtn.com",
    creditLimit: 350000,
    status: "Inactive",
    fldgInvocationEmails: ["service@mtn.com"],
    stopSupplyInvocationEmails: ["corporate@mtn.com"]
  },
  {
    id: "DLR004",
    dealerCustId: "BIJSAS0078",
    name: "Bijou Electronics",
    anchor: "Sasol Limited",
    programName: "Sasol Vendor Financing",
    programCustId: "VF-SL-021",
    contactPerson: "Pieter van der Merwe",
    contactEmail: "pieter.merwe@sasol.com",
    creditLimit: 1000000,
    status: "Stop Supply",
    fldgInvocationEmails: ["energy@sasol.com"],
    stopSupplyInvocationEmails: ["energy@sasol.com"]
  },
  {
    id: "DLR005",
    dealerCustId: "TATDISC0089",
    name: "Tata Electronics",
    anchor: "Discovery Limited",
    programName: "Discovery Distribution Finance",
    programCustId: "DF-DL-067",
    contactPerson: "Nomsa Dlamini",
    contactEmail: "nomsa.d@discovery.co.za",
    creditLimit: 250000,
    status: "Active",
    fldgInvocationEmails: ["claims@discovery.co.za"],
    stopSupplyInvocationEmails: ["support@discovery.co.za"]
  },
  {
    id: "DLR006",
    dealerCustId: "BPLSTD0101",
    name: "Best Price Logistics",
    anchor: "Standard Bank",
    programName: "Standard Bank Supply Chain Finance",
    programCustId: "SCF-SB-001",
    contactPerson: "Peter Johnson",
    contactEmail: "p.johnson@standardbank.co.za",
    creditLimit: 350000,
    status: "Active",
    fldgInvocationEmails: ["finance@standardbank.co.za"],
    stopSupplyInvocationEmails: ["info@standardbank.co.za"]
  },
  {
    id: "DLR007",
    dealerCustId: "MYNSHOP0112",
    name: "Myntra Designs",
    anchor: "Shoprite Holdings",
    programName: "Shoprite Distributor Finance",
    programCustId: "DF-SH-052",
    contactPerson: "Lucy Mabaso",
    contactEmail: "l.mabaso@shoprite.co.za",
    creditLimit: 400000,
    status: "Active",
    fldgInvocationEmails: ["retail@shoprite.co.za"],
    stopSupplyInvocationEmails: ["orders@shoprite.co.za"]
  },
  {
    id: "DLR008",
    dealerCustId: "GRSMTN0135",
    name: "Grofers India",
    anchor: "MTN Group",
    programName: "MTN Partner Program",
    programCustId: "PP-MTN-105",
    contactPerson: "Thabo Nkosi",
    contactEmail: "t.nkosi@mtn.com",
    creditLimit: 250000,
    status: "Inactive",
    fldgInvocationEmails: ["service@mtn.com"],
    stopSupplyInvocationEmails: ["corporate@mtn.com"]
  },
  {
    id: "DLR009",
    dealerCustId: "BKSSAS0149",
    name: "Booksellers Network",
    anchor: "Sasol Limited",
    programName: "Sasol Vendor Financing",
    programCustId: "VF-SL-021",
    contactPerson: "Johan Meyer",
    contactEmail: "j.meyer@sasol.com",
    creditLimit: 120000,
    status: "Active",
    fldgInvocationEmails: ["energy@sasol.com"],
    stopSupplyInvocationEmails: ["energy@sasol.com"]
  },
  {
    id: "DLR010",
    dealerCustId: "APPDISC0153",
    name: "Appario Retail",
    anchor: "Discovery Limited",
    programName: "Discovery Distribution Finance",
    programCustId: "DF-DL-067",
    contactPerson: "Zandile Khumalo",
    contactEmail: "z.khumalo@discovery.co.za",
    creditLimit: 300000,
    status: "Active",
    fldgInvocationEmails: ["claims@discovery.co.za"],
    stopSupplyInvocationEmails: ["support@discovery.co.za"]
  },
  {
    id: "DLR011",
    dealerCustId: "URBSTD0169",
    name: "Urban Company",
    anchor: "Standard Bank",
    programName: "Standard Bank Supply Chain Finance",
    programCustId: "SCF-SB-001",
    contactPerson: "David Okello",
    contactEmail: "d.okello@standardbank.co.za",
    creditLimit: 280000,
    status: "Active",
    fldgInvocationEmails: ["finance@standardbank.co.za"],
    stopSupplyInvocationEmails: ["info@standardbank.co.za"]
  },
  {
    id: "DLR012",
    dealerCustId: "BIGSHOP0174",
    name: "BigBasket",
    anchor: "Shoprite Holdings",
    programName: "Shoprite Distributor Finance",
    programCustId: "DF-SH-052",
    contactPerson: "Thandi Ngcobo",
    contactEmail: "t.ngcobo@shoprite.co.za",
    creditLimit: 550000,
    status: "Inactive",
    fldgInvocationEmails: ["retail@shoprite.co.za"],
    stopSupplyInvocationEmails: ["orders@shoprite.co.za"]
  },
  {
    id: "DLR013",
    dealerCustId: "DMTMTN0188",
    name: "DMart",
    anchor: "MTN Group",
    programName: "MTN Partner Program",
    programCustId: "PP-MTN-105",
    contactPerson: "Sipho Zulu",
    contactEmail: "s.zulu@mtn.com",
    creditLimit: 600000,
    status: "Active",
    fldgInvocationEmails: ["service@mtn.com"],
    stopSupplyInvocationEmails: ["corporate@mtn.com"]
  },
  {
    id: "DLR014",
    dealerCustId: "SWGSAS0196",
    name: "Swiggy",
    anchor: "Sasol Limited",
    programName: "Sasol Vendor Financing",
    programCustId: "VF-SL-021",
    contactPerson: "Andre Venter",
    contactEmail: "a.venter@sasol.com",
    creditLimit: 450000,
    status: "Active",
    fldgInvocationEmails: ["energy@sasol.com"],
    stopSupplyInvocationEmails: ["energy@sasol.com"]
  },
  {
    id: "DLR015",
    dealerCustId: "ZOMDISC0205",
    name: "Zomato",
    anchor: "Discovery Limited",
    programName: "Discovery Distribution Finance",
    programCustId: "DF-DL-067",
    contactPerson: "Ayanda Mbeki",
    contactEmail: "a.mbeki@discovery.co.za",
    creditLimit: 380000,
    status: "Inactive",
    fldgInvocationEmails: ["claims@discovery.co.za"],
    stopSupplyInvocationEmails: ["support@discovery.co.za"]
  },
  {
    id: "DLR016",
    dealerCustId: "NYKASTD0217",
    name: "Nykaa",
    anchor: "Standard Bank",
    programName: "Standard Bank Supply Chain Finance",
    programCustId: "SCF-SB-001",
    contactPerson: "Thomas Brown",
    contactEmail: "t.brown@standardbank.co.za",
    creditLimit: 220000,
    status: "Active",
    fldgInvocationEmails: ["finance@standardbank.co.za", "info@standardbank.co.za"],
    stopSupplyInvocationEmails: ["support@standardbank.co.za"]
  },
  {
    id: "DLR017",
    dealerCustId: "LNSSHOP0229",
    name: "Lenskart",
    anchor: "Shoprite Holdings",
    programName: "Shoprite Distributor Finance",
    programCustId: "DF-SH-052",
    contactPerson: "Precious Moyo",
    contactEmail: "p.moyo@shoprite.co.za",
    creditLimit: 180000,
    status: "Active",
    fldgInvocationEmails: ["retail@shoprite.co.za"],
    stopSupplyInvocationEmails: ["orders@shoprite.co.za"]
  },
  {
    id: "DLR018",
    dealerCustId: "PHRMTN0234",
    name: "PharmEasy",
    anchor: "MTN Group",
    programName: "MTN Partner Program",
    programCustId: "PP-MTN-105",
    contactPerson: "Lindwe Sithole",
    contactEmail: "l.sithole@mtn.com",
    creditLimit: 250000,
    status: "Active",
    fldgInvocationEmails: ["service@mtn.com", "corporate@mtn.com"],
    stopSupplyInvocationEmails: ["service@mtn.com"]
  },
  {
    id: "DLR019",
    dealerCustId: "CRDSAS0246",
    name: "CarDekho",
    anchor: "Sasol Limited",
    programName: "Sasol Vendor Financing",
    programCustId: "VF-SL-021",
    contactPerson: "Willem Pretorius",
    contactEmail: "w.pretorius@sasol.com",
    creditLimit: 160000,
    status: "Inactive",
    fldgInvocationEmails: ["energy@sasol.com"],
    stopSupplyInvocationEmails: ["energy@sasol.com"]
  },
  {
    id: "DLR020",
    dealerCustId: "MMTDISC0251",
    name: "MakeMyTrip",
    anchor: "Discovery Limited",
    programName: "Discovery Distribution Finance",
    programCustId: "DF-DL-067",
    contactPerson: "Nandi Xaba",
    contactEmail: "n.xaba@discovery.co.za",
    creditLimit: 320000,
    status: "Active",
    fldgInvocationEmails: ["claims@discovery.co.za"],
    stopSupplyInvocationEmails: ["support@discovery.co.za"]
  }
]
