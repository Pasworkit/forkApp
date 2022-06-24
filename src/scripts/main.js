const burgerBtn = document.querySelector(".header__menu-burger");
const headerList = document.querySelector(".header__list");

burgerBtn.addEventListener("click", (e) => {
    burgerBtn.classList.toggle('header__menu-closed');
    headerList.classList.toggle('header__list-displayed')
    e.stopPropagation()
});

window.addEventListener("click", () => {
    burgerBtn.classList.remove('header__menu-closed');
    headerList.classList.remove('header__list-displayed')
})
