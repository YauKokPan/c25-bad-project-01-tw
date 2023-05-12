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

  const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("[name='query']");
const searchResults = document.querySelector("#search-results");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = searchInput.value;
  if (query.trim().length === 0) {
    searchResults.innerHTML = "<p>No results found.</p>";
    return;
  }
  const response = await fetch("/search?q=" + query, { method: "GET" });
  const data = await response.json();
  if (data.length > 0) {
    searchResults.innerHTML = "";
    data.forEach((result) => {
      const resultItem = document.createElement("div");
      resultItem.innerHTML = `
        <h3>${result.idol_name}</h3>
        <a href="./gallery.html?i=${result.id}">
          <img src="./pictures/javidols-profile-pic/${result.profile_pic}" alt="${result.idol_name}" height="125px">
        </a>
        <p>${result.idol_info}</p>
      `;
      searchResults.appendChild(resultItem);
    });
  } else {
    searchResults.innerHTML = "<p>No results found.</p>";
  }
});

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
