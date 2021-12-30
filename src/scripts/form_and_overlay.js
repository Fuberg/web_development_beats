$( document ).ready(function() {

// Для работы оверлея с меню
const overlay = document.querySelector('.overlay')
const close_btn = document.querySelector('.overlay__cross')
const open_btn = document.querySelector('.gamburger')
const menu_item = $(".overlay__menu").find(".menu__item");

close_btn.addEventListener('click', function(e){
  overlay.style.height = '0';
  $(close_btn).css('display', 'none'); 
  $(overlay).find('.overlay__menu').css('display', 'none');
});

menu_item.on('click', function(e){
  overlay.style.height = '0';
  $(close_btn).css('display', 'none'); 
  $(overlay).find('.overlay__menu').css('display', 'none');
});

open_btn.addEventListener('click', function(e){
  $(close_btn).css('display', 'block'); 
  $(overlay).find('.overlay__menu').css('display', 'flex');
  overlay.style.height = '100vh';
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

});


// (function(){

// })();