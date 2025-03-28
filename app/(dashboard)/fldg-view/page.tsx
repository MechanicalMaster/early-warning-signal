import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Shield, Download, Eye, FileText, AlertTriangle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FLDGViewPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">FLDG View</h1>
        <p className="text-muted-foreground">Monitor First Loss Default Guarantee status across anchors</p>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total FLDG Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹ 25,000,000</div>
            <p className="text-xs text-muted-foreground">Across all anchors</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Utilized FLDG</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹ 8,750,000</div>
            <p className="text-xs text-muted-foreground">35% of total FLDG</p>
            <Progress value={35} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available FLDG</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹ 16,250,000</div>
            <p className="text-xs text-muted-foreground">65% of total FLDG</p>
            <Progress value={65} className="h-2 mt-2" />
          </CardContent>
        </Card>
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
                  <Input placeholder="Search dealers..." className="h-9" />
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
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dealerFldgData.map((item) => (
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
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View Details</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">Generate Report</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <AlertTriangle className="h-4 w-4" />
                              <span className="sr-only">Invoke FLDG</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
    anchor: "Standard Bank",
    totalAmount: 10000000,
    utilized: 3500000,
    available: 6500000,
    utilizationPercentage: 35,
    lastUpdated: "2023-11-15",
  },
  {
    anchor: "Shoprite Holdings",
    totalAmount: 5000000,
    utilized: 2250000,
    available: 2750000,
    utilizationPercentage: 45,
    lastUpdated: "2023-11-14",
  },
  {
    anchor: "MTN Group",
    totalAmount: 7500000,
    utilized: 2625000,
    available: 4875000,
    utilizationPercentage: 35,
    lastUpdated: "2023-11-13",
  },
  {
    anchor: "Sasol Limited",
    totalAmount: 2500000,
    utilized: 375000,
    available: 2125000,
    utilizationPercentage: 15,
    lastUpdated: "2023-11-12",
  },
]

const dealerFldgData = [
  {
    dealerId: "DLR-10025",
    dealerName: "Johannesburg Motors",
    anchorName: "Standard Bank",
    overdueDays: 75,
    overdueAmount: 850000,
    fldgInvocationDays: 15,
    lastInvocation: "2023-10-30",
  },
  {
    dealerId: "DLR-10043",
    dealerName: "Cape Town Electronics",
    anchorName: "MTN Group",
    overdueDays: 45,
    overdueAmount: 325000,
    fldgInvocationDays: 5,
    lastInvocation: null,
  },
  {
    dealerId: "DLR-10067",
    dealerName: "Durban Distributors",
    anchorName: "Shoprite Holdings",
    overdueDays: 60,
    overdueAmount: 480000,
    fldgInvocationDays: 0,
    lastInvocation: null,
  },
  {
    dealerId: "DLR-10082",
    dealerName: "Pretoria Suppliers",
    anchorName: "Standard Bank",
    overdueDays: 30,
    overdueAmount: 275000,
    fldgInvocationDays: 0,
    lastInvocation: null,
  },
  {
    dealerId: "DLR-10091",
    dealerName: "Bloemfontein Traders",
    anchorName: "Sasol Limited",
    overdueDays: 90,
    overdueAmount: 650000,
    fldgInvocationDays: 30,
    lastInvocation: "2023-11-01",
  },
  {
    dealerId: "DLR-10105",
    dealerName: "Port Elizabeth Retail",
    anchorName: "MTN Group",
    overdueDays: 15,
    overdueAmount: 120000,
    fldgInvocationDays: 0,
    lastInvocation: null,
  },
]

