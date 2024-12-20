import React, { PropsWithChildren } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShoppingCart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container, SearchInput } from '@/components/shared';
import { Button } from '@/components/ui';

interface Props {
	className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
	// cn помогает 'склеить' классы Tailwind
	return (
		<header className={cn('border border-b', className)}>
			<Container className="flex items-center justify-between py-8">
				{/* Левая часть */}
				<Link href="/">
					<div className="flex items-center gap-4">
						<Image src="/logo.png" alt="logo" width={35} height={35} />
						<div>
							<h1 className="text-2xl uppercase font-black">Roostiq Pizza</h1>
							<p className="text-sm text-gray-400 landing-3">
								вкусней уже некуда
							</p>
						</div>
					</div>
				</Link>

				{/* Поле поиска */}
				<div className='flex-1 mx-10'>
					<SearchInput />
				</div>

				{/* Правая часть */}
				{/* Кнопка Войти */}
				<div className="flex items-center gap-3">
					<Button variant="outline" className="flex items-center gap-1">
						<User size={16} />
						Войти
					</Button>

					{/* Кнопка Корзина */}
					<div>
						<Button className="group relative">
							<b>30€</b>
							<span className="h-full w-[1px] bg-white/30 mx-3" />
							<div className="flex items-center gap-1 transition direction-300 group-hover:opacity-0">
								<ShoppingCart className="w-4 h-4 relative" strokeWidth={2} />
								<b>2</b>
							</div>
							<ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
						</Button>
					</div>
				</div>
			</Container>
		</header>
	);
};
