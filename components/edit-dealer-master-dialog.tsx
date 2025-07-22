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
import { Badge } from "@/components/ui/badge"
import { Edit, X, Check, ChevronsUpDown } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export type DealerMaster = {
  id: string
  dealerCustId: string
  name: string
  anchor: string
  programName: string
  programCustId: string
  contactPerson: string
  contactEmail: string
  creditLimit: number
  status: string
  fldgInvocationEmails?: string[]
  stopSupplyInvocationEmails?: string[]
}

interface EditDealerMasterDialogProps {
  dealer: DealerMaster
  anchorEmails: string[]
}

export function EditDealerMasterDialog({ dealer, anchorEmails }: EditDealerMasterDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<DealerMaster>({ 
    ...dealer,
    fldgInvocationEmails: dealer.fldgInvocationEmails || [],
    stopSupplyInvocationEmails: dealer.stopSupplyInvocationEmails || []
  })
  
  const [fldgPopoverOpen, setFldgPopoverOpen] = useState(false)
  const [stopSupplyPopoverOpen, setStopSupplyPopoverOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the form data to your API
    console.log("Updated dealer master data:", formData)
    setOpen(false)
  }

  // Function to toggle an email in a multi-select list
  const toggleEmail = (email: string, field: 'fldgInvocationEmails' | 'stopSupplyInvocationEmails') => {
    setFormData(prev => {
      const currentEmails = prev[field] || []
      const newEmails = currentEmails.includes(email)
        ? currentEmails.filter(e => e !== email)
        : [...currentEmails, email]
      
      return {
        ...prev,
        [field]: newEmails
      }
    })
  }

  // Function to remove an email from a multi-select list
  const removeEmail = (email: string, field: 'fldgInvocationEmails' | 'stopSupplyInvocationEmails') => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] || []).filter(e => e !== email)
    }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit {dealer.name}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Dealer: {dealer.name}</DialogTitle>
          <DialogDescription>
            Configure email settings for FLDG and Stop Supply invocations.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dealerCustId">Dealer Cust ID</Label>
                <Input id="dealerCustId" value={formData.dealerCustId} disabled className="bg-muted" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Dealer Name</Label>
                <Input id="name" value={formData.name} disabled className="bg-muted" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="anchor">Anchor</Label>
                <Input id="anchor" value={formData.anchor} disabled className="bg-muted" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Dealer Status</Label>
                <Input id="status" value={formData.status} disabled className="bg-muted" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fldgInvocation">FLDG Invocation Email</Label>
              <Popover open={fldgPopoverOpen} onOpenChange={setFldgPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={fldgPopoverOpen}
                    className="w-full justify-between h-auto min-h-10 py-2"
                  >
                    <div className="flex flex-wrap gap-1">
                      {formData.fldgInvocationEmails && formData.fldgInvocationEmails.length > 0 ? (
                        formData.fldgInvocationEmails.map(email => (
                          <Badge 
                            variant="secondary" 
                            key={email}
                            className="mr-1 mb-1"
                          >
                            {email}
                            <span
                              className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                              onMouseDown={e => {
                                e.preventDefault()
                                e.stopPropagation()
                              }}
                              onClick={() => removeEmail(email, 'fldgInvocationEmails')}
                            >
                              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                            </span>
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground">Select emails...</span>
                      )}
                    </div>
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search emails..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No emails found.</CommandEmpty>
                      <CommandGroup>
                        {anchorEmails.map(email => (
                          <CommandItem
                            key={email}
                            value={email}
                            onSelect={() => toggleEmail(email, 'fldgInvocationEmails')}
                          >
                            {email}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                formData.fldgInvocationEmails?.includes(email) ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stopSupplyInvocation">Stop Supply Invocation Email</Label>
              <Popover open={stopSupplyPopoverOpen} onOpenChange={setStopSupplyPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={stopSupplyPopoverOpen}
                    className="w-full justify-between h-auto min-h-10 py-2"
                  >
                    <div className="flex flex-wrap gap-1">
                      {formData.stopSupplyInvocationEmails && formData.stopSupplyInvocationEmails.length > 0 ? (
                        formData.stopSupplyInvocationEmails.map(email => (
                          <Badge 
                            variant="secondary" 
                            key={email}
                            className="mr-1 mb-1"
                          >
                            {email}
                            <span
                              className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                              onMouseDown={e => {
                                e.preventDefault()
                                e.stopPropagation()
                              }}
                              onClick={() => removeEmail(email, 'stopSupplyInvocationEmails')}
                            >
                              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                            </span>
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground">Select emails...</span>
                      )}
                    </div>
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search emails..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No emails found.</CommandEmpty>
                      <CommandGroup>
                        {anchorEmails.map(email => (
                          <CommandItem
                            key={email}
                            value={email}
                            onSelect={() => toggleEmail(email, 'stopSupplyInvocationEmails')}
                          >
                            {email}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                formData.stopSupplyInvocationEmails?.includes(email) ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
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