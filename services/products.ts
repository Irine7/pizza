import { Product } from '@prisma/client';
import { ApiRoutes } from './api-routes';
import { axiosInstance } from './instance';

// Метод для поиска продуктов с использованием HTTP-запроса.
// Метод принимает строку query как параметр для поиска, отправляет GET-запрос на сервер и возвращает данные с результатами поиска
export const search = async (query: string): Promise<Product[]> => {
	return (
		await axiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, {
			params: {
				query,
			},
		})
	).data;
};
