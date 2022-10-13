
const body = document.body;

(function createMain(){
    let main = document.createElement('main');
    main.id = 'main';
    body.appendChild(main);
})();

(function createSection() {
    let section = document.createElement('section');
    section.id = 'mySec';
    body.appendChild(section);
})();

const section = document.getElementById("mySec");

(function createDivTittle(){
    let divTittle = document.createElement('div');
    divTittle.id = 'divTittle';
    divTittle.className='main-title';
    divTittle.innerHTML = '<h2>A<span>PI</span> <span class="bg-text">API DOM</span> </h2>';
    section.appendChild(divTittle);
})();

(function createDivBody(){
    let div = document.createElement('div');
    div.className = 'centered scroll';
    div.id = 'divBody';
    div.style.alignItems = "stretch";
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
divImages.style.flexWrap = 'wrap';

divImagesRow = document.createElement('div');
divImagesRow.id = 'divImagesRow';
divImagesRow.style.display = 'flex';
divImagesRow.style.justifyContent = 'center';
divImagesRow.style.marginTop = "2em";
divImagesRow.style.flexWrap = 'wrap';
divImages.appendChild(divImagesRow);
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
    divImagesRow.appendChild(boxOfImages);

    return image;
}


//Images
let setOfImages = [
    {id: "image1", path: "img/img1.jpg", image: null},
    {id: "image2", path: "img/img2.jpg", image: null},
    {id: "image3", path: "img/img3.jpg", image: null},
    {id: "image4", path: "img/img4.jpg", image: null},
    {id: "image5", path: "img/img5.jpg", image: null},
]

let setOfINewImages = [
    {id: "newimage1", path: "img/newImages-1.jpg", image: null},
    {id: "newimage2", path: "img/newImages-2.jpg", image: null},
    {id: "newimage3", path: "img/newImages-3.jpg", image: null},
    {id: "newimage4", path: "img/newImages-4.jpg", image: null},
    {id: "newimage5", path: "img/newImages-5.jpg", image: null},
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
    let boxOfImages = document.createElement('div');

    let newImage = document.createElement('img');

    let randomImage = Math.floor(Math.random() * 5) + 1;

    let randomNumber = Math.floor(Math.random() * 1000) + 1;

    newImage.setAttribute("src", setOfINewImages[randomImage].path);
    newImage.setAttribute("id", setOfINewImages[randomImage].id);
    boxOfImages.id = 'boxOfImages' + setOfINewImages[randomImage].id + randomNumber;


    newImage.style.height="7em";
    newImage.style.width="7em";
    newImage.style.borderRadius="45%";
    newImage.style.margin="1em";
    newImage.style.alignContent="center";
    newImage.style.borderColor="#8A2BE2"
    newImage.style.borderStyle="dotted"
    newImage.style.display="flex";

    boxOfImages.appendChild(newImage);
    divImagesRow.appendChild(boxOfImages);

    newImage.onclick = function (){
        document.getElementById('boxOfImages' + setOfINewImages[randomImage].id + randomNumber).remove();
        newImage.remove();
    }

}

//make all prince images visible again
window.onkeydown = function (event){
    if (event.ctrlKey && event.shiftKey && event.altKey){
       for (let images of setOfImages){
            let figure = images.image.parentElement
            figure.style.display = "";
       }
    }
}
