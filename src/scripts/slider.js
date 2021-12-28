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
});