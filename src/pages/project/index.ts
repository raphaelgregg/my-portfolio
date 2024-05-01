import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { getPojectsFindUserByID } from '../home/homeData';
import './styled.css';

export async function Project(projectId: string) {

  const project = await getPojectsFindUserByID(projectId);
  // project?.project.id,
  // project?.project.title,
  // project?.project.date,
  // project?.project.category,
  // project?.project.projectDescription,
  // project?.project.role,
  // project?.project.thumbnail,
  // project?.project.technologies




  return `
    ${Header()}
    <div class="project-container">  
      <header>
        <img src="${project?.project.thumbnail}" alt="banner">
      </header>
      <section class="project-brief">
        <div class="brief-wrapper">
          <h3>${project?.project.title}</h3>
          <p class="subtitle">${project?.project.projectDescription}.</p>
      
          <div class="project-brief-info">
            <div class="myrole">
              <b>Meu papel</b>
              <p>${project?.project.role}</p>
            </div>
      
            <div class="project">
              <b>Projeto</b>
              <p>Projeto Pessoal</p>
            </div>
      
            <div class="timeline">
              <b>Linhas do tempo</b>
              <p>${project?.project.date}</p>
            </div>
      
            <div class="tools">
              <b>Ferramentas usadas</b>

              <p>Figma, Adobe Illustrator, Principle</p>
            </div>
          </div>
        </div>
      </section>

      <section class="project-overview">
        <div class="overview-wrapper">
          <span class="overview-title">Visão Geral</span>
          
          <div class="prompt">
            <h3>Incitar</h3>
            <p>A Escola do Instituto de Arte de Chicago (SAIC) quer fortalecer a comunidade, incentivando os alunos experientes a se conectarem com novos alunos e ajudá-los a se adaptarem à vida no campus. Crie uma experiência que permita que mentores e mentorados se descubram. Considere as necessidades de mentores e mentorados, incluindo como alguém pode se tornar um mentor e como conectar mentores a mentorados.</p>
          </div>
      
          <div class="design-process">
            <h3>Processo</h3>
            <img src="../../../public/images/design-process.png" alt="design do projeto">
          </div>
      
          <div class="initial-thinking">
            <h3>Pensamento Inicial</h3>
            
            <div>
              <div class="list-initial-thinking">
                <span>Usuários Alvo</span>
                <ul class="list-ul-styled">
                  <li>Estudantes da Escola do Instituto de Arte de Chicago </li>
                  <li>Estudantes menos experientes que precisam de ajuda para se adaptarem adequadamente ao campus.</li>
                </ul>
              </div>
      
              <div class="list-initial-thinking">
                <span>Métodos de Pesquisa</span>
                <ul class="list-ul-styled">
                  <li>Pesquisa online (Formulário do Google)</li>
                  <li>Entrevista presencial</li>
                  <li>Pesquisa online</li>
                </ul>
              </div>
            </div>
          </div>
      
          <div class="how-might-we-questions">
            <h3>How Might We Questions</h3>
            <ul>
              <li>How might we make the experienced students and the new students go beyond sharing their experiences and form a sustainable mentor-mentee relationship?</li>
              <li>How might we help the students discover each other based on their needs?</li>
              <li>How might we make a platform a foundation for strengthening the school community?</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="project-user-research">
        <!-- Conteúdo relacionado à pesquisa de usuário -->
        <div class="user-research-wrapper">
          <span class="user-research-title">Pesquisa de Usuários</span>

          <div class="background-research">
            <h3>Pesquisa de Sistemas Existentes</h3>
            <div class="reserch-goals">
              <span>Objetivos de Pesquisa</span>
              <ul class="list-ul-styled">
                <li>Identificar plataformas on-line e no local existentes relacionadas à construção da comunidade</li>
                <li>Descubra como os novos alunos estão se conectando com estudantes experientes.</li>
                <li>Examine como os alunos desenvolveram sua relação mentor-mentor.</li>
                <li>Analise como os alunos estão utilizando o sistema atual.</li>
                <li>Identificar os pontos fortes/potenciais do sistema atual.</li>
              </ul>
            </div>
          </div>

          <div class="reserch">
            <h3>Pequisa <span>1</span> - Sistema Existente</h3>
            <ul class="list-ul-styled">
              <li>Mídias sociais (Instagram/Facebook)</li>
              <li>Eventos orientados a estudantes</li>
              <li>Envolvimento SAIC</li>
              <li>Feira da organização, Feira do grupo</li>
            </ul>

            <img src="#" alt="IMAGEM DE PESQUISA DE SISTEMA ">
          </div>
        </div>
      </section>

      <section class="project-problem">
        <!-- Conteúdo relacionado à identificação do problema -->
        <div class="problem-wrapper">
          <span class="problem-title">Desafio</span>

          <div class="problem-startment">
            <h3>Declaração de Problema</h3>
            <p>Não existe uma plataforma que apoie os alunos a encontrar mentores dentro da escola. Além disso, é difícil para os alunos estabelecerem uma relação sustentável</p>
          </div>
        </div>
      </section>
        
      <section class="project-design-concept">
        <!-- Conteúdo relacionado ao conceito de design -->
        <div class="design-concept-wrapper">
          <span class="design-concept-title">Prototype</span>

          <div class="wireframe">
            <h3>Wireframe</h3>
            <img src="https://firebasestorage.googleapis.com/v0/b/my-portfolio-5104c.appspot.com/o/wiframe-modelo2.webp?alt=media&token=388e7b83-6a30-464d-b185-1ea72c311110" alt="IMG COM PROTOTIPAÇÂO">
          </div>

          <div class="visual-identity">
            <h3>Identidade visual</h3>
            <img src="https://firebasestorage.googleapis.com/v0/b/my-portfolio-5104c.appspot.com/o/palet.webp?alt=media&token=c01a577f-963e-413a-9cb6-c95b630845d0" alt="IMG FONTS E CORES DO DESIGN">
          </div>
        </div>
      </section>

      <section class="project-user-feedback">
        <!-- Conteúdo relacionado ao feedback do usuário -->
        <div class="user-feedback-wrapper">
          <span class="user-feedback-title">Feedback do usuário</span>

          <div class="user-testing-feedback">
            <h3>Feedback de teste do usuário</h3>
            <ul class="list-ul-styled">
              <li>Itilits conveniente para encontrar todas as informações em uma plataforma.</li>
              <li>Itilits conveniente para verificar eventos e horários de orientação de relance.</li>
              <li>O recurso para enviar lembretes é ótimo.</li>
              <li>É claro quem pedir orientação.</li>
              <li>Eu gosto que não há recurso de revisão. Espero que haja um recurso de endosso.</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="project-reflection">
        <!-- Conteúdo relacionado à reflexão sobre o projeto -->
        <div class="reflection-wrapper">
          <span class="reflection-title">Reflexão</span>

          <div class="topics">
            <h3>Tópicos</h3>

            <p>Este projeto se concentrou na pesquisa do usuário e nas necessidades identificadas. Geralmente, se você seguir usuários, uma solução inevitavelmente se segue. Entrevistas com estudantes e pesquisas me permitiram descobrir diversas perspectivas e soluções.</p>

            <p>Se eu tivesse tido mais tempo, poderia ter coletado respostas da pesquisa de mais alunos. E acredito que poderia criar uma versão do site e uma plataforma móvel.</p>

            <p>Quando fiz a apresentação sobre minha inscrição na escola, senti muito orgulho de ouvir que o funcionário da escola me disse que faria mais coisas que poderia fazer imediatamente. Percebi que o papel de um designer de UX não é apenas projetar uma boa idéia, mas também desenvolver experiências cotidianas da comunidade com o design. </p>
          </div>
        </div>
      </section>
    </div>
    ${Footer()}
  `;
}