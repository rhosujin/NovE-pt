$(document).ready(function(){

const header = document.querySelector('.header');
const headerToggle = document.querySelector('.header__toggle');



/* 햄버거 */
headerToggle.addEventListener('click', () => {
  header.classList.toggle('active');
});


/* 스크롤 */
window.addEventListener('scroll', () => {

  if(window.scrollY > 50){
    header.classList.add('scrolled');
  }else{
    header.classList.remove('scrolled');
  }

});

})