import './style.css';
import Image from './space.jpg';
import icon from './icon.svg';

const elementGenerator = (typeName, className) => {
  const element = document.createElement(typeName);
  if (className) element.className = className;
  return element;
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

for (let i = 1; i <= 12; i += 1) {
  const meal = elementGenerator('div');
  const picture = elementGenerator('img', 'image');
  picture.src = Image;
  picture.alt = 'space-image';

  const likes = elementGenerator('div', 'likes');
  const paragraph = elementGenerator('p');
  paragraph.textContent = `Meal ${i}`;

  const likeCounter = elementGenerator('div', 'like-counter');
  const heart = elementGenerator('img');
  heart.src = icon;
  heart.alt = 'heart-image';
  const like = elementGenerator('p');
  like.textContent = 'like';

  const comments = elementGenerator('button', 'commentBtn');
  comments.textContent = 'comments';

  likeCounter.append(heart, like);

  likes.append(paragraph, likeCounter);

  meal.append(picture, likes, comments);

  main.appendChild(meal);
}



listOne.appendChild(linkOne);
listTwo.appendChild(linkTwo);
listThree.appendChild(linkThree);

uList.append(listOne, listTwo, listThree);

navigation.appendChild(uList);

header.append(logo, navigation);

root.append(header, main, footer);
