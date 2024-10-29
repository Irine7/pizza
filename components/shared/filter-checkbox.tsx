import { Checkbox } from '../ui/checkbox';

export interface FilterCheckboxProps {
	text: string;
	value: string;
	checked?: boolean;
	endAdornment?: React.ReactNode;
	onCheckedChange?: (checked: boolean) => void;
}

export const FilterCheckBox = ({
	text,
	value,
	checked,
	endAdornment,
	onCheckedChange,
}: FilterCheckboxProps) => {
	return (
		<div className="flex items-center space-x-2">
			<Checkbox
				value={value}
				checked={checked}
				onCheckedChange={onCheckedChange}
				className="rounded-[8px] w-6 h-6"
				id={`checkbox-${String(value)}`} // Возможность выбрать чекбокс при клике на текст рядом с ним
			/>
			<label htmlFor={`checkbox-${String(value)}`}
			className='flex-1 cursor-pointer leading-none'>
				{text}
			</label>
			{endAdornment}
		</div>
	);
};
