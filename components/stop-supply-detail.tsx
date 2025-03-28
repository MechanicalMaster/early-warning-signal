"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, XCircle, FileText, Mail, Calendar, Download, ExternalLink } from "lucide-react"
import type { StopSupplyDealer } from "@/app/(dashboard)/stop-supply/page"
import { Progress } from "@/components/ui/progress"

export function StopSupplyDetail({ dealer }: { dealer: StopSupplyDealer }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Dealer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-1 text-sm">
              <dt className="font-medium">Dealer ID:</dt>
              <dd>{dealer.id}</dd>

              <dt className="font-medium">Name:</dt>
              <dd>{dealer.name}</dd>

              <dt className="font-medium">Anchor:</dt>
              <dd>{dealer.anchor}</dd>

              <dt className="font-medium">Stop Reason:</dt>
              <dd className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3 text-red-500" />
                {dealer.stopReason}
              </dd>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Stop Supply Status</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-1 text-sm">
              <dt className="font-medium">Overdue Days:</dt>
              <dd>
                <Badge variant={dealer.overdueDays > 60 ? "destructive" : "outline"}>{dealer.overdueDays} days</Badge>
              </dd>

              <dt className="font-medium">Overdue Amount:</dt>
              <dd>₹ {dealer.overdueAmount.toLocaleString()}</dd>

              <dt className="font-medium">Stop Supply Duration:</dt>
              <dd>{dealer.stopSupplyDays} days</dd>

              <dt className="font-medium">Last Triggered:</dt>
              <dd>{dealer.lastTriggeredDate}</dd>
            </dl>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="history" className="space-y-4">
        <TabsList>
          <TabsTrigger value="history">
            <Calendar className="h-4 w-4 mr-2" />
            Stop Supply History
          </TabsTrigger>
          <TabsTrigger value="communications">
            <Mail className="h-4 w-4 mr-2" />
            Communications
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="h-4 w-4 mr-2" />
            Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stop Supply History</CardTitle>
              <CardDescription>Complete history of stop supply events for this dealer</CardDescription>
            </CardHeader>
            <CardContent className="p-0 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice Number</TableHead>
                    <TableHead>Overdue Days</TableHead>
                    <TableHead>Overdue Amount</TableHead>
                    <TableHead>Triggered Date</TableHead>
                    <TableHead>Emails Sent</TableHead>
                    <TableHead>Anchor Confirmation</TableHead>
                    <TableHead>Attachments</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dealer.history.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.invoiceNumber}</TableCell>
                      <TableCell>
                        <Badge variant={item.overdueDays > 60 ? "destructive" : "outline"}>
                          {item.overdueDays} days
                        </Badge>
                      </TableCell>
                      <TableCell>₹ {item.overdueAmount.toLocaleString()}</TableCell>
                      <TableCell>{item.triggeredDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{item.emailsSent}</span>
                          <Progress value={(item.emailsSent / 5) * 100} className="h-2 w-16" />
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.anchorConfirmation ? (
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span>Confirmed</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-amber-600">
                            <XCircle className="h-4 w-4" />
                            <span>Pending</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span>{item.attachments.length}</span>
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Communication History</CardTitle>
              <CardDescription>Record of all communications related to stop supply</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {dealer.history.flatMap((item, historyIndex) =>
                Array.from({ length: item.emailsSent }).map((_, emailIndex) => (
                  <Card key={`${historyIndex}-${emailIndex}`} className="border border-muted">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">
                            Stop Supply Notification #{emailIndex + 1} - {item.invoiceNumber}
                          </CardTitle>
                          <CardDescription>
                            Sent on{" "}
                            {new Date(
                              new Date(item.triggeredDate).getTime() + emailIndex * 86400000,
                            ).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <Badge variant={emailIndex === 0 ? "default" : emailIndex < 3 ? "outline" : "destructive"}>
                          {emailIndex === 0 ? "Initial" : emailIndex < 3 ? "Reminder" : "Final Notice"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <p className="text-sm text-muted-foreground mb-2">
                        Email sent to {dealer.name} regarding overdue payment for invoice {item.invoiceNumber}.
                        {emailIndex > 0 && " This is a follow-up reminder."}
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Mail className="h-4 w-4" />
                          View Email
                        </Button>
                        {item.anchorConfirmation && emailIndex === item.emailsSent - 1 && (
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span>Anchor Confirmed</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )),
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Related Documents</CardTitle>
              <CardDescription>All documents related to stop supply events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dealer.history.map((item, historyIndex) => (
                  <div key={historyIndex} className="space-y-2">
                    <h3 className="text-sm font-medium">Invoice: {item.invoiceNumber}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {item.attachments.map((attachment, attachmentIndex) => (
                        <Card key={attachmentIndex} className="p-4 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-blue-500" />
                            <div>
                              <p className="font-medium text-sm">{attachment.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {attachment.type} • {attachment.size}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Button variant="outline">Back to List</Button>
        <Button variant="default" className="gap-2">
          <CheckCircle className="h-4 w-4" />
          Lift Stop Supply
        </Button>
      </div>
    </div>
  )
}

