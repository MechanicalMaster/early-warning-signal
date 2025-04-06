import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, CheckCircle2, XCircle, ToggleLeft, ToggleRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EditDealerDialog, type Dealer } from "@/components/edit-dealer-dialog"

export default function DealerStatusPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dealer Status Management</h1>
        <p className="text-muted-foreground">Manage active and inactive dealers</p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Dealers</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] h-9">
                <SelectValue placeholder="Filter by anchor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Anchors</SelectItem>
                <SelectItem value="standard-bank">Standard Bank</SelectItem>
                <SelectItem value="shoprite">Shoprite Holdings</SelectItem>
                <SelectItem value="mtn">MTN Group</SelectItem>
                <SelectItem value="sasol">Sasol Limited</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardHeader className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-2 w-full max-w-sm">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search dealers..." className="h-9" />
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
                    <TableHead>Sanctioned Limit</TableHead>
                    <TableHead>Utilised Limit</TableHead>
                    <TableHead>Utilisation %</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Edit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dealerStatusData.map((dealer) => (
                    <TableRow key={dealer.id}>
                      <TableCell className="font-medium">{dealer.id}</TableCell>
                      <TableCell>{dealer.name}</TableCell>
                      <TableCell>{dealer.anchor}</TableCell>
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
                      <TableCell>{dealer.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <EditDealerDialog dealer={dealer} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  )
}

const dealerStatusData: Dealer[] = [
  {
    id: "DLR001",
    name: "Cape Town Motors",
    anchor: "Standard Bank",
    status: "Active",
    lastUpdated: "2023-11-15",
    sanctionedLimit: 1000000,
    utilisedLimit: 750000,
    utilisationPercentage: 75,
  },
  {
    id: "DLR002",
    name: "Joburg Auto Supplies",
    anchor: "Shoprite Holdings",
    status: "Active",
    lastUpdated: "2023-11-14",
    sanctionedLimit: 500000,
    utilisedLimit: 425000,
    utilisationPercentage: 85,
  },
  {
    id: "DLR003",
    name: "Durban Electronics",
    anchor: "MTN Group",
    status: "Inactive",
    lastUpdated: "2023-11-10",
    sanctionedLimit: 750000,
    utilisedLimit: 600000,
    utilisationPercentage: 80,
  },
  {
    id: "DLR005",
    name: "Bloemfontein Distributors",
    anchor: "Discovery Limited",
    status: "Active",
    lastUpdated: "2023-11-12",
    sanctionedLimit: 1500000,
    utilisedLimit: 900000,
    utilisationPercentage: 60,
  },
  {
    id: "DLR008",
    name: "East London Traders",
    anchor: "Standard Bank",
    status: "Inactive",
    lastUpdated: "2023-11-05",
    sanctionedLimit: 2000000,
    utilisedLimit: 1800000,
    utilisationPercentage: 90,
  },
]
