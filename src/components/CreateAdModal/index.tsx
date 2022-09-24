import * as Dialog from '@radix-ui/react-dialog';

import { GamesProps } from '../../types/game';

import { CreateAdForm } from '../Form/CreateAdForm';

interface CreateAdModalProps {
  games: GamesProps[];
  isGameSelected: boolean;
  setIsGameSelected: (value: boolean) => void;
  setIsDialogOpen: (value: boolean) => void;
}

export function CreateAdModal({ games, isGameSelected, setIsGameSelected, setIsDialogOpen }: CreateAdModalProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed z-10' />

      <Dialog.Content 
        className='fixed bg-[#2A2634] px-10 py-8 text-white top-1/2 left-1/2 
        -translate-x-1/2 -translate-y-1/2 rounded-lg max-w-[90%] w-full shadow-lg shadow-black/25 
        md:max-w-[480px] z-10 max-h-96 overflow-y-scroll md:overflow-y-visible md:max-h-full'
      >
        <Dialog.Title className='text-xl md:text-3xl font-black'>Publique um anúncio</Dialog.Title>

        <CreateAdForm 
          games={games} 
          isGameSelected={isGameSelected} 
          setIsGameSelected={setIsGameSelected} 
          setIsDialogOpen={setIsDialogOpen} 
        />
      </Dialog.Content>
    </Dialog.Portal>
  );
}