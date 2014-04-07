var hideCat = function(){
    hideDistance = $(document).height();
    $('#catalogue').css('top', hideDistance).addClass('hide');
}

var showCat = function(){
    $('.doc_header__catalogue').click(function(){
        
        body = $('body');
        cat = $('#catalogue');
        slogan = $('.slogan');
        homepage = $('.model_view');

        if (cat.hasClass('hide')) {
            cat.animate({top: "150px"}, 900).removeClass('hide');            
            setTimeout(function () {
                cat.addClass('show')
                slogan.hide();
                homepage.hide();
                body.removeClass('scroll');
            }, 900);
        } else {
            cat.animate({top: hideDistance}, 900).removeClass('show');
            slogan.show();
            homepage.show();
            setTimeout(function () {
                slogan.show();
                homepage.show();
                cat.addClass('hide');
                body.addClass('scroll');
            }, 900);
        } event.preventDefault();
    });
}

var Accordion = function(){

    var allPanels = $('.accordion > dd').hide();

    var first = $('.accordion > dt.first > a').addClass('current');
    var first = $('.accordion > dd.first').show();
    
    $('.accordion > dt > a').click(function() {

        $('.current').removeClass('current');
        $(this).addClass('current');

        $this = $(this);
        $target =  $this.parent().next();

        if(!$target.hasClass('active')) {
            allPanels.removeClass('active').slideUp();
            $target.addClass('active').slideDown();
        }

        return false;

    });
}

var Tabs = function(){
    $('.catalogue_list ul').on('click', 'li:not(.current)', function() {  
      $(this).addClass('current').siblings().removeClass('current')  
          .parents('.cat_section').find('.catalogue_item').eq($(this).index()).fadeIn(150).siblings('.catalogue_item').hide();  
    })  
}

var TabList = function(){
    
    var item_width = $('.catalogue_list li').outerWidth();
    var item_size = $('.catalogue_list li').size();

    var move = item_width*5;

    $('.catalogue_list ul').css('width', item_width*item_size)

    var left_value = item_width * (-1);
        
    $('.catalogue_list li:first').before($('.catalogue_list li:last'));
    
    $('.catalogue_list ul').css({'left' : left_value});

    $('#list_left').click(function() {

        var left_indent = parseInt($('.catalogue_list ul').css('left')) + item_width;

        $('.catalogue_list ul').animate({'left' : left_indent}, 200,function(){    
            $('.catalogue_list li:first').before($('.catalogue_list li:last'));           
            $('.catalogue_list ul').css({'left' : left_value});
        });
        return false;
            
    });
    
    $('#list_right').click(function() {
        

        var left_indent = parseInt($('.catalogue_list ul').css('left')) - item_width;
        

        $('.catalogue_list ul').animate({'left' : left_indent}, 200, function () {
            
            $('.catalogue_list li:last').after($('.catalogue_list li:first'));                     
                        
            $('.catalogue_list ul').css({'left' : left_value});
        
        });
                 
        return false;
        
    });       
}

var Menu = function(){
    $(window).scroll(function(){

        var body = $('body');
        var nav = $('.doc_header');

        if (body.hasClass('scroll')) {
            if ($(window).scrollTop() > 30) {
                nav.addClass('fixed_menu');
                body.addClass('fixed_menu_body');
            } else {
                nav.removeClass('fixed_menu');
                body.removeClass('fixed_menu_body');
            }
        }
        return false

    })
}

var Popups = function(){
    $('.programms__popup_show').click(function(){
        if ($('.programms__popup').is(':visible')) {
            $('.programms__popup').hide();
            $('.programms__popup').css('z-index', '');
            $('.programms').css('z-index', '');
        } else {
            $('.programms__popup').show();
            $('.programms__popup').css('z-index', '200');
            $('.programms').css('z-index', '400');
            $('.programms__count').addClass('gray');
        }
        return false
    });
    $('.programs_include_popup_show').click(function(){
        if ($('.programs_include__popup').is(':visible')) {
            $('.programs_include__popup').hide();
            $('.programs_include__popup').css('z-index', '');
            $('.programs_include_popups').css('z-index', '').css('position', '');
        } else {
            $('.programs_include__popup').show();
            $('.programs_include__popup').css('z-index', '200');
            $('.programs_include_popups').css('z-index', '400').css('position', 'relative');
        }
        return false
    });
    $('.fastwar__popup_show').click(function(){
        if ($('.fastwar__popup').is(':visible')) {
            $('.fastwar__popup').hide();
            $('.fastwar__popup').css('z-index', '');
            $('.fastwar').css('z-index', '');
        } else {
            $('.fastwar__popup').show();
            $('.fastwar__popup').css('z-index', '200');
            $('.fastwar').css('z-index', '400');
        }
        return false
    });
    $('.plus_timer__popup_show').click(function(){
        if ($('.plus_timer__popup').is(':visible')) {
            $('.plus_timer__popup').hide();
            $('.plus_timer__popup').css('z-index', '');
            $('.plus_timer').css('z-index', '');
        } else {
            $('.plus_timer__popup').show();
            $('.plus_timer__popup').css('z-index', '200');
            $('.plus_timer').css('z-index', '400');
        }
        return false
    });
    $('.show_video').click(function(){
        if ($('.video_popup').is(':visible')) {
            $('.video_popup').hide();
        } else {
            $('.video_popup').show();
        }
        return false
    })
}

$(function(){
    $('body').addClass('scroll');
    hideCat();
    showCat();
    Accordion();
    Tabs();
    TabList();
    Menu();
    Popups();
})
