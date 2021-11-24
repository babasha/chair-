let openModal = document.querySelector('.button-3');
let feedbackModal = document.querySelector('.feedback-form');
let closeModal = document.querySelector(".close-btn");

openModal.onclick = function(){
  feedbackModal.classList.add("feedback-form_open");
};

closeModal.onclick = function(){
  feedbackModal.classList.remove("feedback-form_open");
};

/////          burger          /////

let burger = document.querySelector('.burger');
let burgerMenu = document.querySelector('.burger__menu');

// burger.onclick = function(){
//   burgerMenu.classList.add("burger__menu_on");
// }

// if(burgerMenu.classList.contains("burger__menu_on") == false){
//   burger.onclick = function(){
//     burgerMenu.classList.remove("burger__menu_on");
//   }
// }

burger.addEventListener("click", function(event){
  event.preventDefault();
  if(burgerMenu.classList.contains("close") == false){
  burgerMenu.classList.add("close");
  }
  else{
  burgerMenu.classList.remove("close");
  }
  })