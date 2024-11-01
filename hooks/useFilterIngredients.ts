import { useEffect, useState } from 'react';
import { Ingredient } from '@prisma/client';
import { Api } from '../services/api-client';

interface ReturnProps {
	ingredients: Ingredient[];
	loading: boolean;
}

// Хук для фильтрации ингредиентов
export const useFilterIngredients = (): ReturnProps => {
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchIngredients() {
			try {
				setLoading(true);
				const ingredients = await Api.ingredients.getAll();
				setIngredients(ingredients);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}

		fetchIngredients();
	}, []);

	return { ingredients, loading };
};
