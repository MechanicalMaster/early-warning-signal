// app/components/FeatureCard.tsx
"use client";

import React from 'react';
import * as LucideIcons from 'lucide-react';
import { FeatureInfo } from '@/lib/constants'; // Import the interface

// Helper to get icon component by name
const getIcon = (iconName: string): React.ElementType | null => {
  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent || null;
};

interface FeatureCardProps {
  feature: FeatureInfo;
  className?: string; // Allow passing additional class names
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, className }) => {
  const { title, description, iconNames } = feature;

  return (
    <div className={`p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-center ${className}`}>
      <div className="flex space-x-4 mb-4">
        {iconNames.map((iconName) => {
          const Icon = getIcon(iconName);
          return Icon ? <Icon key={iconName} className="w-8 h-8 text-blue-600" /> : null;
        })}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
