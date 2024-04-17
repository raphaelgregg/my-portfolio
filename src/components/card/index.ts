interface CardProps {
  title: string;
  job: string;
  description: string;
  techs?: string[] ;
  date: string;
  thumbnail?: string;
}

export function Card({title, job, description, techs, date, thumbnail}: CardProps) {

  return `
  <div class="card">
    <div class="wrapper-card">  
      <img src="${thumbnail}" alt="thumbnail do projeto" />
    
      <div class="card-info">
        <h3>${title}</h3>
        
        <p class="job">${job}</p>
        <p class="description">${description}</p>

        ${techs ? 
          `
          <div class="card-techs">
            ${ techs.map(tech => {
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
    
    <div class="card-footer">
      Desenvolvido em ${date}.
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