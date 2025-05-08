import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Edit } from "lucide-react"
import Link from "next/link"

export type Anchor = {
  id: string
  name: string
  industry: string
  contactPerson: string
  email: string
  status: string
  phone?: string
  address?: string
  psmEmail?: string
  anchorEmails?: string[]
  stopSupplyRule?: string
  fldgInvocationRule?: string
}

export default function AnchorMasterPage() {
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
              <Input placeholder="Search anchors..." className="h-9" />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Button variant="outline" size="sm">
                Filter
              </Button>
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
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {anchors.map((anchor) => (
                  <TableRow key={anchor.id}>
                    <TableCell className="font-medium">{anchor.id}</TableCell>
                    <TableCell>{anchor.name}</TableCell>
                    <TableCell>{anchor.industry}</TableCell>
                    <TableCell>{anchor.contactPerson}</TableCell>
                    <TableCell>{anchor.email}</TableCell>
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
        </CardContent>
      </Card>
    </div>
  )
}

const anchors: Anchor[] = [
  {
    id: "ANC001",
    name: "Standard Bank",
    industry: "Banking",
    contactPerson: "John Smith",
    email: "john.smith@standardbank.co.za",
    status: "Active",
    phone: "+27 11 636 9111",
    address: "5 Simmonds Street, Johannesburg, 2001, South Africa",
    psmEmail: "john.smith@standardbank.co.za",
    anchorEmails: [
      "finance@standardbank.co.za",
      "support@standardbank.co.za",
      "info@standardbank.co.za"
    ]
  },
  {
    id: "ANC002",
    name: "Shoprite Holdings",
    industry: "Retail",
    contactPerson: "Sarah Johnson",
    email: "sarah.j@shoprite.co.za",
    status: "Active",
    phone: "+27 21 980 4000",
    address: "Cnr William Dabs and Old Paarl Roads, Brackenfell, 7560, South Africa",
    psmEmail: "sarah.j@shoprite.co.za",
    anchorEmails: [
      "retail@shoprite.co.za", 
      "orders@shoprite.co.za"
    ]
  },
  {
    id: "ANC003",
    name: "MTN Group",
    industry: "Telecommunications",
    contactPerson: "Michael Ndlovu",
    email: "m.ndlovu@mtn.com",
    status: "Active",
    phone: "+27 11 912 3000",
    address: "216 14th Avenue, Fairland, 2195, South Africa",
    psmEmail: "m.ndlovu@mtn.com",
    anchorEmails: [
      "service@mtn.com", 
      "corporate@mtn.com"
    ]
  },
  {
    id: "ANC004",
    name: "Sasol Limited",
    industry: "Energy",
    contactPerson: "Thandi Nkosi",
    email: "t.nkosi@sasol.com",
    status: "Inactive",
    phone: "+27 10 344 5000",
    address: "Sasol Place, 50 Katherine Street, Sandton, 2196, South Africa",
    psmEmail: "t.nkosi@sasol.com",
    anchorEmails: [
      "energy@sasol.com"
    ]
  },
  {
    id: "ANC005",
    name: "Discovery Limited",
    industry: "Insurance",
    contactPerson: "David Malan",
    email: "david.m@discovery.co.za",
    status: "Active",
    phone: "+27 11 529 2888",
    address: "1 Discovery Place, Sandton, 2196, South Africa",
    psmEmail: "david.m@discovery.co.za",
    anchorEmails: [
      "claims@discovery.co.za",
      "support@discovery.co.za"
    ]
  }
]
