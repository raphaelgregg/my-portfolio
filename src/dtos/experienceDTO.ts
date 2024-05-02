export interface ExperienceDTO {
  id?: string,
  thumbnailCompany?: string,
  company?: string,
  companyShortName?: string,
  url?: string,
  hireDate?: string,
  departureDate?: string,
  companyOverview?: string,
  companyOverviewShort?: string,
  jobsOverview?: string,
  jobs?: Job[], // Defina o tipo apropriado para successCases se necessário;
  projects?: ProjectDTO[]
}

export interface Job {
  id: string,
  title: string,
  description: string,
  successCases?: SucessCasesDTO[]; // Defina o tipo apropriado para successCases se necessário
}

export interface SucessCasesDTO {
  date: string,
  case: string
}

export interface ProjectDTO {
    id: string,
    title: string,
    role: string,
    projectDescription: string,
    projectDescriptionShort: string,
    technologies?: TechnologiesDTO[],
    tools?: ToolsDTO[],
    date: string,
    category: string,
    thumbnail: string,
    banner: string,
    prompt: string,
    projectType: string,
    developmentDuration: number,
}

export interface TechnologiesDTO {
  icon: string,
}

export interface ToolsDTO {
  name: string,
}