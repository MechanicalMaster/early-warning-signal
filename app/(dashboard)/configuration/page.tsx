"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { AlertOctagon, Shield, Lock, Copy, Plus, ChevronDown, ChevronUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface StopSupplyRule {
  id: number
  createdDate: string
  isActive: boolean
  requireConfirmation: "yes" | "no"
  sendReminder: "yes" | "no"
  reminderDays: number
  emailsToSend: number
}

interface FLDGRule {
  id: number
  createdDate: string
  isActive: boolean
  minAmount: number
  sendPreEmail: "yes" | "no"
  sendPostEmail: "yes" | "no"
}

interface NewFLDGRule {
  minAmount: number
  sendPreEmail: "yes" | "no"
  sendPostEmail: "yes" | "no"
}

interface ReviewRule {
  id: number
  createdDate: string
  isActive: boolean
  npaPercentage: number
  dealerSanctionedLimit: number
  numberOfLiveDealers: number
  dpd30Enabled: boolean
  dpd30Threshold: number
  dpd60Enabled: boolean
  dpd60Threshold: number
  dpd90Enabled: boolean
  dpd90Threshold: number
  exitDealersEnabled: boolean
  zeroUtilisedDealersEnabled: boolean
}

interface NewReviewRule {
  npaPercentage: number
  dealerSanctionedLimit: number
  numberOfLiveDealers: number
  dpd30Enabled: boolean
  dpd30Threshold: number
  dpd60Enabled: boolean
  dpd60Threshold: number
  dpd90Enabled: boolean
  dpd90Threshold: number
  exitDealersEnabled: boolean
  zeroUtilisedDealersEnabled: boolean
}

export default function ConfigurationPage() {
  const [isAddNewRuleOpen, setIsAddNewRuleOpen] = useState(false)
  const [isAddNewFLDGRuleOpen, setIsAddNewFLDGRuleOpen] = useState(false)
  const [isAddNewReviewRuleOpen, setIsAddNewReviewRuleOpen] = useState(false)
  const [newRulePreviewOpen, setNewRulePreviewOpen] = useState(false)
  const [totalRules] = useState(2)
  
  // Stop Supply Rules State
  const [rules, setRules] = useState<StopSupplyRule[]>([
    {
      id: 1,
      createdDate: "2024-06-01 10:30 AM",
      isActive: true,
      requireConfirmation: "yes",
      sendReminder: "yes",
      reminderDays: 7,
      emailsToSend: 3
    },
    {
      id: 2,
      createdDate: "2024-06-02 09:15 AM",
      isActive: false,
      requireConfirmation: "no",
      sendReminder: "no",
      reminderDays: 0,
      emailsToSend: 0
    }
  ])

  // FLDG Rules State
  const [fldgRules, setFldgRules] = useState<FLDGRule[]>([
    {
      id: 1,
      createdDate: "2024-06-01 10:30 AM",
      isActive: true,
      minAmount: 100000,
      sendPreEmail: "yes",
      sendPostEmail: "yes"
    },
    {
      id: 2,
      createdDate: "2024-06-02 09:15 AM",
      isActive: false,
      minAmount: 500000,
      sendPreEmail: "no",
      sendPostEmail: "yes"
    }
  ])

  // Review Rules State
  const [reviewRules, setReviewRules] = useState<ReviewRule[]>([
    {
      id: 1,
      createdDate: "2024-06-01 10:30 AM",
      isActive: true,
      npaPercentage: 5,
      dealerSanctionedLimit: 1000000,
      numberOfLiveDealers: 50,
      dpd30Enabled: true,
      dpd30Threshold: 30,
      dpd60Enabled: true,
      dpd60Threshold: 60,
      dpd90Enabled: true,
      dpd90Threshold: 90,
      exitDealersEnabled: true,
      zeroUtilisedDealersEnabled: true
    },
    {
      id: 2,
      createdDate: "2024-06-02 09:15 AM",
      isActive: true,
      npaPercentage: 10,
      dealerSanctionedLimit: 5000000,
      numberOfLiveDealers: 100,
      dpd30Enabled: true,
      dpd30Threshold: 30,
      dpd60Enabled: true,
      dpd60Threshold: 60,
      dpd90Enabled: true,
      dpd90Threshold: 90,
      exitDealersEnabled: true,
      zeroUtilisedDealersEnabled: true
    },
    {
      id: 3,
      createdDate: "2024-06-03 11:45 AM",
      isActive: true,
      npaPercentage: 15,
      dealerSanctionedLimit: 10000000,
      numberOfLiveDealers: 200,
      dpd30Enabled: true,
      dpd30Threshold: 30,
      dpd60Enabled: true,
      dpd60Threshold: 60,
      dpd90Enabled: true,
      dpd90Threshold: 90,
      exitDealersEnabled: true,
      zeroUtilisedDealersEnabled: true
    }
  ])

  // New Review Rule State
  const [newReviewRule, setNewReviewRule] = useState<NewReviewRule>({
    npaPercentage: 0,
    dealerSanctionedLimit: 0,
    numberOfLiveDealers: 0,
    dpd30Enabled: true,
    dpd30Threshold: 30,
    dpd60Enabled: true,
    dpd60Threshold: 60,
    dpd90Enabled: true,
    dpd90Threshold: 90,
    exitDealersEnabled: true,
    zeroUtilisedDealersEnabled: true
  })

  // New FLDG Rule State
  const [newFldgRule, setNewFldgRule] = useState<NewFLDGRule>({
    minAmount: 0,
    sendPreEmail: "yes",
    sendPostEmail: "yes"
  })

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
          <TabsTrigger value="review">
            <Shield className="h-4 w-4 mr-2" />
            Review Rules
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stop-supply" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Stop Supply Rules Configuration</CardTitle>
                <CardDescription>Configure rules for stop supply process</CardDescription>
              </div>
              <Button 
                onClick={() => setIsAddNewRuleOpen(true)}
                className="gap-1"
              >
                <Plus className="h-4 w-4" />
                Add New Rule
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Total Rules: {totalRules}
              </div>
              
              <div className="space-y-6">
                {rules.map((rule) => (
                  <Card key={rule.id} className="border-2 border-muted">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-medium">Rule {rule.id} (Created: {rule.createdDate})</h3>
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={rule.isActive ? "default" : "outline"} className="gap-1">
                          {rule.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        <Switch 
                          checked={rule.isActive} 
                          onCheckedChange={(checked) => {
                            setRules(rules.map(r => r.id === rule.id ? {...r, isActive: checked} : r))
                          }}
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Require Anchor Confirmation Applying Stop Supply</Label>
                            <div className="flex gap-2">
                              <Switch 
                                checked={rule.requireConfirmation === "yes"} 
                                onCheckedChange={(checked) => {
                                  const newValue: "yes" | "no" = checked ? "yes" : "no";
                                  setRules(rules.map(r => r.id === rule.id ? {...r, requireConfirmation: newValue} : r))
                                }}
                              />
                              <span className="text-sm">{rule.requireConfirmation === "yes" ? 'Yes' : 'No'}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Send Reminder Email to Anchor</Label>
                            <div className="flex gap-2">
                              <Switch 
                                checked={rule.sendReminder === "yes"} 
                                onCheckedChange={(checked) => {
                                  const newValue: "yes" | "no" = checked ? "yes" : "no";
                                  setRules(rules.map(r => r.id === rule.id ? {...r, sendReminder: newValue} : r))
                                }}
                              />
                              <span className="text-sm">{rule.sendReminder === "yes" ? 'Yes' : 'No'}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Working Days After Last Email to Send Reminder Email</Label>
                            {rule.reminderDays !== 0 ? (
                              <Input 
                                type="number" 
                                value={rule.reminderDays} 
                                onChange={(e) => {
                                  setRules(rules.map(r => r.id === rule.id ? {...r, reminderDays: parseInt(e.target.value)} : r))
                                }}
                                min="1"
                                disabled={rule.sendReminder === "no"}
                              />
                            ) : (
                              <div className="h-10 px-3 py-2 border border-input rounded-md text-sm text-muted-foreground">
                                Not Set
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label>Number of Emails (Including Reminders) to be Sent for Stop Supply</Label>
                            {rule.emailsToSend !== 0 ? (
                              <Input 
                                type="number" 
                                value={rule.emailsToSend} 
                                onChange={(e) => {
                                  setRules(rules.map(r => r.id === rule.id ? {...r, emailsToSend: parseInt(e.target.value)} : r))
                                }}
                                min="1"
                              />
                            ) : (
                              <div className="h-10 px-3 py-2 border border-input rounded-md text-sm text-muted-foreground">
                                Not Set
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="fldg" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>FLDG Rules Configuration</CardTitle>
                <CardDescription>Configure FLDG rules based on amount thresholds</CardDescription>
              </div>
              <Button 
                onClick={() => setIsAddNewFLDGRuleOpen(true)}
                className="gap-1"
              >
                <Plus className="h-4 w-4" />
                Add New Rule
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Total Rules: {fldgRules.length}
              </div>
              
              <div className="space-y-6">
                {fldgRules.map((rule) => (
                  <Card key={rule.id} className="border-2 border-muted">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-medium">Rule {rule.id} (Created: {rule.createdDate})</h3>
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={rule.isActive ? "default" : "outline"} className="gap-1">
                          {rule.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        <Switch 
                          checked={rule.isActive} 
                          onCheckedChange={(checked) => {
                            setFldgRules(fldgRules.map(r => r.id === rule.id ? {...r, isActive: checked} : r))
                          }}
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="grid gap-6">
                        <div className="space-y-2">
                          <Label>Minimum FLDG Invocation Amount (Per Dealer)</Label>
                          <Input 
                            type="number" 
                            value={rule.minAmount}
                            onChange={(e) => {
                              setFldgRules(fldgRules.map(r => r.id === rule.id ? {...r, minAmount: parseInt(e.target.value)} : r))
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Send Email to Anchor before FLDG Invocation</Label>
                          <RadioGroup 
                            value={rule.sendPreEmail}
                            onValueChange={(value: "yes" | "no") => {
                              setFldgRules(fldgRules.map(r => r.id === rule.id ? {...r, sendPreEmail: value} : r))
                            }}
                            className="flex gap-6"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id={`pre-yes-${rule.id}`} />
                              <Label htmlFor={`pre-yes-${rule.id}`}>Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id={`pre-no-${rule.id}`} />
                              <Label htmlFor={`pre-no-${rule.id}`}>No</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-2">
                          <Label>Send Email after FLDG Invocation</Label>
                          <RadioGroup 
                            value={rule.sendPostEmail}
                            onValueChange={(value: "yes" | "no") => {
                              setFldgRules(fldgRules.map(r => r.id === rule.id ? {...r, sendPostEmail: value} : r))
                            }}
                            className="flex gap-6"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id={`post-yes-${rule.id}`} />
                              <Label htmlFor={`post-yes-${rule.id}`}>Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id={`post-no-${rule.id}`} />
                              <Label htmlFor={`post-no-${rule.id}`}>No</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="review" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Program Review Rules Configuration</CardTitle>
                <CardDescription>Configure thresholds for program review</CardDescription>
              </div>
              <Button 
                onClick={() => setIsAddNewReviewRuleOpen(true)}
                className="gap-1"
              >
                <Plus className="h-4 w-4" />
                Add New Rule
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Total Rules: {reviewRules.length}
              </div>
              
              <div className="space-y-6">
                {reviewRules.map((rule) => (
                  <Card key={rule.id} className="border-2 border-muted">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-medium">Rule {rule.id} (Created: {rule.createdDate})</h3>
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={rule.isActive ? "default" : "outline"} className="gap-1">
                          {rule.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        <Switch 
                          checked={rule.isActive} 
                          onCheckedChange={(checked) => {
                            setReviewRules(reviewRules.map(r => r.id === rule.id ? {...r, isActive: checked} : r))
                          }}
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>30+ DPD</Label>
                            <div className="flex gap-2">
                              <Switch 
                                checked={rule.dpd30Enabled} 
                                onCheckedChange={(checked) => {
                                  setReviewRules(reviewRules.map(r => r.id === rule.id ? {...r, dpd30Enabled: checked} : r))
                                }}
                              />
                              <span className="text-sm">{rule.dpd30Enabled ? 'Yes' : 'No'}</span>
                            </div>
                            {rule.dpd30Enabled && (
                              <div className="pt-2">
                                <Label className="text-sm">Threshold Percentage</Label>
                                <Input 
                                  type="number" 
                                  value={rule.dpd30Threshold}
                                  onChange={(e) => {
                                    setReviewRules(reviewRules.map(r => r.id === rule.id ? {...r, dpd30Threshold: parseInt(e.target.value)} : r))
                                  }}
                                />
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label>60+ DPD</Label>
                            <div className="flex gap-2">
                              <Switch 
                                checked={rule.dpd60Enabled} 
                                onCheckedChange={(checked) => {
                                  setReviewRules(reviewRules.map(r => r.id === rule.id ? {...r, dpd60Enabled: checked} : r))
                                }}
                              />
                              <span className="text-sm">{rule.dpd60Enabled ? 'Yes' : 'No'}</span>
                            </div>
                            {rule.dpd60Enabled && (
                              <div className="pt-2">
                                <Label className="text-sm">Threshold Percentage</Label>
                                <Input 
                                  type="number" 
                                  value={rule.dpd60Threshold}
                                  onChange={(e) => {
                                    setReviewRules(reviewRules.map(r => r.id === rule.id ? {...r, dpd60Threshold: parseInt(e.target.value)} : r))
                                  }}
                                />
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label>90+ DPD</Label>
                            <div className="flex gap-2">
                              <Switch 
                                checked={rule.dpd90Enabled} 
                                onCheckedChange={(checked) => {
                                  setReviewRules(reviewRules.map(r => r.id === rule.id ? {...r, dpd90Enabled: checked} : r))
                                }}
                              />
                              <span className="text-sm">{rule.dpd90Enabled ? 'Yes' : 'No'}</span>
                            </div>
                            {rule.dpd90Enabled && (
                              <div className="pt-2">
                                <Label className="text-sm">Threshold Percentage</Label>
                                <Input 
                                  type="number" 
                                  value={rule.dpd90Threshold}
                                  onChange={(e) => {
                                    setReviewRules(reviewRules.map(r => r.id === rule.id ? {...r, dpd90Threshold: parseInt(e.target.value)} : r))
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Exit Dealers</Label>
                            <div className="flex gap-2">
                              <Switch 
                                checked={rule.exitDealersEnabled} 
                                onCheckedChange={(checked) => {
                                  setReviewRules(reviewRules.map(r => r.id === rule.id ? {...r, exitDealersEnabled: checked} : r))
                                }}
                              />
                              <span className="text-sm">{rule.exitDealersEnabled ? 'Yes' : 'No'}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Zero Utilised Dealers</Label>
                            <div className="flex gap-2">
                              <Switch 
                                checked={rule.zeroUtilisedDealersEnabled} 
                                onCheckedChange={(checked) => {
                                  setReviewRules(reviewRules.map(r => r.id === rule.id ? {...r, zeroUtilisedDealersEnabled: checked} : r))
                                }}
                              />
                              <span className="text-sm">{rule.zeroUtilisedDealersEnabled ? 'Yes' : 'No'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add New Rule Dialog */}
      <Dialog open={isAddNewRuleOpen} onOpenChange={setIsAddNewRuleOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Stop Supply Rule</DialogTitle>
            <DialogDescription>
              Configure parameters for the new rule
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Require Anchor Confirmation Applying Stop Supply</Label>
                <div className="flex gap-2">
                  <Switch 
                    checked={rules[0].requireConfirmation === "yes"} 
                    onCheckedChange={(checked) => {
                      const newValue: "yes" | "no" = checked ? "yes" : "no";
                      setRules(rules.map(r => r.id === 1 ? {...r, requireConfirmation: newValue} : r))
                    }}
                  />
                  <span className="text-sm">{rules[0].requireConfirmation === "yes" ? 'Yes' : 'No'}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Send Reminder Email to Anchor</Label>
                <div className="flex gap-2">
                  <Switch 
                    checked={rules[0].sendReminder === "yes"} 
                    onCheckedChange={(checked) => {
                      const newValue: "yes" | "no" = checked ? "yes" : "no";
                      setRules(rules.map(r => r.id === 1 ? {...r, sendReminder: newValue} : r))
                    }}
                  />
                  <span className="text-sm">{rules[0].sendReminder === "yes" ? 'Yes' : 'No'}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Working Days After Last Email to Send Reminder Email</Label>
                <Input 
                  type="number" 
                  value={rules[0].reminderDays} 
                  onChange={(e) => {
                    setRules(rules.map(r => r.id === 1 ? {...r, reminderDays: parseInt(e.target.value)} : r))
                  }}
                  min="1"
                  disabled={rules[0].sendReminder === "no"}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Number of Emails (Including Reminders) to be Sent for Stop Supply</Label>
                <Input 
                  type="number" 
                  value={rules[0].emailsToSend} 
                  onChange={(e) => {
                    setRules(rules.map(r => r.id === 1 ? {...r, emailsToSend: parseInt(e.target.value)} : r))
                  }}
                  min="1"
                />
              </div>
              
              <div className="pt-2">
                <Collapsible 
                  open={newRulePreviewOpen} 
                  onOpenChange={setNewRulePreviewOpen}
                  className="border rounded-md"
                >
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full flex justify-between">
                      Preview Impact
                      {newRulePreviewOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Hypothetical Example</h4>
                      <div className="bg-muted/40 p-3 rounded-md text-sm">
                        <p><strong>Scenario:</strong> Dealer with 30 days overdue payment</p>
                        <div className="mt-2">
                          <p><strong>With this rule:</strong></p>
                          <ul className="list-disc pl-5 space-y-1 mt-1">
                            <li>{rules[0].requireConfirmation === "yes" ? 'Anchor confirmation will be required' : 'No anchor confirmation required'}</li>
                            <li>{rules[0].sendReminder === "yes" ? `Reminder email will be sent ${rules[0].reminderDays} days after initial email` : 'No reminder emails will be sent'}</li>
                            <li>Total of {rules[0].emailsToSend} email(s) will be sent</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddNewRuleOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              const newRuleData = {
                id: rules.length + 1,
                createdDate: new Date().toLocaleString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                }),
                isActive: true,
                requireConfirmation: rules[0].requireConfirmation,
                sendReminder: rules[0].sendReminder,
                reminderDays: rules[0].sendReminder ? rules[0].reminderDays : 0,
                emailsToSend: rules[0].emailsToSend
              }
              setRules([...rules, newRuleData])
              setIsAddNewRuleOpen(false)
            }}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add New FLDG Rule Dialog */}
      <Dialog open={isAddNewFLDGRuleOpen} onOpenChange={setIsAddNewFLDGRuleOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New FLDG Rule</DialogTitle>
            <DialogDescription>
              Configure parameters for the new FLDG rule (Priority: {fldgRules.length + 1})
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Minimum FLDG Invocation Amount (Per Dealer)</Label>
                <Input 
                  type="number" 
                  value={newFldgRule.minAmount}
                  onChange={(e) => setNewFldgRule({...newFldgRule, minAmount: parseInt(e.target.value)})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Send Email to Anchor before FLDG Invocation</Label>
                <RadioGroup 
                  value={newFldgRule.sendPreEmail}
                  onValueChange={(value: "yes" | "no") => setNewFldgRule({...newFldgRule, sendPreEmail: value})}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="new-pre-yes" />
                    <Label htmlFor="new-pre-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="new-pre-no" />
                    <Label htmlFor="new-pre-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label>Send Email after FLDG Invocation</Label>
                <RadioGroup 
                  value={newFldgRule.sendPostEmail}
                  onValueChange={(value: "yes" | "no") => setNewFldgRule({...newFldgRule, sendPostEmail: value})}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="new-post-yes" />
                    <Label htmlFor="new-post-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="new-post-no" />
                    <Label htmlFor="new-post-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddNewFLDGRuleOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              const newRuleData: FLDGRule = {
                id: fldgRules.length + 1,
                createdDate: new Date().toLocaleString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                }),
                isActive: true,
                minAmount: newFldgRule.minAmount,
                sendPreEmail: newFldgRule.sendPreEmail,
                sendPostEmail: newFldgRule.sendPostEmail
              }
              setFldgRules([...fldgRules, newRuleData])
              setIsAddNewFLDGRuleOpen(false)
            }}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add New Review Rule Dialog */}
      <Dialog open={isAddNewReviewRuleOpen} onOpenChange={setIsAddNewReviewRuleOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Review Rule</DialogTitle>
            <DialogDescription>
              Configure parameters for the new review rule
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>30+ DPD</Label>
                    <div className="flex gap-2">
                      <Switch 
                        checked={newReviewRule.dpd30Enabled} 
                        onCheckedChange={(checked) => setNewReviewRule({...newReviewRule, dpd30Enabled: checked})}
                      />
                      <span className="text-sm">{newReviewRule.dpd30Enabled ? 'Yes' : 'No'}</span>
                    </div>
                    {newReviewRule.dpd30Enabled && (
                      <div className="pt-2">
                        <Label className="text-sm">Threshold Percentage</Label>
                        <Input 
                          type="number" 
                          value={newReviewRule.dpd30Threshold}
                          onChange={(e) => setNewReviewRule({...newReviewRule, dpd30Threshold: parseInt(e.target.value)})}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>60+ DPD</Label>
                    <div className="flex gap-2">
                      <Switch 
                        checked={newReviewRule.dpd60Enabled} 
                        onCheckedChange={(checked) => setNewReviewRule({...newReviewRule, dpd60Enabled: checked})}
                      />
                      <span className="text-sm">{newReviewRule.dpd60Enabled ? 'Yes' : 'No'}</span>
                    </div>
                    {newReviewRule.dpd60Enabled && (
                      <div className="pt-2">
                        <Label className="text-sm">Threshold Percentage</Label>
                        <Input 
                          type="number" 
                          value={newReviewRule.dpd60Threshold}
                          onChange={(e) => setNewReviewRule({...newReviewRule, dpd60Threshold: parseInt(e.target.value)})}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>90+ DPD</Label>
                    <div className="flex gap-2">
                      <Switch 
                        checked={newReviewRule.dpd90Enabled} 
                        onCheckedChange={(checked) => setNewReviewRule({...newReviewRule, dpd90Enabled: checked})}
                      />
                      <span className="text-sm">{newReviewRule.dpd90Enabled ? 'Yes' : 'No'}</span>
                    </div>
                    {newReviewRule.dpd90Enabled && (
                      <div className="pt-2">
                        <Label className="text-sm">Threshold Percentage</Label>
                        <Input 
                          type="number" 
                          value={newReviewRule.dpd90Threshold}
                          onChange={(e) => setNewReviewRule({...newReviewRule, dpd90Threshold: parseInt(e.target.value)})}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Exit Dealers</Label>
                    <div className="flex gap-2">
                      <Switch 
                        checked={newReviewRule.exitDealersEnabled} 
                        onCheckedChange={(checked) => setNewReviewRule({...newReviewRule, exitDealersEnabled: checked})}
                      />
                      <span className="text-sm">{newReviewRule.exitDealersEnabled ? 'Yes' : 'No'}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Zero Utilised Dealers</Label>
                    <div className="flex gap-2">
                      <Switch 
                        checked={newReviewRule.zeroUtilisedDealersEnabled} 
                        onCheckedChange={(checked) => setNewReviewRule({...newReviewRule, zeroUtilisedDealersEnabled: checked})}
                      />
                      <span className="text-sm">{newReviewRule.zeroUtilisedDealersEnabled ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddNewReviewRuleOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              const newRuleData: ReviewRule = {
                id: reviewRules.length + 1,
                createdDate: new Date().toLocaleString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                }),
                isActive: true,
                npaPercentage: newReviewRule.npaPercentage,
                dealerSanctionedLimit: newReviewRule.dealerSanctionedLimit,
                numberOfLiveDealers: newReviewRule.numberOfLiveDealers,
                dpd30Enabled: newReviewRule.dpd30Enabled,
                dpd30Threshold: newReviewRule.dpd30Threshold,
                dpd60Enabled: newReviewRule.dpd60Enabled,
                dpd60Threshold: newReviewRule.dpd60Threshold,
                dpd90Enabled: newReviewRule.dpd90Enabled,
                dpd90Threshold: newReviewRule.dpd90Threshold,
                exitDealersEnabled: newReviewRule.exitDealersEnabled,
                zeroUtilisedDealersEnabled: newReviewRule.zeroUtilisedDealersEnabled
              }
              setReviewRules([...reviewRules, newRuleData])
              setIsAddNewReviewRuleOpen(false)
            }}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
