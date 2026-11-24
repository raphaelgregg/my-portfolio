import { CompanyThumbnail } from '../../components/cardExperience'
import { Footer } from '../../components/footer'
import { Header } from '../../components/header'
import type { ExperienceDTO, Job, ProjectDTO } from '../../dtos/experienceDTO'
import { escapeHtml as esc } from '../../utils/escapeHtml'
import {
  formatDuration,
  formatMonthYear,
  formatPeriod,
} from '../../utils/extractFromDate'
import { setPageTitle } from '../../utils/pageTitle'
import { fetchExperienceById } from '../home/homeData'
import { StatusPage } from '../status'

import './styles.css'

/*
 * PADRÃO DA PÁGINA
 *
 * A página é uma lista de seções. Cada seção tem um id, um título e um corpo
 * (HTML) montado por uma função "...Body(experience)". Corpo vazio = a seção
 * não aparece. Para criar uma seção nova:
 *   1. escreva uma função xBody(experience) que devolve o HTML (ou '')
 *   2. acrescente { id, title, body } à lista em Experience()
 * O cabeçalho (nome, período, local, site) vem dos mesmos dados.
 */
interface SectionSpec {
  id: string
  title: string
  body: string
}

function Section({ id, title, body }: SectionSpec): string {
  if (!body) return ''

  return `
    <section class="experience-section" aria-labelledby="${id}">
      <div class="experience-wrapper">
        <h2 id="${id}" class="experience-title">${esc(title)}</h2>
        ${body}
      </div>
    </section>`
}

/** Só links http(s) viram link; o banco usa "#" quando a empresa não tem site. */
function websiteInfo(url?: string): { href: string; label: string } | null {
  if (!url || !/^https?:\/\//.test(url)) return null
  try {
    return { href: url, label: new URL(url).hostname.replace(/^www\./, '') }
  } catch {
    return null
  }
}

function Fact(label: string, valueHtml: string): string {
  return valueHtml
    ? `<div><dt>${esc(label)}</dt><dd>${valueHtml}</dd></div>`
    : ''
}

/* ---------- Corpos das seções ---------- */

function paragraphBody(text?: string): string {
  return text ? `<p class="experience-text">${esc(text)}</p>` : ''
}

function BulletList(items: string[] = []): string {
  return items.length
    ? `<ul class="experience-bullets">${items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>`
    : ''
}

function JobItem(job: Job): string {
  // O banco repete a descrição do cargo como primeiro "caso": não duplica
  const cases = (job.successCases ?? []).filter(
    (item) => item.case && item.case !== job.description,
  )
  const meta = [
    job.startDate ? formatPeriod(job.startDate, job.endDate) : '',
    job.location,
  ].filter(Boolean)

  return `
    <li class="experience-job">
      <h3>${esc(job.title)}</h3>
      ${meta.length ? `<p class="experience-job-meta">${esc(meta.join(' · '))}</p>` : ''}
      ${job.description ? `<p>${esc(job.description)}</p>` : ''}
      ${BulletList(job.bullets)}
      ${
        cases.length
          ? `<ul class="experience-cases">${cases
              .map(
                (item) => `
                <li>
                  ${item.date ? `<time datetime="${esc(item.date)}">${esc(formatMonthYear(item.date))}</time>` : ''}
                  <span>${esc(item.case)}</span>
                </li>`,
              )
              .join('')}</ul>`
          : ''
      }
    </li>`
}

function jobsBody(jobs: Job[]): string {
  return jobs.length
    ? `<ol class="experience-timeline">${jobs.map(JobItem).join('')}</ol>`
    : ''
}

function ProjectItem(project: ProjectDTO): string {
  const technologies = (project.technologies ?? [])
    .map(
      (tech) =>
        `<span><img src="/svg/${esc(tech)}.svg" alt="" onerror="this.remove()" />${esc(tech)}</span>`,
    )
    .join('')

  return `
    <li class="experience-project">
      <h3>${esc(project.title)}</h3>
      <p class="experience-project-role">${esc(project.role)}</p>
      ${project.projectDescriptionShort ? `<p>${esc(project.projectDescriptionShort)}</p>` : ''}
      ${technologies ? `<div class="experience-techs">${technologies}</div>` : ''}
    </li>`
}

function projectsBody(projects: ProjectDTO[]): string {
  return projects.length
    ? `<ul class="experience-projects">${projects.map(ProjectItem).join('')}</ul>`
    : ''
}

/* ---------- Página ---------- */

export async function Experience(experienceId: string) {
  const experience: ExperienceDTO | undefined =
    await fetchExperienceById(experienceId)

  if (!experience) {
    setPageTitle('Experiência não encontrada')
    return StatusPage(
      'Experiência não encontrada',
      'Esta experiência não existe ou foi removida.',
      'Ver todas as experiências',
      '/#experiencia',
    )
  }

  const name = experience.company || experience.companyShortName
  setPageTitle(name)

  const website = websiteInfo(experience.url)
  const jobs = experience.jobs ?? []
  const projects = experience.projects ?? []

  // Com cargos detalhados (data/career.ts) o resumo antigo do banco fica de fora
  const hasDetailedJobs = jobs.some((job) => job.startDate)

  const sections: SectionSpec[] = [
    {
      id: 'experience-about',
      title: 'Sobre a empresa',
      body: paragraphBody(experience.companyOverview),
    },
    {
      id: 'experience-overview',
      title: 'Minha atuação',
      body: hasDetailedJobs ? '' : paragraphBody(experience.jobsOverview),
    },
    {
      id: 'experience-jobs',
      title: 'Cargos e responsabilidades',
      body: jobsBody(jobs),
    },
    {
      id: 'experience-projects',
      title: 'Projetos nesta experiência',
      body: projectsBody(projects),
    },
  ]

  return `
    ${Header()}
    <main id="conteudo" class="experience-container">
      <section class="experience-hero">
        <div class="experience-wrapper">
          <a class="experience-back" href="/#experiencia">&larr; Todas as experiências</a>

          <div class="experience-heading">
            ${CompanyThumbnail(name, experience.thumbnailCompany, 'experience-logo')}
            <div>
              <h1>${esc(name)}</h1>
              ${jobs[0]?.title ? `<p class="experience-role">${esc(jobs[0].title)}</p>` : ''}
            </div>
          </div>

          <dl class="experience-facts">
            ${Fact('Período', esc(formatPeriod(experience.hireDate, experience.departureDate)))}
            ${Fact('Duração', esc(formatDuration(experience.hireDate, experience.departureDate)))}
            ${Fact('Local', esc(experience.location))}
            ${website ? Fact('Site', `<a href="${esc(website.href)}" target="_blank" rel="noopener noreferrer">${esc(website.label)}</a>`) : ''}
          </dl>
        </div>
      </section>

      ${sections.map(Section).join('')}
    </main>
    ${Footer()}
  `
}
