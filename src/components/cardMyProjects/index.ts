import { ProjectDTO } from "../../dtos/experienceDTO";

import "./styles.css";

export function CardMyProject({id, title, role, projectDescriptionShort, technologies, date, thumbnail}: ProjectDTO) {
  return `
  <div class="card-my-project">
  <a href="/project/${id}">
    <div class="wrapper-card">  
      <img src="${thumbnail}" alt="thumbnail do projeto" />
    
      <div class="info">
        <h3>${title}</h3>
        
        <p class="role">${role}</p>
        <p class="description">${projectDescriptionShort}</p>

        ${technologies ? 
          `
          <div class="techs">
            ${ technologies.map(tech => {
              return `
              <span>
                <img src="/svg/${tech}.svg" />
                ${tech}
              </span>
              `
            }).join(' ')}
          </div>
          `
          : "" }
      </div>
    </div>
    
    <div class="footer">
      Desenvolvido em ${date}.
    </div>
    </a>
  </div>
  `;
}

// <div class="card-techs">
// <span>
//   <img src="/svg/html2.svg" />
//   Html
// </span>
// <span>
//   <img src="/svg/css2.svg" />
//   Css
// </span>
// <span>
//   <img src="/svg/js2.svg" />
//   JavaScript
// </span>
// <span>
//   <img src="/svg/ts.svg" />
//   TypeScript
// </span>
// </div>