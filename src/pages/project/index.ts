import { Footer } from '../../components/footer'
import { Header } from '../../components/header'
import { escapeHtml as esc } from '../../utils/escapeHtml'
import { setPageTitle } from '../../utils/pageTitle'
import { getYear } from '../../utils/extractFromDate'
import { findGithubProject } from '../../data/github-projects'
import { fetchPersonalProject } from '../home/homeData'
import { GithubProjectPage } from './github'
import './styles.css'

/** Renderiza cada item de uma lista (que pode não existir no banco). */
function renderList<T>(
  items: T[] | undefined,
  render: (item: T) => string,
): string {
  return (items ?? []).map(render).join('')
}

export async function Project(projectId: string) {
  // Projetos pessoais = fixados do GitHub; os ids numéricos antigos (estudos de
  // caso do Firebase) continuam funcionando abaixo
  const githubProject = findGithubProject(projectId)
  if (githubProject) return GithubProjectPage(githubProject)

  const project = await fetchPersonalProject(projectId)
  setPageTitle(project?.title ?? 'Projeto não encontrado')

  if (!project) {
    return `
      ${Header()}
      <main id="conteudo" class="project-container">
        <section class="project-brief">
          <div class="brief-wrapper">
            <h1>Projeto não encontrado</h1>
            <p class="subtitle"><a href="/">Voltar para o início</a></p>
          </div>
        </section>
      </main>
      ${Footer()}
    `
  }

  const {
    banner,
    date,
    developmentDuration,
    projectDescription,
    projectType,
    role,
    title,
    tools,
    overview,
    userResearch,
    challenge,
    prototype,
    userFeedback,
    reflection,
  } = project

  return `
    ${Header()}
    <main id="conteudo" class="project-container">  
      <header class="project-header">
        <img src="${esc(banner)}" alt="Banner do projeto ${esc(title)}">
      </header>
      <section class="project-brief">
        <div class="brief-wrapper">
          <h1>${esc(title)}</h1>
          <p class="subtitle">${esc(projectDescription)}</p>
      
          <div class="project-brief-info">
            <div class="myrole">
              <b>Meu papel</b>
              <p>${esc(role)}</p>
            </div>
      
            <div class="project">
              <b>Projeto</b>
              <p>${esc(projectType)}</p>
            </div>
      
            <div class="timeline">
              <b>Linhas do tempo</b>
              <p>${esc(developmentDuration)} dias (${esc(getYear(date))})</p>
            </div>
      
            <div class="tools">
              <b>Ferramentas utilizadas</b>

              <p>${esc((tools ?? []).join(', '))}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="project-overview">
        <div class="overview-wrapper">
          <span class="overview-title">Visão Geral</span>
          
          <div class="prompt">
            <h2>Incitar</h2>
            <p>${esc(overview?.prompt)}</p>
          </div>
      
          <div class="design-process">
            <h2>Processo</h2>
            <img src="${esc(overview?.designProcess)}" alt="Processo de design do projeto">
          </div>
      
          <div class="initial-thinking">
            <h2>Pensamento Inicial</h2>
            
            <div>
              <div class="list-initial-thinking">
                <span>Usuários Alvo</span>
                <ul class="list-ul-styled">
                  ${renderList(overview?.initialThinking.targetUsers, (user) => `<li>${esc(user)}</li>`)}
                </ul>
              </div>
      
              <div class="list-initial-thinking">
                <span>Métodos de Pesquisa</span>
                <ul class="list-ul-styled">
                  ${renderList(overview?.initialThinking.researchMethods, (method) => `<li>${esc(method)}</li>`)}
                </ul>
              </div>
            </div>
          </div>
      
          <div class="how-might-we-questions">
            <h2>Como poderíamos fazer perguntas</h2>
            <ul>
              ${renderList(overview?.howMightWeQuestions, (question) => `<li>${esc(question)}</li>`)}
            </ul>
          </div>
        </div>
      </section>

      <section class="project-user-research">
        <div class="user-research-wrapper">
          <span class="user-research-title">Pesquisa de Usuários</span>

          <div class="background-research">
            <h2>Pesquisa de Sistemas Existentes</h2>
            <div class="research-goals">
              <span>Objetivos de Pesquisa</span>
              <ul class="list-ul-styled">
                ${renderList(userResearch?.backgroundResearch, (research) => `<li>${esc(research)}</li>`)}
              </ul>
            </div>
          </div>

          <div class="system-research">
            <span>Referências de Sistemas e Design</span>
            
            <div>
              <ul class="list-ul-styled">
              ${renderList(userResearch?.existingSystems, (system) => `<li>${esc(system)}</li>`)}
              </ul>
              
              <div class="list-img">
              ${renderList(userResearch?.imgSystems, (url) => `<img src="${esc(url)}" alt="Referência de sistema pesquisado">`)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="project-problem">
        <div class="problem-wrapper">
          <span class="problem-title">Desafio</span>

          <div class="problem-startment">
            <h2>Declaração de Problema</h2>
            ${renderList(challenge, (statement) => `<p>${esc(statement)}</p>`)}
          </div>
        </div>
      </section>
        
      <section class="project-design-concept">
        <div class="design-concept-wrapper">
          <span class="design-concept-title">Prototype</span>

          <div class="wireframe">
            <h2>Wireframe</h2>
            ${renderList(prototype?.wireframe, (frame) => `<img src="${esc(frame)}" alt="Wireframe do protótipo">`)}
          </div>

          <div class="visual-identity">
            <h2>Identidade visual</h2>
            ${renderList(prototype?.visualIdentity, (identity) => `<img src="${esc(identity)}" alt="Fontes e cores do design">`)}
          </div>
        </div>
      </section>

      <section class="project-user-feedback">
        <div class="user-feedback-wrapper">
          <span class="user-feedback-title">Feedback do usuário</span>

          <div class="user-testing-feedback">
            <h2>Feedback de teste do usuário</h2>
            <ul class="list-ul-styled">
              ${renderList(userFeedback, (feedback) => `<li>${esc(feedback)}</li>`)}
            </ul>
          </div>
        </div>
      </section>

      <section class="project-reflection">
        <div class="reflection-wrapper">
          <span class="reflection-title">Reflexão</span>

          <div class="topics">
            <h2>Tópicos</h2>
            ${renderList(reflection, (paragraph) => `<p>${esc(paragraph)}</p>`)}
          </div>
        </div>
      </section>
    </main>
    ${Footer()}
  `
}
