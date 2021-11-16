// Change form login & register
const login = document.querySelector('.login');
const register = document.querySelector('.register');
const loginContainer = document.querySelector('.login-container');
const registerContainer = document.querySelector('.register-container');

login.onclick = function() {
    login.classList.add('active');
    loginContainer.classList.add('active');
    register.classList.remove('active');
    registerContainer.classList.remove('active');
}

register.onclick = () => {
    register.classList.add('active');
    registerContainer.classList.add('active');
    login.classList.remove('active');
    loginContainer.classList.remove('active');
}

//
const iconFormContents = document.querySelectorAll('.form-content-input i');

for (const iconFormContent of iconFormContents) {
    iconFormContent.onclick = () => {
        iconFormContent.parentElement.querySelector('label').click();
    }
}


//Click button login
const btnLogin = document.querySelector('.btn-login');
const usernameLogin = document.querySelector('#username-login').value;
const passwordLogin = document.querySelector('#password-login').value;

btnLogin.onclick = (event) => {
    event.preventDefault();
    console.log({ passwordLogin })
    $.ajax({
        url: '',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: {
            usernameLogin,
            passwordLogin
        },
        success: function(response) {
            console.log(response);
            console.log("Venue Successfully Patched!");
        },
        error: function(jqXHR) {
            // log the error to the console
            console.log("The following error occured: " + textStatus, errorThrown);
        },
        complete: function() {
            console.log("Venue Patch Ran");
        }
    });
}


//Click button register
const btnRegister = document.querySelector('.btn-register');
const usernameRegister = document.querySelector('#username-register').value;
const emailRegister = document.querySelector('#email-register').value;
const passwordRegister = document.querySelector('#password-register').value;
const passwordConfirm = document.querySelector('#confirm-password').value;

btnRegister.onclick = (event) => {
    event.preventDefault();
    $.ajax({
        url: '',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: {
            usernameRegister,
            emailRegister,
            passwordRegister,
            passwordConfirm
        },
        success: function(response) {
            console.log(response);
            console.log("Venue Successfully Patched!");
        },
        error: function(jqXHR) {
            // log the error to the console
            console.log("The following error occured: " + textStatus, errorThrown);
        },
        complete: function() {
            console.log("Venue Patch Ran");
        }
    });
}