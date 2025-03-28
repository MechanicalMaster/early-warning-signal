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
    .header { background-color: #f8f9fa; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .footer { background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; }
    .button { background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Welcome to Sambo!</h2>
    </div>
    <div class="content">
      <p>Hello {{name}},</p>
      <p>Thank you for registering with Sambo. We're excited to have you on board!</p>
      <p>Your account has been created successfully. You can now log in using your email and password.</p>
      <p style="text-align: center; margin: 30px 0;">
        <a href="{{loginUrl}}" class="button">Log In to Your Account</a>
      </p>
      <p>If you have any questions, please don't hesitate to contact our support team.</p>
      <p>Best regards,<br>The Sambo Team</p>
    </div>
    <div class="footer">
      <p>© 2023 Sambo. All rights reserved.</p>
      <p>You're receiving this email because you signed up for Sambo.</p>
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
          <Input id="templateName" defaultValue="Welcome Email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="templateSubject">Email Subject</Label>
          <Input id="templateSubject" defaultValue="Welcome to Sambo!" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Template Type</Label>
        <Select defaultValue="welcome">
          <SelectTrigger>
            <SelectValue placeholder="Select template type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="welcome">Welcome Email</SelectItem>
            <SelectItem value="password-reset">Password Reset</SelectItem>
            <SelectItem value="verification">Account Verification</SelectItem>
            <SelectItem value="payment">Payment Confirmation</SelectItem>
            <SelectItem value="stop-supply">Stop Supply Notice</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Available Variables</Label>
        <div className="flex flex-wrap gap-2">
          <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">
            {"{{name}}"}
          </div>
          <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">
            {"{{email}}"}
          </div>
          <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">
            {"{{loginUrl}}"}
          </div>
          <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">
            {"{{resetUrl}}"}
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

