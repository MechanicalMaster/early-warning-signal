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
import { Edit } from "lucide-react"

export type Dealer = {
  id: string
  name: string
  anchor: string
  contactPerson: string
  contactEmail?: string
  creditLimit: number
  status: string
}

export function EditDealerDialog({ dealer }: { dealer: Dealer }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<Dealer>({ 
    ...dealer,
    contactEmail: dealer.contactEmail || ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCreditLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    if (!isNaN(value)) {
      setFormData((prev) => ({ ...prev, creditLimit: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the form data to your API
    console.log("Updated dealer data:", formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit {dealer.name}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Dealer: {dealer.name}</DialogTitle>
          <DialogDescription>
            Make changes to the dealer details. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="id">Dealer ID</Label>
              <Input id="id" value={formData.id} disabled className="bg-muted" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Dealer Name</Label>
              <Input id="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="anchor">Anchor</Label>
              <Input id="anchor" value={formData.anchor} disabled className="bg-muted" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">Anchor Contact Email</Label>
              <Input 
                id="contactEmail" 
                type="email"
                value={formData.contactEmail} 
                onChange={handleChange} 
                placeholder="contact@example.com"
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="creditLimit">Credit Limit (ZAR)</Label>
              <Input 
                id="creditLimit" 
                type="number" 
                value={formData.creditLimit} 
                onChange={handleCreditLimitChange}
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
                  <SelectItem value="Stop Supply">Stop Supply</SelectItem>
                </SelectContent>
              </Select>
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