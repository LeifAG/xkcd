//Definierar globala variabler för nuvarande och största comic nummer
var currentComic = -1;
var maxComic = -1;

window.onload = function(){
    //Hämtar den senaste comic
    getComic("latest")

    //Lägger en eventlistener på knappen första och kallar på fetch för comic nummer 1
    document.getElementById('forsta').addEventListener('click',function(){
        if(currentComic!=1){
            getComic(1);
        }
    })

    //Lägger en eventlistener på knappen förra och kallar på fetch för förra comicnummer
    //en if-sats blockerar att knappen stegar under comicnummer 1
    document.getElementById('forra').addEventListener('click',function(){
        if(currentComic-1>0){
            getComic(currentComic-1);
        }
    })

    document.getElementById('slumpa').addEventListener('click',function(){
        getComic(Math.ceil(Math.random()*maxComic));
    })

    document.getElementById('nasta').addEventListener('click',function(){
        if(currentComic+1<maxComic){
            getComic(currentComic+1);
        }
    })

    document.getElementById('sista').addEventListener('click',function(){
        if(currentComic!=maxComic){
            getComic("latest");
        }
    })
}

//Funktion för att hämta en given comic från api:et
function getComic(which){
    fetch('https://xkcd.vercel.app/?comic='+which)
    .then(function(response){
        //returnerar ett json objekt om api:et svarar med en OK status
        if(response.status==200){
            return response.json();
        }
    })
    .then(function(data){
        //uppdaterar max comic om det finns en högre siffra
        if(maxComic<data.num){
            maxComic=data.num;
        }
        //skickar vidare json objektet
        appendComic(data);
    })
}

function appendComic(data){
    console.log(data);

    //Hämtar och tömmer main comic div från HTML dokument
    let mainComic = document.getElementById('mainComic');
    mainComic.innerHTML="";

    //Skapar och lägger till titeln till dokumentet
    let titel = document.createElement('H3');
    titel.innerHTML = data.title;
    mainComic.appendChild(titel);

    //Skapar och lägger till datumet till dokumentet
    let datum = new Date(data.year,data.month-1,data.day);
    let datumtag = document.createElement('time');
    datumtag.innerHTML = datum.toLocaleDateString();
    mainComic.appendChild(datumtag);

    //Skapar och lägger till bilden samt en caption
    // till dokumentet inom ett figure element
    let figure = document.createElement('figure');
    let img = document.createElement('img');
    img.src=data.img;
    let cap = document.createElement('figcaption');
    cap.innerHTML = "Nummer: "+data.num;
    figure.appendChild(img);
    figure.appendChild(cap);
    mainComic.appendChild(figure);

    //Uppdaterar nuvarande comic nummer
    currentComic=data.num;
}