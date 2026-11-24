import { CardExperience } from '../../components/cardExperience'
import { Carousel } from '../../components/carousel'
import { CardMyProject } from '../../components/cardMyProjects'
import { Footer } from '../../components/footer'
import { Header } from '../../components/header'
import { GITHUB_PROFILE_URL, githubProjects } from '../../data/github-projects'
import { escapeHtml as esc } from '../../utils/escapeHtml'
import { toCardProject } from './toCardProject'
import {
  fetchEducation,
  fetchExperience,
  fetchUser,
  splitExperience,
} from './homeData'

import './styles.css'

export async function Home() {
  const [user, education, experience] = await Promise.all([
    fetchUser(),
    fetchEducation(),
    fetchExperience(),
  ])
  const { jobs } = splitExperience(experience)

  const universities = Array.isArray(education)
    ? education.map((item) => item.universityShortName).join(', ')
    : ''
  const currentJob = jobs[0]

  return `
    ${Header()}
    <main id="conteudo" class="home-container">
      <section class="brief">
        <div class="brief-wrapper">
          <img src="/svg/hero.svg" alt=""/>

          <div>
            <h1>
              Olá!
              <br/>
              Eu sou o ${esc(user?.surname)},
              <br/>
              <span class="gradient-text">dev front-end</span> aficionado por projetos web e Mobile.
            </h1>
            <p>Analista de sistemas formado pela <span>
              <a href="https://www.unama.br/" target="_blank" rel="noopener noreferrer">${esc(universities)}</a>
            </span></p>
            ${user?.profession ? `<p>Futuro especialista em <a>${esc(user.profession)}</a></p>` : ''}
            ${
              currentJob
                ? `<p>Atualmente, parte da equipe de trabalho da <a href="https://www.lanlink.com.br/" target="_blank" rel="noopener noreferrer">${esc(currentJob.companyShortName)}</a></p>`
                : ''
            }

            <div class="hero-actions">
              <a class="button button-primary" href="/#projetos">Ver projetos</a>
              <a class="button button-outline" href="/resume">Ver currículo</a>
            </div>
          </div>
        </div>
      </section>

      <section id="experiencia" class="portfolio work" aria-labelledby="experiencia-titulo">
        <div class="portfolio-wrapper">
          <div class="header">
            <h2 id="experiencia-titulo" class="section-title">Experiência Profissional</h2>
          </div>

          ${Carousel({
            label: 'Carrossel de experiências',
            items: jobs.map((job) => CardExperience(job)),
          })}
        </div>
      </section>

      <section id="projetos" class="portfolio" aria-labelledby="projetos-titulo">
        <div class="portfolio-wrapper">
          <div class="header">
            <h2 id="projetos-titulo" class="section-title">Projetos Pessoais</h2>
            <p>
              Os repositórios que mantenho fixados no meu
              <a class="section-link" href="${GITHUB_PROFILE_URL}" target="_blank" rel="noopener noreferrer">GitHub</a>
            </p>
          </div>

          <div id="my-projects" class="cards-wrapper">
            ${githubProjects.map((project) => CardMyProject(toCardProject(project))).join(' ')}
          </div>
        </div>
      </section>
    </main>
    ${Footer()}
  `
}
