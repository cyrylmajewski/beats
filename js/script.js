$(window).scroll(function(){
    if ($(window).scrollTop() > 10) {
        $('.mobile-menu').addClass('scroll');
    }
    else {
        $('.mobile-menu').removeClass('scroll');
    }
});