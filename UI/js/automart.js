function toggleMenu() {
    const menu = document.querySelector('#menu');
  
    if (menu.className === 'nav') {
      menu.className = 'responsive';
    } else {
      menu.className = 'nav';
    }
  }
  
  const view = document.querySelector('#view span');
  const selected = document.querySelector('#drop-down');
  
  selected.addEventListener('change', (event) => {
    view.innerHTML = selected.value;
  });
  