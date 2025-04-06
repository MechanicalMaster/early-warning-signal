import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"

export default function DataSyncPage() {
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
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input type="file" accept=".xlsx,.xls" />
                <Button>Upload</Button>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Upload History</h3>
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>File Name</TableHead>
                        <TableHead>Uploaded By</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>dealers_update.xlsx</TableCell>
                        <TableCell>admin@bank.com</TableCell>
                        <TableCell>2024-06-01 10:30</TableCell>
                        <TableCell>Success</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>anchors_update.xlsx</TableCell>
                        <TableCell>user@bank.com</TableCell>
                        <TableCell>2024-05-28 14:15</TableCell>
                        <TableCell>Failed</TableCell>
                      </TableRow>
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
                    <TableHead>Sync ID</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Data Points Updated</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>SYNC-20240601-001</TableCell>
                    <TableCell>2024-06-01 02:00</TableCell>
                    <TableCell>150</TableCell>
                    <TableCell>Success</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>SYNC-20240531-002</TableCell>
                    <TableCell>2024-05-31 02:00</TableCell>
                    <TableCell>120</TableCell>
                    <TableCell>Success</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>SYNC-20240530-003</TableCell>
                    <TableCell>2024-05-30 02:00</TableCell>
                    <TableCell>100</TableCell>
                    <TableCell>Failed</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
