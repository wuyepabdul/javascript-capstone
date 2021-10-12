export const fetchMeals = async () => {
  const response = await fetch(process.env.MEAL_API);
  return response.json();
};

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

