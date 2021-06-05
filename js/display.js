class Display {
  constructor(element, source) {
    this.element = element;
    this.source = document.querySelector(`[data-display=${source}]`);
    this.displayItems = [];
    setupDisplay(this);
    this.showing = null;
    this.isOpen = false;
  }

  openDisplay() {
    this.isOpen = true;
    this.element.style.height = "500px";
    console.log("opening");

    this.displayItems.forEach((node) => {
      node.element.classList.toggle("fade", node.selected);
      node.selected = false;
    });

  }

  hideDisplay() {
    this.showing = null;
    this.isOpen = false;
    this.element.style.height = "0px";
    // this.displayItems.forEach((node) => {
    //   node.element.classList.toggle("fade", node.selected);
    //   node.selected = false;
    // });
    this.displayItems.forEach((node) => {
      node.element.style.opacity=0;
      node.element.style.display="none";
      node.selected = false;
    });

    // this.emptyDisplay();
  }

  showItem(item) {
    const animation = ["animate__zoomIn", "animate__delay-1s", "show"];

    if (this.showing) {
      this.hideAndShow(item);
    } else {
      item.selected = true;
      item.element.style.display = "block";
      item.element.style.opacity = 1;
      this.showing = item;
    }
  }

  //   emptyDisplay() {
  //     this.displayItems.forEach((item) => (item.selected = false));

  //     while (this.element.firstChild) {
  //       this.element.removeChild(this.element.firstChild);
  //     }
  //   }

  hideAndShow(newItem) {
    const selectedItem = this.displayItems.find((item) => item.selected);
    // console.log(selectedItem);
    if (selectedItem) {
      console.log("aqui?", selectedItem);
      selectedItem.element.style.opacity = 0;
      selectedItem.selected = false;
      this.showing = newItem;
      // setTimeout(() => {
      //   selectedItem.element.style.display = "none";
      //   newItem.selected = true;
      //   newItem.element.style.display = "block";
      //   // newItem.element.style.opacity = 0;
      //   // newItem.element.style.animation = "showItem 1s ease-in forwards"
      //   newItem.element.classList.add("animate__zoomIn");
      //   newItem.element.style.opacity = 1;

      //   this.showing = newItem;
      // }, 500);
      setTimeout(() => {
        selectedItem.element.style.display = "none";
        newItem.selected = true;
        newItem.element.style.display = "block";
        // newItem.element.style.opacity = 0;
        // newItem.element.style.animation = "showItem 1s ease-in forwards"
        newItem.element.classList.add("animate__zoomIn");
        newItem.element.style.opacity = 1;

        this.showing = newItem;
      }, 500);
    }
  }
}

function setupDisplay(displayElement) {
  const displayItems = displayElement.source.querySelectorAll(".display-item");

  displayItems.forEach((displayItem) => {
    const displayObject = {
      element: displayItem.cloneNode(true),
      selected: false,
    };

    displayElement.displayItems.push(displayObject);

    displayObject.element.classList.add("animate__animated");

    displayItem.parentElement
      .querySelector("button")
      .addEventListener("click", (event) => {
        // console.log("wejna");
        if (!displayElement.isOpen) {
          displayElement.openDisplay();
          displayElement.showItem(displayObject);
          event.stopPropagation();
          return;
        }

        if (displayElement.isOpen && !displayObject.selected) {
          console.log("otra ventana");
          displayElement.showItem(displayObject);
        }

        console.log(displayObject.selected);
      });

    displayElement.displayItems.forEach((item) => {
      displayElement.element.appendChild(item.element);
    });
  });

  const closeDisplayElement = document.createElement("div");
  closeDisplayElement.classList.add("close-display");
  closeDisplayElement.addEventListener("click", (event) => {
    displayElement.hideDisplay();
  });
  displayElement.element.appendChild(closeDisplayElement);

  displayItems.forEach((node) => {
    node.parentElement.removeChild(node);
  });

  //   console.log(displayItems);
}

export default Display;
