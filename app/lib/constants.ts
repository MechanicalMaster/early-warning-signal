// app/lib/constants.ts

// Define an interface for the feature objects for type safety
export interface FeatureInfo {
  title: string;
  description: string;
  iconNames: string[]; // Array of icon names (from lucide-react, e.g., 'ShieldCheck', 'TrendingUp')
}

// Export an array of feature objects
export const landingPageFeatures: FeatureInfo[] = [
  {
    title: "Comprehensive Risk Assessment",
    description: "Utilize advanced analytics to identify potential risks in your supply chain finance portfolio, ensuring proactive management.",
    iconNames: ["ShieldCheck", "Activity", "Search"], // Placeholder Lucide icon names
  },
  {
    title: "Real-time Monitoring",
    description: "Stay updated with continuous monitoring of your portfolio, receiving timely alerts on critical changes and potential issues.",
    iconNames: ["BellRing", "Clock", "Eye"], // Placeholder Lucide icon names
  },
  {
    title: "Data-Driven Insights",
    description: "Leverage actionable insights derived from robust data analysis to make informed decisions and optimize your strategies.",
    iconNames: ["BarChartBig", "Brain", "Lightbulb"], // Placeholder Lucide icon names
  },
  {
    title: "Customizable Reporting",
    description: "Generate detailed and customizable reports to track performance, identify trends, and communicate effectively with stakeholders.",
    iconNames: ["FileText", "Settings2", "ClipboardList"], // Placeholder Lucide icon names
  },
];
