'use client';

import { useEffect, useState } from 'react';
import {
	CheckboxFiltersGroup,
	FilterCheckBox,
	RangeSlider,
	Title,
} from '@/components/shared';
import { Input } from '@/components/ui';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';
import { ingredients } from '@/prisma/constants';
import { useSet } from 'react-use';

interface Props {
	className?: string;
}

interface PriceProps {
	priceFrom: number;
	priceTo: number;
}

export const Filters = ({ className }: Props) => {
	const { ingredients, loading, selectedIngredients, onAddId } = useFilterIngredients();
	const [sizes, { toggle: toggleSize }] = useSet(new Set<string>([]));
	const [pizzaTypes, { toggle: togglePizzaType }] = useSet(new Set<string>([]));

	const [prices, setPrice] = useState<PriceProps>({
		priceFrom: 0,
		priceTo: 30,
	});

	const items = ingredients.map((item) => ({
		value: String(item.id),
		text: item.name,
	}));

	// Функция обработчик изменения цены
	const updatePrice = (name: keyof PriceProps, value: number) => {
		setPrice({
			...prices,
			[name]: value,
		});
	};

	// Отслеживаем изменения в чекбоксах
	useEffect(() => {
		console.log({sizes, prices, pizzaTypes, selectedIngredients});
	} , [sizes, prices, pizzaTypes, selectedIngredients]);

	return (
		<div className={className}>
			<Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

			{/* Чекбоксы */}
			<CheckboxFiltersGroup
				title="Размеры"
				name="sizes"
				className="mt-5"
				selectedValues={sizes}
				onClickCheckbox={toggleSize}
				items={[
					{ text: '20 см', value: '20' },
					{ text: '30 см', value: '30' },
					{ text: '40 см', value: '40' },
				]}
			/>

			<CheckboxFiltersGroup
				title="Тип теста"
				name="pizzaTypes"
				className="mt-5"
				selectedValues={pizzaTypes}
				onClickCheckbox={togglePizzaType}
				items={[
					{ text: 'Тонкое', value: '1' },
					{ text: 'Традиционное', value: '2' },
				]}
			/>

			{/* Фильтрация цен */}
			<div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
				<p className="font-bold mb-3">Цена от и до:</p>
				<div className="flex gap-3 mb-5">
					<Input
						type="number"
						placeholder="0"
						min={0}
						max={100}
						value={String(prices.priceFrom)}
						onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
					/>
					<Input
						type="number"
						placeholder="20"
						min={0}
						max={30}
						value={String(prices.priceTo)}
						onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
					/>
				</div>

				<RangeSlider
					min={0}
					max={30}
					step={5}
					value={[prices.priceFrom, prices.priceTo]}
					onValueChange={([priceFrom, priceTo]) => {
						setPrice({
							priceFrom,
							priceTo,
						});
					}}
				/>
			</div>
			<CheckboxFiltersGroup
				title="Ингридиенты"
				className="mt-5"
				limit={5}
				defaultItems={items.slice(0, 5)}
				items={items}
				name="ingredients"
				loading={loading}
				selectedValues={selectedIngredients}
				onClickCheckbox={onAddId}
			/>
		</div>
	);
};
