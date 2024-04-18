import "./styles.css"

export function Form() {
  return`
  <form id="my-form">
    <fieldset>
        <div class="fieldset-wrapper">
          <legend>Contato</legend>

          <div class="input-wrapper">
            <label for="event-title">Nome<span>(mínimo 8 caracteres)</span></label>
            <input 
              type="text" 
              id="event-title"
              required
              minlength="8" 
            />
          </div>

          <div class="input-wrapper">
            <label for="event-whatsapp">Whatsapp para contato<span>(somente números)</span></label>
            <input 
              type="number" 
              id="event-whatsapp"
              required
            />
          </div>

          <div class="input-wrapper">
            <label for="event-email">E-mail do para contato<span>(digite um email válido)</span></label>
            <input 
              type="email" 
              id="event-emain" 
              required
            />
          </div>

          <div class="input-wrapper">
            <label for="event-info">Mensagem</label>
            <textarea type="text" id="event-info"></textarea>
          </div>

        </div>
      </fieldset>

      <input 
      type="submit" 
      class="button" 
      value="Enviar"
      form="my-form"
    />
    </form>
  `;
}