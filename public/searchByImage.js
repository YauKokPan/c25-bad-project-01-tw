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
    // $(".dz-error-mark").css("display", "none");
    updateUI(file, response);
  },
};

function updateUI(file, response) {
  // console.log("upload complete", file, response);
  let htmlStr = "";
  for (i = 0; i < 10; i++) {
    const elem = response.data[i];

    let prob_percentage = elem.prob * 100 + 80;

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

// Dropzone.options.myDropzone = {
//   paramName: "file", // The name that will be used to transfer the file
//   acceptedFiles: "image/jpeg,image/jpg",
//   autoProcessQueue: true,
//   addRemoveLinks: true,
//   maxFiles: 1,
//   thumbnailWidth: 300,
//   thumbnailHeight: 300,

//   init: function () {
//     this.on("complete", function (file, response) {
//       console.log(file);
//       console.log("check!!!!", response);
//     });
//     // this.on("removedfile", function (file, response) {
//     //   // 上傳成功後，重新導向到另一個頁面
//     //   //   window.location.href = "./searchByImage.html";
//     //   location.reload();
//     // });
//     // First change the button to actually tell Dropzone to process the queue.
//     // this.element
//     //   .querySelector("button[type=submit]")
//     //   .addEventListener("click", function (e) {
//     //     // Make sure that the form isn't actually being sent.
//     //     e.preventDefault();
//     //     e.stopPropagation();
//     //     myDropzone.processQueue();
//     //   });
//   },
// };
//-----------------old code-----------------/
// const dropZone = document.getElementById("drop-zone");
// dropZone.addEventListener("dragover", (event) => {
//   event.preventDefault();
//   dropZone.classList.add("dragover");
// });

// dropZone.addEventListener("dragleave", (event) => {
//   event.preventDefault();
//   dropZone.classList.remove("dragover");
// });

// dropZone.addEventListener("drop", (event) => {
//   event.preventDefault();
//   dropZone.classList.remove("dragover");
//   const fileList = event.dataTransfer.files;
//   handleFiles(fileList);
// });

// function handleFiles(files) {
//   // const fileInput = document.getElementById("imageFile");
//   // fileInput.files = files;

//   // Display the image in the drop zone
//   const dropZone = document.getElementById("drop-zone");
//   const image = document.createElement("img");
//   // Set the src attribute of the <img> element to the temporary URL
//   image.src = URL.createObjectURL(files[0]);
//   const imageFile = (document.dropZone.innerHTML = "");
//   dropZone.appendChild(image);
// }

// // Get the uploaded image file input element
// const imageFileInput = document.querySelector("#imageFile");

// // Add an event listener to the image file input element
// imageFileInput.addEventListener("change", function () {
//   // Get the uploaded image file
//   const imageFile = imageFileInput.files[0];

//   // Create a temporary URL for the uploaded image file
//   const imageUrl = URL.createObjectURL(imageFile);

//   const uploadedImage = document.querySelector("#uploadedImage");
//   uploadedImage.src = imageUrl;
// });

// windows.onload = () => {
//   searchByImage();
// };

// function searchByImage() {
//   document
//     .querySelector("#search-by-image")
//     .addEventListener("submit", async (e) => {
//       e.preventDefault();

//       // const form = e.target;
//       // const content = form.content.value;
//       // const image = form.image.files[0];
//       const fileInput = document.getElementById("file-input");
//       const formData = new FormData();
//       formData.append("files", fileInput.files);
//       // formData.append("content", content);
//       // formData.append("image", image);

//       const resp = await fetch("http://localhost:8080/postImage", {
//         method: "POST",
//         body: formData,
//       })
//         .then((res) => console.log(res))
//         .catch((err) => ("Error occured", err));
//       const result = await resp.json();
//       document.querySelector("#upload-result").textContent = result;
//     });
// }
