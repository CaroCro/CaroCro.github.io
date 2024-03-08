function showContent(id) {
    const sections = document.querySelectorAll('.container section');
    sections.forEach(section => {
        if (section.id === id) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

function changeColor(color) {
    const listColors = document.querySelectorAll(`#colorsList button:not(#button${color})`);
    document.getElementById('figure').style.backgroundColor = color;
    document.getElementById(`button${color}`).style.backgroundColor = color;
    playAudio(color);
    listColors.forEach(item => {
        document.getElementById(`button${item.innerText}`).style.backgroundColor = 'White';
        return;
    })
}
var intervalId = null;

function selectAllColors() {
    var checkBox = document.getElementById('selectAll');
    const listColors = document.querySelectorAll('#colorsList button');

    if (checkBox.checked == true){
        if(listColors.length > 1) {
            intervalId = setInterval(changeAllColors, 1000);


          }
      } else {
        if(listColors.length > 1){
            clearInterval(intervalId);
            listColors.forEach(item => document.getElementById(`button${item.innerText}`).style.backgroundColor = 'White');
            document.getElementById('figure').style.backgroundColor = 'rgb(189, 199, 202)';
        }
      }
}

const listColors = document.querySelectorAll('#colorsList button');

let currentColorIndex = 0;

function changeAllColors(){
    document.getElementById('figure').style.backgroundColor = listColors[currentColorIndex].innerText;
    document.getElementById(`button${listColors[currentColorIndex].innerText}`).style.backgroundColor = listColors[currentColorIndex].innerText;
    playAudio(listColors[currentColorIndex].innerText);
    currentColorIndex++;
    if(currentColorIndex == listColors.length){
        currentColorIndex = 0;
    }
}

function playAudio(color) {
    var audio = document.getElementById(`audio${color}`);
    audio.play();
}

let dragged = null;
let imagesPlaced = 0;

const sources = document.querySelectorAll(".draggable");

sources.forEach((source) => {
  source.addEventListener("dragstart", (event) => {
    dragged = event.target;
  });
});

const targets = document.querySelectorAll(".dropzone");

targets.forEach((target) => {
  target.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  target.addEventListener("drop", (event) => {
    event.preventDefault();
    const correctDropzone = dragged.dataset.correctDropzone;
    const dropzoneId = event.target.id;

    if (correctDropzone === dropzoneId) {
      dragged.parentNode.removeChild(dragged);
      event.target.appendChild(dragged);
      imagesPlaced++;
      if (imagesPlaced === sources.length) {
        


        Swal.fire({
          title: "Awesome!",
          width: 600,
          padding: "3em",
          color: "#716add",
          confirmButtonText: "Ok",
          background: "#fff url(https://openseauserdata.com/files/7d5d665f92c09858439458678bc879a4.gif)"
        });

      }
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'The image does not correspond to this category',
        icon: 'error',
        confirmButtonText: 'Ok'
      }) 
    }
  });
});