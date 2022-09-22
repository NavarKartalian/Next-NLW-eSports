import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { ReactNode } from 'react';

interface ToggleItemProps {
  value: string;
  title: string;
  selectedItems: string[];
  children: ReactNode;
}

export function ToggleItem({ children, title, value, selectedItems }: ToggleItemProps) {
  return (
    <ToggleGroup.Item 
      value={value} 
      title={title}
      className={`w-10 h-10 rounded ${selectedItems.includes(value) ? 'bg-violet-500' : 'bg-zinc-900'} 
      hover:bg-violet-500 transition-all ease-in-out duration-200`}
    >
      {children}
    </ToggleGroup.Item>
  );
}