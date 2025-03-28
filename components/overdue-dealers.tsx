import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AlertTriangle, AlertCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export function OverdueDealers() {
  return (
    <div className="space-y-6">
      {dealers.map((dealer) => (
        <div key={dealer.id} className="flex items-center">
          <Avatar className="h-9 w-9 border">
            <AvatarFallback className={cn(
              "text-white",
              dealer.riskLevel === "high" ? "bg-red-500" : 
              dealer.riskLevel === "medium" ? "bg-amber-500" : 
              "bg-orange-400"
            )}>
              {dealer.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <div className="flex items-center">
              <p className="text-sm font-medium leading-none">{dealer.name}</p>
              {dealer.riskLevel === "high" && (
                <AlertTriangle className="h-3.5 w-3.5 ml-2 text-red-500" />
              )}
              {dealer.riskLevel === "medium" && (
                <AlertCircle className="h-3.5 w-3.5 ml-2 text-amber-500" />
              )}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>{dealer.daysOverdue} days overdue</span>
              <span className="mx-1.5">•</span>
              <span>{dealer.anchor}</span>
            </div>
          </div>
          <div className="ml-auto">
            <div className="font-medium text-right">₹ {formatIndianNumber(dealer.amount)}</div>
            <div className={cn(
              "text-xs",
              dealer.riskLevel === "high" ? "text-red-500" : 
              dealer.riskLevel === "medium" ? "text-amber-500" : 
              "text-orange-400"
            )}>
              {dealer.riskPercentage}% of limit
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function formatIndianNumber(num: number): string {
  const formatted = num.toLocaleString('en-IN', {
    maximumFractionDigits: 0,
    useGrouping: true
  });
  
  return formatted;
}

const dealers = [
  {
    id: "DLR042",
    name: "Sunrise Distributors",
    amount: 3245000,
    daysOverdue: 28,
    riskLevel: "high",
    riskPercentage: 92,
    anchor: "MTN Group"
  },
  {
    id: "DLR078",
    name: "Metro Electronics",
    amount: 1856000,
    daysOverdue: 21,
    riskLevel: "high",
    riskPercentage: 88,
    anchor: "Discovery Limited"
  },
  {
    id: "DLR156",
    name: "Pioneer Auto Parts",
    amount: 2340000,
    daysOverdue: 18,
    riskLevel: "medium",
    riskPercentage: 76,
    anchor: "Standard Bank"
  },
  {
    id: "DLR093",
    name: "Global Metals",
    amount: 1580000,
    daysOverdue: 15,
    riskLevel: "medium",
    riskPercentage: 65,
    anchor: "Sasol Limited"
  },
  {
    id: "DLR127",
    name: "ValueMart Supplies",
    amount: 945000,
    daysOverdue: 12,
    riskLevel: "low",
    riskPercentage: 52,
    anchor: "Shoprite Holdings"
  }
] 