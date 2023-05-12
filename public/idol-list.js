window.onload = () => {
  loadIdols();
};

async function loadIdols() {
    const resp = await fetch("/idols");
    const idols = await resp.json();
    let htmlStr = ``;
    for (const idol of idols) {
      // Split the idol_info text into separate lines
      const lines = idol.idol_info.split("\n");
      // Join the lines into a single HTML string
      const infoHtml = lines.map(line => `<p class="card-text">${line}</p>`).join("");
  
      htmlStr += `
        <div class="col-6">
          <div class="card mb-3">
            <div class="row g-0">
              <div class="col-md-4">
                <a href="./gallery.html?i=${idol.id}">  
                  <img src="./pictures/javidols-profile-pic/${idol.profile_pic}" class="img-fluid image-scale rounded-start" alt="...">
                </a>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <a href="./gallery.html?i=${idol.id}"><h5 class="card-title">${idol.idol_name}</h5></a>
                  ${infoHtml}
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    document.querySelector(".idols-list").innerHTML = htmlStr;
  }

const pagination = document.querySelector(".pagination");
const pages = pagination.querySelectorAll(".page");
const prev = pagination.querySelector(".prev");
const next = pagination.querySelector(".next");
const prevPage = () => {
  const active = pagination.querySelector(".active");
  const prev = active.previousElementSibling;
  if (prev.classList.contains("page")) {
    active.classList.remove("active");
    prev.classList.add("active");
  }
};
const nextPage = () => {
  const active = pagination.querySelector(".active");
  const next = active.nextElementSibling;
  if (next.classList.contains("page")) {
    active.classList.remove("active");
    next.classList.add("active");
  }
};
prev.addEventListener("click", prevPage);
next.addEventListener("click", nextPage);
