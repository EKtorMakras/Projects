class Modal {

  constructor() {
    this.injectHTML();
    this.modal = document.querySelector('.modal');
    this.closeBtn = document.querySelector('.modal__close');
    this.events()
  }


  events() {

    // listen for close click
    this.closeBtn.addEventListener('click', (evt) => {
      this.closeModal();
    })

    // listen for esc key
    window.addEventListener('keydown', (evt) => {
      this.keyPressHandler(evt)
    })
  }


  openModal() {
    this.modal.classList.add('visible');
  }

  closeModal() {
    this.modal.classList.remove('visible');
  }

  keyPressHandler(evt) {
    if (evt.key === 'Escape') {
      this.closeModal()
    }
  }


  injectHTML() {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="modal">
        <div class="modal__inner">
          <div class="modal__title-wrapper">
            <img src="/images/icons/mail.svg" class="section-title__icon">
            <h2 class="section-title modal__title">Get in <span>Touch</span></h2>
          </div>
          <div class="wrapper wrapper--narrow">
            <p class="modal__description">We will have an online order system in place soon. Until then, connect with us on
              any of the platforms below!</p>
          </div>

          <div class="social-icons">
            <a href="#" class="social-icons__icon"><i class="fab fa-facebook"></i></a>
            <a href="#" class="social-icons__icon"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-icons__icon"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-icons__icon"><i class="fab fa-youtube"></i></a>
          </div>
        </div>

      <div class="modal__close">X</div>
    </div>
  `);
  }
}


export default Modal;