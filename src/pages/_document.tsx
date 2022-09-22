import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <meta name="author" content="Navar Kartalian" />
        <meta name="description" content="NLW eSports" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet" />
        <link rel="icon" type='image/svg+xml' href="/icon.svg" />
      </Head>
      <body className='w-full bg-[#121214] bg-backImage bg-cover bg-no-repeat'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}