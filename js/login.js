let formLogin = document.querySelector('#form-login');

formLogin.addEventListener('submit', (event) => {
    event.preventDefault()
    window.location.href = '/pages/homepage.html';
});