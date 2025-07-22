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
  anchorCustId: string
  dealerCustId: string
  programName: string
  programCustId: string
  sanctionedLimit: number
  utilisedLimit: number
  utilisationPercentage: number
  status: string
  smartfinStatus: "Active" | "Inactive"
  lastUpdated: string
}

export function EditDealerDialog({ dealer }: { dealer: Dealer }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<Dealer & { 
    statusReason?: string
    comments?: string 
  }>({ 
    ...dealer,
    statusReason: "",
    comments: ""
  })
  const [previousStatus, setPreviousStatus] = useState(dealer.status)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    if (field === "status") {
      setFormData((prev) => ({ 
        ...prev, 
        [field]: value,
        statusReason: "",
        comments: ""
      }))
      setPreviousStatus(value)
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if ((formData.status === "Inactive" && previousStatus === "Active") || 
        (formData.status === "Active" && previousStatus === "Inactive")) {
      if (!formData.statusReason) {
        alert("Please select a reason for changing the dealer status")
        return
      }
      if (!formData.comments) {
        alert("Please provide comments for changing the dealer status")
        return
      }
    }
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
              <Input id="name" value={formData.name} disabled className="bg-muted" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="anchor">Anchor</Label>
              <Input id="anchor" value={formData.anchor} disabled className="bg-muted" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sanctionedLimit">Sanctioned Limit (₹)</Label>
              <Input 
                id="sanctionedLimit" 
                type="number" 
                value={formData.sanctionedLimit} 
                disabled
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="utilisedLimit">Utilised Limit (₹)</Label>
              <Input 
                id="utilisedLimit" 
                type="number" 
                value={formData.utilisedLimit} 
                disabled
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="utilisationPercentage">Utilisation Percentage</Label>
              <Input 
                id="utilisationPercentage" 
                type="number" 
                value={formData.utilisationPercentage} 
                disabled
                className="bg-muted"
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

            {((formData.status === "Inactive" && previousStatus === "Active") || 
              (formData.status === "Active" && previousStatus === "Inactive")) && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="statusReason">Reason for {formData.status === "Active" ? "Activation" : "Inactivation"}</Label>
                  <Select
                    value={formData.statusReason}
                    onValueChange={(value) => handleSelectChange("statusReason", value)}
                  >
                    <SelectTrigger id="statusReason">
                      <SelectValue placeholder={`Select reason for ${formData.status === "Active" ? "activation" : "inactivation"}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.status === "Active" ? (
                        <>
                          <SelectItem value="issue-resolved">Issue Resolved</SelectItem>
                          <SelectItem value="payment-received">Payment Received</SelectItem>
                          <SelectItem value="documentation-complete">Documentation Complete</SelectItem>
                          <SelectItem value="management-approval">Management Approval</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="rm-feedback">RM Feedback</SelectItem>
                          <SelectItem value="overdue-in-other-program">Overdue in Other Program</SelectItem>
                          <SelectItem value="others">Others</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comments">Comments</Label>
                  <textarea
                    id="comments"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Please provide additional comments"
                    value={formData.comments}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}
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