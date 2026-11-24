/**
 * Trajetória profissional: fonte única dos cargos. Alimenta o currículo (/resume)
 * e as páginas de experiência (/experience/:id), então os dois nunca divergem.
 *
 * Para adicionar um cargo, inclua um objeto aqui. `experienceId` liga o cargo à
 * empresa cadastrada no Firebase (nó "experience", campo "id"); empresas sem
 * cargos aqui usam os "jobs" do Firebase.
 */
import type { ExperienceDTO, Job } from '../dtos/experienceDTO'

export interface Position {
  /** Id da empresa no Firebase (nó "experience"). */
  experienceId: string
  role: string
  /** Nome da empresa como aparece no currículo. */
  company: string
  location: string
  /** Mês de início, "AAAA-MM-01". */
  start: string
  /** Mês de término, "AAAA-MM-01", ou "presente". */
  end: string
  description?: string
  /** Principais atribuições, exibidas em lista. */
  bullets?: string[]
}

const PRESENT = 'presente'

export const positions: Position[] = [
  {
    role: 'Analista de Suporte Windows',
    experienceId: '4',
    company: 'Lanlink Informática',
    location: 'Vitória, ES',
    start: '2026-04-01',
    end: 'presente',
    description:
      'Atuo como Analista de Suporte Windows no cliente MPES, com foco na sustentação e administração de ambientes de TI.',
    bullets: [
      'Análise de logs',
      'Administração de servidores Windows, Active Directory e Exchange',
      'Operação de rotinas de backup — monitorando processos, corrigindo falhas e configurando em servidores para garantir integridade e disponibilidade dos dados',
      'Monitoramento de ambientes através da ferramenta Zabbix, contribuindo para identificação proativa de incidentes',
      'Registro, acompanhamento e resolução de chamados via GLPI, incluindo demandas de GMUD e incidentes',
      'Apoio em atualizações de sistemas e participação em projetos de melhoria contínua',
    ],
  },
  {
    role: 'Analista de Suporte em TIC Jr.',
    experienceId: '4',
    company: 'Lanlink Informática',
    location: 'Vitória, ES',
    start: '2025-08-01',
    end: '2026-04-01',
    description: 'Suporte em ambientes OnPremises e Cloud.',
    bullets: [
      'Atendimento a contratos com maior demanda em suporte à suíte Microsoft 365',
      'Suporte especializado a clientes externos, públicos e privados, em ambientes Microsoft',
      'Atuação em ambientes híbridos (OnPremises e Cloud)',
      'Experiência prática com Microsoft 365, Exchange Online, Active Directory, Purview, Entra ID e Microsoft Security',
      'Colaboração com equipes de 1º e 2º nível para otimização de processos, melhoria contínua e alta disponibilidade dos serviços',
      'Monitoramento de ambientes através do Zabbix, contribuindo para identificação proativa de incidentes e manutenção da disponibilidade dos serviços',
    ],
  },
  {
    role: 'Técnico de Suporte N2',
    experienceId: '4',
    company: 'Lanlink Informática',
    location: 'Vitória, ES',
    start: '2022-05-01',
    end: '2025-08-01',
    bullets: [
      'Atendimento ao usuário: suporte técnico e auxílio nas demandas diárias',
      'Instalação e configuração de softwares conforme as necessidades da organização',
      'Manutenção preventiva e corretiva de desktops e notebooks',
      'Suporte técnico de segundo nível em Office 365, Active Directory e redes de computadores, colaborando com a equipe de 3º nível em manutenções em salas técnicas',
      'Colaboração com a equipe de 1º nível, auxiliando e orientando em suas demandas para um fluxo eficaz de resolução de problemas',
      'Colaboração com a equipe de 3º nível: atualizações de servidores físicos e virtuais, criação de escopos DHCP, gestão de Microsoft Exchange e monitoramento de rotinas de backup',
      'Gerenciamento de chamados com GLPI e Service Manager',
    ],
  },
  {
    role: 'Técnico de Suporte N2',
    experienceId: '4',
    company: 'Lanlink Informática',
    location: 'Belém, PA',
    start: '2021-12-01',
    end: '2022-05-01',
    description:
      'Atendimento técnico em suporte a usuários no Tribunal de Justiça do Pará.',
    bullets: [
      'Atendimento ao usuário: suporte técnico e auxílio nas demandas diárias',
      'Instalação e configuração de softwares conforme as necessidades da organização',
      'Gerenciamento de chamados com GLPI',
    ],
  },
  {
    role: 'Desenvolvedor Web Front-end (Freelance)',
    experienceId: '3',
    company: 'Projeto Web',
    location: 'Belém, PA',
    start: '2021-09-01',
    end: '2021-11-01',
    description:
      'Desenvolvimento do front-end e layout de um app admin para controle de processos advocatícios, no qual eram gerenciados processos e clientes. Construído em ReactJS e Firebase para armazenamento de dados.',
  },
  {
    role: 'Desenvolvedor de Aplicativos (Freelance)',
    experienceId: '2',
    company: 'Projeto Mobile',
    location: 'Belém, PA',
    start: '2021-07-01',
    end: '2021-08-01',
    description:
      'Aplicativo Android elaborado como ferramenta de ensino-aprendizagem, no qual se aprendem técnicas sobre multiletramentos e práticas discursivas em sala de aula, apresentado como tese de mestrado na Universidade do Estado do Pará. Construído em React Native com Expo e Firebase para API Back-end.',
  },
  {
    role: 'Suporte Técnico / Auxiliar Administrativo',
    experienceId: '1',
    company: 'Contromidia',
    location: 'Belém, PA',
    start: '2012-03-01',
    end: '2020-12-01',
    bullets: [
      'Suporte em informática: montagem, instalação e configuração de equipamentos, manutenção preventiva e corretiva',
      'Suporte ao sistema da empresa',
      'Clipagem de notícias nos veículos de TV, rádio, sites e jornais impressos',
      'Treinamento de novos colaboradores para a clipagem de mídias',
    ],
  },
]

/** Do mais recente para o mais antigo (pela data de início). */
function byMostRecent(a: Position, b: Position): number {
  return b.start.localeCompare(a.start)
}

export function sortedPositions(): Position[] {
  return [...positions].sort(byMostRecent)
}

function toJob(position: Position, index: number): Job {
  return {
    id: String(index),
    title: position.role,
    description: position.description ?? '',
    startDate: position.start,
    endDate: position.end,
    location: position.location,
    bullets: position.bullets,
    successCases: [],
  }
}

/** Empresa sem registro no Firebase: card e página com o que o currículo sabe. */
function companyFromPositions(
  experienceId: string,
  own: Position[],
): ExperienceDTO {
  return {
    id: experienceId,
    company: own[0].company,
    companyShortName: own[0].company,
    jobs: [],
    projects: [],
  }
}

function withPositions(
  experience: ExperienceDTO,
  own: Position[],
): ExperienceDTO {
  const isCurrent = own.some((position) => position.end === PRESENT)
  const ends = own.map((position) => position.end).sort()
  const latestEnd = ends[ends.length - 1]

  return {
    ...experience,
    jobs: own.map(toJob),
    location: own[0].location,
    hireDate: own[own.length - 1].start,
    departureDate: isCurrent ? PRESENT : latestEnd,
  }
}

/**
 * Completa as empresas do Firebase com os cargos deste arquivo: troca "jobs",
 * "location" e as datas pelos valores do currículo. Empresas sem cargos aqui
 * ficam como vieram do banco. Cargos de uma empresa que não existe no banco
 * criam a empresa (assim todo emprego do currículo tem card), inclusive se o
 * Firebase estiver fora do ar.
 */
export function applyCareer(
  experiences: ExperienceDTO[] | null,
  allPositions: Position[] = positions,
): ExperienceDTO[] {
  const fromDatabase = Array.isArray(experiences) ? experiences : []

  const positionsOf = (experienceId: string) =>
    allPositions
      .filter((position) => position.experienceId === experienceId)
      .sort(byMostRecent)

  const merged = fromDatabase.map((experience) => {
    const own = positionsOf(String(experience.id))
    return own.length ? withPositions(experience, own) : experience
  })

  const knownIds = new Set(
    fromDatabase.map((experience) => String(experience.id)),
  )
  const missingIds = [
    ...new Set(allPositions.map((position) => position.experienceId)),
  ].filter((experienceId) => !knownIds.has(experienceId))

  const created = missingIds.map((experienceId) => {
    const own = positionsOf(experienceId)
    return withPositions(companyFromPositions(experienceId, own), own)
  })

  return [...merged, ...created]
}
