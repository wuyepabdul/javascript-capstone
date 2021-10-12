import './style.css';
import icon from './icon.svg';
import { fetchMeals, addComment } from './api';

const elementGenerator = (typeName, className) => {
  const element = document.createElement(typeName);
  if (className) element.className = className;
  return element;
};

const generateId = () => {
  const random1 = Math.floor(Math.random() * 10000);
  const random2 = Math.floor(Math.random() * 1000);
  return random1 + random2 * 2;
};

const header = elementGenerator('header');
const logo = elementGenerator('div', 'logo');
logo.textContent = 'Restaurant logo';
const navigation = elementGenerator('nav');
const uList = elementGenerator('ul');
const listOne = elementGenerator('li', 'meals');
const linkOne = elementGenerator('a');
linkOne.href = '#';
linkOne.textContent = 'Meals(6)';
const listTwo = elementGenerator('li');
const linkTwo = elementGenerator('a');
linkTwo.href = '#';
linkTwo.textContent = 'Planets';

const listThree = elementGenerator('li');
const linkThree = elementGenerator('a');
linkThree.href = '#';
linkThree.textContent = 'Races';

const footer = elementGenerator('footer');
footer.textContent = 'Created By Abdul & Willy under CC licence';

const root = document.getElementById('root');

const main = elementGenerator('main');

const createPopup = (meal) => {
  const popupSection = elementGenerator('section', 'popup-window invisible');
  const popupMarkup = ` 
    <small class='close-menu'>X</small>   
    <div class='blur-background'> 
      
      <div class="popup-img-div"><img class="meal-popup-img" src="${meal.image}" alt="meal" /></div>
      <div class="popup-details-div">
      <h1> ${meal.title} </h1>
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
    </div>
    <div class="comments-container">
  <div class="comments-div">
    <h3>Comments (3)</h3>
  </div>
  <h3>Add a comment</h3>
  <form>
    <div class="input-group">
      <input type="text" class="nameInput" placeholder="Your name" />
    </div>
    <div class="input-group">
      <textarea
        name=""
        id="commentInput"
        cols="30"
        rows="10"
        placeholder="Your insights"
      ></textarea>
    </div>
    <div class=''button-div>
    <button type='submit' class='submit-comment-btn'> Comment </button>
    </div>
  </form>
</div>
`;
  popupSection.innerHTML = popupMarkup;
  popupSection.style.display = 'block';
  main.style.display = 'none';
  document.body.appendChild(popupSection);

  const data = { item_id: generateId(), username: '', comment: '' };

  const nameInput =
    popupSection.children[1].children[2].children[2].children[0].children[0];
  const commentInput =
    popupSection.children[1].children[2].children[2].children[1].children[0];
  const commentBtn =
    popupSection.children[1].children[2].children[2].children[2].children[0];

  nameInput.addEventListener('change', (e) => {
    data.username = e.target.value;
  });
  commentInput.addEventListener('change', (e) => {
    data.comment = e.target.value;
  });
  commentBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (commentInput.value.length > 1 && nameInput.value) {
      const response = await addComment(data);
      console.log(response);
    }
  });

  const closePopup = document.querySelector('.close-menu');
  closePopup.addEventListener('click', () => {
    popupSection.remove();
    main.style.display = 'grid';
  });
};

const displayPopup = (mainTag) => {
  const divs = mainTag.children;
  const mealDetails = {
    title: '',
    category: '',
    price: '',
    image: '',
  };

  for (let i = 0; i < divs.length; i += 1) {
    const btn = divs[i].children[2];
    btn.addEventListener('click', (e) => {
      const mealTitle =
        e.target.parentElement.children[1].children[0].textContent;
      const imageSrc = e.target.parentElement.children[0].src;
      mealDetails.title = mealTitle;
      mealDetails.image = imageSrc;
      createPopup(mealDetails);
    });
  }
};

const getMeals = async () => {
  const data = await fetchMeals();
  data.meals.forEach((meal, index) => {
    meal = elementGenerator('section');
    const picture = elementGenerator('img', 'image');
    picture.src = data.meals[index].strMealThumb;
    picture.alt = 'space-image';

    const likes = elementGenerator('div', 'likes');
    const paragraph = elementGenerator('p');
    paragraph.textContent = data.meals[index].strMeal;

    const likeCounter = elementGenerator('div', 'like-counter');
    const heart = elementGenerator('img');
    heart.src = icon;
    heart.alt = 'heart-image';
    const like = elementGenerator('p');
    like.textContent = 'like';

    likeCounter.appendChild(heart);
    likeCounter.appendChild(like);

    likes.appendChild(paragraph);
    likes.appendChild(likeCounter);

    const comments = elementGenerator('button');
    comments.textContent = 'comments';

    meal.appendChild(picture);
    meal.appendChild(likes);
    meal.appendChild(comments);

    main.appendChild(meal);
  });
  displayPopup(main);
};
window.addEventListener('load', () => {
  getMeals();
});

listOne.appendChild(linkOne);
listTwo.appendChild(linkTwo);
listThree.appendChild(linkThree);

uList.append(listOne, listTwo, listThree);

navigation.appendChild(uList);

header.append(logo, navigation);

root.append(header, main, footer);
