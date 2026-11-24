import { CardExperience } from '../../components/cardExperience'
import { CardMyProject } from '../../components/cardMyProjects'
import { Footer } from '../../components/footer'
import { Header } from '../../components/header'
import { escapeHtml as esc } from '../../utils/escapeHtml'
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
  const { jobs, personalProjects } = splitExperience(experience)

  const universities = Array.isArray(education)
    ? education.map((item) => item.universityShortName).join(', ')
    : ''
  const currentJob = jobs[0]

  return `
    ${Header()}
    <div class="home-container">
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
          </div>
        </div>
      </section>

      <section class="portfolio work">
        <div class="portfolio-wrapper">
          <div class="header">
            <h4>Experiência Profissional</h4>
          </div>

          <div class="cards-wrapper scroll">
            ${jobs.map((job) => CardExperience(job)).join(' ')}
          </div>
        </div>
      </section>

      <section class="portfolio">
        <div class="portfolio-wrapper">
          <div class="header">
            <h4>Projetos Pessoais</h4>
            <p>Para que você conheça um pouco mais do meu trabalho</p>
          </div>

          <div id="my-projects" class="cards-wrapper">
            ${personalProjects.map((project) => CardMyProject(project)).join(' ')}
          </div>
        </div>
      </section>
    </div>
    ${Footer()}
  `
}
