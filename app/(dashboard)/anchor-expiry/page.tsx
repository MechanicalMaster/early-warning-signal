import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Clock, AlertTriangle } from "lucide-react"

export default function AnchorExpiryPage() {
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
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Anchor Name</TableHead>
                <TableHead>Limit Setup Date</TableHead>
                <TableHead>Limit Expiry Date</TableHead>
                <TableHead>Days to Expiry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action Required</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {anchorData.map((anchor, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{anchor.name}</TableCell>
                  <TableCell>{anchor.setupDate}</TableCell>
                  <TableCell>{anchor.expiryDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {anchor.daysToExpiry} days
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={anchor.daysToExpiry <= 30 ? "destructive" : "outline"}>
                      {anchor.daysToExpiry <= 30 ? "Expiring Soon" : "Active"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {anchor.daysToExpiry <= 30 && (
                      <div className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Renewal Required</span>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

const anchorData = [
  {
    name: "Standard Bank",
    setupDate: "2023-06-15",
    expiryDate: "2024-06-14",
    daysToExpiry: 15,
  },
  {
    name: "Shoprite Holdings",
    setupDate: "2023-08-01",
    expiryDate: "2024-07-31",
    daysToExpiry: 62,
  },
  {
    name: "MTN Group",
    setupDate: "2023-09-15",
    expiryDate: "2024-09-14",
    daysToExpiry: 108,
  },
  {
    name: "Discovery Limited",
    setupDate: "2023-05-01",
    expiryDate: "2024-04-30",
    daysToExpiry: 8,
  },
  {
    name: "Sasol Limited",
    setupDate: "2023-07-01",
    expiryDate: "2024-06-30",
    daysToExpiry: 31,
  },
]
