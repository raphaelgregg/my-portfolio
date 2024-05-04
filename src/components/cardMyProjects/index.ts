import { ProjectDTO } from "../../dtos/experienceDTO";
import { extractFromDate } from "../../utils/extractFromDate";

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
      Desenvolvido em ${extractFromDate(date, "custom-text")}
    </div>
    </a>
  </div>
  `;
}