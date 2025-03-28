import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Shield, Download, Eye } from "lucide-react"
import { Progress } from "@/components/ui/progress"

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
            <div className="text-2xl font-bold">R 25,000,000</div>
            <p className="text-xs text-muted-foreground">Across all anchors</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Utilized FLDG</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R 8,750,000</div>
            <p className="text-xs text-muted-foreground">35% of total FLDG</p>
            <Progress value={35} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available FLDG</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R 16,250,000</div>
            <p className="text-xs text-muted-foreground">65% of total FLDG</p>
            <Progress value={65} className="h-2 mt-2" />
          </CardContent>
        </Card>
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
                    <TableCell>R {item.totalAmount.toLocaleString()}</TableCell>
                    <TableCell>R {item.utilized.toLocaleString()}</TableCell>
                    <TableCell>R {item.available.toLocaleString()}</TableCell>
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

