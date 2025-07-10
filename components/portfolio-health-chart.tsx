"use client"

import { useEffect, useState } from "react"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts"

export function PortfolioHealthChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-[350px] w-full bg-muted/20 rounded-md">
        <p className="text-muted-foreground">Loading chart...</p>
      </div>
    )
  }

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={portfolioData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value: number) => `₹${(value/10000000).toFixed(1)}Cr`} />
          <Tooltip 
            formatter={(value: number, name: string) => {
              if (name === "utilisation") {
                return [`₹${(value/10000000).toFixed(2)}Cr`, "Utilisation"]
              } else if (name === "overdueRate") {
                return [`${value}%`, "Overdue Rate"]
              } else if (name === "riskExposure") {
                return [`₹${(value/10000000).toFixed(2)}Cr`, "Risk Exposure"]
              }
              return [value, name]
            }}
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="utilisation" name="Utilisation" stroke="#22c55e" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="sanctionedLimit" name="Total Sanctioned Limit" stroke="#2563eb" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

const portfolioData = [
  { month: 'Jan', utilisation: 40000000, sanctionedLimit: 60000000 },
  { month: 'Feb', utilisation: 42000000, sanctionedLimit: 62000000 },
  { month: 'Mar', utilisation: 45000000, sanctionedLimit: 65000000 },
  { month: 'Apr', utilisation: 47000000, sanctionedLimit: 67000000 },
  { month: 'May', utilisation: 49000000, sanctionedLimit: 70000000 },
  { month: 'Jun', utilisation: 51000000, sanctionedLimit: 72000000 },
  { month: 'Jul', utilisation: 53000000, sanctionedLimit: 75000000 },
  { month: 'Aug', utilisation: 55000000, sanctionedLimit: 77000000 },
  { month: 'Sep', utilisation: 57000000, sanctionedLimit: 80000000 },
  { month: 'Oct', utilisation: 59000000, sanctionedLimit: 82000000 },
  { month: 'Nov', utilisation: 61000000, sanctionedLimit: 85000000 },
  { month: 'Dec', utilisation: 63000000, sanctionedLimit: 87000000 },
] 