'use client';

import {
	CheckboxFiltersGroup,
	FilterCheckBox,
	RangeSlider,
	Title,
} from '@/components/shared';
import { Input } from '@/components/ui';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';
import { ingredients } from '@/prisma/constants';

interface Props {
	className?: string;
}

const items = ingredients.map((item) => ({
	value: String(item.id),
	text: item.name,
}));

export const Filters = ({ className }: Props) => {
	const { ingredients, loading } = useFilterIngredients();
	return (
		<div className={className}>
			<Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

			{/* Чекбоксы */}
			<div className="flex flex-col gap-4">
				<FilterCheckBox text="Можно собрать" value="1" />
				<FilterCheckBox text="Новинки" value="2" />
			</div>

			{/* Фильтрация цен */}
			<div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
				<p className="font-bold mb-3">Цена от и до:</p>
				<div className="flex gap-3 mb-5">
					<Input
						type="number"
						placeholder="0"
						min={0}
						max={100}
						defaultValue={0}
					/>
					<Input type="number" placeholder="20" min={0} max={100} />
				</div>

				<RangeSlider min={0} max={100} step={10} value={[0, 100]} />
			</div>
			<CheckboxFiltersGroup
				title="Ингридиенты"
				className="mt-5"
				limit={5}
				defaultItems={items.slice(0, 5)}
				items={items}
				loading={loading}
			/>
		</div>
	);
};
