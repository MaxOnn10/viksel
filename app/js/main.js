let burger = document.querySelector(".burger");
let burgerItem = document.querySelectorAll(".header__menu-item");
let body = document.body;

//burger-menu
burger.addEventListener('click', function () {
    burger.classList.toggle("burger--active");
    document.querySelector(".header__nav").classList.toggle("active"),
    document.querySelector(".header__menu").classList.toggle("active"),
    document.querySelector(".header__menu-list").classList.toggle("active"),
    document.querySelector(".header__menu-item").classList.toggle("active"),
    body.classList.toggle("disable-scroll");
  
  });
  
  burgerItem.forEach(function(item) {
    item.addEventListener('click', function () {
      document.querySelector(".header__nav").classList.remove("active"),
      document.querySelector(".header__menu").classList.remove("active"),
      document.querySelector(".header__menu-list").classList.remove("active"),
      burger.classList.remove("burger--active"),
      item.classList.remove("active"),
      body.classList.remove("disable-scroll");
    });
  });