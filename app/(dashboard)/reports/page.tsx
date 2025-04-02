import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Download,
  Calendar,
  BarChart,
  PieChart,
  Filter,
  Store,
  Wallet,
  Shield,
  Anchor,
  AlertOctagon,
} from "lucide-react"
import { DatePickerWithRange } from "@/components/date-range-picker"

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">Generate and download various reports</p>
      </div>

      <Tabs defaultValue="standard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="standard">
            <FileText className="h-4 w-4 mr-2" />
            Standard Reports
          </TabsTrigger>
          <TabsTrigger value="scheduled">
            <Calendar className="h-4 w-4 mr-2" />
            Scheduled Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="standard" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {standardReports.map((report, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {report.icon}
                    {report.title}
                  </CardTitle>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Date Range</Label>
                      <DatePickerWithRange />
                    </div>
                    {report.additionalFilters && (
                      <div className="space-y-2">
                        <Label>Additional Filters</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select filter" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="active">Active Only</SelectItem>
                            <SelectItem value="inactive">Inactive Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Generate Report
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Set up reports to be automatically generated and sent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="scheduledReport">Report Type</Label>
                <Select defaultValue="dealer-summary">
                  <SelectTrigger id="scheduledReport">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dealer-summary">Dealer Summary</SelectItem>
                    <SelectItem value="transaction-summary">Transaction Summary</SelectItem>
                    <SelectItem value="fldg-status">FLDG Status</SelectItem>
                    <SelectItem value="anchor-performance">Anchor Performance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select defaultValue="weekly">
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipients">Recipients</Label>
                <Input id="recipients" placeholder="Enter email addresses (comma separated)" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="format">Format</Label>
                <Select defaultValue="excel">
                  <SelectTrigger id="format">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Schedule Report</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Currently Scheduled Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{report.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {report.frequency} • {report.format} • {report.recipients}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const standardReports = [
  {
    title: "Dealer Summary",
    description: "Overview of all dealers, their status, and key metrics",
    icon: <Store className="h-4 w-4" />,
    additionalFilters: true,
  },
  {
    title: "Transaction Report",
    description: "Detailed report of all transactions within a period",
    icon: <Wallet className="h-4 w-4" />,
    additionalFilters: true,
  },
  {
    title: "FLDG Status Report",
    description: "Current status of FLDG across all anchors",
    icon: <Shield className="h-4 w-4" />,
    additionalFilters: false,
  },
  {
    title: "Anchor Performance",
    description: "Performance metrics for all anchors",
    icon: <Anchor className="h-4 w-4" />,
    additionalFilters: true,
  },
  {
    title: "Stop Supply Analysis",
    description: "Analysis of dealers with stop supply status",
    icon: <AlertOctagon className="h-4 w-4" />,
    additionalFilters: false,
  },
  {
    title: "Credit Utilization",
    description: "Credit limit utilization across dealers",
    icon: <PieChart className="h-4 w-4" />,
    additionalFilters: true,
  },
]

const scheduledReports = [
  {
    name: "Weekly Dealer Summary",
    frequency: "Every Monday at 8:00 AM",
    format: "Excel",
    recipients: "finance@sambo.com, management@sambo.com",
  },
  {
    name: "Monthly FLDG Status",
    frequency: "1st of every month at 7:00 AM",
    format: "PDF",
    recipients: "risk@sambo.com, ceo@sambo.com",
  },
  {
    name: "Daily Transaction Summary",
    frequency: "Every day at 6:00 AM",
    format: "CSV",
    recipients: "operations@sambo.com",
  },
]

