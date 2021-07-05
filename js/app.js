const formButton = document.querySelector("#form-submit");
const contactForm = document.getElementById("contact-form");

const inputNombre = document.getElementById("form-nombre");
const inputEmail = document.getElementById("form-email");
const inputMensaje = document.getElementById("form-mensaje");

const emailHTML = document.getElementById("email");
const email =
  "&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#111;&#064;&#097;&#099;&#097;&#098;&#114;&#101;&#116;&#046;&#099;&#111;&#109";

emailHTML.innerHTML = email;

let inputTimersArray = [];

contactForm.addEventListener("submit", submitForm);

//decidir si usar boton o input con estilo de boton para submit del form
function submitForm(event) {
  event.preventDefault();

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

  clearInputTimers(inputTimersArray);

  if (!errors) {
    console.log("enviando el post a submitform");
    formButton.disabled = true;

    // new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve();
    //   }, 3000);
    // })
    //   .then((response) => {
    //     formButton.disabled = false;
    //     // formButton.removeAttribute("disabled")
    //   })
    //   .catch((error) => console.log("algo paso ", error));

    fetch("submitForm.php", {
      method: "POST",
      body: new URLSearchParams(formValues),
    })
      .then((response) => response.json())
      .then((response) => {
        inputNombre.value = "";
        inputEmail.value = "";
        inputMensaje.value = "";
        console.log("mensaje enviado :)", response);
      })
      .catch((error) => {
        console.log("error de conexion :(");
      })
      .finally(() => {
        formButton.disabled = false;
      });
  } else {
    const errorList = [];

    inputTimersArray = setInputErrors(errors);

    Object.keys(errors).forEach((item) => {
      errors[item].forEach((msg) => {
        errorList.push(msg);
      });
    });
  }

  function setInputErrors(errors) {
    const timers = [];

    Object.keys(errors).forEach((errorKey) => {
      const input = document.querySelector(`#form-${errorKey}`);
      input.classList.add("error");
      timers.push({
        nodeTimer: setTimeout(() => {
          input.classList.remove("error");
        }, 5000),
        node: input,
      });
    });

    formButton.classList.add("error");

    timers.push({
      nodeTimer: setTimeout(() => {
        formButton.classList.remove("error");
      }, 5000),
      node: formButton,
    });

    return [...timers];
  }

  function clearInputTimers(inputTimersArray) {
    inputTimersArray.forEach((timerNode) => {
      timerNode.node.classList.remove("error");
      clearTimeout(timerNode.nodeTimer);
    });
  }
}
