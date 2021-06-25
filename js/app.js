const formButton = document.querySelector("#form-submit");
const contactForm = document.getElementById("contact-form");

formButton.addEventListener("click", submitForm);
contactForm.addEventListener("submit", submitForm);


//decidir si usar boton o input con estilo de boton para submit del form
function submitForm(event) {
  event.preventDefault();
  const data = new FormData(contactForm)
  console.log(data);
  // console.log("submiteando el form desde", this);

  for(const entry in data.entries()){
    console.log("dato del form", entry);
  }

  //ejecutar animacion del boton
  //verificar datos correctamente ingresados
  //usar validate.js
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
