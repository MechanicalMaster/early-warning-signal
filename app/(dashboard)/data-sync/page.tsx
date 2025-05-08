"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight, Download, Check, AlertTriangle, Eye, RefreshCw } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function DataSyncPage() {
  const [selectedMaster, setSelectedMaster] = useState<string>("")
  const [fileName, setFileName] = useState<string>("")
  const [filePreviewOpen, setFilePreviewOpen] = useState(false)
  const [fileValid, setFileValid] = useState(false)
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<UploadHistoryItem | null>(null)

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name)
      // Simulate file validation
      setFileValid(true)
      setFilePreviewOpen(true)
    }
  }

  // Handle view details click
  const handleViewDetails = (item: UploadHistoryItem) => {
    setSelectedFile(item)
    setViewDetailsOpen(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Data Sync</h1>
        <p className="text-muted-foreground">Manage manual uploads and view automated sync history</p>
      </div>

      <Tabs defaultValue="manual" className="space-y-4">
        <TabsList>
          <TabsTrigger value="manual">Manual Update</TabsTrigger>
          <TabsTrigger value="automated">Automated Sync</TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manual Data Upload</CardTitle>
              <CardDescription>Upload Excel files to update data manually</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Master</label>
                  <Select value={selectedMaster} onValueChange={setSelectedMaster}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a master" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="anchor">Anchor Master</SelectItem>
                      <SelectItem value="holiday">Holiday Master</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Choose File</label>
                  <div className="flex gap-4">
                    <Input 
                      type="file" 
                      accept=".xlsx,.xls" 
                      className="flex-1" 
                      onChange={handleFileChange}
                      disabled={!selectedMaster}
                    />
                    <Button disabled={!fileValid}>Upload</Button>
                  </div>
                  {fileName && <span className="text-sm text-muted-foreground">{fileName}</span>}
                </div>
              </div>
              
              {fileName && selectedMaster === "holiday" && (
                <Collapsible open={filePreviewOpen} onOpenChange={setFilePreviewOpen} className="border rounded-md">
                  <div className="flex items-center justify-between p-4">
                    <h3 className="text-sm font-medium">Preview</h3>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        {filePreviewOpen ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent>
                    <div className="p-4 pt-0 space-y-4">
                      <div className="text-sm">
                        <span className="font-medium">Columns:</span> Holiday Date, Description
                      </div>
                      <div className="border rounded-md overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Holiday Date</TableHead>
                              <TableHead>Description</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>2025-01-01</TableCell>
                              <TableCell>New Year's Day</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>2025-01-26</TableCell>
                              <TableCell>Republic Day</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>2025-02-14</TableCell>
                              <TableCell>Valentine's Day</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                      <div className="flex items-center gap-2">
                        {fileValid ? (
                          <>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 font-medium" variant="outline">
                              <Check className="h-3 w-3 mr-1" />
                              File is valid for Holiday Master
                            </Badge>
                          </>
                        ) : (
                          <>
                            <Badge className="bg-red-100 text-red-800 hover:bg-red-100 font-medium" variant="outline">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Missing column 'Holiday Date'
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}
              
              <div className="mt-4">
                <h3 className="font-semibold mb-4">Upload History</h3>
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Master</TableHead>
                        <TableHead>File Name</TableHead>
                        <TableHead>Uploaded By</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>File Validation Status</TableHead>
                        <TableHead>DB Update Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {uploadHistory.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.master}</TableCell>
                          <TableCell>{item.fileName}</TableCell>
                          <TableCell>{item.uploadedBy}</TableCell>
                          <TableCell>{item.date}</TableCell>
                          <TableCell>
                            <Badge 
                              className={item.validationStatus === "Valid" ? 
                                "bg-green-100 text-green-800 hover:bg-green-100" : 
                                "bg-red-100 text-red-800 hover:bg-red-100"} 
                              variant="outline"
                            >
                              {item.validationStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              className={item.dbUpdateStatus === "Success" ? 
                                "bg-green-100 text-green-800 hover:bg-green-100" : 
                                "bg-red-100 text-red-800 hover:bg-red-100"} 
                              variant="outline"
                            >
                              {item.dbUpdateStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 px-2"
                                onClick={() => handleViewDetails(item)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View Details
                              </Button>
                              {item.dbUpdateStatus === "Failed" && (
                                <Button variant="outline" size="sm" className="h-8 px-2">
                                  <RefreshCw className="h-4 w-4 mr-1" />
                                  Retry
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automated" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automated Sync History</CardTitle>
              <CardDescription>View recent automated data sync events</CardDescription>
            </CardHeader>
            <CardContent className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time Slot</TableHead>
                    <TableHead>Email Subject</TableHead>
                    <TableHead>Expected Email Time</TableHead>
                    <TableHead>Email Receipt Status</TableHead>
                    <TableHead>Extraction Status</TableHead>
                    <TableHead>Data Points Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Header row for 08:00 AM Batch */}
                  <TableRow className="bg-muted/50">
                    <TableCell className="font-medium" colSpan={6}>
                      08:00 AM Batch
                    </TableCell>
                  </TableRow>
                  
                  {/* First entry */}
                  <TableRow>
                    <TableCell>08:00 AM</TableCell>
                    <TableCell>Scheduled Report Sales 2024-06-01</TableCell>
                    <TableCell>08:00 AM</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 font-medium" variant="outline">
                        Received
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 font-medium" variant="outline">
                        Success
                      </Badge>
                    </TableCell>
                    <TableCell>150</TableCell>
                  </TableRow>
                  
                  {/* Second entry */}
                  <TableRow>
                    <TableCell>08:00 AM</TableCell>
                    <TableCell>Scheduled Report Inventory 2024-06-01</TableCell>
                    <TableCell>08:00 AM</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 font-medium" variant="outline">
                        Received
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 font-medium" variant="outline">
                        Success
                      </Badge>
                    </TableCell>
                    <TableCell>120</TableCell>
                  </TableRow>
                  
                  {/* Header row for 12:00 PM Batch */}
                  <TableRow className="bg-muted/50">
                    <TableCell className="font-medium" colSpan={6}>
                      12:00 PM Batch
                    </TableCell>
                  </TableRow>
                  
                  {/* Third entry */}
                  <TableRow>
                    <TableCell>12:00 PM</TableCell>
                    <TableCell>Scheduled Report Sales 2024-05-31</TableCell>
                    <TableCell>12:00 PM</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 font-medium" variant="outline">
                        Received
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100 font-medium" variant="outline">
                        Failed
                      </Badge>
                    </TableCell>
                    <TableCell>100</TableCell>
                  </TableRow>
                  
                  {/* Fourth entry */}
                  <TableRow>
                    <TableCell>12:00 PM</TableCell>
                    <TableCell>Scheduled Report Inventory 2024-05-31</TableCell>
                    <TableCell>12:00 PM</TableCell>
                    <TableCell>
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 font-medium" variant="outline">
                        Missing
                      </Badge>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Details Modal */}
      <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>File Details</DialogTitle>
            <DialogDescription>
              Detailed information about the uploaded file
            </DialogDescription>
          </DialogHeader>
          {selectedFile && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">File Name</h3>
                  <div className="flex items-center">
                    <span>{selectedFile.fileName}</span>
                    <Button variant="ghost" size="sm" className="ml-2">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Master</h3>
                  <span>{selectedFile.master}</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Preview</h3>
                <div className="border rounded-md overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Holiday Date</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>2025-01-01</TableCell>
                        <TableCell>New Year's Day</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2025-01-26</TableCell>
                        <TableCell>Republic Day</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2025-02-14</TableCell>
                        <TableCell>Valentine's Day</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2025-03-02</TableCell>
                        <TableCell>Holi</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2025-04-18</TableCell>
                        <TableCell>Good Friday</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              {selectedFile.dbUpdateStatus === "Failed" && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Error Log</h3>
                  <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-md">
                    <p>DB Update Failed: Duplicate Holiday Date '2025-01-01'</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Types and sample data
interface UploadHistoryItem {
  master: string
  fileName: string
  uploadedBy: string
  date: string
  validationStatus: "Valid" | "Invalid"
  dbUpdateStatus: "Success" | "Failed"
}

const uploadHistory: UploadHistoryItem[] = [
  {
    master: "Anchor Master",
    fileName: "anchors_update.xlsx",
    uploadedBy: "admin@bank.com",
    date: "2024-06-01 10:30 AM",
    validationStatus: "Valid",
    dbUpdateStatus: "Success"
  },
  {
    master: "Holiday Master",
    fileName: "holidays_2025.xlsx",
    uploadedBy: "user@bank.com",
    date: "2024-05-28 14:15 PM",
    validationStatus: "Valid",
    dbUpdateStatus: "Failed"
  }
]
