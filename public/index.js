window.onload = () => {
  loadIdols();
};

async function loadIdols() {
  const resp = await fetch("/idols");
  const idols = await resp.json();
  let htmlStr = ``;
  for (const idol of idols) {
    htmlStr += `
        <div class="idol" id="idol-${idol.id}">
            <div class="profile-pic">
            <a href="./gallery.html?i=${idol.id}">
            <img src="./pictures/javidols-profile-pic/${idol.profile_pic}" class="image-scale">
            </a>
            
            </div>
            <div class="idol-name">
              <a href="./gallery.html?i=${idol.id}">${idol.idol_name}</a>
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
