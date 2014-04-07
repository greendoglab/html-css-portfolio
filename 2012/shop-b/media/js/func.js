(function($) {
$(function() {

  $('ul.tabs').each(function() {
    $(this).find('li').each(function(i) {
      $(this).click(function(){
        $(this).addClass('current').siblings().removeClass('current')
          .parents('div.section').find('div.tab').hide().end().find('div.tab:eq('+i+')').fadeIn(450);
      });
    });
  });

})
})(jQuery)