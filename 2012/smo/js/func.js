$(document).ready(function() {
   
   $(".sp").click(function() {
      $(this).next(".sp_show").slideToggle("slow");
      $(this).toggleClass("active"); return false;
   });

  $('ul.tabs').each(function() {
    $(this).find('li').each(function(i) {
      $(this).click(function(){
        $(this).addClass('current').siblings().removeClass('current')
          .parents('div.section').find('div.box').hide().end().find('div.box:eq('+i+')').fadeIn(450);
      });
    });
  });
  
});