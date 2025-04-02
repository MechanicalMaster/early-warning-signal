"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Plus, X } from "lucide-react"

export type Anchor = {
  id: string
  name: string
  industry: string
  contactPerson: string
  email: string
  status: string
  phone?: string
  address?: string
  psmEmail?: string
  anchorEmails?: string[]
  stopSupplyRule?: string
  fldgInvocationRule?: string
}

export function EditAnchorDialog({ anchor }: { anchor: Anchor }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<Anchor>({ 
    ...anchor,
    psmEmail: anchor.psmEmail || "",
    anchorEmails: anchor.anchorEmails || [anchor.email || ""],
    stopSupplyRule: anchor.stopSupplyRule || "rule1",
    fldgInvocationRule: anchor.fldgInvocationRule || "standard"
  })
  const [newEmail, setNewEmail] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddEmail = () => {
    if (newEmail && !formData.anchorEmails?.includes(newEmail)) {
      setFormData((prev) => ({
        ...prev,
        anchorEmails: [...(prev.anchorEmails || []), newEmail]
      }))
      setNewEmail("")
    }
  }

  const handleRemoveEmail = (email: string) => {
    setFormData((prev) => ({
      ...prev,
      anchorEmails: prev.anchorEmails?.filter(e => e !== email) || []
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the form data to your API
    console.log("Updated anchor data:", formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit {anchor.name}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Anchor: {anchor.name}</DialogTitle>
          <DialogDescription>
            Make changes to the anchor details. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="id">Anchor ID</Label>
              <Input id="id" value={formData.id} disabled className="bg-muted" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Anchor Name</Label>
              <Input id="name" value={formData.name} disabled className="bg-muted" />
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
              <Label htmlFor="contactPerson">PSM Name</Label>
              <Input 
                id="contactPerson" 
                value={formData.contactPerson} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="psmEmail">PSM Email</Label>
              <Input 
                id="psmEmail" 
                type="email" 
                value={formData.psmEmail || ""} 
                onChange={handleChange} 
                placeholder="psm@example.com"
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

            <div className="space-y-3">
              <Label>Anchor Email Addresses</Label>
              <div className="space-y-2">
                {formData.anchorEmails?.map((email, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input 
                      value={email}
                      onChange={(e) => {
                        const newEmails = [...(formData.anchorEmails || [])];
                        newEmails[index] = e.target.value;
                        setFormData(prev => ({ ...prev, anchorEmails: newEmails }));
                      }}
                      type="email"
                      placeholder="anchor@example.com"
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleRemoveEmail(email)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Input
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  type="email"
                  placeholder="Add new email address"
                />
                <Button 
                  type="button"
                  onClick={handleAddEmail}
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 