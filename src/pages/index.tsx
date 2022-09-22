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

import { Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

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

  const breakpoints = {
    1440: {
      slidesPerView: 6,
    },
    1024: {
      slidesPerView: 5,
    },
    896: {
      slidesPerView: 4,
    },
    650: {
      slidesPerView: 3,
    },
    425: {
      slidesPerView: 2,
    },
    0: {
      slidesPerView: 1
    }
  }

  if(!data) {
    return <ErrorPage statusCode={500} />
  }

  return (
    <>
      <Head>
        <title>NLW eSports</title>
      </Head>

      <div className="max-w-[1360px] mx-auto w-full flex items-center flex-col my-20 px-4">
        <div className='relative w-72 h-40'>
          <Image src='/assets/logo.svg' layout='fill' alt="" />
        </div>

        <h2 className='text-4xl md:text-5xl lg:text-6xl text-white font-black mt-20'>
          Seu <span className='bg-duoGradient bg-clip-text text-transparent'>duo</span> está aqui
        </h2>

        <div className='w-full flex mt-6'>
          <Swiper
            modules={[Pagination, A11y]}
            spaceBetween={10}
            slidesPerView={6}
            pagination={{ clickable: true }}
            breakpoints={breakpoints}
          >
            {data.map(game => (
              <SwiperSlide key={game.id} className='flex justify-center mb-10'>
                <GameBanner game={game} />
              </SwiperSlide>
            ))}
          </Swiper>
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

