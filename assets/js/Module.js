const Content = db.ref('/Content');
const StartButton = document.getElementById('startmodule');
const NextButton = document.getElementById('nextslide');
const PreviousButton = document.getElementById('previousslide');
const TakeQuizButton = document.getElementById('takequiz');
const firstSlideHeading = document.getElementById('first-slide-heading');
const firstSlideImg = document.getElementById('first-slide-img');
const slideTxt = document.getElementById('slide-txt');
const slideImg = document.getElementById('slide-img');
const slideTitle = document.getElementById('all')
const flexcontainer = document.getElementsByClassName('flex-container');
const ul = document.getElementById("ul");
var imgsrc = []; var training = [];
var modNum; var SlideTot;
let n = 0;


const getModuleIndex = (hash) => {
    switch (hash) {
        case '#1': return 1; case '#2': return 2; case '#3': return 3; case '#4': return 4; case '#5': return 5;
        case '#6': return 6; case '#7': return 7; case '#8': return 8; case '#9': return 9; case '#10': return 10;
        default: return 1;
    }
}

var ModFill = function () {  //fill training array with slides

    Content.once('value', (snapshot) => {

        SlideTot = snapshot.child("Module" + modNum + "/SlideTot").val();   //set SlideTot to number of slides contained in module 

        for (var i = 1; i <= SlideTot; i++) {
            let texts = [];
            let x = 1;
            let mains = snapshot.child("Module" + modNum + "/" + i + "/Text" + x + "/Main/").val();

            do {
                
                texts.push(mains);
                let bullets = snapshot.child("Module" + modNum + "/" + i + "/Text" + x + "/Bullet").toJSON();
                let itemArr = [];
                for (item in bullets) {
                    itemArr.push(bullets[item]);
                }
                texts.push(itemArr);
                x++;
                mains = snapshot.child("Module" + modNum + "/" + i + "/Text" + x + "/Main/").val();
            } while (mains != undefined);

            const slide = {
                img: snapshot.child("Module" + modNum + "/" + i + "/Img").val(),
                title: snapshot.child("Module" + modNum + "/" + i + "/Title").val(),
                heading: snapshot.child("Module" + modNum + "/" + i + "/Heading").val(),
                text: texts
            }
            training.push(slide);
        }// all slides added to training.
    })
};//end of ModFill

const callModFill = (function () {
    slideImg.style.display = 'none';  //hide flex img element on first loading
    slideTxt.style.display = 'none';  //hide flex text element on first loading
    modNum = getModuleIndex(window.location.hash);
    ModFill(modNum);
})();

function arrToUl(arr) {
    var ul = document.createElement('ul'), li;
    for (var i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            li.appendChild(arrToUl(arr[i]));
        } else {
            li = document.createElement('li');
            li.appendChild(document.createTextNode(arr[i]));
            ul.appendChild(li);
        }
    }
    return ul;
}
//var myArray = ['Value 1', ['Inner value 1', 'Inner value 2', 'Inner value 3', 'Inner value 4'], 'Value 2', 'Value 3', 'Value 4', 'Value 5', 'Value 6'];
//document.body.appendChild(arrToUl(myArray));

/*----------Toggle order of content items-------------*/

function toggleorder(element, element2) {

    if (element.style.order === '1') {
        element.style.order = '2';
        element2.style.order = '1';
    } else {
        element.style.order = '1';
        element2.style.order = '2';
    }
}

/*-------------Previous and Next slide functions---------------*/

function previousSlide() {
    n--;
    TakeQuizButton.style.visibility = "hidden"; //hide take quiz button
    NextButton.style.visibility = 'visible'; //show Next Button
    slideTxt.removeChild(slideTxt.firstChild);//remove any current text/children in the text box

    if (n == 1) {   //can never be given n = 0 due to 'Previous' button being hidden for n=0;
        slideImg.style.display = 'none';  //hide flex img element
        slideTxt.style.display = 'none';  //hide flex text element
        PreviousButton.style.visibility = 'hidden';    //Set first slide in stone -> hide previous button, img first, text second
        firstSlideHeading.style.display = 'block';
        firstSlideImg.style.display = 'block';
        firstSlideHeading.innerHTML = training[n - 1].heading;
        firstSlideImg.src = training[n - 1].img;

    } else if (n < SlideTot) {
        toggleorder(slideTxt, slideImg);
        //  flexcontainer.style.display = 'flex';

        slideImg.src = training[n - 1].img;
        slideTxt.appendChild(arrToUl(training[n - 1].text));
    }
}

function nextSlide() {
    console.log(n);
    //make it so it doesn't need to check the follwing every time


    if (n == 0) {
        console.log("first slide created");
        StartButton.style.visibility = 'hidden';  //hide startmodule button
        NextButton.style.visibility = 'visible';  //show nextslide button
        PreviousButton.style.visibility = 'hidden';    //Set first slide in stone -> hide previous button, img first, text second. 
        //firstSlideHeading.style.display = 'block';
        //firstSlideImg.style.display = 'block';
        firstSlideHeading.innerHTML = training[0].heading;
        firstSlideImg.src = training[0].img;
        //slideImg.toggleClass('hidden');  //hide flex img element
        //slideTxt.toggleClass('hidden');  //hide flex text element
        n++;
    }
    else if (n < SlideTot) {
        PreviousButton.style.visibility = 'visible'   //show 'Previous' button if n >=1;
        firstSlideHeading.style.display = 'none';
        firstSlideImg.style.display = 'none';
        toggleorder(slideTxt, slideImg);
        slideImg.style.display = 'block';
        slideTxt.style.display = 'block';
        slideImg.src = training[n].img;
        if (slideTxt.hasChildNodes()) {
            slideTxt.removeChild(slideTxt.firstChild);//remove any current text/children in the text box
        }
        slideTxt.appendChild(arrToUl(training[n].text)); //append new text
        n++;
        if (n == SlideTot) {
            NextButton.style.visibility = 'hidden';
            TakeQuizButton.style.visibility = "visible";
        }
    }

}






