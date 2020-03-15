
const fileCatcher = document.getElementById('file-catcher');
const fileInput = document.getElementById('file-input');
const editor=document.getElementById('editor');
const fileTitle = document.getElementById("title");
const fileList=document.getElementById("fileList");
const saveQuill=document.getElementById('saveQuill');
const title=document.getElementById('title');
const noticeDate=document.getElementById('date');
const noticeUrl = 'http://localhost:61214/api/Notices';
let uploadedFiles=[];



let quill=new Quill(editor, {

    theme: 'snow'

});

let saveNotice = ()=>{

    let delta=quill.getContents();

    
    let sendData = {
        "Title": title.value,
        "Content": JSON.stringify(delta),
        "Date": noticeDate.value,
        "UploadedFiles": uploadedFiles
    };

   
    fetch(noticeUrl,{
        method:'POST',
        headers:{
            "Content-type": "application/json"
        },
        body:JSON.stringify(sendData)
    })    
    .then(data=>{
        console.log(data);
    })
    .catch(error=>{
        console.log(error);
    });

}
    
saveQuill.addEventListener('click',saveNotice);


let sendFile = (file) => {

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

fileCatcher.addEventListener('submit',(event)=>{
    event.preventDefault();
    sendFile(fileInput.files[0]);
    
})
