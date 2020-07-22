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
    menu.classList.remove("hidden");
    setTimeout(function() {
        toggleClass(menu, "open");
    }, 300);
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
        }, 300);
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
    if(item.siblings().hasClass("active")) {
        closeItem(item.siblings());
    }
    item.addClass("active");
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
    setTimeout(function(){
        item.addClass("active");
    }, 1000);
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

//YANDEX MAP
let myMap;

const init = () => {
    myMap = new ymaps.Map("map", {
// Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [55.731475, 37.608342],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 14,
            controls: []
    });

    const places = [
        [55.723498, 37.610035], 
        [55.736809, 37.618472], 
        [55.731326, 37.636255]
    ]; 

    const myCollection = new ymaps.GeoObjectCollection({}, {
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: "./img/icons/beats_map.png",
        iconImageSize: [46, 57],
        iconImageOffset: [-35, -52]
    });
    places.forEach(places => {
        myCollection.add(new ymaps.Placemark(places));
    });

    myMap.geoObjects.add(myCollection);
    myMap.behaviors.disable('scrollZoom');
    myMap.behaviors.disable('drag');
    myMap.behaviors.disable('multiTouch');
};

ymaps.ready(init);

//  WHEEL JS

let flag = false;
const section = $(".section");
const display = $(".main-content");
const sideMenu = $(".fixed-menu");
const menuItem = $(".fixed-menu__item");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

section.first().addClass("activeSection");

const sectionPos = sectionEq => {
    const pos = sectionEq * -100;

    if(isNaN(pos)) {
        console.error("Неверное значение в sectionPos");
        return 0;
    }

    return pos;
};

const changeMenu = sectionEq => {
    const currentSection = section.eq(sectionEq);
    const menuTheme = currentSection.attr("data-sidemenu-theme");
    const activeClass = "fixed-menu--black";

    if(menuTheme === "black") {
        sideMenu.addClass(activeClass);
    }

    else {
        sideMenu.removeClass(activeClass);
    }
};

const resetActiveClass = (item, itemEq, activeClass) => {
    item.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
};

const transition = sectionEq => {

    if (flag) return;

    const transitionOver = 1000;
    
    flag = true;

    const position = sectionPos(sectionEq); 
    changeMenu(sectionEq);
    

    display.css ({
        transform: `translateY(${position}%)`
    });

    const fixedMenu = $(".fixed-menu");

    resetActiveClass(section, sectionEq, "activeSection");

    

    

    setTimeout(() => {
        flag = false;

        resetActiveClass(menuItem, sectionEq, "fixed-menu__item--active");
    }, transitionOver);
    
};

const viewScroller = () => {
    const activeSection = section.filter(".activeSection");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    return {
        next() {
            if(nextSection.length) {
                transition(nextSection.index());
            }
        },
        prev() {
            if(prevSection.length) {
                transition(prevSection.index());
            }
        }
    };
    
};

$(window).on("wheel", function(e) {
    const deltaY = e.originalEvent.deltaY;
    const scroller = viewScroller();
    
    if(deltaY > 0) {
        scroller.next();
    }

    else if(deltaY < 0)  {
        scroller.prev();
    }
});

$(window).on("keydown", e => {
    const tagName = e.target.tagName.toLowerCase();
    const userTypingInInput = tagName === "input" || tagName === "textarea";
    const scroller = viewScroller();

    if(userTypingInInput) return;

    switch (e.keyCode) {
        case 40:
            scroller.next();
            break;
        case 38:
            scroller.prev();
            break;
    }
    
});

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").on("click", e => {
    e.preventDefault();
    toggleClass(menu, "open");
    setTimeout(function() {
        toggleClass(menu, "hidden");
        
    }, 100);
    const $this = $(e.currentTarget);
    const target = $this.attr("data-scroll-to");
    const reqSection = $(`[data-section-id=${target}]`);

    transition(reqSection.index());
});


//MOBILE FUNCTIONALITY
//https://github.com/mattbryson/TouchSwipe-Jquery-Plugin

if(isMobile) {
    $("body").swipe( {
        //Generic swipe handler for all directions
        swipe: function(event, direction) {
            const scroller = viewScroller();
            let scrollDirection = "";
    
            if(direction === "up") {
                scrollDirection = "next";
            }
            if(direction === "down") {
                scrollDirection = "prev";
            }
            if(scrollDirection) {
                scroller[scrollDirection]();
            }
        }
        });
}

//HTML5 VIDEO API

let video;
let durationControl;
let soundControl;
let intervalId;
let soundLevel;
const MAX_SOUND_VALUE = 10;

$().ready(function(){
    video = document.getElementById("video");

    video.addEventListener('click', playStop);
    let playButtons = document.querySelectorAll(".play");
    let playButtonsLength = playButtons.length;

    for(let i = 0; i < playButtonsLength; i++) {
        playButtons[i].addEventListener("click", playStop);
    }

    let micControl = document.getElementById("mic");
    micControl.addEventListener("click", soundOf);

    durationControl = document.getElementById("durationLevel");
    durationControl.addEventListener('mousedown', stopInterval);
    durationControl.addEventListener('mouseup', setVideoDuration);

    durationControl.min = 0;
    durationControl.value = 0;

    soundControl = document.getElementById("micLevel");

    soundControl.addEventListener('mouseup', changeSoundVolume);

    soundControl.min = 0;
    soundControl.max = MAX_SOUND_VALUE;

    video.addEventListener('ended', function() {

    }, false);
    
});

function playStop() {

    document.querySelector(".player").classList.toggle("player--active");

    durationControl.max = video.duration;


    if (video.paused) {

        video.play();
        intervalId = setInterval(updateDuration, 1000/66);
    }

    else {

        stopInterval();
    }
}

function stopInterval() {
    video.pause();

    clearInterval(intervalId);
}

function setVideoDuration() {
    video.currentTime = durationControl.value;
    intervalId = setInterval(updateDuration, 1000/66);
    
    if(video.paused) {
        video.play();
    }
}

function updateDuration() {
    durationControl.value = video.currentTime;
}

function soundOf() {


    if(video.volume === 0) {
        video.volume = soundLevel;
        soundControl.value = soundLevel * MAX_SOUND_VALUE;
    }
    else {
        soundLevel = video.volume;
        video.volume = 0;
        soundControl.value = 0;
    }
}

function changeSoundVolume() {
    video.volume = soundControl.value / MAX_SOUND_VALUE;
    console.log(video.volume);
}
