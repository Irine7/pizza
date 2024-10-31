import { prisma } from './prisma-client';
import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { categories, ingredients, products } from './constants';

// // Генерация случайных целых чисел
const randomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

interface generateProductItemProps {
	productId: number;
	pizzaType?: 1 | 2;
	size?: 20 | 30 | 40;
}

// Генерация разных видов пиццы
const generateProductItem = ({
	productId,
	pizzaType,
	size,
}: generateProductItemProps) => {
	return {
		productId,
		pizzaType,
		size,
		price: randomNumber(8, 25),
	} as Prisma.ProductItemUncheckedCreateInput;
};

// Заполнение БД
async function up() {
	await prisma.user.createMany({
		data: [
			{
				fullName: 'Ivan Ivanov',
				email: 'J9Hr2@example.com',
				password: hashSync('12345678', 10),
				role: 'User',
				verified: new Date(),
			},
			{
				fullName: 'Admin Admin',
				email: 'YdYJ8@example.com',
				password: hashSync('12345678', 10),
				role: 'Admin',
				verified: new Date(),
			},
		],
	});
	await prisma.category.createMany({
		data: categories,
	});
	await prisma.ingredient.createMany({
		data: ingredients,
	});
	await prisma.product.createMany({
		data: products,
	});

	const pizza1 = await prisma.product.create({
		data: {
			name: 'Овощи и грибы',
			imageUrl:
				'https://media.dodostatic.net/image/r:584x584/11EE7D61546D8483A61A0BBAA7ADCC78.avif',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(0, 5),
			},
		},
	});
	const pizza2 = await prisma.product.create({
		data: {
			name: 'Мясной микс с баварскими колбасками',
			imageUrl:
				'https://media.dodostatic.net/image/r:584x584/11EEBEEDA4B0427DB077A5ADBD30D154.avif',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(5, 10),
			},
		},
	});
	const pizza3 = await prisma.product.create({
		data: {
			name: 'Двойная пепперони',
			imageUrl:
				'https://media.dodostatic.net/image/r:584x584/11EF8537F2244E8CAEB7C69E644D0537.avif',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(10, 15),
			},
		},
	});

	// Вариация для продуктов
	await prisma.productItem.createMany({
		data: [
			// Пицца 'Овощи и грибы'
			generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),
			// Пицца 'Мясной микс с баварскими колбасками'
			generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

			// Пицца 'Двойная пепперони'
			generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

			// Остальные продукты
			// generateProductItem({ productId: 1 }),
			// generateProductItem({ productId: 2 }),
			// generateProductItem({ productId: 3 }),
			// generateProductItem({ productId: 4 }),
			// generateProductItem({ productId: 5 }),
			// generateProductItem({ productId: 6 }),
			// generateProductItem({ productId: 7 }),
			// generateProductItem({ productId: 8 }),
			// generateProductItem({ productId: 9 }),
			// generateProductItem({ productId: 10 }),
			// generateProductItem({ productId: 11 }),
			// generateProductItem({ productId: 12 }),
			// generateProductItem({ productId: 13 }),
		],
	});

	// Корзина
	await prisma.cart.createMany({
		data: [
			{
				userId: 1,
				totalAmount: 0,
				token: '123',
			},
			{
				userId: 2,
				totalAmount: 0,
				token: '567',
			},
		],
	});

	await prisma.cartItem.create({
		data: {
			productItemID: 1,
			cartId: 1,
			quantity: 2,
			ingredients: {
				connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
			},
		},
	});
}

// Сброс БД
async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
}

// Генерация данных для БД
async function main() {
	try {
		await down();
		await up();
	} catch (error) {
		console.log(error);
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
