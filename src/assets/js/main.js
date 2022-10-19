import 'bootstrap';

const inputPassword = document.querySelector('input');
const inputLenght = document.querySelector('input.input-lenght');
const progressBar = document.querySelector('div.progress-bar');
const progressText = document.querySelector('p.progress-bar-text');
const liItems = [...document.getElementsByTagName('li')];
const liIcons = [...document.querySelectorAll('svg.list-icon')];
const btnGenerate = document.querySelector('button');
const checkbox = [...document.querySelectorAll('input.option-checkbox')];
const characters = ['abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ','1234567890',`!"#$%&'*+,./:;=?@\\^|~` + "`" , '_', '()[]{}<>'];

let settings = [];
let generatorChars = '';
let generatorCharsLenght = '';
let passwordStrength = 0;
let result = '';

const generatePassword = function() {
    
    //Check if user provided length
    let i = 0;
    if (inputLenght.value == '') {
        alert('You need to provide length of password');
        return;
    }

    if (inputLenght.value <=0 || isNaN(inputLenght.value)) {
        alert('You need to provide correct length of password');
        return;
    }

    //Create array with selected settings and check if any checkbox is selected
    checkbox.forEach(checkbox => {
        settings.push(checkbox.checked);
        if(checkbox.checked){
            i += 1;
        }
    });

    //Display alert when none checbox is selected
    if (i==0) {
        alert('At least one option need to be checked');
        return;
    }

    //Create string with selected character sets
    for (i = 0; i < 6; i++) {
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
        liItems[0].style.color = "#008000";
        liIcons[0].style.display = "block";
    }else{
        liItems[0].style.color = "#ff0000";
        liIcons[0].style.display = "none";
    };

    if (inputPassword.value.match(/[!"#$%&'*+,./:;=?@\^|~`_<>{}()]/)) {
        passwordStrength += 1;
        liItems[1].style.color = "#008000";
        liIcons[1].style.display = "block";
    }else{
        liItems[1].style.color = "#ff0000";
        liIcons[1].style.display = "none";
    };

    if (inputPassword.value.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
        passwordStrength += 1;
        liItems[2].style.color = "#008000";
        liIcons[2].style.display = "block";
    }else{
        liItems[2].style.color = "#ff0000";
        liIcons[2].style.display = "none";
    };
    
    if (inputPassword.value.match(/([0-9])/)) {
        passwordStrength += 1;
        liItems[3].style.color = "#008000";
        liIcons[3].style.display = "block";

    }else{
        liItems[3].style.color = "#ff0000";
        liIcons[3].style.display = "none";
    };

    if (inputPassword.value !== '') {
        switch (passwordStrength) {
            case 2:
                progressBar.style.backgroundColor = "#ff0000";
                progressBar.style.width = "40%";
                progressText.textContent = "Your password is weak";
                progressText.style.color = "#ff0000";
                break;
            case 3:
                progressBar.style.backgroundColor = "#008000";
                progressBar.style.width = "60%";
                progressText.textContent = "Your password is strong";
                progressText.style.color = "#008000";
                break;
            case 4:
                progressBar.style.backgroundColor = "#008000";
                progressBar.style.width = "100%";
                progressText.textContent = "Your password is very strong";
                progressText.style.color = "#008000";
                break;
        
            default:
                progressBar.style.backgroundColor = "#ff0000";
                progressBar.style.width = "20%";
                progressText.textContent = "Your password is very weak";
                progressText.style.color = "#ff0000";
                break;
        };

    }else{
                progressBar.style.backgroundColor = "#B2A8A8";
                progressBar.style.width = "100%";
                progressText.textContent = "Your password is empty";
                progressText.style.color = "#B2A8A8";
    };
   
    passwordStrength = 0;
};

btnGenerate.addEventListener("click", () => {
    generatePassword();
    checkPassword();
})

inputPassword.addEventListener("input", checkPassword)