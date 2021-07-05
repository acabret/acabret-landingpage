const formButton = document.querySelector("#form-submit");
const contactForm = document.getElementById("contact-form");

const inputNombre = document.getElementById("form-nombre");
const inputEmail = document.getElementById("form-email");
const inputMensaje = document.getElementById("form-mensaje");

const notification = document.querySelector(".notification");
const notificationList = notification.querySelector(".notification__list");

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

    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    })
      .then((response) => {
        formButton.disabled = false;
        // formButton.removeAttribute("disabled")
      })
      .catch((error) => console.log("algo paso ", error));
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
    console.log(errors);
    const errorList = [];

    inputTimersArray = setInputErrors(errors);
    // console.log(timers);

    Object.keys(errors).forEach((item) => {
      errors[item].forEach((msg) => {
        errorList.push(msg);
      });
    });

    removeAllChildNodes(notificationList);

    notificationList.appendChild(getListErrorsFragment(errorList));
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

  function getListErrorsFragment(errors) {
    const fragment = new DocumentFragment();

    errors.forEach((err) => {
      const listItem = document.createElement("li");
      const textContent = document.createTextNode(err);
      listItem.appendChild(textContent);
      fragment.appendChild(listItem);
    });

    return fragment;
  }

  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
}
