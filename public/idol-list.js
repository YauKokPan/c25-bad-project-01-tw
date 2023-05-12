window.onload = () => {
  loadIdols();
  loadPagination();
};

async function loadIdols() {
  let url = new URLSearchParams(window.location.search);
  let currentPage = url.get("page") || 1;
  const resp = await fetch("/page?page=" + currentPage);
  const idols = await resp.json();
  let htmlStr = ``;
  for (const idol of idols.data) {
    // Split the idol_info text into separate lines
    const lines = idol.idol_info.split("\n");
    // Join the lines into a single HTML string
    const infoHtml = lines
      .map((line) => `<p class="card-text">${line}</p>`)
      .join("");

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
                  <a href="./gallery.html?i=${idol.id}"><h5 class="card-title"><span class="hyperlink">${idol.idol_name}</span></h5></a>
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

async function loadPagination() {
  const paginationDiv = document.querySelector("#pagination-content");
  let htmlStr = "";
  let url = new URLSearchParams(window.location.search);
  let currentPage = url.get("page") || 1;
  const resp = await (await fetch("/page/totalpages")).json();
  const totalPages = +resp.data.totalPages;
  console.log("totalPages: ", totalPages);
  const visiblePageLinks = 5; // Number of visible page links including ellipsis
  const halfVisiblePageLinks = Math.floor(visiblePageLinks / 2);
  let startPage = currentPage - halfVisiblePageLinks;
  let endPage = currentPage + halfVisiblePageLinks;
  if (startPage <= 0) {
    endPage += Math.abs(startPage) + 1;
    startPage = 1;
  }
  if (endPage > totalPages) {
    startPage -= endPage - totalPages;
    endPage = totalPages;
  }
  if (startPage <= 0) {
    startPage = 1;
  }
  htmlStr += `<li class="page-item ${
    currentPage <= 1 ? "disabled" : ""
  }"><a class="page-link" href="idol-list.html?page=${
    +currentPage - 1
  }">Previous</a></li>`;
  if (startPage > 1) {
    htmlStr += `<li class="page-item"><a class="page-link" href="idol-list.html?page=1">1</a></li>`;
    if (startPage > 2) {
      htmlStr += `<li class="page-item ellipsis"><span class="page-link">...</span></li>`;
    }
  }
  for (let i = startPage; i <= endPage; i++) {
    htmlStr += `<li class="page-item ${
      i == currentPage ? "active" : ""
    }"><a class="page-link" href="idol-list.html?page=${i}">${i}</a></li>`;
  }
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      htmlStr += `<li class="page-item ellipsis"><span class="page-link">...</span></li>`;
    }
    htmlStr += `<li class="page-item"><a class="page-link" href="idol-list.html?page=${totalPages}">${totalPages}</a></li>`;
  }
  htmlStr += `<li class="page-item ${
    currentPage >= totalPages ? "disabled" : ""
  }"><a class="page-link" href="idol-list.html?page=${
    +currentPage + 1
  }">Next</a></li>`;
  paginationDiv.innerHTML = htmlStr;

  const paginationUl = document.querySelector(".pagination");
  paginationUl.classList.add("d-flex");
}
