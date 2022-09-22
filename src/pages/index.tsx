import { GetServerSideProps } from 'next';
import ErrorPage from 'next/error';
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import * as Dialog from '@radix-ui/react-dialog';

import { api } from '../services/api';
import { GameBanner } from '../components/GameBanner';
import { CreateAdBanner } from '../components/CreateAdBanner';
import { CreateAdModal } from '../components/CreateAdModal';

interface HomeProps {
  data: {
    id: string;
    bannerUrl: string;
    title: string;
    _count: { Ads: number };
  }[]
}

export default function Home({ data }: HomeProps) {
  const [ isDialogOpen, setIsDialogOpen ] = useState(false);
  const [ isGameSelected, setIsGameSelected ] = useState(false);

  if(!data) {
    return <ErrorPage statusCode={500} />
  }

  return (
    <>
      <Head>
        <title>NLW eSports</title>
      </Head>

      <div className="max-w-[1344px] mx-auto w-full flex items-center flex-col my-20">
        <div className='relative w-72 h-40'>
          <Image src='/assets/logo.svg' layout='fill' alt="" />
        </div>

        <h2 className='text-6xl text-white font-black mt-20'>
          Seu <span className='bg-duoGradient bg-clip-text text-transparent'>duo</span> está aqui
        </h2>

        <div className='grid grid-cols-6 gap-6 mt-16'>
          {data.map(game => (
            <GameBanner game={game} key={game.id} />
          ))}
        </div>

        <Dialog.Root 
          onOpenChange={(open) => {
            setIsGameSelected(false)
            setIsDialogOpen(open);
          }}
          open={isDialogOpen}
        >
          <CreateAdBanner />

          <CreateAdModal 
            games={data} 
            isGameSelected={isGameSelected} 
            setIsGameSelected={setIsGameSelected}
            setIsDialogOpen={setIsDialogOpen}
          />
        </Dialog.Root>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await api.get('games');
    const data = response.data;

    return {
      props: {
        data
      },
    }
  } catch (err) {
    return {
      props: {}
    }
  }
}

