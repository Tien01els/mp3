const login = document.querySelector('.login');
const register = document.querySelector('.register');
const loginContainer = document.querySelector('.login-container');
const registerContainer = document.querySelector('.register-container');

login.onclick = function() {
    console.log('register');
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