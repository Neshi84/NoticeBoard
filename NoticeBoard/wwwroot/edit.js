const fileCatcher = document.getElementById("file-catcher");
const fileInput = document.getElementById("file-input");
const editor = document.getElementById("editor");
const fileTitle = document.getElementById("file-title");
const fileList = document.getElementById("fileList");
const saveQuill = document.getElementById("saveQuill");
const title = document.getElementById("title");
const noticeDate = document.getElementById("date");
const selectType = document.getElementById("noticeType");
const noticeUrl = "http://localhost:61214/api/Notices";
const typeUrl = "http://localhost:61214/api/NoticeTypes";
const fileUrl = "http://localhost:61214/api/FileUpload";
let uploadedFiles = [];

fetch(typeUrl).then((response) => {
  response.json().then((data) => {
    for (let i = 0; i < data.length; i++) {
      let option = document.createElement("option");
      option.text = data[i].type;
      option.value = data[i].id;
      selectType.add(option);
    }
  });
});

let quill = new Quill(editor, {
  theme: "snow",
});

let saveNotice = () => {
  let delta = quill.getContents();

  let sendData = {
    Title: title.value,
    Content: JSON.stringify(delta),
    Date: noticeDate.value,
    TypeId: selectType.value,
    UploadedFiles: uploadedFiles,
  };

  console.log(sendData);

  fetch(noticeUrl, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(sendData),
  })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

saveQuill.addEventListener("click", saveNotice);

let sendFile = (file) => {
  let formData = new FormData();

  formData.append("file", file);

  fetch(fileUrl, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      let file = {
        Title: fileTitle.value,
        Path: data.fileName,
      };

      uploadedFiles.push(file);
      let listItem = document.createElement("li");
      listItem.setAttribute("class", "list-group-item list-group-item-success");
      let trashButton = document.createElement("button");
      trashButton.classList.add("trashBtn");
      trashButton.innerHTML = '<i class="fas fa-trash"><i>';
      trashButton.setAttribute("name", data.fileName);

      trashButton.addEventListener("click", function (event) {
        event.preventDefault();

        fetch(fileUrl + "?fileName=" + this.name, {
          method: "DELETE",
        })
          .then(event.currentTarget.parentNode.remove())
          .then(() => {
            let index = uploadedFiles
              .map((item) => {
                return item.Path;
              })
              .indexOf(this.name);

            uploadedFiles.splice(index, 1);
          });
      });

      let link = document.createElement("a");
      link.classList.add("link");
      link.setAttribute(
        "href",
        "http://localhost:61214/Uploads/" + data.fileName
      );
      link.download = data.fileName;
      link.innerHTML = data.fileName;
      listItem.appendChild(link);
      listItem.appendChild(trashButton);
      fileList.appendChild(listItem);
    })
    .catch((err) => console.error(err));
};

fileCatcher.addEventListener("submit", (event) => {
  event.preventDefault();
  sendFile(fileInput.files[0]);
});
