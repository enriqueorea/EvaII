const acordeonBtn = document.querySelectorAll('.cbp-nttrigger');
const acordeonContent = document.querySelector('.cbp-ntcontent');

acordeonBtn.forEach(btn => {
    btn.addEventListener('click', () => {
       btn.parentElement.classList.toggle('cbp-ntopen')
    })
})