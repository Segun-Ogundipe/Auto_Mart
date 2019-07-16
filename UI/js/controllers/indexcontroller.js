const gettingStarted = document.getElementById('getting-started-section');
const carListDiv = document.getElementById('cars-list-div');
const carViewDiv = document.getElementById('car-view-div');

const displaySignup = () => {
  const signin = document.getElementById('sign-in-section');
  const signup = document.getElementById('sign-up-section');

  if (gettingStarted.className === 'row') {
    signup.className = 'row';
    gettingStarted.className = 'row hide-section';
  }

  if (signin.className === 'row') {
  signup.className = 'row';
  signin.className = 'row hide-section';
  }
};

const displaySignin = () => {
  const signin = document.getElementById('sign-in-section');
  const signup = document.getElementById('sign-up-section');

  if (gettingStarted.className === 'row') {
    signin.className = 'row';
    gettingStarted.className = 'row hide-section';
  }

  if (signup.className === 'row') {
    signin.className = 'row';
    signup.className = 'row hide-section';
  }
};

const toggleDisplay = () => {
  if (carViewDiv.className === 'row') {
      carViewDiv.className = 'row hide-section';
      carListDiv.className = 'row';
  }
};

const populateCarView = (car) => {
  if (carListDiv.className === 'row') {
    carListDiv.className = 'row hide-section';
    carViewDiv.className = 'row';
  }

  const carViewImgDiv = document.getElementById('car-view-img');
  const carViewDetailDiv = document.getElementById('car-view-detail');
  const img = `<img src="${car.imageUrl}">`;
  const carDetail = `<h5>Manufacturer: <span>${car.manufacturer}</span></h5>
                    <h5>Model: <span>${car.model}</span></h5>
                    <h5>State: <span>${car.state}</span></h5>
                    <h5>Price: <span>${car.price}</span></h5>`;
  
  carViewImgDiv.innerHTML = img;
  carViewDetailDiv.innerHTML = carDetail;
};

let carId; 
const carlist = document.querySelectorAll('.car');

for (const car of carlist) {
  car.addEventListener('click', () => {
    // sessionStorage.setItem('carId', car.id);
    populateCarView({manufacturer: 'me', model: 'still me', state: 'my state', price: 1009988, imageUrl: './img/car1.png'});
  });
}

