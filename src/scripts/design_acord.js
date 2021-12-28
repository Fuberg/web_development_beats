$( document ).ready(function() {
    // Для выдвижения контента в design "секция описания цветов"
    const design__title = $('.design__title');
    
    design__title.on('click', function(e){
      design__title.not(this).closest('.design__item').removeClass('design__item-active');
      $(this).closest('.design__item').toggleClass('design__item-active');
      // console.log(this.closest('.member'))
    });
});