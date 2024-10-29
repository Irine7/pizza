import {
	Container,
	Filters,
	ProductCard,
	ProductsGroupList,
	Title,
	TopBar,
} from '@/components/shared';

export default function Home() {
	return (
		<>
			<Container className="mt-10">
				<Title text="Все пиццы" size="lg" className="font-extrabold" />
			</Container>
			<TopBar />

			<Container className="mt-10 pb-14">
				<div className="flex gap-[80px]">
					{/* Фильтрация пицц */}
					<div className="w-[250px]">
						<Filters />
					</div>
					{/* Список всех пицц */}
					<div className="flex-1">
						<div className="flex flex-col gap-16">
							<ProductsGroupList
								title="Пиццы"
								categoryId={1}
								items={[
									{
										id: 1,
										name: 'Пепперони',
										image:
											'https://media.dodostatic.net/image/r:584x584/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
										price: 8.5,
										items: [{ price: 8.5 }],
									},
									{
										id: 2,
										name: 'Пепперони',
										image:
											'https://media.dodostatic.net/image/r:584x584/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
										price: 8.5,
										items: [{ price: 8.5 }],
									},
									{
										id: 3,
										name: 'Пепперони',
										image:
											'https://media.dodostatic.net/image/r:584x584/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
										price: 8.5,
										items: [{ price: 8.5 }],
									},
								]}
							/>
							<ProductsGroupList
								title="Закуски"
								categoryId={3}
								items={[
									{
										id: 4,
										name: 'Сырники с малиновым вареньем',
										image:
											'https://media.dodostatic.net/image/r:584x584/11EF9060F35D7C26BF41590B9079FEBE.avif',
										price: 3.5,
										items: [{ price: 3.5 }],
									},
									{
										id: 5,
										name: 'Сырники с малиновым вареньем',
										image:
											'https://media.dodostatic.net/image/r:584x584/11EF9060F35D7C26BF41590B9079FEBE.avif',
										price: 3.5,
										items: [{ price: 3.5 }],
									},
									{
										id: 6,
										name: 'Сырники с малиновым вареньем',
										image:
											'https://media.dodostatic.net/image/r:584x584/11EF9060F35D7C26BF41590B9079FEBE.avif',
										price: 3.5,
										items: [{ price: 3.5 }],
									},
								]}
							/>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
