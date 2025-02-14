const fileProgressContainer = document.getElementById("fileProgressContainer");
const fileUploadContainer = document.getElementById("fileUploadContainer");
const baseUrl = "http://localhost:3030";

document.getElementById("uploadFile").onchange = (e) => {
  fileUploadContainer.classList.add("hidden");
  fileProgressContainer.classList.remove("hidden");
  fileUpload(e);
};

async function fileUpload(e) {
  e.preventDefault;

  const fileInput = document.getElementById("uploadFile");
  const file = fileInput.files[0];
  const fileName = file.name;
  const fileSize = file.size;

  document.getElementById("fileName").innerHTML = fileName;

  if (fileSize <= 100 * (1024 * 1024)) {
    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${baseUrl}/upload`, true);
    xhr.upload.onprogress = function (e) {
      if (e.lengthComputable) {
        const percentCompleted = Math.round((e.loaded / e.total) * 100);
        document.getElementById(
          "percentText"
        ).innerHTML = `${percentCompleted}%`;
        document.getElementById(
          "progressBar"
        ).style.width = `${percentCompleted}%`;
      }
    };
    xhr.onreadystatechange = function () {
      if (this.status === 201 && this.readyState == 4) {
        const data = JSON.parse(this.response);
        document.getElementById(
          "fileUrl"
        ).innerText = `${baseUrl}/dl/${data.fileId}`;
        document.getElementById("copyContainer").classList.remove("hidden");
        toastr.success(`File successfully uploaded`);
      } else {
        console.log("Error uploading file");
      }
    };
    xhr.send(formData);
  } else {
    toastr.error(`Max file size can upload 100 MB`);
  }
}

// copy btn
document.getElementById("copyIcon").addEventListener("click", function () {
  const link = document.getElementById("fileUrl").innerText;
  navigator.clipboard.writeText(link);
  toastr.success(`copied`);
});

// Welcome message
document.addEventListener("DOMContentLoaded", () => {
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-top-right",
    preventDuplicates: true,
    onclick: null,
    showDuration: "500",
    hideDuration: "1000",
    timeOut: "3000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
  toastr.info(`👋 Welcome to Fast Drop`);
});
