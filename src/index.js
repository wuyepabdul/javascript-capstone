import './style.css';
import mealImg from './images/meal.jpg';

const createPopup = () => {
  let popupMarkup = ` 
  <small class='close-menu'>X</small>   
  <div class='blur-background'> 
    
    <div class="popup-img-div"><img class="meal-popup-img" src="${mealImg}" alt="meal" /></div>
    <div class="popup-details-div">
    <h1>Meal title</h1>
    <div class="details-list">
        <ul>
        <li>Category: Rice</li>
        <li>Category: Rice</li>
        </ul>
        <ul>
        <li>Category: Rice</li>
        <li>Category: Rice</li>
        </ul>
    </div>
  </div>`;

  const popupSection = document.querySelector('.popup-window');
  popupSection.innerHTML = popupMarkup;
  console.log(popupSection);
};

createPopup();
