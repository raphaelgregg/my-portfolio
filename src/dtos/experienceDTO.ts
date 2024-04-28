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
    technologies?: TechnologiesDTO[],
    date: string,
    category: string,
    thumbnail: string,
}

export interface TechnologiesDTO {
  icon: string,
}


// {
//   "id": 4,
//   "thumbnailCompany": "https://assets-global.website-files.com/64c1de6909d566eef48d4dfd/6504057596969ba574d148c5_Frame%2059%201.svg",
//   "company": "Lanlink Serviços de Informática SA",
//   "companyShortName": "Lanlink",
//   "url": "https://www.lanlink.com.br/",
//   "hireDate": "2021-12-07",
//   "departureDate": "presente",
//   "companyOverview": "Lanlink Serviços de Informática SA é uma empresa líder no fornecimento de soluções de tecnologia da informação para instituições públicas e privadas. Com foco em suporte técnico de alta qualidade e soluções personalizadas, a Lanlink tem uma longa história de sucesso no mercado de TI.",
//   "companyOverviewShort": "Empresa líder no fornecimento de soluções de TI.",
//   "jobsOverview": "Técnico em suporte de nível 2 com experiência em ambientes de alta demanda. Especializado em oferecer suporte técnico eficiente e solucionar problemas complexos em instituições públicas e privadas.",
//   "jobs": [
//     {
//       "id": 0,
//       "title": "Técnico em suporte Nível 2",
//       "description": "Suporte técnico de nível 2 em ambientes de alto desempenho.",
//       "successCases": [
//         {
//           "date": "2021-12-07",
//           "case": "Atendimento e suporte aos usuários no Tribunal de Justiça do Pará."
//         },
//         {
//           "date": "2022-05-01",
//           "case": "Participação na troca do parque tecnológico do Tribunal de Justiça do Estado do Pará, incluindo a reestruturação de mais de 60 fóruns no estado."
//         }
//       ]
//     },
//     {
//       "id": 1,
//       "title": "Técnico em suporte Nível 2",
//       "description": "Suporte técnico de nível 2 para órgãos públicos e privados.",
//       "successCases": [
//         {
//           "date": "2021-09-01",
//           "case": "Atendimento e suporte aos usuários no Ministério Público do Espírito Santo, apoiando equipes de 3º e 1º nível."
//         },
//         {
//           "date": "2021-09-01",
//           "case": "Participação e auxílio na recuperação do contrato com mais de 500 chamados em backlog."
//         }
//       ]
//     }
//   ],
//   "location": "Belém, PA",
//   "projects": []
// }