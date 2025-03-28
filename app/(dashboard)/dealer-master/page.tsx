import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye } from "lucide-react"
import Link from "next/link"
import { EditDealerDialog, type Dealer } from "@/components/edit-dealer-dialog"

export default function DealerMasterPage() {
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
              <Input placeholder="Search dealers..." className="h-9" />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Button variant="outline" size="sm">
                Export
              </Button>
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
                  <TableHead>Dealer ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Anchor</TableHead>
                  <TableHead>Anchor Contact Email</TableHead>
                  <TableHead>Credit Limit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dealers.map((dealer) => (
                  <TableRow key={dealer.id}>
                    <TableCell className="font-medium">{dealer.id}</TableCell>
                    <TableCell>{dealer.name}</TableCell>
                    <TableCell>{dealer.anchor}</TableCell>
                    <TableCell>{dealer.contactEmail || "Not specified"}</TableCell>
                    <TableCell>₹ {dealer.creditLimit.toLocaleString()}</TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          dealer.status === "Active"
                            ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                            : dealer.status === "Inactive"
                              ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300"
                              : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                        }`}
                      >
                        {dealer.status}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/dealer-master/${dealer.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View dealer</span>
                          </Link>
                        </Button>
                        <EditDealerDialog dealer={dealer} />
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

const dealers: Dealer[] = [
  {
    id: "DLR001",
    name: "Cape Town Motors",
    anchor: "Standard Bank",
    contactPerson: "James Wilson",
    contactEmail: "james.wilson@standardbank.co.za",
    creditLimit: 500000,
    status: "Active",
  },
  {
    id: "DLR002",
    name: "Joburg Auto Supplies",
    anchor: "Shoprite Holdings",
    contactPerson: "Lerato Molefe",
    contactEmail: "l.molefe@shoprite.co.za",
    creditLimit: 750000,
    status: "Active",
  },
  {
    id: "DLR003",
    name: "Durban Electronics",
    anchor: "MTN Group",
    contactPerson: "Raj Patel",
    contactEmail: "raj.patel@mtn.com",
    creditLimit: 350000,
    status: "Inactive",
  },
  {
    id: "DLR004",
    name: "Pretoria Wholesalers",
    anchor: "Sasol Limited",
    contactPerson: "Pieter van der Merwe",
    contactEmail: "pieter.merwe@sasol.com",
    creditLimit: 1000000,
    status: "Stop Supply",
  },
  {
    id: "DLR005",
    name: "Bloemfontein Distributors",
    anchor: "Discovery Limited",
    contactPerson: "Nomsa Dlamini",
    contactEmail: "nomsa.d@discovery.co.za",
    creditLimit: 250000,
    status: "Active",
  },
]

