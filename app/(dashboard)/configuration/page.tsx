import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { AlertOctagon, Shield } from "lucide-react"

export default function ConfigurationPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Configuration</h1>
        <p className="text-muted-foreground">Manage system settings and configurations</p>
      </div>

      <Tabs defaultValue="stop-supply" className="space-y-4">
        <TabsList>
          <TabsTrigger value="stop-supply">
            <AlertOctagon className="h-4 w-4 mr-2" />
            Stop Supply Rules
          </TabsTrigger>
          <TabsTrigger value="fldg">
            <Shield className="h-4 w-4 mr-2" />
            FLDG Rules
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stop-supply" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stop Supply Rules Configuration</CardTitle>
              <CardDescription>Configure rules for stop supply process</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Rule 1</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Confirmation Required</Label>
                        <p className="text-sm text-muted-foreground">Require anchor confirmation before stop supply</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Reminder Required</Label>
                        <p className="text-sm text-muted-foreground">Send reminders before stop supply</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label>Reminder Days</Label>
                      <Input type="number" defaultValue="7" />
                    </div>
                    <div className="space-y-2">
                      <Label>Stop Email Days</Label>
                      <Input type="number" defaultValue="3" />
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Rule 2</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Confirmation Required</Label>
                        <p className="text-sm text-muted-foreground">Require anchor confirmation before stop supply</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Reminder Required</Label>
                        <p className="text-sm text-muted-foreground">Send reminders before stop supply</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label>Reminder Days</Label>
                      <Input type="number" defaultValue="5" />
                    </div>
                    <div className="space-y-2">
                      <Label>Stop Email Days</Label>
                      <Input type="number" defaultValue="2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="fldg" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>FLDG Rules Configuration</CardTitle>
              <CardDescription>Configure FLDG rules based on amount thresholds and days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Rule 1</h3>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label>Amount Range</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Minimum (₹)</Label>
                          <Input type="number" defaultValue="0" />
                        </div>
                        <div className="space-y-2">
                          <Label>Maximum (₹)</Label>
                          <Input type="number" defaultValue="100000" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>FLDG Days</Label>
                      <Input type="number" defaultValue="30" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto Invocation</Label>
                        <p className="text-sm text-muted-foreground">Automatically invoke FLDG after days elapse</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label>FLDG Percentage</Label>
                      <div className="flex items-center gap-2">
                        <Input type="number" defaultValue="10" />
                        <span className="text-sm text-muted-foreground">%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Rule 2</h3>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label>Amount Range</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Minimum (₹)</Label>
                          <Input type="number" defaultValue="100001" />
                        </div>
                        <div className="space-y-2">
                          <Label>Maximum (₹)</Label>
                          <Input type="number" defaultValue="500000" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>FLDG Days</Label>
                      <Input type="number" defaultValue="45" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto Invocation</Label>
                        <p className="text-sm text-muted-foreground">Automatically invoke FLDG after days elapse</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label>FLDG Percentage</Label>
                      <div className="flex items-center gap-2">
                        <Input type="number" defaultValue="15" />
                        <span className="text-sm text-muted-foreground">%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Rule 3</h3>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label>Amount Range</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Minimum (₹)</Label>
                          <Input type="number" defaultValue="500001" />
                        </div>
                        <div className="space-y-2">
                          <Label>Maximum (₹)</Label>
                          <Input type="number" defaultValue="1000000" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>FLDG Days</Label>
                      <Input type="number" defaultValue="60" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto Invocation</Label>
                        <p className="text-sm text-muted-foreground">Automatically invoke FLDG after days elapse</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label>FLDG Percentage</Label>
                      <div className="flex items-center gap-2">
                        <Input type="number" defaultValue="20" />
                        <span className="text-sm text-muted-foreground">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

