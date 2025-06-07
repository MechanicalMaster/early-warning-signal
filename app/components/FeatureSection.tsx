// app/components/FeatureSection.tsx
"use client";

import React from 'react';
import FeatureCard from './FeatureCard'; // Import the FeatureCard component
import { landingPageFeatures } from '@/lib/constants'; // Import the feature data
import styles from './FeatureSection.module.css'; // Import CSS module

const FeatureSection: React.FC = () => {
  return (
    <section className={`py-12 bg-gray-50 w-full ${styles.featureSectionContainer}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          A Powerful, Data-Driven Approach to Supply Chain Risk.
        </h2>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 ${styles.featureGrid}`}>
          {landingPageFeatures.map((feature, index) => (
            <FeatureCard key={index} feature={feature} className={styles.featureCard} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
