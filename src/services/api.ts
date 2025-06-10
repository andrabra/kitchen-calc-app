import axios from "axios";

export type RecipeApi = {
  id: number;
  title: string;
  image: string;
  summary: string;
  extendedIngredients: { original: string }[];
};

export const getRandomRecipes = async (count = 1): Promise<RecipeApi[]> => {
  const response = await axios.get<{ recipes: RecipeApi[] }>(
    `https://kitchen-calc-backend.onrender.com/api/recipes`,
    {
      params: {
        number: count,
      },
    }
  );

  return response.data.recipes;
};
