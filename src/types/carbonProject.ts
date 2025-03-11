export enum CarbonProjectType {
  REFORESTATION = 'reforestation',
  RENEWABLE_ENERGY = 'renewable_engergy',
}

export interface CarbonProject {
  projectName: string;
  location: string;
  investmentAmount: number;
  carbonCreditsGenerated: number;
  estimatedROI: number;
}

export interface EvaluationFormData
  extends Omit<CarbonProject, 'carbonCreditsGenerated' | 'estimatedROI'> {
  projectType: CarbonProjectType;
}

export interface EvaluationResponseData
  extends Pick<CarbonProject, 'projectName' | 'carbonCreditsGenerated' | 'estimatedROI'> {}
