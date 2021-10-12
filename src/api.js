const fetchMeals = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
    .then((response) => response.json());
  return response;
};

export default fetchMeals;