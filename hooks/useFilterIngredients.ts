import { useEffect, useState } from 'react';
import { Ingredient } from '@prisma/client';
import { Api } from '../services/api-client';
import { useSet } from 'react-use';

interface ReturnProps {
	ingredients: Ingredient[];
	loading: boolean;
	selectedIngredients: Set<string>;
	onAddId: (id: string) => void;
}

// Хук для фильтрации ингредиентов
export const useFilterIngredients = (): ReturnProps => {
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);
	const [loading, setLoading] = useState(true);

	const [selectedInds, { toggle}] = useSet(new Set<string>([]));

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

	return { ingredients, loading, selectedIngredients: selectedInds, onAddId: toggle };
};
