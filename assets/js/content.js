const Content = db.ref('/Content');
const StartButton = document.getElementById('startmodule');
const NextButton = document.getElementById('nextslide');
const PreviousButton = document.getElementById('previousslide');
const slideTxt = document.getElementById('slide-txt');
const slideImg = document.getElementById('slide-img');
var imgsrc = [];

//var slidecontent = [];
let n = 0;
var training = [];

var modNum = 1;

//const Modules =  {
  //  modules: [];


//}

console.log("content.js loaded");


//set module from firebase

//if module 1 selected etc

function setmodNum(num){
    console.log("hey");
   modNum = num;
    //Module();
}

var Module = function () {
    console.log(modNum);
   // var training = [];
    Content.on('value', (snapshot) => {  //fill Slide arrays with text and img sources from database
        console.log('on.value');
        for (var i = 1; i < 11; i++) {
            let texts = [];
            
            for (var x = 1; x <= 2; x++) {
                let mains = snapshot.child("Module" + modNum + "/" + i + "/Text" + x + "/Main/").val();
                texts.push(mains);
                let bullets = snapshot.child("Module" + modNum + "/" + i + "/Text" + x + "/Bullet").toJSON();
                let itemArr = [];
                for (item in bullets) {
                    itemArr.push(bullets[item]);
                }
                texts.push(itemArr);
            }

            const slide = {
                img: snapshot.child("Module" + modNum + "/" + i + "/Img").val(),
                title: snapshot.child("Module " + modNum + "/" + i + "/Title").val(),
                heading: snapshot.child("Module " + modNum + "/" + i + "/Heading").val(),
                text: texts
            }
            //console.log(slide.text);
            training.push(slide);
            console.log(training[i - 1].text);
        }// all slides added to training.
    })
   
};//end of module



//convert text array to unorderedlist

//function test1() {
//  console.log(slidecontent.training[1].text);
//}
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

    if (n == 1 || n == 2) {   //can never be given n = 0 due to 'Previous' button being hidden for n=0;
        n--;
        PreviousButton.style.visibility = 'hidden';    //Set first slide in stone -> hide previous button, img first, text second
        slideImg.style.order = '1';
        slideTxt.style.order = '2';
    } else if (n < 10) {
        n--;
        toggleorder(slideTxt, slideImg);
    } else {
        toggleorder(slideTxt, slideImg)
        n--;
        NextButton.style.visibility = 'visible';
        NextButton.innerHTML = "Next";
    }

    slideImg.src = training[n - 1].img;
    slideTxt.appendChild(arrToUl(training[n - 1].text));
}

function nextSlide() {
    //console.log(training[0].text);
    //getTraining();
    StartButton.style.visibility = 'hidden';  //hide startmodule button
    NextButton.style.visibility = 'visible';  //show nextslide button
    if (n == 0) {
        console.log("first slide created");
        PreviousButton.style.visibility = 'hidden';    //Set first slide in stone -> hide previous button, img first, text second. 
        slideImg.style.order = '1';
        slideTxt.style.order = '2';
        //slideTxt.innerHTML = slidecontent[0].text;
        slideTxt.appendChild(arrToUl(training[0].text));
        //arrToUl(slidecontent[0].text);
        slideImg.src = (training[0].img);
        //console.log(slideTxt.innerHTML);
        //console.log(slideImg.src);
        n++;
    }
    else if (n < 10) {
        PreviousButton.style.visibility = 'visible'   //show 'Previous' button if n >=1;
        toggleorder(slideTxt, slideImg);
        slideImg.src = training[n].img;
        slidTxt.appenChild(arrToUl(training[n].text));
        //slideTxt.innerHTML = slidecontent[n].text;
        n++;
        if (n == 10) {
            NextButton.innerHTML = "Take the Quiz";
        }
    }
}


//change quiz reveal function equal to this so it can be used, or use toggle class.
/*---------------Toggle hide and order functions------------------*/
/*function togglehide(element) {

    if (element.style.visibility === "visible") {
        element.style.visibility = "hidden";
    } else {
        element.style.visibility = "visible";
    }
}*/


/*function showimage() {

    var storage = firebase.storage();
    var storageRef = storage.ref();
    var tangRef = storageRef.child('images/test5.jpg');

    firebase.auth().signInAnonymously().then(function () {

        tangRef.getDownloadURL().then(function (url) {
            document.querySelector('slide-img').src = url;

        }).catch(function (error) {
            console.error(error);
        });
    });

} */


class _Module {
    constructor(slides) {
        this.slides = slides
    }
}