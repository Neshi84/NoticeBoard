
$(document).ready(function(){
 

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

  



