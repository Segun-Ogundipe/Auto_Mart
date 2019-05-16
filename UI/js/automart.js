function toggleMenu() {
    let menu  = document.querySelector('.topnav');

    if( menu.className === 'topnav'){
        menu.className += ' responsive';
    } else {
        menu.className = 'topnav';
    }
}

let view = document.querySelector('#view span');
let selected = document.querySelector('#drop-down');

selected.addEventListener('change', event => {
    view.innerHTML = selected.value;
})