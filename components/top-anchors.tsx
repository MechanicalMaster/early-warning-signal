import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const topAnchorsByValue = [
  { id: 1, name: "HDFC Bank", value: 120000000 },
  { id: 2, name: "ICICI Bank", value: 95000000 },
  { id: 3, name: "Axis Bank", value: 87000000 },
  { id: 4, name: "Kotak Mahindra", value: 65000000 },
  { id: 5, name: "SBI", value: 54000000 },
]

const topAnchorsByDealers = [
  { id: 1, name: "HDFC Bank", dealers: 120 },
  { id: 2, name: "ICICI Bank", dealers: 98 },
  { id: 3, name: "Axis Bank", dealers: 87 },
  { id: 4, name: "Kotak Mahindra", dealers: 65 },
  { id: 5, name: "SBI", dealers: 54 },
]

export function TopAnchors() {
  return (
    <Tabs defaultValue="value" className="w-full">
      <TabsList className="mb-2">
        <TabsTrigger value="value">By Value</TabsTrigger>
        <TabsTrigger value="dealers">By # of Dealers</TabsTrigger>
      </TabsList>
      <TabsContent value="value">
        <div className="space-y-4">
          {topAnchorsByValue.map(anchor => (
            <div key={anchor.id} className="flex items-center gap-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{anchor.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium text-sm">{anchor.name}</div>
              </div>
              <div className="font-semibold text-base">₹ {anchor.value.toLocaleString("en-IN")}</div>
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="dealers">
        <div className="space-y-4">
          {topAnchorsByDealers.map(anchor => (
            <div key={anchor.id} className="flex items-center gap-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{anchor.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium text-sm">{anchor.name}</div>
              </div>
              <div className="font-semibold text-base">{anchor.dealers} Dealers</div>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
} 