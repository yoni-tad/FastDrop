const fileProgressContainer = document.getElementById("fileProgressContainer");
const fileUploadContainer = document.getElementById("fileUploadContainer");

document.getElementById("uploadFile").onchange = (e) => {
  e.preventDefault;
  fileUploadContainer.classList.add('hidden');
  fileProgressContainer.classList.remove('hidden');
};
