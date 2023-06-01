import axios from "axios";
import { endpoints } from "./data";

class ClientArea {

  constructor() {
    this.injectHTML();
    this.form = document.querySelector('.client-area__form');
    this.field = document.querySelector('.client-area__input');
    this.contentArea = document.querySelector('.client-area__content-area');
    this.events();
  }


  events() {
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.sendRequest(this.field.value);
    })
  }


  async sendRequest(value) {

    const url = endpoints.secretArea;
    const payload = {
      password: value
    }
    
    try {
      const response = await axios.post(url, payload);
      this.form.remove();
      this.contentArea.innerHTML = response.data;
    }

    catch (err) {
      this.contentArea.innerHTML = `<p class="client-area__error">That secret phrase is not correct.Please try again.</p>`
      this.field.value = '';
      this.field.focus()
    }
  }


  injectHTML() {
    document.body.insertAdjacentHTML('beforeend', `
      <section class="section client-area">
        <div class="section-center">
          <h2 class="section-title">Secret Client Area</h2>
          <form class="client-area__form" action="">
            <input class="client-area__input" type="text" placeholder="Enter the secret phrase">
            <button class="btn-secondary">Submit</button>
          </form>
          <div class="client-area__content-area"></div>
        </div>
      </section>
    `)
  }

}


export default ClientArea;