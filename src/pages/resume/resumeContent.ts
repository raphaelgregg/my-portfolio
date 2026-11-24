import { sortedPositions } from '../../data/career'
import { escapeHtml as esc } from '../../utils/escapeHtml'
import { formatPeriod } from '../../utils/extractFromDate'

/**
 * Conteúdo do currículo. Edite as informações aqui: a tela (/resume) e o PDF
 * (botão "Baixar PDF") usam exatamente o mesmo HTML e CSS.
 */
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
        sortedPositions()
          .map((item) =>
            Entry(
              item.role,
              `${item.company} · ${item.location}`,
              formatPeriod(item.start, item.end),
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
