import { GetServerSideProps } from "next";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import * as Dialog from '@radix-ui/react-dialog';

import { api } from "../../services/api";
import { DuoInfo } from '../../components/DuoInfo';

import { CaretLeft, CheckCircle, GameController, X } from 'phosphor-react';
import { Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { GamesProps } from "../../types/game";

interface GameProps {
  data: {
    ads: {
      id: string;
      name: string;
      hourEnd: string;
      hourStart: string;
      useVoiceChannel: boolean;
      weekDays: string[];
      yearsPlaying: number;
    }[];

    game: GamesProps;
  }
}

interface DiscordUserProps {
  discord: string;
}


export default function Game({ data }: GameProps) {
  const [ discordUser, setDiscordUser ] = useState<DiscordUserProps>({'discord': ''});
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  async function getDiscordUser(adsId: string) {
    await api.get(`ads/${adsId}/discord`).then(data => {
      setDiscordUser(data.data)
      setIsModalOpen(true);
    }).catch(err => console.log(err));
  }

  const breakpoints = {
    1024: {
      slidesPerView: 3,
      spaceBetween: 60,
    },
    650: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    0: {
      slidesPerView: 1,
      spaceBetween: 20
    }
  }

  return (
    <>
      <Head>
        <title>{data.game.title}</title>
      </Head>
      
      <div className='flex flex-col gap-10 2xl:gap-40'>
        <header className='flex justify-between items-center w-full py-12 px-8'>
          <Link href={'/'} passHref>
            <a>
              <CaretLeft size={36} className='text-white' />
            </a>
          </Link>
          
            <Image src='/assets/logo.svg' alt="" width={160} height={90} quality={90} />
          <div className='w-9 h-9'/>
        </header>

        <main 
          className='flex flex-col 2xl:flex-row w-full px-8 gap-14 max-w-[1440px] mx-auto
          mb-5 2xl:mb-0'
        >
          <div 
            className="relative w-full max-w-4xl h-60 mx-auto 2xl:w-[320px] 2xl:h-[426px]"
          >
            <Image 
              src={data.game.bannerUrl} 
              layout='fill'
              className='rounded-lg' 
              objectFit="cover"
              alt="" 
              quality={100}
            />
          </div>

          <div className='min-w-0 max-w-4xl px-2 w-full mx-auto'>
            <h2 className='text-4xl text-white font-black mb-8'>{data.game.title}</h2>

            { data.ads.length > 0 ? (
              <Swiper
                modules={[Pagination, A11y]}
                spaceBetween={60}
                slidesPerView={3}
                breakpoints={breakpoints}
                pagination={{ clickable: true }}
              >
                {data.ads.map((duo) =>  (
                  <SwiperSlide key={duo.id} className='bg-[#2a2634] rounded-lg p-5 mb-10 min-w-[246px]'>
                    <DuoInfo label='Nome' value={duo.name} />
                    <DuoInfo label='Tempo de jogo' value={`${duo.yearsPlaying} anos`} />
                    <DuoInfo label='Disponibilidade' value={`${duo.weekDays.length} dias ??? ${duo.hourStart}h - ${duo.hourEnd}h`} />
                    <DuoInfo 
                      label='Chamada de ??udio?' 
                      value={duo.useVoiceChannel ? 'Sim' : 'N??o'} 
                      textColor={duo.useVoiceChannel ? 'green' : 'red'}
                    />

                    <button 
                      className='flex items-center w-full h-9 justify-center bg-violet-500 
                      rounded-md text-white gap-2 hover:bg-violet-500/75 transition-all
                      ease-in-out duration-200'
                      onClick={() => getDiscordUser(duo.id)}
                    >
                      <GameController size={20} />

                      <p className='text-sm font-semibold'>Conectar</p>
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>

              ) : (

                <h2 className='text-white font-bold text-2xl mb-5'>
                  Nenhum an??ncio ainda, seja o primeiro!
                </h2>
              )}
          </div>
        </main>

        <Dialog.Root 
          open={isModalOpen} 
          onOpenChange={(value) => setIsModalOpen(value)}
        >
          <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed z-10' />

            <Dialog.Content 
              className='fixed bg-[#2A2634] px-10 py-8 text-white top-1/2 left-1/2 
              -translate-x-1/2 -translate-y-1/2 rounded-lg w-[320px] shadow-lg shadow-black/25 z-10 flex
              justify-center items-center flex-col'
            >
              <Dialog.Close className="absolute top-4 right-4">
                <X size={20} className='text-zinc-500' />
              </Dialog.Close>

              <CheckCircle size={64} className='text-emerald-400 mb-6' />

              <Dialog.Title className='text-2xl font-black'>
                Let???s play!
              </Dialog.Title>

              <p className="text-zinc-400 mb-6">
                Agora ?? s?? come??ar a jogar!
              </p>

              <div className="w-full text-center font-semibold">
                <h2 className="mb-2">Adicione no Discord</h2>

                <div className="w-full rounded-md bg-zinc-900 text-zinc-200 font-normal py-3 overflow-hidden">
                  {discordUser.discord}
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const slug = params!.slug;

    const adsResponse = await api.get(`games/${slug}/ads`);
    const gameResponse = await api.get(`games/${slug}/game`);

    const ads = adsResponse.data;
    const game = gameResponse.data;

    return {
      props: {
        data: {
          ads,
          game,
        }
      }
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}