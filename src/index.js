import './style.css';
import icon from './icon.svg';
import { fetchMeals, addComment, fetchComments, fetchMealById } from './api';
import { postLikes, getLikes } from './likeFunctions';

const elementGenerator = (typeName, className) => {
  const element = document.createElement(typeName);
  if (className) element.className = className;
  return element;
};

const dismisAlert = (alertDiv) => {
  setTimeout(() => {
    alertDiv.classList.remove('success', 'error');
    alertDiv.classList.add('invisible');
    window.location.reload();
  }, 5000);
};

const header = elementGenerator('header');
const logo = elementGenerator('div', 'logo');
logo.textContent = 'Restaurant logo';
const navigation = elementGenerator('nav');
const uList = elementGenerator('ul');
const listOne = elementGenerator('li', 'meals');
const linkOne = elementGenerator('a');
linkOne.href = '#';

function mealCounter() {
  fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
    .then((response) => response.json())
    .then((data) => {
      linkOne.textContent = `Meals (${data.meals.length})`;
    });
}
mealCounter();

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

const commentCreator = (popupSection, mealId) => {
  const data = { item_id: mealId, username: '', comment: '' };
  const nameInput = popupSection.children[1].children[2].children[2].children[0].children[0];
  const commentInput = popupSection.children[1].children[2].children[2].children[1].children[0];
  const commentBtn = popupSection.children[1].children[2].children[2].children[2].children[0];

  const alertDiv = popupSection.children[1].children[2].children[0].children[0];

  nameInput.addEventListener('change', (e) => {
    data.username = e.target.value;
  });
  commentInput.addEventListener('change', (e) => {
    data.comment = e.target.value;
  });

  commentBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    if (nameInput.value.length > 1 && commentInput.value.length > 1) {
      const response = await addComment(data);
      if (response.status === 201) {
        nameInput.value = '';
        commentInput.value = '';
        alertDiv.innerHTML = 'Comment Created Successfully';
        alertDiv.classList.remove('invisible');
        alertDiv.classList.add('success', 'visible');
        dismisAlert(alertDiv);
      }
    }
  });
};

const getCommentsLength = async (mealId) => {
  const comments = await fetchComments(mealId);
  if (comments.error) {
    const length = 0;
    if (comments.error.message === "'item_id' not found.") return length;
  }
  return comments.length;
};

const getMealComments = async (popupSection, mealId) => {
  const commentsLength = await getCommentsLength(mealId);
  const comments = await fetchComments(mealId);
  popupSection.children[1].children[2].children[0].children[1].textContent = `Comments ${commentsLength}`;

  if (commentsLength > 0) {
    let commentMarkup = '';
    const commentsTag =
      popupSection.children[1].children[2].children[0].children[2];
    for (let i = 0; i < comments.length; i += 1) {
      commentMarkup += `<p> ${comments[i].creation_date} ${comments[i].username}: ${comments[i].comment} </p>`;
    }
    commentsTag.innerHTML = commentMarkup;
  }
};

const displayMealDetails = async (popupSection, mealId) => {
  const { meals } = await fetchMealById(mealId);
  popupSection.children[1].children[1].children[1].children[0].children[0].textContent = `Region: ${meals[0].strArea}`;

  popupSection.children[1].children[1].children[1].children[0].children[1].textContent = `Category: ${meals[0].strCategory}`;

  popupSection.children[1].children[1].children[1].children[1].children[0].textContent = `Ingredients: ${meals[0].strIngredient1}, ${meals[0].strIngredient2} ...`;

  popupSection.children[1].children[1].children[1].children[1].children[1].textContent = `Tags: ${meals[0].strTags}`;
  console.log(meals);
};

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
  <div class='alert'> </div>
    <h3></h3>
    <div></div>
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
  commentCreator(popupSection, meal.id);
  getMealComments(popupSection, meal.id);
  displayMealDetails(popupSection, meal.id);

  popupSection.style.display = 'block';
  main.style.display = 'none';
  document.body.appendChild(popupSection);
  const closePopup = document.querySelector('.close-menu');
  closePopup.addEventListener('click', () => {
    popupSection.remove();
    main.style.display = 'grid';
  });
};

const displayPopup = (mainTag) => {
  const divs = mainTag.children;
  const mealDetails = {
    id: '',
    title: '',
    image: '',
  };

  for (let i = 0; i < divs.length; i += 1) {
    const btn = divs[i].children[2];
    btn.addEventListener('click', (e) => {
      const mealTitle = e.target.parentElement.children[1].children[0].textContent;
      const imageSrc = e.target.parentElement.children[0].src;
      mealDetails.id = e.target.parentElement.id;
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

    meal.id = data.meals[index].idMeal;

    const likes = elementGenerator('div', 'likes');
    const paragraph = elementGenerator('p');
    paragraph.textContent = data.meals[index].strMeal;

    const likeCounter = elementGenerator('div', 'like-counter');
    const heart = elementGenerator('img');
    heart.src = icon;
    heart.alt = 'heart-image';
    const like = elementGenerator('p');
    like.textContent = '0 like';

    heart.addEventListener('click', async (e) => {
      e.preventDefault();
      postLikes(
        'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/d0e1ntHbrVs5EbhAIJhd/likes/',
        {
          item_id: meal.id,
        },
      );

      const prevLikes = like.textContent.split(' ')[0];
      like.innerHTML = `${parseInt(prevLikes, 10) + 1} likes`;
    });

    const likes1 = getLikes(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/d0e1ntHbrVs5EbhAIJhd/likes/',
    );

    likes1.then((data) => {
      like.textContent = `${data[index].likes} likes`;
    });

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
getMeals();

listOne.appendChild(linkOne);
listTwo.appendChild(linkTwo);
listThree.appendChild(linkThree);

uList.append(listOne, listTwo, listThree);

navigation.appendChild(uList);

header.append(logo, navigation);

root.append(header, main, footer);
