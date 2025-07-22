"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState, use } from "react"

export default function EditAnchorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  
  // In a real app, you would fetch the anchor data based on the ID
  const [formData, setFormData] = useState({
    id: id,
    name: "Sample Anchor",
    industry: "Banking",
    status: "Active",
    psmName: "John Smith",
    programName: "Sample Program",
    programCustId: "PRG-SA-001",
    anchorCustId: "ANC12345",
    region: "Mumbai",
    phone: "+1234567890",
    address: "123 Main St",
    anchorEmails: ["contact@example.com"],
    stopSupplyRule: "rule1",
    fldgInvocationRule: "standard",
    buRmEmail: "",
    reviewRules: "rule1",
    stopSupplyEmail: "john.smith@example.com",
    fldgInvocationEmail: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the form data to your API
    console.log("Updated anchor data:", formData)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Link href="/anchor-master">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Edit Anchor</h1>
          <p className="text-muted-foreground">Update anchor details and configurations</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Anchor Details</CardTitle>
          <CardDescription>Update the anchor's information and settings</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Anchor Name</Label>
                <Input id="name" value={formData.name} disabled className="bg-muted" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="anchorCustId">Anchor Cust ID</Label>
                <Input 
                  id="anchorCustId" 
                  value={formData.anchorCustId}
                  onChange={handleChange}
                  placeholder="ANC12345"
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Input 
                  id="region" 
                  value={formData.region}
                  onChange={handleChange}
                  placeholder="Mumbai"
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="psmName">PSM Name</Label>
                <Input 
                  id="psmName" 
                  value={formData.psmName}
                  onChange={handleChange}
                  placeholder="John Smith"
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="buRmEmail">BU RM Email</Label>
                <Input 
                  id="buRmEmail" 
                  type="email" 
                  value={formData.buRmEmail}
                  onChange={handleChange}
                  placeholder="bu.rm@example.com"
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reviewRules">Review Rules</Label>
                <Select 
                  value={formData.reviewRules}
                  onValueChange={(value) => handleSelectChange("reviewRules", value)}
                >
                  <SelectTrigger id="reviewRules">
                    <SelectValue placeholder="Select review rule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rule1">Rule 1</SelectItem>
                    <SelectItem value="rule2">Rule 2</SelectItem>
                    <SelectItem value="rule3">Rule 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stopSupplyEmail">Stop Supply Email</Label>
                <Input 
                  id="stopSupplyEmail" 
                  type="email" 
                  value={formData.stopSupplyEmail}
                  onChange={handleChange}
                  placeholder="stop.supply@example.com"
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fldgInvocationEmail">FLDG Invocation Email</Label>
                <Input 
                  id="fldgInvocationEmail" 
                  type="email" 
                  value={formData.fldgInvocationEmail}
                  onChange={handleChange}
                  placeholder="fldg.invocation@example.com"
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stopSupplyRule">Stop Supply Rules</Label>
                <Select 
                  value={formData.stopSupplyRule}
                  onValueChange={(value) => handleSelectChange("stopSupplyRule", value)}
                >
                  <SelectTrigger id="stopSupplyRule">
                    <SelectValue placeholder="Select stop supply rule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rule1">Rule 1 (7 days reminder, 3 days stop)</SelectItem>
                    <SelectItem value="rule2">Rule 2 (5 days reminder, 2 days stop)</SelectItem>
                    <SelectItem value="custom">Custom Rule</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fldgInvocationRule">FLDG Invocation Rules</Label>
                <Select 
                  value={formData.fldgInvocationRule}
                  onValueChange={(value) => handleSelectChange("fldgInvocationRule", value)}
                >
                  <SelectTrigger id="fldgInvocationRule">
                    <SelectValue placeholder="Select FLDG invocation rule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard (30 days)</SelectItem>
                    <SelectItem value="expedited">Expedited (15 days)</SelectItem>
                    <SelectItem value="extended">Extended (45 days)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
} 