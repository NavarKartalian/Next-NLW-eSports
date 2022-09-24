import * as Checkbox from '@radix-ui/react-checkbox';
import * as Dialog from '@radix-ui/react-dialog';

import { Check, GameController } from 'phosphor-react';
import { useState } from 'react';
import { useForm, Controller } from "react-hook-form";

import { Input } from '../../Form/Input';
import { Select } from '../Select';
import { api } from '../../../services/api';
import { Toggle } from '../Toggle';

import { GamesProps } from '../../../types/game';

interface CreateAdFormProps {
  games: GamesProps[];
  isGameSelected: boolean;
  setIsGameSelected: (value: boolean) => void;
  setIsDialogOpen: (value: boolean) => void;
}

interface FormProps {
  game: string;
  discord: string;
  hourStart: string;
  hourEnd: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

export function CreateAdForm({ games, isGameSelected, setIsDialogOpen, setIsGameSelected }: CreateAdFormProps) {
  const [ gameValue, setGameValue ] = useState('');
  const [ weekDays, setWeekDays ] = useState<string[]>([]);
  const [ isChecked, setIsChecked ] = useState(false);

  const [ isSelectInvalid, setIsSelectInvalid ] = useState(false); //Radix validation using RHF was not working
  const [ isToggleInvalid, setIsToggleInvalid ] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormProps>();

  async function onSubmit(data: FormProps) {
    if(!gameValue || weekDays.length < 1) {
      if(!gameValue) {
        setIsSelectInvalid(true);
      } 
      if(weekDays.length < 1) {
        setIsToggleInvalid(true);
      }

      return;
    }

    const sortedWeekDays = weekDays.sort();
    const finalData = {...data, id: gameValue, weekDays: sortedWeekDays, yearsPlaying: Number(data.yearsPlaying)};

    try {
      await api.post(`http://localhost:3333/games/${finalData.id}/ads`, {
        name: finalData.name,
        yearsPlaying: Number(finalData.yearsPlaying),
        discord: finalData.discord,
        weekDays: sortedWeekDays.map(Number),
        hourStart: finalData.hourStart,
        hourEnd: finalData.hourEnd,
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
    <form className='mt-8 flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-2'>
        <label htmlFor="game" className='font-semibold'>Qual o game?</label>
        <Select 
          games={games}
          isGameSelected={isGameSelected}
          setGameValue={setGameValue}
          setIsGameSelected={setIsGameSelected}
          setIsSelectInvalid={setIsSelectInvalid}
        />
        {isSelectInvalid && <span className="text-red-500 text-xs">
          {"Campo obrigatório"}
        </span>}
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor="name">Seu nome (ou nickname)</label>
        <Controller
          name="name"
          control={control}
          rules={{
            required: "Campo obrigatório",
          }}
          render={({ field }) => (
            <Input 
              name={field.name} 
              value={field.value} 
              onChange={field.onChange} 
              type='text' 
              placeholder='Como te chamam dentro do game?' 
              error={errors.name}
            />
          )}
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='flex flex-col gap-2'>
          <label htmlFor='yearsPlaying'>Joga há quantos anos?</label>
          <Controller
            name="yearsPlaying"
            control={control}
            rules={{
              required: "Campo obrigatório",
            }}
            render={({ field }) => (
              <Input 
                name={field.name} 
                value={field.value} 
                onChange={field.onChange}  
                type="number" 
                placeholder='Tudo bem ser ZERO' 
                error={errors.yearsPlaying}
              />
            )}
          />
          
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor="discord">Qual seu Discord?</label>
          <Controller
            name="discord"
            control={control}
            rules={{
              required: "Campo obrigatório",
              validate: (val) =>
                /.*[^# ]#[0-9]{4}/i.test(val) || "Informe um ID válido",
            }}
            render={({ field }) => (
              <Input 
                name={field.name} 
                value={field.value} 
                onChange={field.onChange}  
                type="text" 
                placeholder='Usuário#0000' 
                error={errors.discord}
              />
            )}
          />
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-6'>
        <div className='flex flex-col gap-2'>
          <label htmlFor="weekDays">Quando costuma jogar?</label>
          <Toggle 
            setWeekDays={setWeekDays}
            weekDays={weekDays}
            setIsToggleInvalid={setIsToggleInvalid}
          />    
          {isToggleInvalid && <span className="text-red-500 text-xs">
            {"Campo obrigatório"}
          </span>}
        </div>

        <div className='flex flex-col gap-2 flex-1'>
          <label htmlFor="hourStart">Qual horário do dia?</label>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            <Controller
              name="hourStart"
              control={control}
              rules={{
                required: "Campo obrigatório",
              }}
              render={({ field }) => (
                <div className='flex flex-col'>
                  <input 
                    name={field.name}
                    value={field.value} 
                    onChange={field.onChange} 
                    type="time" 
                    placeholder='De' 
                    className={`bg-zinc-900 py-3 px-3 rounded text-sm placeholder:text-zinc-500
                    ${errors.hourStart ? "border border-red-600" : "border-transparent"}`} 
                  />

                  {errors.hourStart && <span className="text-red-500 text-xs">
                    {errors.hourStart.message}
                  </span>}
                </div>
              )}
            />
            
            <Controller
              name="hourEnd"
              control={control}
              rules={{
                required: "Campo obrigatório",
              }}
              render={({ field }) => (
                <div className='flex flex-col'>
                  <input 
                    name={field.name}
                    value={field.value} 
                    onChange={field.onChange} 
                    type="time" 
                    placeholder='De' 
                    className={`bg-zinc-900 py-3 px-3 rounded text-sm placeholder:text-zinc-500
                    ${errors.hourEnd ? "border border-red-600" : "border-transparent"}`} 
                  />

                  {errors.hourEnd && <span className="text-red-500 text-xs">
                    {errors.hourEnd.message}
                  </span>}
                </div>
              )}
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
  );
}