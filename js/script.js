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

    $("body").on("scroll", function(e) {
        console.log(event.deltaY);
    });
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

const mesureWidth = item => {
    const desktopWidth = $(window).width();
    const list = item.closest(".color__list");
    const link = list.find(".color__link");
    const linkWidth = link.width();
    const linksWidth = linkWidth * link.length;
    const contentWidth = desktopWidth - linksWidth;
    if(desktopWidth > 929) {
        return 630;
    }
    else  if(desktopWidth > 480){
        return contentWidth;
    }
    else {
        return desktopWidth - linkWidth;
    }
};

const openItem = item => {
    const desktopWidth = $(window).width();
    const desc = item.find(".color__desc");
    const descWidth = mesureWidth(item);
    desc.width(descWidth);
    item.addClass("active");
    if(item.siblings().hasClass("active")) {
        closeItem(item.siblings());
    }
};

const rightPos = (elem, pos) => {
    return elem.css("right", pos);
};

const closeItem = item => {
        const list = item.closest(".color__list"); 
        const desc = item.find(".color__desc");
        if($(window).width() <= 480) {
            setTimeout(rightPos, 500, list, 0);
        }
        desc.width(0);
        item.removeClass("active");
};

const addWidth = (block, width, item) => {
    item.addClass("active");
    return block.width(width);
};

const openMobileItem = (item, desktopWidth, linksSum) => {
    const desc = item.find(".color__desc");
    const list = item.closest(".color__list");
    const link = item.find(".color__link");
    const linkArr = linksSum.find(".color__link");
    const linkWidth = item.width();
    const descWidth = desktopWidth - linkWidth;
    const linkArrLen = linkArr.length - 1;
    for(let i = 0; i < linkArrLen + 1; i++) {
        if(link[0] == linkArr[i]) {
            let linkRight = -(linkWidth * (linkArrLen - i));
            list.css("right", linkRight);
            if(linkArr[i] == linkArr[linkArrLen]) {
                addWidth(desc, descWidth, item);
            }
            else {
                setTimeout(addWidth, 400, desc, descWidth, item);
            }
        }
    }
};

$(".color__link").on("click", e => {
    const desktopWidth = $(window).width();
    e.preventDefault();
    const $this = $(e.currentTarget);
    const item = $this.closest(".color__item");
    const linksSum = $(".color__list").find(".color__item");
    if(item.hasClass("active")) {
        closeItem(item);
    }
    else {
        if(desktopWidth > 480) {
            openItem(item);
        }
        else {
            openMobileItem(item, desktopWidth, linksSum);
        }
    }
});

$(".color__close").on("click", e => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const item = $this.closest(".color__item");
    if(item.hasClass("active")) {
        closeItem(item);
    }
});

//  WHEEL JS

// $(document).ready(function() {
//     $("body").on("scroll", function(e) {
//         console.log(event.deltaY);
//     });
// });
