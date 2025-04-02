"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function EmailTemplateEditor() {
  const [htmlContent, setHtmlContent] = useState(`
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #dc2626; padding: 20px; text-align: center; color: white; }
    .content { padding: 20px; }
    .footer { background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; }
    .warning-box { background-color: #fee2e2; border: 1px solid #dc2626; padding: 15px; margin: 20px 0; border-radius: 4px; }
    .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .details-table th, .details-table td { border: 1px solid #e5e7eb; padding: 12px; text-align: left; }
    .details-table th { background-color: #f8f9fa; }
    .amount { font-weight: bold; color: #dc2626; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>⚠️ Stop Supply Notice</h2>
    </div>
    <div class="content">
      <p>Dear {{dealerName}},</p>
      
      <div class="warning-box">
        <p><strong>Important Notice:</strong> Your account has been placed on stop supply status due to payment defaults.</p>
      </div>

      <p>This notice is to inform you that your account has been placed on stop supply effective {{effectiveDate}} due to the following outstanding payments:</p>
      
      <table class="details-table">
        <tr>
          <th>Invoice Number</th>
          <th>Due Date</th>
          <th>Overdue Amount</th>
          <th>Days Overdue</th>
        </tr>
        <tr>
          <td>{{invoiceNumber}}</td>
          <td>{{dueDate}}</td>
          <td class="amount">₹ {{overdueAmount}}</td>
          <td>{{overdueDays}} days</td>
        </tr>
      </table>

      <p><strong>Total Outstanding Amount: </strong><span class="amount">₹ {{totalOutstanding}}</span></p>

      <p>To resolve this situation and restore your supply status, please:</p>
      <ol>
        <li>Make immediate payment of the outstanding amount</li>
        <li>Submit proof of payment to {{anchorEmail}}</li>
        <li>Contact your account manager for payment verification</li>
      </ol>

      <p>Please note that your supply will remain suspended until the outstanding payments are settled.</p>
      
      <p>For any queries or assistance, please contact:</p>
      <p>
        Account Manager: {{accountManager}}<br>
        Phone: {{accountManagerPhone}}<br>
        Email: {{accountManagerEmail}}
      </p>

      <p>Best regards,<br>{{companyName}}</p>
    </div>
    <div class="footer">
      <p>© 2024 {{companyName}}. All rights reserved.</p>
      <p>This is an automated notification. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
  `)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="templateName">Template Name</Label>
          <Input id="templateName" defaultValue="Stop Supply Notice" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="templateSubject">Email Subject</Label>
          <Input id="templateSubject" defaultValue="⚠️ URGENT: Stop Supply Notice - Action Required" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Template Type</Label>
        <Select defaultValue="stop-supply">
          <SelectTrigger>
            <SelectValue placeholder="Select template type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="stop-supply">Stop Supply Notice</SelectItem>
            <SelectItem value="credit-limit">Credit Limit Warning</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Available Variables</Label>
        <div className="flex flex-wrap gap-2">
          <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">
            {"{{dealerName}}"}
          </div>
          <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">
            {"{{effectiveDate}}"}
          </div>
          <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">
            {"{{invoiceNumber}}"}
          </div>
          <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">
            {"{{dueDate}}"}
          </div>
          <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">
            {"{{overdueAmount}}"}
          </div>
          <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">
            {"{{overdueDays}}"}
          </div>
          <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">
            {"{{totalOutstanding}}"}
          </div>
          <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">
            {"{{anchorEmail}}"}
          </div>
          <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">
            {"{{accountManager}}"}
          </div>
          <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">
            {"{{accountManagerPhone}}"}
          </div>
          <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">
            {"{{accountManagerEmail}}"}
          </div>
          <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">
            {"{{companyName}}"}
          </div>
        </div>
      </div>

      <Tabs defaultValue="code" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="code" className="flex-1">
            HTML Code
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex-1">
            Preview
          </TabsTrigger>
        </TabsList>
        <TabsContent value="code" className="border rounded-md p-4 min-h-[400px]">
          <textarea
            className="w-full h-[400px] font-mono text-sm p-2 border rounded-md"
            value={htmlContent}
            onChange={(e) => setHtmlContent(e.target.value)}
          />
        </TabsContent>
        <TabsContent value="preview" className="border rounded-md p-4 min-h-[400px]">
          <div className="bg-white p-4 rounded-md h-[400px] overflow-auto">
            <iframe
              srcDoc={htmlContent}
              title="Email Template Preview"
              className="w-full h-full border-0"
              sandbox="allow-same-origin"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

