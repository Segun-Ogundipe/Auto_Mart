function toggleMenu() {
  const menu = document.querySelector('.topnav');

  if (menu.className === 'topnav') {
    menu.className += ' responsive';
  } else {
    menu.className = 'topnav';
  }
}

const view = document.querySelector('#view span');
const selected = document.querySelector('#drop-down');

selected.addEventListener('change', (event) => {
  view.innerHTML = selected.value;
});
