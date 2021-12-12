const left = document.querySelector('.slider__left-row');
const right = document.querySelector('.slider__right-row');
const list = document.querySelector('.slider__list');
const list_item = document.querySelector('.slider__item');
const slider = document.querySelector('.slider');

// console.log(list)

let list_length = document.getElementsByClassName('slider__item').length;
let position = 0;

list.style.width = 100 * list_length + '%'

console.log(list_length)

left.addEventListener('click', function(){
  if (position != 0) {
    console.log("Нажали левую");
    position--;
   list.style.left = "-" + (position * slider.offsetWidth) + 'px'
  }
});

right.addEventListener('click', function(){
  
  if (position != (list_length-1)) {
    console.log("Нажали правую")
    position++;
   list.style.left = "-" + (position * slider.offsetWidth) + 'px'
  }
});

// Для работы оверлея 
const overlay = document.querySelector('.overlay')
const close_btn = document.querySelector('.overlay__cross')
const open_btn = document.querySelector('.gamburger')

// function open_click (){
//   overlay.style.display = 'block'
// };

// function close_click(){
//   overlay.style.display = 'none'
// };

function open_click (){
    overlay.style.height = '100vh'
};

function close_click(){
    overlay.style.height = '0'
};

close_btn.addEventListener('click', close_click);
open_btn.addEventListener('click', open_click);