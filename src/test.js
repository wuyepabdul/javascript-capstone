fetchMeals().then((data) => {
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
});
