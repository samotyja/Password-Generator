import 'bootstrap';
const inputPassword = document.querySelector("input");
const inputLenght = document.querySelector('input.input-lenght');
const btn = document.querySelector("button");
const characters = [`!"#$%&'*+,./:;=?@\\^|~` + "`", '1234567890', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz', '_', '()[]{}<>'];
const checkbox = [...document.querySelectorAll('input.option-checkbox')];
let settings = [];
let generatorChars = '';
let generatorCharsLenght = '';
let passwordStrength = 0;
let result = '';

const liItems = [...document.getElementsByTagName("li")]
const progressBar = document.querySelector('div.progress-bar');
console.log(progressBar)





const generatePassword = function() {

    //Create array with selected settings
    checkbox.forEach(checkbox => {
        settings.push(checkbox.checked);
    });

    //Create string with selected character sets
    for (let i = 0; i < 6; i++) {
        if (settings[i] === true) {
            generatorChars += characters[i];
        }
    };

    //Generate password
    generatorCharsLenght = generatorChars.length;
    passwordLenght = inputLenght.value;
    
    for ( let i = 0; i < passwordLenght; i++ ) {
        result += generatorChars.charAt(Math.floor(Math.random() * generatorCharsLenght));
    }

    //Return generated password
    inputPassword.value = result;
    result = '';
    settings = [];
    generatorChars = '';

    return;
    
};

const checkPassword = function(){
    
    if (inputPassword.value.length >= 12) {
        passwordStrength += 1;
        console.log("length ok");
        liItems[0].style.color = "green";
    }else{
    }

    if (inputPassword.value.match(/[!"#$%&'*+,./:;=?@\^|~`]/)) {
        passwordStrength += 1;
        console.log("special ok");
        liItems[1].style.color = "green";
    }else{

    }

    if (inputPassword.value.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
        passwordStrength += 1;
        console.log("upper adn lower ok");
        liItems[2].style.color = "green";
    }else{

    }
    
    if (inputPassword.value.match(/([0-9])/)) {
        passwordStrength += 1;
        console.log("numbers ok");
        liItems[3].style.color = "green";

    }else{

    }
    console.log(passwordStrength);
    switch (passwordStrength) {
        case 1:
            progressBar.style.backgroundColor = "green";
            break;
        case 2:
            
            break;
        case 3:
            
            break;
        case 4:
            
            break;
    
        default:
            break;
    }
    passwordStrength = 0;
}

btn.addEventListener("click", () => {
    generatePassword();
    checkPassword();
})

inputPassword.addEventListener("input", checkPassword)