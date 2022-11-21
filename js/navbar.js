let navbar = document.querySelector('#navbar');
let options = document.querySelector('.options');
let showSidebar = false;
let burguer = document.querySelector('.burguer');
let navIcon = document.querySelector('.nav-icon');

burguer.addEventListener("click", () => {
    showSidebar = !showSidebar;
    if(showSidebar) {
        options.style.right = '0';
        options.style.animationName = 'showSidebar';
        navIcon.classList.remove('fa-bars');
        navIcon.classList.add('fa-xmark');
    } else {
        options.style.right = '-100vw';
        options.style.animationName = 'hideSidebar';
        navIcon.classList.remove('fa-xmark');
        navIcon.classList.add('fa-bars');
    }
    window.addEventListener('resize', () => {
        console.log("oi");
    });

});
