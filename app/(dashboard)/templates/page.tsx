import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, AlertCircle, CheckCircle, Clock, FileText, Edit, Eye, Copy } from "lucide-react"
import { EmailTemplateEditor } from "@/components/email-template-editor"

export default function TemplatesPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Template Management</h1>
        <p className="text-muted-foreground">Manage email and notification templates</p>
      </div>

      <Tabs defaultValue="email" className="space-y-4">
        <TabsList>
          <TabsTrigger value="email">
            <Mail className="h-4 w-4 mr-2" />
            Email Templates
          </TabsTrigger>
          <TabsTrigger value="notification">
            <AlertCircle className="h-4 w-4 mr-2" />
            Notification Templates
          </TabsTrigger>
          <TabsTrigger value="report">
            <FileText className="h-4 w-4 mr-2" />
            Report Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {emailTemplates.map((template, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {template.icon}
                    {template.title}
                  </CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    <p>Last updated: {template.lastUpdated}</p>
                    <p>Used in: {template.usedIn}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                  <Button size="sm" className="gap-2">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Edit Template</CardTitle>
              <CardDescription>Modify the selected email template</CardDescription>
            </CardHeader>
            <CardContent>
              <EmailTemplateEditor />
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Copy className="h-4 w-4" />
                  Duplicate
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Eye className="h-4 w-4" />
                  Preview
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
                <Button size="sm">Save Changes</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notification" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {notificationTemplates.map((template, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {template.icon}
                    {template.title}
                  </CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    <p>Last updated: {template.lastUpdated}</p>
                    <p>Used in: {template.usedIn}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                  <Button size="sm" className="gap-2">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="report" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {reportTemplates.map((template, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {template.icon}
                    {template.title}
                  </CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    <p>Last updated: {template.lastUpdated}</p>
                    <p>Format: {template.format}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                  <Button size="sm" className="gap-2">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const emailTemplates = [
  {
    title: "Stop Supply Notice",
    description: "Sent when a dealer is placed on stop supply",
    icon: <AlertCircle className="h-4 w-4" />,
    lastUpdated: "2023-11-12",
    usedIn: "Dealer Management",
  },
  {
    title: "Credit Limit Warning",
    description: "Sent when a dealer approaches their credit limit",
    icon: <AlertCircle className="h-4 w-4" />,
    lastUpdated: "2023-11-08",
    usedIn: "Credit Management",
  },
]

const notificationTemplates = [
  {
    title: "Payment Due Reminder",
    description: "Notification for upcoming payment due dates",
    icon: <Clock className="h-4 w-4" />,
    lastUpdated: "2023-11-10",
    usedIn: "Payment Reminders",
  },
  {
    title: "Account Status Change",
    description: "Notification when account status changes",
    icon: <AlertCircle className="h-4 w-4" />,
    lastUpdated: "2023-11-05",
    usedIn: "Account Management",
  },
  {
    title: "New Transaction Alert",
    description: "Notification for new transactions",
    icon: <AlertCircle className="h-4 w-4" />,
    lastUpdated: "2023-10-28",
    usedIn: "Transaction Monitoring",
  },
]

const reportTemplates = [
  {
    title: "Monthly Dealer Summary",
    description: "Template for monthly dealer summary reports",
    icon: <FileText className="h-4 w-4" />,
    lastUpdated: "2023-11-10",
    format: "Excel",
  },
  {
    title: "FLDG Status Report",
    description: "Template for FLDG status reports",
    icon: <FileText className="h-4 w-4" />,
    lastUpdated: "2023-11-05",
    format: "PDF",
  },
  {
    title: "Transaction Analysis",
    description: "Template for transaction analysis reports",
    icon: <FileText className="h-4 w-4" />,
    lastUpdated: "2023-10-28",
    format: "Excel",
  },
]

