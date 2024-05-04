
import { ExperienceDTO } from "../../dtos/experienceDTO";
import "./styles.css";

export function CardExperience({id, thumbnailCompany, jobs, companyShortName, companyOverviewShort}: ExperienceDTO) {
  
  return `
  <div class="card-experience-job">
  <a href="/experience/${id}">
      <div class="wrapper-card">  
        <img src="${thumbnailCompany}" alt="thumbnail do projeto" />
      
        <div class="info">
          <h3>${companyShortName}</h3>
          
          <p class="job">${jobs?.[0].title}</p>
          <p class="description limited-lines">${companyOverviewShort}</p>
        </div>
      </div>
      </a>
    </div>
  `;
}