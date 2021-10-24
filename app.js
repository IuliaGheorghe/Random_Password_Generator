function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

let passwordSize = 7;

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
let requested = [ 1, 1, 1, 1, 1 ];

let lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
let upperLetters = lowerLetters.toUpperCase();
let digits = '0123456789';
let specialChars = '{.,-_/&%#()}';

let sequence = 'croco';
let sequencePosition = 'mid';
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


console.log(password);