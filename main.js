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

// Для работы оверлея с меню
const overlay = document.querySelector('.overlay')
const close_btn = document.querySelector('.overlay__cross')
const open_btn = document.querySelector('.gamburger')

close_btn.addEventListener('click', function(e){
  overlay.style.height = '0';
  $(close_btn).css('display', 'none'); 
  $(overlay).find('.overlay__menu').css('display', 'none');
});

open_btn.addEventListener('click', function(e){
  $(close_btn).css('display', 'block'); 
  $(overlay).find('.overlay__menu').css('display', 'flex');
  overlay.style.height = '100vh';
});


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

// Обработка формы 
const order_form = document.querySelector('.make-order__form');
const orderBtn = document.querySelector('#orderBtn');
const overlayMessage = $('.overlay__message');

// console.log(JSON.(order_form.elements.comment))

orderBtn.addEventListener('click', e => {
  e.preventDefault();

  if (validateForm(order_form)) {
    const data = {
      name: order_form.elements.name.value,
      phone: order_form.elements.phone.value,
      comment: order_form.elements.comment.value,
      to: 'mail@mail.ru',
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    xhr.responseType = 'json';
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(data));
    xhr.addEventListener('load', () => {
      if (xhr.response.status) {
        console.log(xhr.response.status);
        $(overlayMessage).css('display', 'flex');
        $(overlayMessage).find('.overlay__text').text('Сообщение отправлено');
        overlay.style.height = '100vh';
      } 
      else {
        console.log(xhr.response.status);
        $(overlayMessage).css('display', 'flex');
        $(overlayMessage).find('.overlay__text').text(xhr.response.message);
        overlay.style.height = '100vh';
      }
    });
  }

});

$(overlayMessage).find('.overlay__btn').on('click', e => {
  e.preventDefault();

  overlay.style.height = '0';
  $(overlayMessage).css('display', 'none');
});


function validateForm(form) {
  let valid = true;

  if (!validateField(form.elements.name)){
    valid = false;
  }

  if (!validateField(form.elements.phone)){
    valid = false;
  
  }
  if (!validateField(form.elements.comment)){
    valid = false;
  }

  return valid;

}

function validateField(field){
  
  if (field.checkValidity()){
    $(field).prev().removeClass('form__error');
    return true;
  } else {
    $(field).prev().addClass('form__error');
    return false;
  }

}

// Для выдвижения контента в design "секция описания цветов"
const design__title = $('.design__title');

design__title.on('click', function(e){
  design__title.not(this).closest('.design__item').removeClass('design__item-active');
  $(this).closest('.design__item').toggleClass('design__item-active');
  // console.log(this.closest('.member'))
});


});