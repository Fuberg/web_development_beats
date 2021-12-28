$( document ).ready(function() {
    
    // Для работы слайдера отзывов
    const reviews_list_wrap = $('.reviews__list-wrap');
    let need_height = $(reviews_list_wrap).find('.reviews__item').outerHeight() + 'px';
    $(reviews_list_wrap).css('height', need_height);
    
    const reviews_list = $('.reviews__list')
    
    const reviews_switcher_item = $('.reviews__switcher-item');
    reviews_switcher_item.on('click', function(e){
      e.preventDefault();
      let need_height = $(reviews_list_wrap).find('.reviews__item').outerHeight();
      let need_top = '-' + ($(this).index() * need_height) + 'px';
    //   console.log(need_top);
    
      reviews_switcher_item.not(this).removeClass('interactive-avatar--active');
      $(this).toggleClass('interactive-avatar--active');
    
      reviews_list.css('top', need_top);
    });
    
    
});