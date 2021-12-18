$( document ).ready(function() {
// Работа слайдера 
const left = document.querySelector('.slider__left-arrow');
const right = document.querySelector('.slider__right-arrow');
const list = document.querySelector('.slider__list');
const slider = document.querySelector('.slider');

// console.log(list)

let list_length = document.getElementsByClassName('slider__item').length;
let position = 0;

list.style.width = 100 * list_length + '%'

left.addEventListener('click', function(){
  if (position != 0) {
    position--;
  } else {
    position = list_length-1;
  }
  list.style.left = "-" + (position * slider.offsetWidth) + 'px'
});

right.addEventListener('click', function(){
  if (position != (list_length-1)) {
    position++;
  } else {
    position = 0;
  }

  list.style.left = "-" + (position * slider.offsetWidth) + 'px'
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


// Для выдвижения контента в team
const member_name = $('.member__name');

member_name.on('click', function(e){
  member_name.not(this).closest('.member').removeClass('member-active');
  $(this).closest('.member').toggleClass('member-active');
  // console.log(this.closest('.member'))
});



// Для работы слайдера отзывов
const reviews_list_wrap = $('.reviews__list-wrap');
need_height = $(reviews_list_wrap).find('.reviews__item').outerHeight() + 'px';
$(reviews_list_wrap).css('height', need_height);

const reviews_list = $('.reviews__list')

const reviews_switcher_item = $('.reviews__switcher-item');
reviews_switcher_item.on('click', function(e){
  e.preventDefault();
  need_height = $(reviews_list_wrap).find('.reviews__item').outerHeight();
  need_top = '-' + ($(this).index() * need_height) + 'px';
  console.log(need_top);

  reviews_switcher_item.not(this).removeClass('interactive-avatar--active');
  $(this).toggleClass('interactive-avatar--active');

  reviews_list.css('top', need_top);
});

});