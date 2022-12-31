import '../styles/globals.css'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Beyond_Imagination</title>
      </Head>
      <Header
        className={`flex justify-between px-12 fixed top-0 w-full bg-black`}
      ></Header>
      <main className={`mt-16 px-12 flex-1 h-full`}>
        <Component {...pageProps} />
      </main>
      <Footer className={`px-12`}></Footer>
    </>
  )
}

export default MyApp
