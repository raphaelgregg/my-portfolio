export function Card() {
  return `
  <div class="card">
    <img src="https://assets-global.website-files.com/64c1de6909d566eef48d4dfd/6504057596969ba574d148c5_Frame%2059%201.svg" alt="" />
    
    <div class="card-info">
      <h3>Project Name</h3>
      
      <p>Função no projeto</p>
      <p>Descrição</p>

      <div class="card-techs">
        <span>
          <img src="./src/assets/svg/html2.svg" />
          Html
        </span>
        <span>
          <img src="./src/assets/svg/css2.svg" />
          Css
        </span>
        <span>
          <img src="./src/assets/svg/js2.svg" />
          JavaScript
        </span>
        <span>
          <img src="./src/assets/svg/ts.svg" />
          TypeScript
        </span>
      </div>
    </div>

    <div class="line"></div>
    
    <div class="card-footer">
      Desenvolvido em 16/03/2024.
    </div>
  </div>
  `;
}