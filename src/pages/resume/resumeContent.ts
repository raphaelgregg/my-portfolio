import { escapeHtml as esc } from '../../utils/escapeHtml'

/**
 * Conteúdo do currículo. É a única fonte para a tela (/resume) e para o PDF
 * (/curriculum-download e botão de download): edite as informações aqui.
 */
interface WorkItem {
  company: string
  job: string
  period: string
  description: string
}

const profile = {
  name: 'Raphael Gregg',
  links: [
    {
      label: 'raphaelgregg.vercel.app',
      href: 'https://raphaelgregg.vercel.app/',
    },
    {
      label: 'github.com/raphaelgregg',
      href: 'https://github.com/raphaelgregg',
    },
    {
      label: 'linkedin.com/in/raphaelgregg',
      href: 'https://www.linkedin.com/in/raphaelgregg',
    },
  ],
}

const experience: WorkItem[] = [
  {
    company: 'Lanlink Serviços de Informática SA',
    job: 'Técnico Nível 2',
    period: 'Dez 2021 - Presente | Vitória, ES',
    description:
      'Atendimento e suporte aos usuários no Ministério Público do Espírito Santo, apoio às equipes de 3º e 1º nível.',
  },
  {
    company: 'Lanlink Serviços de Informática SA',
    job: 'Técnico Nível 2',
    period: 'Dez 2021 - Mai 2022 | Pará, PA',
    description:
      'Atendimento e suporte aos usuários no Tribunal de Justiça do Pará, participação na troca do parque tecnológico nos fóruns do estado.',
  },
  {
    company: 'Freelancer Projeto Web',
    job: 'Desenvolvedor Front-end',
    period: 'Set 2021 - Nov 2022 | Belém, PA',
    description:
      'Desenvolvimento da API Front-end e layout do projeto dashboard para gerenciamento de processos jurídicos, no qual, gerenciava processos e clientes. App construído em ReactJS e Firebase para armazenamento de dados.',
  },
  {
    company: 'Freelancer Projeto Mobile',
    job: 'Desenvolvedor Mobile',
    period: 'Jul 2021 - Ago 2022 | Belém, PA',
    description:
      'Desenvolvimento de aplicativo Android elaborado como ferramenta de ensino-aprendizagem, no qual, você pode aprender técnicas sobre multiletramentos e práticas discursivas em sala de aula, apresentado como tese de mestrado na Universidade do Estado do Pará. Aplicativo foi construído em React Native com Expo e Firebase para API Back-end.',
  },
]

const education = {
  institution: 'Universidade da Amazônia',
  period: 'Jan 2014 - Mar 2017 | Belém, PA',
  description:
    'Tecnólogo em Análise e Desenvolvimento de Sistemas, área de estudo Desenvolvimento de sistemas.',
}

const certificates =
  'Semana Omnistack 11, MD-100 Windows Client, Scrum Foundation Professional - SFPC, Análise de Requisitos de Software com Histórias de Usuários, Certificado Bootcamp GoStack 12.'

const skills = {
  title: 'Ferramentas',
  list: 'Figma, Html, CSS, Javascript, TypeScript, ReactJS, React Native',
}

function WorkCard({ company, job, period, description }: WorkItem) {
  return `
    <div class="work-card">
      <h4 class="work-title">${esc(company)}<span class="work-job"> - ${esc(job)}</span></h4>
      <span class="timeline">${esc(period)}</span>
      <p class="work-description">${esc(description)}</p>
    </div>`
}

/** Cabeçalho + Experiência + Educação (primeira página). */
export function ResumeFirstPage(): string {
  return `
    <header>
      <h2>${esc(profile.name)}</h2>

      <div>
        ${profile.links
          .map(
            ({ label, href }) =>
              `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`,
          )
          .join('\n        ')}
      </div>
    </header>

    <section>
      <h5>Experiência</h5>

      <div class="work-list">
        ${experience.map(WorkCard).join('')}
      </div>
    </section>

    <section class="education">
      <h5>Educação</h5>

      <div class="education-list">
        <div class="education-card">
          <h4 class="education-title">${esc(education.institution)}</h4>
          <span class="timeline">${esc(education.period)}</span>
          <p class="education-description">${esc(education.description)}</p>
        </div>

        <div class="education-card">
          <h4 class="certification-title">Certificados</h4>
          <p class="certification-description">${esc(certificates)}</p>
        </div>
      </div>
    </section>`
}

/** Habilidades (segunda página). */
export function ResumeSecondPage(): string {
  return `
    <section class="skillset">
      <h5>Habilidades</h5>
      <div class="skillset-list">
        <div class="skillset-card">
          <h4 class="skillset-title">${esc(skills.title)}</h4>
          <p class="skillset-description">${esc(skills.list)}</p>
        </div>
      </div>
    </section>`
}
