export interface CardExperienceDTO {
  companyShortName: string;
  jobs: Job[];
  companyOverviewShort: string;
  thumbnailCompany: string;
}

export interface Job {
  id?: number;
  title: string;
  description?: string;
  successCases?: any[]; // Defina o tipo apropriado para successCases se necessário
}
