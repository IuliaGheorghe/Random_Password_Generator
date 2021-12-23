function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

let lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
let upperLetters = lowerLetters.toUpperCase();
let digits = '0123456789';
let specialChars = '{.,-_/&%#()}';

/*
    l = lowerCase
    U = upperCase
    d = digits
    s = specialCharacters
    S = sequence

    1 - true / requested
    0 - false / not requested 
*/

//                l  U  d  s  S
let requested = [ 1, 0, 0, 0, 0 ];

function SetChars(){
    if(requested.includes(1)){
        document.getElementById('components').style.display = 'none';
        document.getElementById('size').style.display = 'block';
        document.getElementById('sequence').style.display = 'none';
        document.getElementById('result').style.display = 'none';
    }
    else
        alert('You Need At Least One Set Of Characters!');
}

let options = document.getElementsByClassName("option");

function SetCharsOption(x){

    if(options[x].className.includes("disabled")){
        options[x].classList.remove("disabled");
        options[x].classList.add("selected");
        requested[x] = 1;
    }
    else if(options[x].className.includes("selected")){
        options[x].classList.remove("selected");
        options[x].classList.add("disabled");
        requested[x] = 0;
    }

}


let passwordSize = 8;

function SetSize(){
    document.getElementById('components').style.display = 'none';
    document.getElementById('size').style.display = 'none';
    document.getElementById('sequence').style.display = 'block';
    document.getElementById('result').style.display = 'none';

    passwordSize = document.getElementById('myRange').value;
    
}

function SetSequencePos(index){
    let posOptions = document.getElementById('sequence-positions-container').getElementsByClassName('option');

    for(let i=0; i<posOptions.length; i++)
        if(i!== index){
            posOptions[i].classList.remove("selected");
            posOptions[i].classList.add("disabled");  
        }
        else{
            posOptions[i].classList.remove("disabled");
            posOptions[i].classList.add("selected"); 
        }
}

let sequence = '';


function WantsSequence(op){

    if(op === true) {
        document.getElementById('sequence-options-container').querySelectorAll('.option:not(.sq-op)')[0].classList.remove("disabled");
        document.getElementById('sequence-options-container').querySelectorAll('.option:not(.sq-op)')[0].classList.add("selected");
        document.getElementById('sequence-options-container').querySelectorAll('.option:not(.sq-op)')[1].classList.remove("selected");
        document.getElementById('sequence-options-container').querySelectorAll('.option:not(.sq-op)')[1].classList.add("disabled");
        document.getElementById('yes-sequence').style.display="block";
        


    }
    else{
        document.getElementById('sequence-options-container').querySelectorAll('.option:not(.sq-op)')[1].classList.remove("disabled");
        document.getElementById('sequence-options-container').querySelectorAll('.option:not(.sq-op)')[1].classList.add("selected");
        document.getElementById('sequence-options-container').querySelectorAll('.option:not(.sq-op)')[0].classList.remove("selected");
        document.getElementById('sequence-options-container').querySelectorAll('.option:not(.sq-op)')[0].classList.add("disabled");
        document.getElementById('yes-sequence').style.display="none";
    }
}




function GeneratePassword(){

    if(document.getElementById('yes-sequence').style.display==='block') 
        sequence = document.querySelector('[placeholder="Add Your Sequence Here"]').value;
    else sequence = '';


    // check what characters should be used and places their sets in reqType array

    let reqType = new Array;
    if(requested[0])
        reqType.push(lowerLetters);
    if(requested[1])
        reqType.push(upperLetters);
    if(requested[2])
        reqType.push(digits);
    if(requested[3])
        reqType.push(specialChars);


    let password = '';

    let sequencePosition = document.getElementById('sequence-positions-container').querySelector('[class*="selected"]').id;
    let seqPosOptions = ['beg', 'mid', 'end'];

    /*
        beg - beggining
        mid - middle
        end - end
        idm - it doesn't matter (in this case beg, mid or end will be randomly picked)
    */

    if(sequencePosition === 'idm')
      sequencePosition = seqPosOptions[Math.floor(Math.random() * seqPosOptions.length)]

    if(sequence.length > passwordSize - 1)
        alert('Your sequence should be at least 1 character shorter the the password size you\'ve chosen!');


    if(sequencePosition === 'beg'){
        password += sequence;

        for(let i=0; i<passwordSize - sequence.length; i++){
            // stores a random set of allowed characters to be used
            let reqTypeRandom = Math.floor(Math.random() * reqType.length)
            // adds a random character form the random set to the password
            password += reqType[reqTypeRandom][Math.floor(Math.random() * reqType[reqTypeRandom].length)];
        }
    }
    else if(sequencePosition === 'mid'){

        // stores the last available index which would allow the requested sequence to be included
        let lastAvailableIndex = passwordSize - sequence.length;
        // stores a random index between 1 (second position) and the last available index discovered above
        let chosenIndex = getRandomArbitrary(1,lastAvailableIndex);

        // fills with random characters until the random index where sequence will be added
        for(let i=0; i<chosenIndex; i++){
            let reqTypeRandom = Math.floor(Math.random() * reqType.length)
            password += reqType[reqTypeRandom][Math.floor(Math.random() * reqType[reqTypeRandom].length)];
        }

        password += sequence;

        // fills with random characters after the sequence
        for(let i=chosenIndex + sequence.length; i<passwordSize; i++){
            let reqTypeRandom = Math.floor(Math.random() * reqType.length)
            password += reqType[reqTypeRandom][Math.floor(Math.random() * reqType[reqTypeRandom].length)];
        }

    }

    else if(sequencePosition === 'end'){
        for(let i=0; i<passwordSize - sequence.length; i++){
            let reqTypeRandom = Math.floor(Math.random() * reqType.length)
            password += reqType[reqTypeRandom][Math.floor(Math.random() * reqType[reqTypeRandom].length)];
        }

        password += sequence;
    }

    document.getElementById('components').style.display = 'none';
    document.getElementById('size').style.display = 'none';
    document.getElementById('sequence').style.display = 'none';
    document.getElementById('result').style.display = 'block';

    document.getElementById('pasw').innerText = password;
}

function Restart(){
    window.location.href = "index.html";
}

function clip(x){
    alert("Copied the text: " + x.innerText);
}

function CopyToClipboard(){
    let copyText = document.getElementById("pasw");

    navigator.clipboard.writeText(copyText.innerText);

    document.getElementById('copy-clip').style.backgroundColor = '#10ac84';
    document.getElementById('copied-pasw').style.display = 'block';
      
}
