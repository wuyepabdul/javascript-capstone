export const fetchMeals = async () => {
  const url =`${process.env.MEAL_API}/filter.php?c=Seafood`
  console.log(url)
  const response = await fetch(url)
  return response.json();
};
// www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
// www.themealdb.com/api/json/v1/1/filter.php?c=Seafood/filter.php?c=Seafood
export const addComment = async (data) => {
  const url = `${process.env.INVOLVEMENT_API}/${process.env.APP_ID}/comments`;
  console.log(url)
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      item_id: data.item_id,
      username: data.username,
      comment: data.comment,
    }),
    headers: { 'Content-type': 'application/json' },
  });

  return response;
};

export const fetchMealById = async (mealId)=>{
  const response = await fetch(`${process.env.MEAL_API}/lookup.php?i=${mealId}`)
  return response.json();
}