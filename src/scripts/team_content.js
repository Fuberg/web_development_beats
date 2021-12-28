$( document ).ready(function() {
    // Для выдвижения контента в team
    const member_name = $('.member__name');
    
    member_name.on('click', function(e){
      member_name.not(this).closest('.member').removeClass('member-active');
      $(this).closest('.member').toggleClass('member-active');
      // console.log(this.closest('.member'))
    });
    
});