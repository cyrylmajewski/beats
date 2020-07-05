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

jQuery(document).ready(function(){
    function classFunction(){
      if(jQuery('body').width()<769){ jQuery('.menu').removeClass('menu').addClass('menu__mobile').addClass('hidden');
      }
      else{
        jQuery('.menu__mobile').removeClass('menu__mobile').removeClass('hidden').addClass('menu');
      }
    }
    
    classFunction();
<<<<<<< HEAD
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

//SLIDER 

const left = document.querySelector("#left");
const right = document.querySelector("#right");
<<<<<<< HEAD
const list = document.querySelector("#product__list");
const styles = window.getComputedStyle(list); 

let currentRight = 0;
const minRight = 0;
const maxRight = 962;
const step = 962;

list.style.right = currentRight;


right.addEventListener("click", e => {
    e.preventDefault();
    if(currentRight < maxRight) {
        currentRight += step;
        list.style.right = `${currentRight}px`;
    }
});

left.addEventListener("click", e => {
    e.preventDefault();

    if(currentRight > minRight) {
        currentRight -= step;
        list.style.right = `${currentRight}px`;
    }
});
=======
    jQuery(window).resize(classFunction);
   })
>>>>>>> parent of 635ae8e... team section js
=======
>>>>>>> parent of 45e15b0... arrow changes
