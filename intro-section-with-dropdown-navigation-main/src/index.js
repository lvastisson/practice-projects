const menuOpenBtn = document.querySelector('#menu-open');
const menuCloseBtn = document.querySelector('#menu-close');
const menu = document.querySelector('#menu');
const bg = document.querySelector('#bg');
const subMenuBtns = document.querySelectorAll('.btn--dropdown');

let openSubMenu = null;

menuOpenBtn.addEventListener('click', () => {
  openMenu();
});

menuCloseBtn.addEventListener('click', () => {
  closeMenu();
});

bg.addEventListener('click', () => {
  closeMenu();
});

function openMenu() {
  menu.classList.add('open');
  bg.classList.add('shown');
  document.body.classList.add('hide-overflow');
}

function closeMenu() {
  menu.classList.remove('open');
  bg.classList.remove('shown');
  document.body.classList.remove('hide-overflow');
}

subMenuBtns.forEach((menuBtn, i) => {
	menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    if (openSubMenu === null) {
      menuBtn.parentNode.classList.add('open');
      openSubMenu = menuBtn;
    }
    else if (openSubMenu === menuBtn) {
      menuBtn.parentNode.classList.remove('open');
      openSubMenu = null;
    }
    else {
      openSubMenu.parentNode.classList.remove('open');
      menuBtn.parentNode.classList.add('open');
      openSubMenu = menuBtn;
    }
	});
});

window.addEventListener('click', () => {
  if (openSubMenu !== null) {
    openSubMenu.parentNode.classList.remove('open');
    openSubMenu = null;
  }
});
