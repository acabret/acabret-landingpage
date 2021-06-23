const formButton = document.querySelector("#form-submit");
const contactForm = document.querySelector("#contact-form");

formButton.addEventListener("click", submitForm);
contactForm.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();
  console.log("submiteando el form desde", this);

  //ejecutar animacion del boton
  //verificar datos correctamente ingresados
  //


  

  // fetch("")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     //terminar animacion del boton
  //     //desplegar mensaje de que el mensaje se ha enviado de forma correcta
  //   })
  //   .catch((error) => {
  //     console.log("errorcete");
  //   });
}
