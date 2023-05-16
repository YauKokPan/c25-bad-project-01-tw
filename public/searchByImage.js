Dropzone.options.myDropzone = {
  paramName: "file", // The name that will be used to transfer the file
  acceptedFiles: "image/jpeg,image/jpg,image/png",
  autoProcessQueue: true,
  addRemoveLinks: true,
  maxFiles: 1,
  thumbnailWidth: 340,
  thumbnailHeight: 350,
  url: "/postImage",
  removedfile: function () {
    window.location.href = "./searchByImage.html";
  },
  success: function (file, response) {
    updateUI(file, response);
  },
};

function updateUI(file, response) {
  let htmlStr = "";
  for (i = 0; i < response.data.length; i++) {
    const elem = response.data[i];

    let prob_percentage = elem.prob * 100 + 75;

    htmlStr += /*html*/ `<div class="data data-${elem.id}" idol-name="${elem.name}">
    <div>
    <a href="./gallery.html?i=${elem.id}">
    <img src='/pictures/javidols-profile-pic/${elem.img}'>
    </a>
    </div>
    <div class='name'>Name: ${elem.name}</div>
    <div class='probability'>Similarity: ${prob_percentage}%</div>
    </div>`;
  }

  document.querySelector("#upload-result").innerHTML = htmlStr;
}

// search by idol name feature
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
