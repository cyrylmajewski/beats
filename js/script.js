"use strict";

// hamburger menu (open and close)

const openHamburger = document.querySelector("#hamburger");
const menu = document.querySelector(".menu__mobile");
const cross = document.querySelector(".close");

openHamburger.addEventListener("click", e => {
    e.preventDefault();
    menu.style.display = "block";
});

cross.addEventListener("click", e => {
    e.preventDefault();
    menu.style.display = "none";
});