const toggleMenu = () => {
  const menu = document.querySelector('#menu');

  if (menu.className === 'nav') {
    menu.className = 'responsive';
  } else {
    menu.className = 'nav';
  }
};
  