import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';

export function CreateAdBanner() {
  return (
    <div className='pt-1 bg-duoGradient self-stretch rounded-lg overflow-hidden mt-4'>
      <div className='bg-[#2A2634] px-8 py-6 flex justify-between items-center flex-col 
        text-center gap-4 lg:flex-row lg:text-start lg:gap-0'>
        <div>
          <strong className='text-white text-xl lg:text-2xl font-black'>Não encontrou seu duo?</strong>
          <p className='text-zinc-400 text-sm lg:text-base'>
            Publique um anúncio para encontrar novos players!
          </p>
        </div>

        <Dialog.Trigger 
          className='px-4 py-3 bg-violet-500 text-white rounded hover:bg-violet-600 
          flex items-center gap-3'
        >
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  );
}