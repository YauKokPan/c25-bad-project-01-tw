window.onload = () => {
  loadIdols();

  // sweetalert2
  // Display the SweetAlert2 popup box
  function showPopup() {
    Swal.fire({
      title: "你是否年滿18歲？",
      icon: "question",
      confirmButtonText: "是",
      cancelButtonText: "否",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // If visitor confirms they are over 18, set a cookie to remember their choice
        document.cookie = "over_18=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
      } else {
        // If visitor cancels, redirect them to a different website
        window.location.href = "https://www.google.com/";
      }
    });
  }

  // Check if the visitor has already confirmed they are over 18
  function hasConfirmed() {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf("over_18=") == 0) {
        return true;
      }
    }
    return false;
  }

  // Display the popup box if the visitor has not yet confirmed they are over 18
  if (!hasConfirmed()) {
    showPopup();
  }
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
              <a class="hyperlink" href="./gallery.html?i=${idol.id}">${idol.idol_name}</a>
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
