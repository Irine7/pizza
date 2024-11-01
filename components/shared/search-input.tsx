'use client';

import { useEffect, useRef, useState } from 'react';
import { useClickAway, useDebounce } from 'react-use';
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Api } from '@/services/api-client';
import { Product } from '@prisma/client';

interface Props {
	className?: string;
}

export const SearchInput = ({ className }: Props) => {
	const [focus, setFocus] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [products, setProducts] = useState<Product[]>([]);
	const ref = useRef(null);

	useClickAway(ref, () => {
		setFocus(false);
	});

	useDebounce(
		async () => {
			try {
				const response = await Api.products.search(searchQuery);
				setProducts(response);
			} catch (error) {
				console.log(error);
			}
		},
		300,
		[searchQuery]
	);

	const onClickItem = () => {
		setFocus(false);
		setSearchQuery('');
		setProducts([]);
	};

	return (
		<>
			{focus && (
				<div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />
			)}

			{/* Поле поиска */}
			<div
				ref={ref}
				className={cn(
					'flex flex-1 justify-between rounded-2xl relative h-11 z-30',
					className
				)}
			>
				<Search
					size={20}
					className="absolute left-3 h-5 top-1/2 -translate-y-[50%] text-gray-400"
				/>
				<input
					type="text"
					placeholder="Поиск..."
					className="w-full bg-gray-100 rounded-2xl pl-10 outline-none"
					onFocus={() => setFocus(true)}
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>

				{/* Попап для найденных продуктов */}
				{products.length > 0 && (
					<div
						className={cn(
							'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
							focus && 'visible opacity-100 top-12'
						)}
					>
						{products.map((product) => (
							<Link
								key={product.id}
								href={`/product/${product.id}`}
								className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
								onClick={onClickItem}
							>
								<Image
									src={product.imageUrl}
									alt={product.name}
									width={35}
									height={35}
									className="rounded-sm"
								/>
								<span>{product.name}</span>
							</Link>
						))}
					</div>
				)}
			</div>
		</>
	);
};
