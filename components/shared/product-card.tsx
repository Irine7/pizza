import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { Title } from '@/components/shared';
import { Button } from '@/components/ui';

interface Props {
	id: number;
	name: string;
	price: number;
	imageUrl: string;
	className?: string;
}

export const ProductCard = ({
	id,
	name,
	price,
	imageUrl,
	className,
}: Props) => {
	return (
		<div className={className}>
			<Link href={`/product/${id}`}>
				<div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
					<Image src={imageUrl} alt={name} width={215} height={215} />
				</div>

				<Title text={name} size="sm" className="font-bold mt-3 mb-1" />
				<p className="text-sm text-gray-400">
					Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус
					альфредо, чеснок
				</p>

				<div className="flex justify-between items-center mt-4">
					<span className="text-[20px]">
						от <b>{price} €</b>
					</span>
					<Button variant="secondary" className="text-base font-bold">
						<Plus size={20} className="m-1" />
						Добавить
					</Button>
				</div>
			</Link>
		</div>
	);
};
