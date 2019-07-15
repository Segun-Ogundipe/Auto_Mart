const carlist = document.querySelectorAll('.car');
const carListDiv = document.getElementById('cars-list-div');
const carViewDiv = document.getElementById('car-view-div');
const newAdDiv = document.getElementById('new-ad-div');

const toggleDisplay = () => {
  if (newAdDiv.className === 'row') {
    newAdDiv.className = 'row hide-section';
    carListDiv.className = 'row';
  }

  if (carViewDiv.className === 'row') {
    carViewDiv.className = 'row hide-section';
    carListDiv.className = 'row';
  }
};

 const showNewAdForm = () => {
   carListDiv.className = 'row hide-section';
   carViewDiv.className = 'row hide-section';
   newAdDiv.className = 'row';
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
  
 for (const car of carlist) {
   car.addEventListener('click', () => {
    const carId = car.id
    //  sessionStorage.setItem('carId', car.id);
    populateCarView({manufacturer: 'me', model: 'still me', state: 'my state', price: 1009988, imageUrl: './img/car1.png'});
   });
 }

