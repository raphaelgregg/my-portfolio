import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { CardExperienceJob } from '../../components/cardExperienceJob';
import { CardMyProject } from '../../components/cardMyProjects';

import data from '../../services/data.json';

import "./styles.css"


// export function Home() {
//   const jobs = data.projects.map(obj => ({
//     title: obj.title,
//     job: obj.job,
//     description: obj.description,
//     date: obj.date,
//     category: obj.category,
//     thumbnail: obj.thumbnail
//   })).filter(res => res.category == "job" );
  
//   const pessoalJobs = data.projects.filter(res => res.category === "pessoal" );

  

//   return `
//       ${Header()}
//       <div class="home-container">
//         <section class="brief">
//           <div class="brief-wrapper">
//             <img src="/svg/hero.svg" alt=""/>
            
//             <div>
//               <h1>
//                 Olá!
//                 <br/>
//                 Eu sou o Gregg,
//                 <br/> 
//                 <span class="gradient-text">dev front-end</span> aficionado por projetos web e Mobile.
//               </h1>
    
//               <p>Analista de sistemas formado pela <a href="https://www.unama.br/" target="_blank">Unama</a></span></p>      
//               <p>Futuro especialista em <a>desenvolvimento front-end</a></p>
//               <p>Atualmente, parte da equipe de trabalho da <a href="https://www.lanlink.com.br/" target="_blank">Lanlink Informática</a></p>
//             </div>
//           </div>
//         </section>

//         <section class="portfolio work">
//           <div class="portfolio-wrapper">
//             <div class="portfolio-wrapper-section-header">
//               <h4>Experiência Profissional</h4>
//             </div>
        
//             <div class="cards work">
//               ${ jobs ? jobs.map(job => Card(job)).join(" ") : ""}
//             </div>
//           </div>
//         </section>

//         <section class="portfolio">
//           <div class="portfolio-wrapper">
//             <div class="portfolio-wrapper-section-header">
//               <h4>Projetos Pessoais</h4>
//               <p>Para que você conheça um pouco mais do meu trabalho</p>
//             </div>
        
//             <div class="cards">
//               ${ pessoalJobs ? pessoalJobs.map(job => Card(job)).join(" ") : ""}
//             </div>
//           </div>
//         </section>
//       </div>
//     ${Footer()}
//     `
// }

export function Home() {
// data.experience.slice(1): Esta parte do código retorna uma cópia do array de experiências, excluindo o primeiro elemento. Isso é feito com o método slice(1), que retorna todos os elementos do array, exceto o primeiro.
// .sort((a, b) => ...): Aqui, estamos classificando as experiências com base em uma função de comparação. Esta função de comparação recebe dois parâmetros, a e b, que representam duas experiências diferentes.
// (b.departureDate === "presente" ? new Date() : new Date(b.departureDate || 0)).getTime(): Esta parte da função compara as datas de saída das experiências a e b. Se a data de saída de b for "presente", criamos uma nova data representando o momento atual usando new Date(). Caso contrário, usamos a data de saída de b. Se a data de saída de b não estiver disponível (ou seja, undefined), usamos 0 como valor padrão. Em seguida, chamamos .getTime() para obter o valor de tempo em milissegundos, o que nos permite comparar as datas numericamente.
// (a.departureDate === "presente" ? new Date() : new Date(a.departureDate || 0)).getTime(): Esta parte faz o mesmo que a anterior, mas para a experiência a.
// ...getTime() - ...getTime(): Finalmente, subtraímos os tempos das datas de saída de b e a, o que resulta em um número que determina a ordem de classificação das experiências. Se o resultado for negativo, a vem antes de b. Se for positivo, b vem antes de a. Se for zero, as duas datas são consideradas iguais e a ordem não é alterada.
  const sortedJobs = data.experience.slice(1).sort((a, b) =>
  (b.departureDate === "presente" ? new Date() : new Date(b.departureDate || 0)).getTime() -
  (a.departureDate === "presente" ? new Date() : new Date(a.departureDate || 0)).getTime()
  );

  const filteredExperienceJobs = sortedJobs.map(experience => {
    const job = experience.jobs[0] || {};
        
    return {
      company: experience.companyShortName,
      thumbnail: experience.thumbnailCompany || "",
      job: job.title || "",
      description: experience.companyOverviewShort || "",
    };
  });
  console.log(filteredExperienceJobs)

  // Meus projetos pessoais
  const filteredMyProjects = data.experience[0].projects;

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
          <div class="header">
            <h4>Experiência Profissional</h4>
          </div>
      
          <div class="cards-wrapper scroll">
            ${ filteredExperienceJobs ? 
              filteredExperienceJobs
              .map((job, index) => CardExperienceJob(job, index)).join(" ") 
              : 
              ""}
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
            ${ filteredMyProjects ? filteredMyProjects.map(project => CardMyProject(project)).join(" ") : ""}
          </div>
        </div>
      </section>
    </div>
    ${Footer()}
  `;
}
