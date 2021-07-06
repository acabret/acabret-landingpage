const formButton = document.querySelector("#form-submit");
const contactForm = document.getElementById("contact-form");

const inputNombre = document.getElementById("form-nombre");
const inputEmail = document.getElementById("form-email");
const inputMensaje = document.getElementById("form-mensaje");

const notification = document.querySelector(".notification");
const notificationTitle = notification.querySelector(
  ".notification__title span"
);
const notificationList = notification.querySelector(".notification__list");

const emailHTML = document.getElementById("email");
const email =
  "&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#111;&#064;&#097;&#099;&#097;&#098;&#114;&#101;&#116;&#046;&#099;&#111;&#109";

emailHTML.innerHTML = email;

let inputTimersArray = [];
let notificationTimer;

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

    fetch("submitForm.php", {
      method: "POST",
      body: new URLSearchParams(formValues),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === 200) {
          inputNombre.value = "";
          inputEmail.value = "";
          inputMensaje.value = "";
          notificationTimer = setNotification(
            "Mensaje enviado correctamente :)",
            []
          );
        } else {
          notificationTimer = setNotification(
            "Uno de los campos tiene un error",
            []
          );
        }

        console.log("mensaje enviado :)", response);
      })
      .catch(() => {
        const error = ["Error de conexión"];
        // notificationList.appendChild(getErrorNodesFragment(error));
        // notification.classList.add("show");
        // setTimeout(() => {
        //   notification.classList.remove("show");
        // }, 5000);

        notificationTimer = setNotification(
          "Oh no, ha habido un problema",
          error
        );

        console.log("error de conexion :(");
      })
      .finally(() => {
        formButton.disabled = false;
      });
  } else {
    const errorList = [];

    inputTimersArray = highlightInputErrors(errors);

    Object.keys(errors).forEach((item) => {
      errors[item].forEach((msg) => {
        errorList.push(msg);
      });
    });
  }

  function setNotification(title, messagesArray) {
    clearTimeout(notificationTimer);
    removeAllChildNodes(notificationList);
    notificationTitle.textContent = title;
    notificationList.appendChild(getErrorNodesFragment(messagesArray));
    notification.classList.add("show");
    const timer = setTimeout(() => {
      notification.classList.remove("show");
    }, 5000);

    return timer;
  }

  function highlightInputErrors(errors) {
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

  function getErrorNodesFragment(errors) {
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
