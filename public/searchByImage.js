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
