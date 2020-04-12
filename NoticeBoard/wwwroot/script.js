const showNotices = document.getElementById("notices");
const noticeUrl = "http://localhost:61214/api/Notices";
const typeUrl = "http://localhost:61214/api/NoticeTypes";
const pageSelect = document.getElementById("pages");
const selectType = document.getElementById("noticeType");

fetch(typeUrl).then((response) => {
  response.json().then((data) => {
    for (let type of data) {
     let option = document.createElement("option");
      option.text = type.type;
      option.value = type.id;
      selectType.add(option);
    }
  });
});


const extractDate = (a) => {
  "use strict";
  var input, day, month, year;
  input = a.split("T")[0].split("-");
  day = input[2];
  month = input[1];
  year = input[0];

  return day + "." + month + "." + year;
};

let getNotices = (pageSize) =>
  fetch(noticeUrl + "?pageSize=" + pageSize)
    .then((response) => {
      response.json().then((data) => {
        console.log(data);
        let fragment = document.createDocumentFragment();

        for (let notice of data) {
          let cardDiv = document.createElement("div");
          cardDiv.setAttribute("class", "card");
          let cardHeader = document.createElement("div");
          cardHeader.setAttribute("class", "card-header");
          let title = document.createElement("h4");
          title.setAttribute("class", "float-sm-left");
          let date = document.createElement("small");
          date.setAttribute("class", "text-muted float-sm-right");
          date.innerHTML = extractDate(notice.date);
          title.innerHTML = notice.title;
          cardHeader.appendChild(title);
          cardHeader.appendChild(date);
          cardDiv.appendChild(cardHeader);
          let editorDiv = document.createElement("div");
          editorDiv.setAttribute("class", "card-body");
          let quillOutput = new Quill(editorDiv, {});
          quillOutput.setContents(JSON.parse(notice.content));
          cardDiv.appendChild(editorDiv);
          let linkDiv = document.createElement("div");
          linkDiv.setAttribute("class", "card-body");

          for (let files of notice.uploadedFiles) {
            let fileLink = document.createElement("a");
            let pdf = document.createElement("i");
            pdf.setAttribute("class", "far fa-file-pdf");
            fileLink.setAttribute("class", "card-link");
            fileLink.setAttribute("target", "_blank");
            fileLink.setAttribute(
              "href",
              "http://localhost:61214/Uploads/" + files.path
            );
            let linkText = document.createTextNode(files.title);
            fileLink.appendChild(linkText);
            fileLink.appendChild(pdf);
            linkDiv.appendChild(fileLink);
          }

          cardDiv.appendChild(linkDiv);
          fragment.appendChild(cardDiv);
        }

        showNotices.appendChild(fragment);
      });
    })
    .catch((error) => {
      console.log(error);
    });

getNotices(pageSelect.value);

pageSelect.addEventListener("change", () => {
  showNotices.innerHTML = "";
  getNotices(pageSelect.value);
});
