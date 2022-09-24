import * as RadixSelect from '@radix-ui/react-select';
import { CaretDown, CaretUp, Check } from 'phosphor-react';

import { useState } from 'react';

import { GamesProps } from '../../../types/game';

interface SelectProps {
  setIsGameSelected: (value: boolean) => void;
  setGameValue: (value: string) => void;
  setIsSelectInvalid: (value: boolean) => void;
  isGameSelected: boolean;
  games: GamesProps[];
}

export function Select({ setIsGameSelected, setGameValue, isGameSelected, games, setIsSelectInvalid }: SelectProps) {
  const [ isSelectOpen, setIsSelectOpen ] = useState(false);

  return (
    <RadixSelect.Root 
      name='game'
      onValueChange={(value) => {
        setIsGameSelected(true);
        setIsSelectInvalid(false);
        setGameValue(value);
      }} 
      onOpenChange={() => setIsSelectOpen(!isSelectOpen)}
    >
      <RadixSelect.Trigger 
        aria-label="Game" 
        className={`flex flex-1 justify-between bg-zinc-900 py-3 px-4 rounded 
        text-xs md:text-sm ${isGameSelected ? 'text-white' : 'text-zinc-500'}`}
      >
        <RadixSelect.Value placeholder='Selecione o game que deseja jogar' />

        <RadixSelect.Icon className='text-white'>
          {isSelectOpen ? 
            <CaretUp className='w-4 h-4 md:w-6 md:h-6' /> : 
            <CaretDown className='w-4 h-4 md:w-6 md:h-6' />
          }
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Content className='fixed max-w-[300px] bg-zinc-900 px-2 py-3 text-white top-[55%] left-1/2 
        -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25 md:max-w-[400px]'>
        <RadixSelect.ScrollUpButton>
          <CaretUp className='w-4 h-4 md:w-6 md:h-6' />
        </RadixSelect.ScrollUpButton>

        <RadixSelect.Viewport>
          <RadixSelect.Group>
            <RadixSelect.Label className='text-zinc-500 p-2'>Games</RadixSelect.Label>

            {games.map(game => (
              <RadixSelect.Item 
                value={game.id} 
                key={game.id} 
                className='flex items-center gap-2 mb-2 p-2 hover:bg-violet-500 rounded-md 
                focus:bg-violet-500 transition-all ease-in-out duration-200'
              >
                <RadixSelect.ItemText>{game.title}</RadixSelect.ItemText>
                
                <RadixSelect.ItemIndicator>
                  <Check size={20} />
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Group>
        </RadixSelect.Viewport>

        <RadixSelect.ScrollDownButton>
          <CaretDown className='w-4 h-4 md:w-6 md:h-6' />
        </RadixSelect.ScrollDownButton>
      </RadixSelect.Content>
    </RadixSelect.Root>
  );
}