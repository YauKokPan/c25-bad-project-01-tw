const dropZone = document.getElementById("drop-zone");

dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragover");
});

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropZone.classList.remove("dragover");
  const fileList = event.dataTransfer.files;
  handleFiles(fileList);
});

function handleFiles(files) {
  const fileInput = document.getElementById("file-input");
  fileInput.files = files;

  // Display the image in the drop zone
  const dropZone = document.getElementById("drop-zone");
  const image = document.createElement("img");
  image.src = URL.createObjectURL(files[0]);
  dropZone.innerHTML = "";
  dropZone.appendChild(image);
}

windows.onload = () => {
  searchByImage();
};

function searchByImage() {
  document
    .querySelector("#search-by-image")
    .addEventListener("sumbit", async (e) => {
      e.preventDefault();

      const form = e.target;
      const content = form.content.value;
      const image = form.image.files[0];

      const formData = new FormData();
      formData.append("content", content);
      formData.append("image", image);

      const resp = await fetch("/");
    });
}
