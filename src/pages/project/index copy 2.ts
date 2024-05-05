import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { ProjectDTO } from '../../dtos/experienceDTO';
import { extractFromDate } from '../../utils/extractFromDate';
import { getPojectsFindUserByID } from '../home/homeData';
import './styled.css';

export async function Project(projectId: string) {

  // Obtendo os dados do projeto
  const projectResult = await getPojectsFindUserByID(projectId);

  // Verificando se os dados do projeto existem
  if (!projectResult) {
    return ''; // Retorna uma string vazia se os dados do projeto não existirem
  }

  // Desestruturando apenas as propriedades desejadas do projeto
  const {
    project: {
      banner,
      date,
      developmentDuration,
      id,
      projectDescription,
      projectType,
      role,
      technologies,
      thumbnail,
      title,
      tools,
      overview,
      userResearch,
      challenge,
      prototype,
      userFeedback,
      reflection
    } = {} as ProjectDTO // Definindo um tipo padrão como vazio para garantir que as propriedades existam
  } = projectResult || {}; 


  // Se precisar, você pode comentar sobre o motivo de não estar utilizando as outras variáveis
  // console.log("banner:", banner);
  // console.log("date:", date);
  // console.log("developmentDuration:", developmentDuration);
  console.log("id:", id);
  // console.log("projectDescription:", projectDescription);
  // console.log("projectType:", projectType);
  // console.log("prompt:", prompt);
  // console.log("role:", role);
  // console.log("technologies:", technologies);
  // console.log("thumbnail:", thumbnail);
  // console.log("title:", title);
  // console.log("Tools:", tools);
  // console.log("challenge:", challenge);

  return `
    ${Header()}
    <div class="project-container">  
      <header class="project-header">
        <img src="${banner}" alt="banner project">
      </header>
      ${projectBriefSection({title, projectDescription, role, projectType, developmentDuration, date, tools})}
      ${overview ? projectOverviewSection({overview}) : ''}
      ${userResearch ? projectUserResearchSection({userResearch}) : ''}
      ${challenge ? projectProblemSection({challenge}) : ''}
      ${prototype ? projectDesignConceptSection({prototype}) : ''}
      ${userFeedback ? projectUserFeedbackSection({userFeedback}) : ''}
      ${reflection ? projectReflectionSection({reflection}) : ''}
    </div>
    ${Footer()}
  `;
}

function projectBriefSection(project: ProjectDTO) {
  if (!project) return ''; // Verifica se os dados do projeto existem

  const {
    title,
    projectDescription,
    role,
    projectType,
    developmentDuration,
    date,
    tools
  } = project;

  return `
    <section class="project-brief">
      <div class="brief-wrapper">
        <h3>${title}</h3>
        <p class="subtitle">${projectDescription}</p>

        <div class="project-brief-info">
          <div class="myrole">
            <b>Meu papel</b>
            <p>${role}</p>
          </div>

          <div class="project">
            <b>Projeto</b>
            <p>${projectType}</p>
          </div>

          <div class="timeline">
            <b>Linhas do tempo</b>
            <p>${developmentDuration} dias (${extractFromDate(date || "", 'year')})</p>
          </div>

          <div class="tools">
            <b>Ferramentas utilizadas</b>
            <p>${tools?.join(', ')}</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Função para renderizar a seção de Visão Geral do Projeto
function projectOverviewSection({overview}:ProjectDTO) {
  if (!overview) return ''; // Verifica se os dados de visão geral existem

  return `
    <section class="project-overview">
      <div class="overview-wrapper">
        <span class="overview-title">Visão Geral</span>
        
        <div class="prompt">
          <h3>Incitar</h3>
          <p>${overview.prompt}</p>
        </div>
    
        <div class="design-process">
          <h3>Processo</h3>
          <img src="${overview.designProcess}" alt="design do projeto">
        </div>
    
        <div class="initial-thinking">
          <h3>Pensamento Inicial</h3>
          
          <div>
            <div class="list-initial-thinking">
              <span>Usuários Alvo</span>
              <ul class="list-ul-styled">
                ${overview.initialThinking.targetUsers.map((user) => `<li>${user}</li>`).join('')}
              </ul>
            </div>
    
            <div class="list-initial-thinking">
              <span>Métodos de Pesquisa</span>
              <ul class="list-ul-styled">
                ${overview.initialThinking.researchMethods.map((method) => `<li>${method}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
    
        <div class="how-might-we-questions">
          <h3>Como poderíamos fazer perguntas</h3>
          <ul>
            ${overview.howMightWeQuestions.map((question) => `<li>${question}</li>`).join('')}
          </ul>
        </div>
      </div>
    </section>
  `;
}

// Função para renderizar a seção de Pesquisa de Usuários do Projeto
function projectUserResearchSection({userResearch}:ProjectDTO) {
  if (!userResearch) return ''; // Verifica se os dados de pesquisa de usuário existem

  return `
    <section class="project-user-research">
      <div class="user-research-wrapper">
        <span class="user-research-title">Pesquisa de Usuários</span>

        <div class="background-research">
          <h3>Pesquisa de Sistemas Existentes</h3>
          <div class="research-goals">
            <span>Objetivos de Pesquisa</span>
            <ul class="list-ul-styled">
              ${userResearch.backgroundResearch.map((research) => `<li>${research}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div class="system-research">
          <span>Referências de Sistemas e Design</span>
          
          <div>
            <ul class="list-ul-styled">
              ${userResearch.existingSystems.map((system) => `<li>${system}</li>`).join('')}
            </ul>
            
            <div class="list-img">
              ${userResearch.imgSystems.map((url) => `<img src="${url}" alt="IMAGEM DE PESQUISA DE SISTEMA ">`).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Função para renderizar a seção de Identificação do Problema do Projeto
function projectProblemSection({challenge}: ProjectDTO) {
  if (!challenge) return ''; // Verifica se os dados de desafio existem

  return `
    <section class="project-problem">
      <div class="problem-wrapper">
        <span class="problem-title">Desafio</span>

        <div class="problem-startment">
          <h3>Declaração de Problema</h3>
          ${challenge.map((challenge) => `<p>${challenge}</p>`).join('')}
        </div>
      </div>
    </section>
  `;
}

// Função para renderizar a seção de Conceito de Design do Projeto
function projectDesignConceptSection({prototype}: ProjectDTO) {
  if (!prototype) return ''; // Verifica se os dados de protótipo existem

  return `
    <section class="project-design-concept">
      <div class="design-concept-wrapper">
        <span class="design-concept-title">Prototype</span>

        <div class="wireframe">
          <h3>Wireframe</h3>
          ${prototype.wireframe.map((frame) => `<img src="${frame}" alt="IMG COM PROTOTIPAÇÂO">`).join('')}
        </div>

        <div class="visual-identity">
          <h3>Identidade visual</h3>
          ${prototype.visualIdentity.map((identity) => `<img src="${identity}" alt="IMG FONTS E CORES DO DESIGN">`).join('')}
        </div>
      </div>
    </section>
  `;
}

// Função para renderizar a seção de Feedback do Usuário do Projeto
function projectUserFeedbackSection({userFeedback}: ProjectDTO) {
  if (!userFeedback) return ''; // Verifica se os dados de feedback do usuário existem

  return `
    <section class="project-user-feedback">
      <div class="user-feedback-wrapper">
        <span class="user-feedback-title">Feedback do usuário</span>

        <div class="user-testing-feedback">
          <h3>Feedback de teste do usuário</h3>
          <ul class="list-ul-styled">
            ${userFeedback.map(feedback => `<li>${feedback}</li>`).join('')}
          </ul>
        </div>
      </div>
    </section>
  `;
}

// Função para renderizar a seção de Reflexão sobre o Projeto
function projectReflectionSection({reflection}: ProjectDTO) {
  if (!reflection) return ''; // Verifica se os dados de reflexão existem

  return `
    <section class="project-reflection">
      <div class="reflection-wrapper">
        <span class="reflection-title">Reflexão</span>

        <div class="topics">
          <h3>Tópicos</h3>
          ${reflection.map(paragraph => `<p>${paragraph}</p>`).join('')}
        </div>
      </div>
    </section>
  `;
}
