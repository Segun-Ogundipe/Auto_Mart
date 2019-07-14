const toggleMenu = () => {
  const menu = document.querySelector('#menu');

  if (menu.className === 'nav') {
    menu.className = 'responsive';
  } else {
    menu.className = 'nav';
  }
};

const modal = document.getElementById('response-modal');

const hideModal = () => {
  modal.className = 'hide-section';
};

window.onclick = (event) => {
  if (event.target == modal) {
    modal.className = 'hide-section';
  }
};