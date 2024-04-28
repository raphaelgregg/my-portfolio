
import { ExperienceDTO } from "../../dtos/experienceDTO";
import "./styles.css";

export function CardExperience({thumbnailCompany, jobs, companyShortName, companyOverviewShort}: ExperienceDTO) {
  
  return `
  <div class="card-experience-job">
    <div class="wrapper-card">  
      <img src="${thumbnailCompany}" alt="thumbnail do projeto" />
    
      <div class="info">
        <h3>${companyShortName}</h3>
        
        <p class="job">${jobs?.[0].title}</p>
        <p class="description limited-lines">${companyOverviewShort}</p>
      </div>
    </div>
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