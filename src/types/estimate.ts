
export interface EstimateResponse {
  min: number;
  max: number;
  average: number;
  breakdown: {
    basePrice: number;
    roomsCost: number;
    surfaceCost: number;
    specialFeaturesCost?: number;
  };
  deductions?: {
    primaCasa50?: number;
    secondaCasa36?: number;
    ecobonus?: number;
  };
  calculatedAt: string;
}

export interface EstimateRequest {
  formData: FormData;
}
