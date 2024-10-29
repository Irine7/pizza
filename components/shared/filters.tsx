import {
	CheckboxFiltersGroup,
	FilterCheckBox,
	RangeSlider,
	Title,
} from '@/components/shared';
import { Input } from '@/components/ui';

interface Props {
	className?: string;
}

export const Filters = ({ className }: Props) => {
	return (
		<div className={className}>
			<Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

			{/* Чекбоксы */}
			<div className="flex flex-col gap-4">
				<FilterCheckBox text="Можно собрать" value="1" />
				<FilterCheckBox text="Новинки" value="2" />
			</div>

			{/* Фильтрация цен */}
			<div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
				<p className="font-bold mb-3">Цена от и до:</p>
				<div className="flex gap-3 mb-5">
					<Input
						type="number"
						placeholder="0"
						min={0}
						max={100}
						defaultValue={0}
					/>
					<Input type="number" placeholder="20" min={0} max={100} />
				</div>

				<RangeSlider min={0} max={100} step={10} value={[0, 100]} />
			</div>
			<CheckboxFiltersGroup
				title="Ингридиенты"
				className="mt-5"
				limit={5}
				defaultItems={[
          {
            text: 'Сырный соус',
            value: '1',
          },
          {
            text: 'Моццарелла',
            value: '2',
          },
          {
            text: 'Чеснок',
            value: '3',
          },
          {
            text: 'Солённые огурчики',
            value: '4',
          },
          {
            text: 'Красный лук',
            value: '5',
          },
          {
            text: 'Томаты',
            value: '6',
          },
        ]}
        items={[
          {
            text: 'Сырный соус',
            value: '1',
          },
          {
            text: 'Моццарелла',
            value: '2',
          },
          {
            text: 'Чеснок',
            value: '3',
          },
          {
            text: 'Солённые огурчики',
            value: '4',
          },
          {
            text: 'Красный лук',
            value: '5',
          },
          {
            text: 'Томаты',
            value: '6',
          },
          {
            text: 'Сырный соус',
            value: '1',
          },
          {
            text: 'Моццарелла',
            value: '2',
          },
          {
            text: 'Чеснок',
            value: '3',
          },
          {
            text: 'Солённые огурчики',
            value: '4',
          },
          {
            text: 'Красный лук',
            value: '5',
          },
          {
            text: 'Томаты',
            value: '6',
          },
        ]}
			/>
		</div>
	);
};
