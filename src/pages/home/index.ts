import { Card } from '../../components/card';
import { Footer } from '../../components/footer';
// import { Form } from '../../components/form';
import { Header } from '../../components/header';
import data from '../../services/data.json'

// const data = 
// {
//     projects: [
//       {
//         title:"Entrelinhas", 
//         job: "Desenvolvedor Mobile", 
//         description:"App educacional de apendizagem de multiletramentos",
//         techs: ["html", "css", "typescript"],
//         date: "2017-08-01",
//         category: 'job'
//       },
//       {
//         title:"AppAdmin", 
//         job: "Desenvolvedor Front-end", 
//         description:"Aplicação web com um dashboard de processos juridicos",
//         techs: ["html", "css", "typescript"],
//         date: "2017-08-01",
//         category: 'job'
//       },
//       {
//         title:"ControlMidia", 
//         job: "Desenvolvedor Front-end", 
//         description:"Aplicação de multiletramentos",
//         techs: ["html", "css", "typescript"],
//         date: "2017-08-01",
//         category: 'job'
//       },
//       {
//         title:"My Portfolio", 
//         job: "Desenvolvedor Front-end", 
//         description:"Aplicação de multiletramentos",
//         techs: ["html", "css", "typescript"],
//         date: "2017-08-01",
//         category: 'pessoal'
//       }
//     ]
//   };

export function Home() {
  const jobs = data.projects.map(obj => ({
    title: obj.title,
    job: obj.job,
    description: obj.description,
    date: obj.date,
    category: obj.category
  })).filter(res => res.category === "job" );
  
  const pessoalJobs = data.projects.filter(res => res.category === "pessoal" );

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
                Eu sou o Gregg,
                <br/> 
                <span class="gradient-text">dev front-end</span> aficionado por projetos web e Mobile.
              </h1>

    
              <p>Analista de sistemas formado pela <a href="https://www.unama.br/" target="_blank">Unama</a></span></p>      
              <p>Futuro especialista em <a>desenvolvimento front-end</a></p>
              <p>Atualmente, parte da equipe de trabalho da <a href="https://www.lanlink.com.br/" target="_blank">Lanlink Informática</a></p>
            </div>
          </div>
        </section>

        <section class="portfolio work">
          <div class="portfolio-wrapper">
            <div class="portfolio-wrapper-section-header">
              <h4>Experiência Profissional</h4>
            </div>
        
            <div class="cards work">
              ${ jobs ? jobs.map(job => Card(job)).join(" ") : ""}
            </div>
          </div>
        </section>

        <section class="portfolio">
          <div class="portfolio-wrapper">
            <div class="portfolio-wrapper-section-header">
              <h4>Projetos Pessoais</h4>
              <p>Para que você conheça um pouco mais do meu trabalho</p>
            </div>
        
            <div class="cards">
              ${ pessoalJobs ? pessoalJobs.map(job => Card(job)).join(" ") : ""}
            </div>
          </div>
        </section>
      </div>
    ${Footer()}
    `
}
