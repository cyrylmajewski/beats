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
    jQuery(window).resize(classFunction);
   })