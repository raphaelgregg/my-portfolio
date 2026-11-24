import { Footer } from '../../components/footer'
import { Header } from '../../components/header'
import { escapeHtml as esc } from '../../utils/escapeHtml'
import { getYear } from '../../utils/extractFromDate'
import { fetchPersonalProject } from '../home/homeData'
import './styles.css'

/** Renderiza cada item de uma lista (que pode não existir no banco). */
function renderList<T>(
  items: T[] | undefined,
  render: (item: T) => string,
): string {
  return (items ?? []).map(render).join('')
}

export async function Project(projectId: string) {
  const project = await fetchPersonalProject(projectId)

  if (!project) {
    return `
      ${Header()}
      <div class="project-container">
        <section class="project-brief">
          <div class="brief-wrapper">
            <h3>Projeto não encontrado</h3>
            <p class="subtitle"><a href="/">Voltar para o início</a></p>
          </div>
        </section>
      </div>
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
    <div class="project-container">  
      <header class="project-header">
        <img src="${esc(banner)}" alt="Banner do projeto ${esc(title)}">
      </header>
      <section class="project-brief">
        <div class="brief-wrapper">
          <h3>${esc(title)}</h3>
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
            <h3>Incitar</h3>
            <p>${esc(overview?.prompt)}</p>
          </div>
      
          <div class="design-process">
            <h3>Processo</h3>
            <img src="${esc(overview?.designProcess)}" alt="Processo de design do projeto">
          </div>
      
          <div class="initial-thinking">
            <h3>Pensamento Inicial</h3>
            
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
            <h3>Como poderíamos fazer perguntas</h3>
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
            <h3>Pesquisa de Sistemas Existentes</h3>
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
            <h3>Declaração de Problema</h3>
            ${renderList(challenge, (statement) => `<p>${esc(statement)}</p>`)}
          </div>
        </div>
      </section>
        
      <section class="project-design-concept">
        <div class="design-concept-wrapper">
          <span class="design-concept-title">Prototype</span>

          <div class="wireframe">
            <h3>Wireframe</h3>
            ${renderList(prototype?.wireframe, (frame) => `<img src="${esc(frame)}" alt="Wireframe do protótipo">`)}
          </div>

          <div class="visual-identity">
            <h3>Identidade visual</h3>
            ${renderList(prototype?.visualIdentity, (identity) => `<img src="${esc(identity)}" alt="Fontes e cores do design">`)}
          </div>
        </div>
      </section>

      <section class="project-user-feedback">
        <div class="user-feedback-wrapper">
          <span class="user-feedback-title">Feedback do usuário</span>

          <div class="user-testing-feedback">
            <h3>Feedback de teste do usuário</h3>
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
            <h3>Tópicos</h3>
            ${renderList(reflection, (paragraph) => `<p>${esc(paragraph)}</p>`)}
          </div>
        </div>
      </section>
    </div>
    ${Footer()}
  `
}
