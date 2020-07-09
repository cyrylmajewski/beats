"use strict";

// hamburger menu (open and close)

const openHamburger = document.querySelector("#hamburger");
const menu = document.querySelector(".menu__mobile");
const cross = document.querySelector(".close");

function toggleClass(elem, classElem) {
    elem.classList.toggle(classElem);
}

openHamburger.addEventListener("click", e => {
    e.preventDefault();
    // menu.style.display = "block";
    menu.classList.remove("hidden");
    setTimeout(function() {
        toggleClass(menu, "open");
    }, 100);
});

cross.addEventListener("click", e => {
    e.preventDefault();
    // menu.style.display = "none";
    let flag = true;
    menu.classList.remove("open");
    if(flag) {
        flag = false;
        setTimeout(function() {
            toggleClass(menu, "hidden");
            flag = true;
        }, 100);
    }
});

$(document).ready(function(){
    function classFunction(){
      if($('body').width()<769)
      { 
          $('.menu').removeClass('menu').addClass('menu__mobile').addClass('hidden');
      }
      else{
        $('.menu__mobile').removeClass('menu__mobile').removeClass('hidden').addClass('menu');
      }
    }

    
    
    classFunction();
    $(window).resize(classFunction);
   });


//TEAM SECTION
   //DESCRIPTION OPEN
$(".team__link").on("click", function(e) {
    e.preventDefault();
    var $this = $(this);
    $this.next().toggleClass("team__open");
    if($(".team__desc").hasClass("team__open")) {
        $(".team__desc").removeClass("team__open");
        $this.next().toggleClass("team__open");
    }
});

    //IMG TO DESCRIPTION
$(window).on('resize load', function () {
    
    $(".team__item").each(function () {
        var image = $(this).find('.team__img');
        var info = $(this).find('.team__desc');
        if ($(window).width() <= 768) {
            info.prepend(image);
        } else {
            $(this).prepend(image);
        }
    });
});

//SLIDER 

const slider = $('.product__list').bxSlider({
    pager: false,
    controls: false
});

$('.arrow--left').on("click", e => {
    e.preventDefault();
    slider.goToPrevSlide();
});

$('.arrow--right').on("click", e => {
    e.preventDefault();
    slider.goToNextSlide();
});



// REVIEWS

const review = $('.reviews__item');
const reviewSwitch = $('.reviews__switcher-link');

const findBlockByAllias = allias => {
    return review.filter((ndx, item) => {
        return $(item).attr("data-linked-with") === allias;
    });
};

reviewSwitch.on("click", e => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const target = $this.attr("data-open");
    const itemToShow = findBlockByAllias(target);
    const currentItem = $this.closest('.reviews__switcher-item');

    itemToShow.addClass("active").siblings().removeClass("active");

    currentItem.addClass("active").siblings().removeClass("active");
});

//AJAX FORM SUBMIT

const validateFields = (form, fieldArray) => {
    fieldArray.forEach(field => {
        field.removeClass("input-error");
        if (field.val().trim() === "") {
            field.addClass("input-error");
        }
    });

    const errorFields = form.find(".input-error");

    return errorFields.length === 0;
};

$('.form').submit(e => {
    e.preventDefault();

    const form = $(e.currentTarget);
    const name = form.find("[name='name']");
    const phone = form.find("[name='phone']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']");

    const modal = $('#modal');
    const content = modal.find(".modal__content");

    modal.removeClass("error-modal");

    const isValid = validateFields(form, [name, phone, comment, to]);


    if(isValid) {
        const request = $.ajax({
            url: "https://webdev-api.loftschool.com/sendmail",
            method: "post",
            data: {
                name: name.val(),
                phone: phone.val(),
                comment: comment.val(),
                to: to.val(),
            },
            
            
        });

        request.done(data => {
            content.text(data.message);
        });

        request.fail(data => {
            const message = data.responseJSON.message;
                content.text(message);
                modal.addClass("error-modal");
        });

        request.always(() => {
            $.fancybox.open({
                src: "#modal",
                type: "inline"
            });
        });
    }
});

$(".app-close-modal").on("click", e => {
    e.preventDefault();
    $.fancybox.close();
});

//COLOR SECTION
$(".color__link").on("click", function(e) {
    e.preventDefault();
    var $this = $(this);
    $this.next().toggleClass("color__open");
    if($(".color__desc").hasClass("color__open")) {
        $(".color__desc").removeClass("color__open");
        $this.next().toggleClass("color__open");
    }
});

$(".color__close").on("click", function(e) {
    e.preventDefault();
    var $this = $(this);
    $this.closest(".color__desc").toggleClass("color__open");
});

