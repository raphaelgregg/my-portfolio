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

function TextSection(id: string, title: string, text?: string): string {
  if (!text) return ''

  return `
    <section class="experience-section" aria-labelledby="${id}">
      <div class="experience-wrapper">
        <h2 id="${id}" class="experience-title">${esc(title)}</h2>
        <p class="experience-text">${esc(text)}</p>
      </div>
    </section>`
}

function JobItem(job: Job): string {
  // O banco repete a descrição do cargo como primeiro "caso": não duplica
  const cases = (job.successCases ?? []).filter(
    (item) => item.case && item.case !== job.description,
  )

  return `
    <li class="experience-job">
      <h3>${esc(job.title)}</h3>
      ${job.description ? `<p>${esc(job.description)}</p>` : ''}
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

  return `
    ${Header()}
    <main id="conteudo" class="experience-container">
      <section class="experience-hero">
        <div class="experience-wrapper">
          <a class="experience-back" href="/#experiencia">&larr; Todas as experiências</a>

          <div class="experience-heading">
            <img
              class="experience-logo"
              src="${esc(experience.thumbnailCompany)}"
              alt="Logo da empresa ${esc(name)}"
              width="72"
              height="72"
            />
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

      ${TextSection('experience-about', 'Sobre a empresa', experience.companyOverview)}
      ${TextSection('experience-overview', 'Minha atuação', experience.jobsOverview)}

      ${
        jobs.length
          ? `
        <section class="experience-section" aria-labelledby="experience-jobs">
          <div class="experience-wrapper">
            <h2 id="experience-jobs" class="experience-title">Cargos e responsabilidades</h2>
            <ol class="experience-timeline">${jobs.map(JobItem).join('')}</ol>
          </div>
        </section>`
          : ''
      }

      ${
        projects.length
          ? `
        <section class="experience-section" aria-labelledby="experience-projects">
          <div class="experience-wrapper">
            <h2 id="experience-projects" class="experience-title">Projetos nesta experiência</h2>
            <ul class="experience-projects">${projects.map(ProjectItem).join('')}</ul>
          </div>
        </section>`
          : ''
      }
    </main>
    ${Footer()}
  `
}
