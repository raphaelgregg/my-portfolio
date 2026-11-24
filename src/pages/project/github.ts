import { CompanyThumbnail } from '../../components/cardExperience'
import {
  bulletList,
  Fact,
  paragraphBody,
  Section,
  type SectionSpec,
  techChips,
} from '../../components/detail'
import { Footer } from '../../components/footer'
import { Header } from '../../components/header'
import type { PersonalProject } from '../../data/github-projects'
import { techIconFor } from '../../data/techIcons'
import { escapeHtml as esc } from '../../utils/escapeHtml'
import { formatMonthYear } from '../../utils/extractFromDate'
import { setPageTitle } from '../../utils/pageTitle'

import './github.css'

/* ---------- Corpos das seções ---------- */

function screenshotsBody(project: PersonalProject): string {
  if (project.screenshots.length === 0) return ''

  const images = project.screenshots
    .map(
      (src, index) =>
        `<img src="${esc(src)}" alt="Captura de tela ${index + 1} de ${esc(project.name)}" loading="lazy" decoding="async" />`,
    )
    .join('')
  return `<div class="project-gallery">${images}</div>`
}

function appsBody(project: PersonalProject): string {
  if (project.apps.length === 0) return ''

  const cards = project.apps
    .map(
      (app) => `
        <li class="project-app">
          <h3>${esc(app.name)}</h3>
          ${techChips(app.stack, techIconFor)}
        </li>`,
    )
    .join('')
  return `<ul class="project-apps">${cards}</ul>`
}

function syllabusBody(project: PersonalProject): string {
  if (project.syllabus.length === 0) return ''

  const lessons = project.syllabus
    .map(
      (lesson, index) => `
        <li class="project-lesson">
          <h3>Aula ${index + 1}: ${esc(lesson.title)}</h3>
          ${bulletList(lesson.items)}
        </li>`,
    )
    .join('')
  return `<ol class="project-syllabus">${lessons}</ol>`
}

/* ---------- Ações do cabeçalho ---------- */

function externalLink(href: string, label: string, className: string): string {
  return `<a class="${className}" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`
}

function actionsHtml(project: PersonalProject): string {
  const { links } = project
  const actions = [
    links.site
      ? externalLink(links.site, 'Ver aplicação', 'button button-primary')
      : '',
    links.repo
      ? externalLink(links.repo, 'Código no GitHub', 'button button-outline')
      : '',
    links.video
      ? externalLink(links.video, 'Vídeo de demonstração', 'detail-link')
      : '',
    links.layout ? externalLink(links.layout, 'Layout', 'detail-link') : '',
    links.challenge
      ? externalLink(links.challenge, 'Página do desafio', 'detail-link')
      : '',
  ]
  return actions.filter(Boolean).join('')
}

/* ---------- Página ---------- */

export function GithubProjectPage(project: PersonalProject): string {
  setPageTitle(project.name)

  const sections: SectionSpec[] = [
    {
      id: 'project-about',
      title: 'Sobre o projeto',
      body: paragraphBody(project.summary),
    },
    {
      id: 'project-screenshots',
      title: 'Capturas de tela',
      body: screenshotsBody(project),
    },
    {
      id: 'project-features',
      title: 'Funcionalidades',
      body: bulletList(project.features),
    },
    { id: 'project-apps', title: 'Aplicações', body: appsBody(project) },
    {
      id: 'project-syllabus',
      title: 'Roteiro das aulas',
      body: syllabusBody(project),
    },
    {
      id: 'project-techs',
      title: 'Tecnologias',
      body: techChips(project.techs, techIconFor),
    },
  ]

  return `
    ${Header()}
    <main id="conteudo" class="detail-container project-github-container">
      <section class="detail-hero">
        <div class="detail-wrapper">
          <a class="detail-back" href="/#projetos">&larr; Todos os projetos</a>

          <div class="detail-heading">
            ${CompanyThumbnail(project.name, undefined, 'detail-logo')}
            <div>
              <h1>${esc(project.name)}</h1>
              <p class="detail-subtitle">${esc(project.category)}</p>
            </div>
          </div>

          <dl class="detail-facts">
            ${Fact('Criado em', esc(formatMonthYear(project.createdAt)))}
            ${Fact('Último push', project.private ? '' : esc(formatMonthYear(project.pushedAt)))}
            ${Fact('Linguagem', esc(project.language))}
            ${Fact('Origem', project.fork ? 'Fork de um teste técnico' : '')}
            ${Fact('Código', project.private ? 'Privado' : '')}
          </dl>

          <div class="detail-actions">${actionsHtml(project)}</div>
        </div>
      </section>

      ${sections.map(Section).join('')}
    </main>
    ${Footer()}
  `
}
