let myDropzone = new Dropzone("#myDropzone", {
  paramName: "file", // The name that will be used to transfer the file
  acceptedFiles: "image/jpeg,image/jpg",
  autoProcessQueue: true,
  addRemoveLinks: true,
  maxFiles: 1,
  thumbnailWidth: 300,
  thumbnailHeight: 300,
  url: "http://localhost:8080/postImage",
  success: function (file, response) {
    updateUI(file, response);
  },
  // function (file, response) {
  //   console.log("upload complete", file, response);
  //   document.querySelector("#upload-result").innerHTML = response.data.results;
  // },
});

function updateUI(file, response) {
  console.log("upload complete", file, response);
  let htmlStr = "";
  for (let elem of response.data) {
    htmlStr += `<div class="data data-${elem.id}" idol-name="${elem.name}">
    <div><img src='/pictures/javidols-profile-pic/${elem.img}' /></div>
    <div class='name'>Name: ${elem.name}</div>
    <div class='probability'>${elem.prob}</div>
    </div>`;
  }

  document.querySelector("#upload-result").innerHTML = htmlStr;
}
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
//     // this.on("complete", function (file, response) {
//     //   // 上傳成功後，重新導向到另一個頁面
//     //   //   window.location.href = "http://0.0.0.0:8000/";
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
