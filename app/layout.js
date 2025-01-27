import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Newrelic from '@/components/common/newrelic'
import './globals.css'
import { Suspense } from 'react'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head title={`Beyond-Imagination`}>
        <title>Beyond-Imagination</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@400;500;600;700&family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5429905827101121"
          crossOrigin="anonymous"
        ></script>
        <Newrelic />
      </head>
      <body>
        <Header
          className={`flex justify-between px-12 fixed top-0 w-full bg-black`}
        ></Header>
        <Suspense>
          <main className={`mt-12 md:mt-16`}>{children}</main>
        </Suspense>
        <Footer className={`px-12`}></Footer>
      </body>
    </html>
  )
}
