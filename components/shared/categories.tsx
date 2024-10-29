import * as React from 'react';
import { cn } from '@/lib/utils';

interface Props {
	className?: string;
}

const categories = [
	'Пиццы',
	'Комбо',
	'Закуски',
	'Коктейли',
	'Кофе',
	'Напитки',
	'Десерты',
	'Десерты',
];
const activeIndex = 0;

export const Categories: React.FC<Props> = ({ className }) => {
	return (
		<div
			className={cn('inline-flex gap-1 bg-grey-50 p-1 rounded-2xl', className)}
		>
			{categories.map((category, index) => (
				<a
					className={cn(
						'flex items-center font-bold h-11 rounded-2xl px-5',
						activeIndex === index &&
							'bg-white shadow-md shadow-grey-200 text-primary'
					)}
					key={index}
				>
					<button>{category}</button>
				</a>
			))}
		</div>
	);
};
