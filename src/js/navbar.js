const menuButton = document.querySelector('#menu-btn');
const navbar = document.querySelector('.header-navbar'); 
menuButton.addEventListener('click', ()=>{
    navbar.classList.toggle('active');
})