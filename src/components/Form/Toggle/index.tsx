import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { ToggleItem } from '../../ToggleItem';

interface ToggleProps {
  setWeekDays: (value: string[]) => void;
  setIsToggleInvalid: (value: boolean) => void;
  weekDays: string[];
}

export function Toggle({ setWeekDays, weekDays, setIsToggleInvalid }: ToggleProps) {
  return (
    <ToggleGroup.Root 
      type='multiple' 
      className='grid grid-cols-4 gap-y-1'
      onValueChange={(value) => {
        setWeekDays(value);
        setIsToggleInvalid(false);
      }}
      value={weekDays}
    >
      <ToggleItem selectedItems={weekDays} value='0' title='Domingo'>D</ToggleItem>
      <ToggleItem selectedItems={weekDays} value='1' title='Segunda'>S</ToggleItem>
      <ToggleItem selectedItems={weekDays} value='2' title='Terça'>T</ToggleItem>
      <ToggleItem selectedItems={weekDays} value='3' title='Quarta'>Q</ToggleItem>
      <ToggleItem selectedItems={weekDays} value='4' title='Quinta'>Q</ToggleItem>
      <ToggleItem selectedItems={weekDays} value='5' title='Sexta'>S</ToggleItem>
      <ToggleItem selectedItems={weekDays} value='6' title='Sábado'>S</ToggleItem>
    </ToggleGroup.Root>
  );
}