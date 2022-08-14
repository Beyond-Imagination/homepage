import '../styles/globals.css'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header
        className={`flex justify-between px-12 fixed top-0 w-full bg-black`}
      />
      <main className={`mt-16 px-12 flex-1 h-full`}>
        <Component {...pageProps} />
      </main>
      <Footer className={`px-12`}></Footer>
    </>
  )
}

export default MyApp
