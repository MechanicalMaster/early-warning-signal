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
          <YAxis 
            yAxisId="left" 
            tickFormatter={(value: number) => `₹${(value/10000000).toFixed(1)}Cr`} 
          />
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            tickFormatter={(value: number) => `${value}%`} 
          />
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
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="utilisation"
            name="Utilisation"
            stroke="hsl(var(--primary))"
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="overdueRate"
            name="Overdue Rate"
            stroke="#ff4d4f"
            strokeWidth={2}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="riskExposure"
            name="Risk Exposure"
            stroke="#faad14"
            strokeDasharray="5 5"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

const portfolioData = [
  {
    month: "Jan",
    utilisation: 4250000000,
    overdueRate: 3.2,
    riskExposure: 850000000,
  },
  {
    month: "Feb",
    utilisation: 4380000000,
    overdueRate: 3.8,
    riskExposure: 920000000,
  },
  {
    month: "Mar",
    utilisation: 4580000000,
    overdueRate: 4.2,
    riskExposure: 960000000,
  },
  {
    month: "Apr",
    utilisation: 4720000000,
    overdueRate: 5.1,
    riskExposure: 1050000000,
  },
  {
    month: "May",
    utilisation: 4850000000,
    overdueRate: 4.8,
    riskExposure: 980000000,
  },
  {
    month: "Jun",
    utilisation: 5120000000,
    overdueRate: 4.5,
    riskExposure: 1020000000,
  },
  {
    month: "Jul",
    utilisation: 5280000000,
    overdueRate: 4.3,
    riskExposure: 980000000,
  },
  {
    month: "Aug",
    utilisation: 5350000000,
    overdueRate: 4.9,
    riskExposure: 1120000000,
  },
  {
    month: "Sep",
    utilisation: 5420000000,
    overdueRate: 5.2,
    riskExposure: 1180000000,
  },
  {
    month: "Oct",
    utilisation: 5540000000,
    overdueRate: 5.8,
    riskExposure: 1245000000,
  },
  {
    month: "Nov",
    utilisation: 5620000000,
    overdueRate: 5.6,
    riskExposure: 1230000000,
  },
  {
    month: "Dec",
    utilisation: 5830000000,
    overdueRate: 5.4,
    riskExposure: 1210000000,
  },
] 