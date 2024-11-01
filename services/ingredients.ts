import { Ingredient } from '@prisma/client';
import { ApiRoutes } from './api-routes';
import { axiosInstance } from './instance';

// Метод для поиска ингредиентов с использованием HTTP-запроса.
// Метод принимает строку query как параметр для поиска, отправляет GET-запрос на сервер и возвращает данные с результатами поиска
export const getAll = async (): Promise<Ingredient[]> => {
	return (await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)).data;
};
