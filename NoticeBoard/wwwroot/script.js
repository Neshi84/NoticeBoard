
$(document).ready(function(){

    let fileCatcher = document.getElementById('file-catcher');
    let fileInput = document.getElementById('file-input');
    let fileListDisplay = document.getElementById('file-list-display');

    

    fileCatcher.addEventListener('submit', function (evnt) {
        evnt.preventDefault();
        let file = fileInput.files[0];
        sendFile(file);
       
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

                console.log(data);
                fileListDisplay.innerHTML = '<a href="http://localhost:61214/Uploads/' + data.fileName+ '">link</a>';

            })

            .fail(() => {
                alert('Desila se greska!');
            });
    };

       
   

    $("#saveQuill").click(()=>{
        let delta=quill.getContents();

        let sendData = {
            "Title": $("#title").val(),
            "Content": JSON.stringify(delta),
            "Date": $("#date").val()
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
               
              $("#titleOut").text(data.title);
              $("#dateOut").val(data.date);
              quillOutput.setContents(JSON.parse(data.content));
                           
           })
    
          .fail(() => {
            alert('Desila se greska!');
          });
      });

    var quill = new Quill('#editor', {

        theme: 'snow'

    });

    var quillOutput = new Quill('#output', {

    });



});

  



