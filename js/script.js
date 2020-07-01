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
      if($('body').width()<769){ $('.menu').removeClass('menu').addClass('menu__mobile').addClass('hidden');
      }
      else{
        $('.menu__mobile').removeClass('menu__mobile').removeClass('hidden').addClass('menu');
      }
    }
    
    classFunction();
    $(window).resize(classFunction);
   });

$(".team__link").on("click", function(e) {
    e.preventDefault();
    var $this = $(this);
    $this.next().toggleClass("team__open");
    if($(".team__desc").hasClass("team__open")) {
        $(".team__desc").removeClass("team__open");
        $this.next().toggleClass("team__open");
    }
});