import axios from "axios";

export interface RecipeApi {
  id: number;
  title: string;
  image: string;
  summary: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  analyzedInstructions: {
    name: string;
    steps: {
      number: number;
      step: string;
      ingredients: {
        id: number;
        name: string;
        image: string;
      }[];
      equipment: {
        id: number;
        name: string;
        image: string;
        temperature?: {
          number: number;
          unit: string;
        };
      }[];
      length?: {
        number: number;
        unit: string;
      };
    }[];
  }[];
}


export type SearchParams = {
  query: string;
  number?: number;
  offset?: number;
  diet?: string;
  cuisine?: string;
  type?: string;
};

export type SearchResponse = {
  results: RecipeApi[];
  totalResults: number;
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

// Новый метод для поиска рецептов
export const searchRecipes = async (params: SearchParams): Promise<SearchResponse> => {
  const response = await axios.get<SearchResponse>(
    `http://localhost:3000/api/recipes/search`,
    {
      params: {
        query: params.query,
        number: params.number || 4,
        offset: params.offset || 0,
        diet: params.diet || undefined,
        cuisine: params.cuisine || undefined,
        type: params.type || undefined,
      },
    }
  );
  return response.data;
};