
import { FormData } from "@/components/Configuratore";
import { EstimateResponse } from "@/types/estimate";

// Mock function that simulates calling an external API
// In production, this would make an actual HTTP request to your calculation service
export const calculateEstimate = async (formData: FormData): Promise<EstimateResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // This is where you would make the actual API call
  // const response = await fetch('/api/calculate-estimate', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ formData })
  // });
  // return response.json();
  
  // For now, return mock data structure that your external API would provide
  return {
    min: 15000,
    max: 25000,
    average: 20000,
    breakdown: {
      basePrice: 12000,
      roomsCost: 5000,
      surfaceCost: 3000,
      specialFeaturesCost: 2000
    },
    deductions: {
      primaCasa50: 10000,
      secondaCasa36: 7200,
      ecobonus: 8000
    },
    calculatedAt: new Date().toISOString()
  };
};
