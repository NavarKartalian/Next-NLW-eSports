import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { CaretDown, CaretUp, Check, GameController } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { Input } from '../Form/Input';
import { ToggleItem } from '../ToggleItem';
import { api } from '../../services/api';

interface GamesProps {
  id: string;
  bannerUrl: string;
  title: string;
  _count: { Ads: number };
}

interface CreateAdModal {
  games: GamesProps[];
  isGameSelected: boolean;
  setIsGameSelected: (value: boolean) => void;
  setIsDialogOpen: (value: boolean) => void;
}

export function CreateAdModal({ games, isGameSelected, setIsGameSelected, setIsDialogOpen }: CreateAdModal) {
  const [ isSelectOpen, setIsSelectOpen ] = useState(false);
  const [ weekDays, setWeekDays ] = useState<string[]>([]);
  const [ isChecked, setIsChecked ] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const formData =  new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    const sortedWeekDays = weekDays.sort();

    if(!data.name || !data.game || !data.discord || !data.hourStart || !data.hourEnd || weekDays.length === 0) {
      return;
    }

    try {
      await api.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: sortedWeekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: isChecked
      }).then(() => {
        setIsChecked(false);
        setWeekDays([]);
        setIsDialogOpen(false);
      });
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed z-10' />

      <Dialog.Content 
        className='fixed bg-[#2A2634] px-10 py-8 text-white top-1/2 left-1/2 
        -translate-x-1/2 -translate-y-1/2 rounded-lg max-w-[90%] w-full shadow-lg shadow-black/25 
        md:max-w-[480px] z-10 max-h-96 overflow-y-scroll md:overflow-y-visible md:max-h-full'
      >
        <Dialog.Title className='text-xl md:text-3xl font-black'>Publique um anúncio</Dialog.Title>

        <form className='mt-8 flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2'>
            <label htmlFor="game" className='font-semibold'>Qual o game?</label>
            <Select.Root 
              name='game'
              onValueChange={() => {
                setIsGameSelected(true);
              }} 
              onOpenChange={() => setIsSelectOpen(!isSelectOpen)}
            >
              <Select.Trigger 
                aria-label="Game" 
                className={`flex flex-1 justify-between bg-zinc-900 py-3 px-4 rounded 
                text-xs md:text-sm ${isGameSelected ? 'text-white' : 'text-zinc-500'}`}
              >
                <Select.Value placeholder='Selecione o game que deseja jogar' />

                <Select.Icon className='text-white'>
                  {isSelectOpen ? 
                    <CaretUp className='w-4 h-4 md:w-6 md:h-6' /> : 
                    <CaretDown className='w-4 h-4 md:w-6 md:h-6' />
                  }
                </Select.Icon>
              </Select.Trigger>

              <Select.Content className='fixed max-w-[300px] bg-zinc-900 px-2 py-3 text-white top-[55%] left-1/2 
                -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25 md:max-w-[400px]'>
                <Select.ScrollUpButton>
                  <CaretUp className='w-4 h-4 md:w-6 md:h-6' />
                </Select.ScrollUpButton>

                <Select.Viewport>
                  <Select.Group>
                    <Select.Label className='text-zinc-500 p-2'>Games</Select.Label>

                    {games.map(game => (
                      <Select.Item 
                        value={game.id} 
                        key={game.id} 
                        className='flex items-center gap-2 mb-2 p-2 hover:bg-violet-500 rounded-md 
                        focus:bg-violet-500 transition-all ease-in-out duration-200'
                      >
                        <Select.ItemText>{game.title}</Select.ItemText>
                        
                        <Select.ItemIndicator>
                          <Check size={20} />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Viewport>

                <Select.ScrollDownButton>
                  <CaretDown className='w-4 h-4 md:w-6 md:h-6' />
                </Select.ScrollDownButton>
              </Select.Content>
            </Select.Root>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input name='name' id='name' type='text' placeholder='Como te chamam dentro do game?' />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='yearsPlaying'>Joga há quantos anos?</label>
              <Input name='yearsPlaying' id='yearsPlaying' type="number" placeholder='Tudo bem ser ZERO' />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input name='discord' id='discord' type="text" placeholder='Usuário#0000' />
            </div>
          </div>

          <div className='flex flex-col md:flex-row gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="weekDays">Quando costuma jogar?</label>

              <ToggleGroup.Root 
                type='multiple' 
                className='grid grid-cols-4 gap-y-1'
                onValueChange={(value) => setWeekDays(value)}
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
            </div>

            <div className='flex flex-col gap-2 flex-1'>
              <label htmlFor="hourStart">Qual horário do dia?</label>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                <input 
                  name='hourStart'
                  id='hourStart' 
                  type="time" 
                  placeholder='De' 
                  className='bg-zinc-900 py-3 px-3 rounded text-sm placeholder:text-zinc-500' 
                />

                <input 
                  name='hourEnd'
                  id='hourEnd' 
                  type="time" 
                  placeholder='Até' 
                  className='bg-zinc-900 py-3 px-3 rounded text-sm placeholder:text-zinc-500'
                />
              </div>
            </div>
          </div>

          <label className='mt-2 flex gap-2 text-sm items-center'>
            <Checkbox.Root 
              className='w-6 h-6 rounded bg-zinc-900 flex justify-center items-center'
              onCheckedChange={(checked) => setIsChecked(checked as boolean)}
              checked={isChecked}
            >
              <Checkbox.Indicator>
                <Check name='voiceChannel' className='text-emerald-400' size={16} />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className='mt-4 flex flex-col md:flex-row justify-end gap-4'>
            <Dialog.Close 
              className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'
            >
              Cancelar
            </Dialog.Close>

            <button 
              type='submit' 
              className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3
              hover:bg-violet-600 justify-center'
            >
              <GameController size={24} />
              Encontrar Duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}