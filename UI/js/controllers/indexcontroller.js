const displaySignup = () => {
 const gettingStarted = document.getElementById('getting-started-section');
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
  const gettingStarted = document.getElementById('getting-started-section');
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

 let carId; 
 const carlist = document.querySelectorAll('.car');
  
 for (const car of carlist) {
   car.addEventListener('click', () => {
     sessionStorage.setItem('carId', car.id);
   });
 }

 