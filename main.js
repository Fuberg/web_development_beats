const left = document.querySelector('.slider__left-row');
const right = document.querySelector('.slider__right-row');
const list = document.querySelector('.slider__list');
const list_item = document.querySelector('.slider__item');
const slider = document.querySelector('.slider');

let list_length = list.getElementsByTagName('li').length;
let position = 0;

console.log(slider.offsetWidth)

left.addEventListener('click', function(){
  if (position != 0) {
    // console.log("Нажали левую");
    position--;
   list.style.left = "-" + (position * slider.offsetWidth) + 'px'
  }
});

right.addEventListener('click', function(){
  
  if (position != (list_length-1)) {
    // console.log("Нажали правую")
    position++;
   list.style.left = "-" + (position * slider.offsetWidth) + 'px'
  }
});