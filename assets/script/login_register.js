const login = $('.login');
const register = $('.register');
const loginContainer = $('.login-container');
const registerContainer = $('.register-container');

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