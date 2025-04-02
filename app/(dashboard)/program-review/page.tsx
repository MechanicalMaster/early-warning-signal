import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, TrendingDown, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function ProgramReviewPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Program Review</h1>
        <p className="text-muted-foreground">Monitor anchor-wise program performance and utilization</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Anchor Program Status</CardTitle>
              <CardDescription>Review limit utilization and overdue status by anchor</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search anchors..." className="pl-8" />
              </div>
              <Button>Export</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Anchor Name</TableHead>
                <TableHead>Limit Sanctioned</TableHead>
                <TableHead>Limit Utilized</TableHead>
                <TableHead>Utilization %</TableHead>
                <TableHead>Overdue Amount</TableHead>
                <TableHead>Overdue Dealers</TableHead>
                <TableHead>% Overdue</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {programData.map((anchor, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{anchor.name}</TableCell>
                  <TableCell>₹ {anchor.limitSanctioned.toLocaleString()}</TableCell>
                  <TableCell>₹ {anchor.limitUtilized.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={anchor.utilizationPercentage} className="w-16" />
                      <span>{anchor.utilizationPercentage}%</span>
                    </div>
                  </TableCell>
                  <TableCell>₹ {anchor.overdueAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <TrendingDown className={`h-4 w-4 ${anchor.overdueDealers > 5 ? "text-destructive" : "text-muted-foreground"}`} />
                      {anchor.overdueDealers} dealers
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={anchor.overduePercentage > 10 ? "destructive" : "outline"}>
                      {anchor.overduePercentage}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {anchor.overduePercentage > 10 && (
                      <div className="flex items-center gap-2 text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        <span>High Risk</span>
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

const programData = [
  {
    name: "Standard Bank",
    limitSanctioned: 50000000,
    limitUtilized: 35000000,
    utilizationPercentage: 70,
    overdueAmount: 2500000,
    overdueDealers: 3,
    overduePercentage: 7,
  },
  {
    name: "Shoprite Holdings",
    limitSanctioned: 75000000,
    limitUtilized: 60000000,
    utilizationPercentage: 80,
    overdueAmount: 9000000,
    overdueDealers: 8,
    overduePercentage: 15,
  },
  {
    name: "MTN Group",
    limitSanctioned: 100000000,
    limitUtilized: 85000000,
    utilizationPercentage: 85,
    overdueAmount: 12000000,
    overdueDealers: 10,
    overduePercentage: 14,
  },
  {
    name: "Discovery Limited",
    limitSanctioned: 40000000,
    limitUtilized: 20000000,
    utilizationPercentage: 50,
    overdueAmount: 1000000,
    overdueDealers: 2,
    overduePercentage: 5,
  },
  {
    name: "Sasol Limited",
    limitSanctioned: 60000000,
    limitUtilized: 45000000,
    utilizationPercentage: 75,
    overdueAmount: 3000000,
    overdueDealers: 4,
    overduePercentage: 6,
  },
] 