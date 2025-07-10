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

export default function ConfigurationPage() {
  const [isAddNewRuleOpen, setIsAddNewRuleOpen] = useState(false)
  const [isAddNewFLDGRuleOpen, setIsAddNewFLDGRuleOpen] = useState(false)
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
    </div>
  )
}
