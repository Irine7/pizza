import { create } from 'zustand';

interface State {
	activeId: number;
	// Функция, которая принимает новое значение activeId и обновляет его в состоянии:
	setActiveId: (activeId: number) => void;
}

// Создаем хранилище для управления состоянием
// useCategoryStore — это хук, который мы создаем для доступа к нашему хранилищу
export const useCategoryStore = create<State>()((set) => ({
	activeId: 1, // Начальное значение для activeId
	setActiveId: (activeId: number) => set({ activeId }), // Функция, которая обновляет значение activeId
}));
