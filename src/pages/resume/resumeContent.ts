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
  description: string
}

interface EducationItem {
  degree: string
  institution: string
  location: string
  period: string
}

const profile = {
  name: 'Raphael Gregg',
  headline: 'Desenvolvedor Front-end',
  contacts: [
    { label: 'raphaelgregg@gmail.com', href: 'mailto:raphaelgregg@gmail.com' },
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

/** Resumo profissional. Deixe vazio ('') para ocultar a seção. */
const summary =
  'Analista de sistemas com experiência em desenvolvimento front-end e mobile (ReactJS, React Native e Firebase) e em suporte técnico a usuários em órgãos públicos.'

const experience: WorkItem[] = [
  {
    role: 'Técnico Nível 2',
    company: 'Lanlink Serviços de Informática SA',
    location: 'Vitória, ES',
    period: 'Dez 2021 – Presente',
    description:
      'Atendimento e suporte aos usuários no Ministério Público do Espírito Santo, apoio às equipes de 3º e 1º nível.',
  },
  {
    role: 'Técnico Nível 2',
    company: 'Lanlink Serviços de Informática SA',
    location: 'Pará, PA',
    period: 'Dez 2021 – Mai 2022',
    description:
      'Atendimento e suporte aos usuários no Tribunal de Justiça do Pará, participação na troca do parque tecnológico nos fóruns do estado.',
  },
  {
    role: 'Desenvolvedor Front-end',
    company: 'Freelancer Projeto Web',
    location: 'Belém, PA',
    period: 'Set 2021 – Nov 2022',
    description:
      'Desenvolvimento da API Front-end e layout do projeto dashboard para gerenciamento de processos jurídicos, no qual, gerenciava processos e clientes. App construído em ReactJS e Firebase para armazenamento de dados.',
  },
  {
    role: 'Desenvolvedor Mobile',
    company: 'Freelancer Projeto Mobile',
    location: 'Belém, PA',
    period: 'Jul 2021 – Ago 2022',
    description:
      'Desenvolvimento de aplicativo Android elaborado como ferramenta de ensino-aprendizagem, no qual, você pode aprender técnicas sobre multiletramentos e práticas discursivas em sala de aula, apresentado como tese de mestrado na Universidade do Estado do Pará. Aplicativo construído em React Native com Expo e Firebase para API Back-end.',
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
    group: 'Ferramentas',
    items: [
      'Figma',
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'ReactJS',
      'React Native',
    ],
  },
]

const certifications = [
  'Semana Omnistack 11',
  'MD-100 Windows Client',
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
            .map(
              ({ label, href }) =>
                `<li><a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a></li>`,
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
        `<ul class="cv-list">${certifications.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>`,
      )}
    </article>`
}
