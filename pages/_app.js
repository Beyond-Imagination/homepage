import '../styles/globals.css'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main className={`mt-16`}>
        <Component {...pageProps} />
      </main>
      <Footer></Footer>
    </>
  )
}

export default MyApp
