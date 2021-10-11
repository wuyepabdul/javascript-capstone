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

  const formContainer = `
  <div class="comments-container">
  <div class="comments">
    <h3>Comments (3)</h3>
  </div>
  <h3>Add a comment</h3>
  <form>
    <div class="input-group">
      <input type="text" class="nameInput" placeholder="Your name" />
    </div>
    <div class="input-group">
      <textarea
        name="comment"
        id="comment"
        cols="30"
        rows="10"
        placeholder="Your insights"
      ></textarea>
    </div>
    <div class="button-div">
      <button>Comment</button>
    </div>
  </form>
</div>`;

  const popupSection = document.querySelector('.popup-window');
  popupSection.innerHTML = popupMarkup;
//   popupSection.appendChild(formContainer);
};
createPopup();
