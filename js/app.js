const formButton = document.querySelector("#form-submit");
const contactForm = document.getElementById("contact-form");

const inputNombre = document.getElementById("form-nombre");
const inputEmail = document.getElementById("form-email");
const inputMensaje = document.getElementById("form-mensaje");

const emailHTML = document.getElementById("email");
const email =
  "&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#111;&#064;&#097;&#099;&#097;&#098;&#114;&#101;&#116;&#046;&#099;&#111;&#109";

emailHTML.innerHTML = email;

// formButton.addEventListener("click", function(e){
//   e.preventDefault();
//   this.classList.add("button-click")

// })

// formButton.addEventListener("click", submitForm)

contactForm.addEventListener("submit", submitForm);

//decidir si usar boton o input con estilo de boton para submit del form
function submitForm(event) {
  event.preventDefault();
  formButton.classList.add("button-click");
  
  //refactorizar esto
  setTimeout(() => {
    formButton.classList.remove("button-click");
  }, 1000);

  const formConstraints = {
    nombre: {
      presence: { allowEmpty: false, message: " no debe ir vacío" },
      length: {
        minimum: 2,
        tooShort: " debe tener al menos 2 caracteres",
        maximum: 30,
        tooLong: " debe tener como máximo 30 caracteres",
      },
    },
    email: {
      presence: {
        allowEmpty: false,
        message: " no debe ir vacío",
      },
      email: { message: " debe ser válido" },
    },
    mensaje: {
      presence: {
        allowEmpty: false,
        message: " no debe ir vacío",
      },
    },
  };

  const formValues = {
    nombre: contactForm.elements.nombre.value,
    email: contactForm.elements.email.value,
    mensaje: contactForm.elements.mensaje.value,
  };

  const errors = validate(formValues, formConstraints);

  if (!errors) {
    console.log("enviando el post a submitform");
    formButton.disabled = true;
    // formButton.setAttribute("disabled")
    // formButton.classList.add("loading")

    new Promise((resolve,reject) => {

      setTimeout(() => {

        resolve()
      }, 3000);

    }).then(response => {

      formButton.disabled = false;
      // formButton.removeAttribute("disabled")

    }).catch(error => console.log("algo paso ", error))
    // fetch("submitForm.php", {
    //   method: "POST",
    //   body: new URLSearchParams(formValues),
    // })
    //   .then((response) => response.json())
    //   .then((response) => {
    //     formButton.disabled = false;
    //     console.log(response);
    //   });
  } else {
    const errorList = [];

    Object.keys(errors).forEach((item) => {
      errors[item].forEach((msg) => {
        errorList.push(msg);
      });
    });

    console.log("errores en el formulario", errorList);
  }

  // console.log("submiteando el form desde", this);

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
