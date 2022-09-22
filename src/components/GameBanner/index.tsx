import Link from 'next/link';
import Image from 'next/image';

interface GameBannerProps {
  game: {
    id: string;
    bannerUrl: string;
    title: string;
    _count: { Ads: number };
  }
}

export function GameBanner({ game }: GameBannerProps) {
  return (
    <Link
      href={`/game/${game.id}`} 
      passHref
    >
      <a className='relative w-[204px] h-[272px] rounded-lg overflow-hidden'>
        <Image src={game.bannerUrl} layout='fill' alt="" quality={90} priority />

        <div className='w-full pt-16 pb-4 px-[14px] bg-boxGradient absolute bottom-0 left-0 right-0'>
          <strong className='font-bold text-white'>{game.title}</strong>
          <p className='text-zinc-300 text-sm'>{game._count.Ads} anúncio(s)</p>
        </div>
      </a>
    </Link>
  );
}