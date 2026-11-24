import { escapeHtml as esc } from '../../utils/escapeHtml'

/**
 * Conteúdo do currículo. Edite as informações aqui: a tela (/resume) e o PDF
 * (botão "Baixar PDF") usam exatamente o mesmo HTML e CSS.
 */
interface WorkItem {
  role: string
  company: string
  location: string
  period: string
  description?: string
  /** Principais atribuições, exibidas em lista. */
  bullets?: string[]
}

interface EducationItem {
  degree: string
  institution: string
  location: string
  period: string
}

interface ContactItem {
  label: string
  /** Sem href, o item aparece como texto (ex.: localização). */
  href?: string
}

const profile = {
  name: 'Raphael Gregg',
  headline:
    'Infraestrutura Microsoft (Windows, 365, Azure, AD) | Cloud & Segurança | Front-End Developer (ReactJS, JS, HTML, CSS)',
  contacts: [
    { label: 'Espírito Santo, Brasil' },
    { label: 'raphaelgregg@gmail.com', href: 'mailto:raphaelgregg@gmail.com' },
    {
      label: 'linkedin.com/in/raphaelgregg',
      href: 'https://www.linkedin.com/in/raphaelgregg',
    },
    {
      label: 'github.com/raphaelgregg',
      href: 'https://github.com/raphaelgregg',
    },
    {
      label: 'raphaelgregg.vercel.app',
      href: 'https://raphaelgregg.vercel.app/',
    },
  ] satisfies ContactItem[],
}

/** Resumo profissional. Deixe vazio ('') para ocultar a seção. */
const summary =
  'Sou Analista de Suporte Windows com experiência em ambientes Microsoft (Windows Server, Active Directory, Exchange, Microsoft 365 e Azure). Atuo na sustentação de infraestrutura, monitoramento com Zabbix e operação de rotinas de backup, além do registro e acompanhamento de chamados via GLPI, incluindo demandas de GMUD e incidentes. Paralelamente, desenvolvo projetos como Front-End Developer, utilizando ReactJS, React Native, JavaScript, HTML e CSS. Estou em constante evolução profissional e aberto a novos desafios que me permitam crescer e contribuir em projetos de infraestrutura e desenvolvimento.'

const experience: WorkItem[] = [
  {
    role: 'Analista de Suporte Windows',
    company: 'Lanlink Informática',
    location: 'Vitória, ES',
    period: 'Abr 2026 – Presente',
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
    company: 'Lanlink Informática',
    location: 'Vitória, ES',
    period: 'Ago 2025 – Abr 2026',
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
    company: 'Lanlink Informática',
    location: 'Vitória, ES',
    period: 'Mai 2022 – Ago 2025',
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
    company: 'Lanlink Informática',
    location: 'Belém, PA',
    period: 'Dez 2021 – Mai 2022',
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
    company: 'Projeto Web',
    location: 'Belém, PA',
    period: 'Set 2021 – Nov 2021',
    description:
      'Desenvolvimento do front-end e layout de um app admin para controle de processos advocatícios, no qual eram gerenciados processos e clientes. Construído em ReactJS e Firebase para armazenamento de dados.',
  },
  {
    role: 'Desenvolvedor de Aplicativos (Freelance)',
    company: 'Projeto Mobile',
    location: 'Belém, PA',
    period: 'Jul 2021 – Ago 2021',
    description:
      'Aplicativo Android elaborado como ferramenta de ensino-aprendizagem, no qual se aprendem técnicas sobre multiletramentos e práticas discursivas em sala de aula, apresentado como tese de mestrado na Universidade do Estado do Pará. Construído em React Native com Expo e Firebase para API Back-end.',
  },
  {
    role: 'Suporte Técnico / Auxiliar Administrativo',
    company: 'Contromidia',
    location: 'Belém, PA',
    period: 'Mar 2012 – Dez 2020',
    bullets: [
      'Suporte em informática: montagem, instalação e configuração de equipamentos, manutenção preventiva e corretiva',
      'Suporte ao sistema da empresa',
      'Clipagem de notícias nos veículos de TV, rádio, sites e jornais impressos',
      'Treinamento de novos colaboradores para a clipagem de mídias',
    ],
  },
]

const education: EducationItem[] = [
  {
    degree: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
    institution: 'Universidade da Amazônia',
    location: 'Belém, PA',
    period: 'Jan 2014 – Mar 2017',
  },
]

const skills = [
  {
    group: 'Infraestrutura e Cloud',
    items: [
      'Windows Server',
      'Active Directory',
      'Exchange',
      'Microsoft 365',
      'Azure',
      'Entra ID',
      'Purview',
    ],
  },
  {
    group: 'Monitoramento e chamados',
    items: ['Zabbix', 'GLPI', 'Service Manager'],
  },
  {
    group: 'Desenvolvimento',
    items: [
      'ReactJS',
      'React Native',
      'JavaScript',
      'TypeScript',
      'HTML',
      'CSS',
      'Figma',
    ],
  },
]

const certifications = [
  'AZ-900: Microsoft Azure Fundamentals',
  'AZ-800: Administering Windows Server Hybrid Core',
  'MD-100: Windows Client',
  'NLW Pocket: Mobile - React Native',
  'Semana Omnistack 11',
  'Scrum Foundation Professional - SFPC',
  'Análise de Requisitos de Software com Histórias de Usuários',
  'Bootcamp GoStack 12',
]

function Section(title: string, content: string): string {
  return `
    <section class="cv-section">
      <h2>${esc(title)}</h2>
      ${content}
    </section>`
}

function Entry(
  title: string,
  subtitle: string,
  period: string,
  description?: string,
  bullets: string[] = [],
): string {
  return `
    <article class="cv-entry">
      <div class="cv-entry-head">
        <div>
          <h3>${esc(title)}</h3>
          <p class="cv-entry-subtitle">${esc(subtitle)}</p>
        </div>
        <p class="cv-period">${esc(period)}</p>
      </div>
      ${description ? `<p class="cv-description">${esc(description)}</p>` : ''}
      ${bullets.length ? `<ul class="cv-bullets">${bullets.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>` : ''}
    </article>`
}

/** A folha A4 do currículo: usada na tela e na impressão/PDF. */
export function ResumeSheet(): string {
  return `
    <article class="cv-sheet" aria-label="Currículo de ${esc(profile.name)}">
      <header class="cv-header">
        <h1>${esc(profile.name)}</h1>
        <p class="cv-headline">${esc(profile.headline)}</p>
        <ul class="cv-contacts">
          ${profile.contacts
            .map(({ label, href }: ContactItem) =>
              href
                ? `<li><a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a></li>`
                : `<li>${esc(label)}</li>`,
            )
            .join('')}
        </ul>
      </header>

      ${summary ? Section('Resumo', `<p class="cv-description">${esc(summary)}</p>`) : ''}

      ${Section(
        'Experiência profissional',
        experience
          .map((item) =>
            Entry(
              item.role,
              `${item.company} · ${item.location}`,
              item.period,
              item.description,
              item.bullets,
            ),
          )
          .join(''),
      )}

      ${Section(
        'Formação acadêmica',
        education
          .map((item) =>
            Entry(
              item.degree,
              `${item.institution} · ${item.location}`,
              item.period,
            ),
          )
          .join(''),
      )}

      ${Section(
        'Habilidades',
        skills
          .map(
            ({ group, items }) =>
              `<p class="cv-description"><strong>${esc(group)}:</strong> ${esc(items.join(', '))}</p>`,
          )
          .join(''),
      )}

      ${Section(
        'Certificações',
        `<p class="cv-description">${esc(certifications.join(' · '))}</p>`,
      )}
    </article>`
}
