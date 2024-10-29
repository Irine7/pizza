'use client';

import { useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';
import { ProductCard, Title } from '@/components/shared';
import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';

interface Props {
	title: string;
	items: any[];
	categoryId: number;
	listClassName?: string;
	className?: string;
}

export const ProductsGroupList = ({
	title,
	items,
	categoryId,
	listClassName,
	className,
}: Props) => {
	// Хук для управления глобальным состоянием:
	const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
	const intersectionRef = useRef(null);
	const intersection = useIntersection(intersectionRef, {
		threshold: 0.5,
	});

	// Отлавливаем изменения и оповещаем глобальное состояние
	useEffect(() => {
		// Этот блок в зоне видимости экрана
		if (intersection?.isIntersecting) {
			setActiveCategoryId(categoryId);
		}
	}, [categoryId, title, intersection?.isIntersecting]);

	return (
		<div className={className} id={title} ref={intersectionRef}>
			<Title text={title} size="lg" className="font-extrabold mb-5" />

			{/* Список товаров */}
			<div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
				{items.map((item) => (
					<ProductCard
						key={item.id}
						id={item.id}
						name={item.name}
						price={item.items[0].price}
						imageUrl={item.image}
						className="col-span-1"
					/>
				))}
			</div>
		</div>
	);
};
