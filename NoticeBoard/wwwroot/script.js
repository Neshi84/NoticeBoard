
$(document).ready(function(){

    const fileCatcher = document.getElementById('file-catcher');
    const fileInput = document.getElementById('file-input');
    const fileTitle = document.getElementById("title");
    const fileList=document.getElementById("fileList");
    const showNotices=document.getElementById("notices");
    let uploadedFiles=[];
     
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

    $.ajax({
        url: 'http://localhost:61214/api/Notices',
        type: 'GET',
        contentType: "application/json",
        dataType: 'json',
       
    })

        .done(data => {
            let fragment=document.createDocumentFragment();
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                let cardDiv=document.createElement('div');
                cardDiv.setAttribute('class','card');
                let cardHeader=document.createElement('div');
                cardHeader.setAttribute('class','card-header')
                let title=document.createElement('h4');
                title.setAttribute('class','float-sm-left')
                let date=document.createElement('h5');
                date.setAttribute('class','float-sm-right');
                date.innerHTML=extractDate(data[i].date);
                title.innerHTML=data[i].title;
                cardHeader.appendChild(title);
                cardHeader.appendChild(date);
                cardDiv.appendChild(cardHeader);
                let editorDiv=document.createElement('div');
                editorDiv.setAttribute('class','card-body')
                let quillOutput = new Quill(editorDiv, {});
                quillOutput.setContents(JSON.parse(data[i].content));
                cardDiv.appendChild(editorDiv);
                fragment.appendChild(cardDiv);
                
            }

            showNotices.appendChild(fragment);
            

        })

        .fail(() => {
            alert('Desila se greska!');
        });

    sendFile = (file) => {

       let formData = new FormData();
          
       formData.append('file', file);        
        
        $.ajax({
            url: 'http://localhost:61214/api/FileUpload',
            type: 'POST',
            dataType: 'json',
            contentType: false, 
            processData: false,
            data: formData
        })

            .done(data => {

                let file = {
                    "Title": fileTitle.value,
                    "Path": data.fileName
                };

                uploadedFiles.push(file);
                let listItem=document.createElement('li');
                listItem.setAttribute('class','list-group-item list-group-item-success')
                let link=document.createElement('a');
                link.setAttribute('href',"http://localhost:61214/Uploads/" + data.fileName);
                link.download=data.fileName;
                link.innerHTML=data.fileName;               
                listItem.appendChild(link);
                fileList.appendChild(listItem);
                

            })

            .fail(() => {
                alert('Desila se greska!');
            });
    };

       
   

    $("#saveQuill").click(()=>{
        let delta=quill.getContents();
        console.log(uploadedFiles);
        let sendData = {
            "Title": $("#title").val(),
            "Content": JSON.stringify(delta),
            "Date": $("#date").val(),
            "UploadedFiles": uploadedFiles
        };
        console.log(sendData);

        $.ajax({
            url: 'http://localhost:61214/api/Notices',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(sendData)
          })
    
            .done(data => {  
               
              //logika nakon sačuvanog obaveštenja
                           
           })
    
          .fail(() => {
            alert('Desila se greska!');
          });
      });


});

  



