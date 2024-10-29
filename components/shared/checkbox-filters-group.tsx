'use client';

import { useState } from 'react';
import {
	FilterCheckBox,
	FilterCheckboxProps,
} from '@/components/shared/filter-checkbox';
import { Input } from '@/components/ui';

// type Item = FilterCheckboxProps;

interface Props {
	title: string;
	items: FilterCheckboxProps[]; // Весь список чекбоксов
	defaultItems: FilterCheckboxProps[]; // Показывает ограниченное количество чекбоксов при нераскрытом списке
	limit?: number; // Ограничение количества чекбоксов при раскрытом списке
	searchInputPlaceholder?: string;
	className?: string;
	onChange?: (values: string[]) => void; // Обработчик изменения значений чекбоксов
	defaultValue?: string[]; // Значения выбранных чекбоксов при перезагрузке страницы
}

export const CheckboxFiltersGroup = ({
	title,
	items,
	defaultItems,
	limit = 5,
	searchInputPlaceholder = 'Поиск...',
	className,
	onChange,
	defaultValue,
}: Props) => {
	const [showAll, setShowAll] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	// Показывает ограниченное количество чекбоксов при нераскрытом списке:
	const listOfItems = showAll
		? items.filter((item) => item.text.toLowerCase().includes(searchValue))
		: defaultItems.slice(0, limit);
		
	// Функция обработчик изменения значений чекбоксов:
	const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	return (
		<div className={className}>
			<p className="font-bold mb-3">{title}</p>

			{/* Поиск доступен только при раскрытом списке */}
			{showAll && (
				<div className="mb-5">
					<Input
						placeholder={searchInputPlaceholder}
						className="bg-grey-50 border-none"
						onChange={onChangeSearchValue}
					/>
				</div>
			)}

			<div className="flex flex-col gap-4 max-h-96 pr-2 scrollbar overflow-auto">
				{listOfItems.map((item, index) => (
					<FilterCheckBox
						key={index}
						text={item.text}
						value={item.value}
						checked={false}
						endAdornment={item.endAdornment}
						onCheckedChange={(ids) => console.log(ids)}
					/>
				))}
			</div>

			{/* Кнопка "Показать все" доступна только при раскрытом списке */}
			{items.length > limit && (
				<div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
					<button
						className="mt-3 text-primary"
						onClick={() => setShowAll(!showAll)}
					>
						{showAll ? 'Скрыть' : 'Показать все'}
					</button>
				</div>
			)}
		</div>
	);
};
