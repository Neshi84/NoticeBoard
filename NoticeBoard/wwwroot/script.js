
const showNotices = document.getElementById("notices");
const noticeUrl = 'http://localhost:61214/api/Notices';


const extractDate = a => {
    'use strict';
    var input, day, month, year;
    input = a.split('T')[0].split('-');
    console.log(input);
    day = input[2];
    month = input[1];
    year = input[0];

    return day + '.' + month + '.' + year;
};


fetch(noticeUrl)
    .then(response => {
        response.json()
            .then(data => {

                let fragment = document.createDocumentFragment();

                for (let i = 0; i < data.length; i++) {
                    let cardDiv = document.createElement('div');
                    cardDiv.setAttribute('class', 'card');
                    let cardHeader = document.createElement('div');
                    cardHeader.setAttribute('class', 'card-header')
                    let title = document.createElement('h4');
                    title.setAttribute('class', 'float-sm-left')
                    let date = document.createElement('small');
                    date.setAttribute('class', 'text-muted float-sm-right');
                    date.innerHTML = extractDate(data[i].date);
                    title.innerHTML = data[i].title;
                    cardHeader.appendChild(title);
                    cardHeader.appendChild(date);
                    cardDiv.appendChild(cardHeader);
                    let editorDiv = document.createElement('div');
                    editorDiv.setAttribute('class', 'card-body')
                    let quillOutput = new Quill(editorDiv, {});
                    quillOutput.setContents(JSON.parse(data[i].content));
                    cardDiv.appendChild(editorDiv);
                    fragment.appendChild(cardDiv);

                }

                showNotices.appendChild(fragment);

            });
    })
    .catch(error => {
        console.log(error);
    });







