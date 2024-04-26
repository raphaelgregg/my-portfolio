import "./styles.css";

interface CardProps {
  company: string;
  job: string;
  description: string;
  techs?: string[] ;
  date?: string;
  thumbnail?: string;
}

export function CardExperienceJob({company, job, description, thumbnail}: CardProps, index: number) {
// console.log(index)
  return `
  <div class="card-experience-job">
    <div class="wrapper-card">  
      <img src="${thumbnail}" alt="thumbnail do projeto" />
    
      <div class="info">
        <h3>${company}</h3>
        
        <p class="job">${job}</p>
        <p class="description limited-lines">${description}</p>
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