const portfolioBtn = document.querySelector("#portfolio-btn");
const aboutmeBtn = document.querySelector("#aboutme-btn");
const contactBtn = document.querySelector("#contact-btn");
const displayWrapper = document.querySelector(".display-wrapper");
const footer = document.querySelector('footer');

// console.log(portfolioBtn);

aboutmeBtn.addEventListener("click", (event) => {
  displayWrapper.innerHTML = loadAboutMe();
  displayWrapper.classList.add('show');
});

portfolioBtn.addEventListener("click", (event) => {
  displayWrapper.innerHTML = loadPortfolio();
  displayWrapper.classList.add('show');
});

contactBtn.addEventListener("click", (event) => {
  displayWrapper.innerHTML = loadContact();
  displayWrapper.classList.add('show');
  
  setTimeout(()=>{
    footer.scrollIntoView({block:"end", behavior:"smooth"})
  }
  ,1000)
});

function loadPortfolio() {
  return `<p>portoflio</p>`;
}

function loadAboutMe() {
  return `<p>about me</p>
  <p>about me</p>
  <p>about me</p>
  <p>about me</p>
  <img src="/img/homepage-image.png" width="300px" alt="">
  <p>about me</p>
  <p>about me</p>`;
}

function loadContact() {
  return `<p>contacto</p>`;
}
