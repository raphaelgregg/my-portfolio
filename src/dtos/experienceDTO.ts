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
    id?: string,
    title?: string,
    role?: string,
    projectDescription?: string,
    projectDescriptionShort?: string,
    technologies?: string[],
    tools?: string[],
    date?: string,
    category?: string,
    thumbnail?: string,
    banner?: string,
    projectType?: string,
    developmentDuration?: number,
    overview?: OverviewDTO,
    userResearch?: UserResearchDTO,
    challenge?: string[],
    prototype?: PrototypeDTO,
    userFeedback?: string[],
    reflection?: string[],
}

export interface OverviewDTO {
  prompt: string,
  designProcess: string,
  initialThinking: InitialThinkingDTO,
  howMightWeQuestions: string[],  
}

export interface InitialThinkingDTO {
  targetUsers: string[],
  researchMethods: string[],
}

export interface UserResearchDTO {
  backgroundResearch: string[],
  existingSystems: string[],
  imgSystems: string[],
}

export interface PrototypeDTO {
  visualIdentity: string[],
  wireframe: string[],
}
