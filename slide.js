let slide = document.getElementById("myRange");
let size = document.getElementById("size-value");
let message = document.getElementById("size-fun-text-generator");

function changeMessage(){
    switch(true){
        case (slide.value < 8):
            message.innerText = 'Can\'t wait to break it!';
            break;
        case (slide.value >= 8 && slide.value < 12):
            message.innerText = 'Oh, that\'s actually pretty cool!';
            break;
        case (slide.value >= 12 && slide.value < 15):
            message.innerText = 'I see you\'re a man of security as well!';
            break;
        case (slide.value >= 15 && slide.value < 18):
            message.innerText = 'You, Sherlock! You\'re a genius!';
            break;
        case (slide.value >=18):
            message.innerText = 'Whoaaa... I see perfection!';
            break;
    }
}


function rangeChanged(){
    size.value = slide.value;
    changeMessage();
}

function sizeChanged(){
    slide.value = size.value;
    changeMessage();
}

changeMessage();
