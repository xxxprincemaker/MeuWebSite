const section = document.getElementById("mySec");
const body = document.body;


(function createDivBody(){
    let div = document.createElement('div');
    div.className = 'centered scroll';
    div.id = 'divBody';
    section.appendChild(div);
})();

const divBody = document.getElementById('divBody');

function knowHow(tittle, text) {
    let titulo = document.createElement('h1');
    titulo.style.marginTop = "0.5em";
    titulo.style.textAlign= 'center';
    titulo.textContent = tittle;
    let explanation = document.createElement('p');
    explanation.style.textAlign= 'center';
    explanation.style.justifyContent= 'center';
    explanation.textContent = text;
    divBody.appendChild(titulo);
    divBody.appendChild(explanation);
}

knowHow("DOM Manipulation", "This is a small" +
" application of DOM manipulation using JavaScript. " +
"When you click on any of Prince images, it disappears." +
" To make all appear again: CTRL + SHIFT + ALT");

divImages = document.createElement('div');
divImages.id = 'divImages';
divImages.style.display = 'flex';
divImages.style.justifyContent = 'center';
divImages.style.marginTop = "2em";
divBody.appendChild(divImages);

function addImages(idImage, path){
    let boxOfImages = document.createElement('div');
    let image = document.createElement('img');

    image.setAttribute("src", path);
    image.setAttribute("id", idImage);
    image.setAttribute("alt", `${idImage} image`);
    image.setAttribute("title", idImage);

    //Stylizing
    image.style.height="7em";
    image.style.width="7em";
    image.style.borderRadius="45%";
    image.style.margin="1em";
    image.style.alignContent="center";
    image.style.borderColor="#8A2BE2"
    image.style.borderStyle="dotted"

    boxOfImages.appendChild(image);
    divImages.appendChild(boxOfImages);

    return image;
}


//Images
let setOfImages = [
    {id: "image1", path: "DOM/images/img1.jpg", image: null},
    {id: "image2", path: "DOM/images/img2.jpg", image: null},
    {id: "image3", path: "DOM/images/img3.jpg", image: null},
    {id: "image4", path: "DOM/images/img4.jpg", image: null},
    {id: "image5", path: "DOM/images/img5.jpg", image: null},
]

let setOfINewImages = [
    {id: "newimage1", path: "DOM/images/newImages-1.jpg", image: null},
    {id: "newimage2", path: "DOM/images/newImages-2.jpg", image: null},
    {id: "newimage3", path: "DOM/images/newImages-3.jpg", image: null},
    {id: "newimage4", path: "DOM/images/newImages-4.jpg", image: null},
    {id: "newimage5", path: "DOM/images/newImages-5.jpg", image: null},
]

//add images of prince
for (let image of setOfImages){
    image.image = addImages(image.id, image.path)

    image.image.onclick = function (){
        let figure = image.image.parentElement
        figure.style.display = "none"
    }
}

let buttonImages = document.createElement('button');
buttonImages.className = "pill";
buttonImages.textContent = "Add Prince Image";
buttonImages.setAttribute("onclick", "addNewImage()");
buttonImages.id = "addImages";
buttonImages.style.marginTop = "2em";
divBody.appendChild(buttonImages);

function addNewImage(){
    let newImage = document.createElement('img');

    let randomImage = Math.floor(Math.random() * 5) + 1;

    newImage.setAttribute("src", setOfINewImages[randomImage].path);
    newImage.setAttribute("id", setOfINewImages[randomImage].id);

    newImage.style.height="7em";
    newImage.style.width="7em";
    newImage.style.borderRadius="45%";
    newImage.style.margin="1em";
    newImage.style.alignContent="center";
    newImage.style.borderColor="#8A2BE2"
    newImage.style.borderStyle="dotted"

    divImages.appendChild(newImage);

    newImage.onclick = function (){
        newImage.remove();
    }
}


//make all prince images visible again
window.onkeydown = function (event){
    if (event.ctrlKey && event.shiftKey && event.altKey){
       for (let image of setOfImages){
            let figure = image.image.parentElement
            figure.style.display = "block"
       }
    }
}
