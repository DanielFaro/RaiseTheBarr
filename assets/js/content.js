const Content = db.ref('/Content');
const StartButton = document.getElementById('startmodule');
const NextButton = document.getElementById('nextslide');
const PreviousButton = document.getElementById('previousslide');
const slideTxt = document.getElementById('slide-txt');
const slideImg = document.getElementById('slide-img');
let n = 0;

var PopulateModule = function () {

    Content.on('value', (snapshot) => {  //fill Slide arrays with text and img sources from database
        var texts = [];
        var imgURLs = [];
        var modNum = 1;

        if (modNum < 11) {
            for (var i = 1; i < 11; i++) {
                text = snapshot.child("Module" + modNum + "/Text" + i).val();
                img = snapshot.child("Module" + modNum + "/Img" + i).val();
                texts.push(text);
                imgURLs.push(img);
            }
            modNum++;
        }
        //create new Module instance
        Module = new Module(texts, imgURLs);
        nextSlide() //show first slide
        StartButton.style.visibility = 'hidden';  //hide startmodule button
        NextButton.style.visibility = 'visible';  //show nextslide button

    })
} //end of Populate

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
        console.log(n);
        toggleorder(slideTxt, slideImg)
        n--;
        NextButton.style.visibility = 'visible';
        NextButton.innerHTML = "Next";
    }

    slideTxt.innerHTML = Module.texts[n - 1];
    slideImg.src = Module.imgURLs[n - 1];

}

function nextSlide() {

    if (n == 0) {
        PreviousButton.style.visibility = 'hidden';    //Set first slide in stone -> hide previous button, img first, text second. 
        slideImg.style.order = '1';
        slideTxt.style.order = '2';
        slideTxt.innerHTML = Module.texts[0];
        slideImg.src = Module.imgURLs[0];
        n++;
    }
    else if (n < 10) {
        console.log(n);
        PreviousButton.style.visibility = 'visible'   //show 'Previous' button if n >=1;
        toggleorder(slideTxt, slideImg);
        slideTxt.innerHTML = Module.texts[n];
        slideImg.src = Module.imgURLs[n];
        n++;
        if (n == 10) {
            NextButton.innerHTML = "Take the Quiz";
        }
    } else {
        console.log(n);
        NextButton.style.visibility = 'hidden';
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