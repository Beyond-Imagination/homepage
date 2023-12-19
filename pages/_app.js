import { useRouter } from 'next/router'
import '../styles/globals.css'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  let mainStyle = `my-16 px-12 flex-1`
  if (router.pathname === '/') {
    mainStyle = `flex-1` // index.js에는 mainstyle 적용을 하지 않습니다.
  }
  if (router.pathname.startsWith('/projects')) {
    mainStyle = `flex-1` // '/projects'로 시작하는 모든 경로에 mainStyle을 적용하지 않습니다.
  }
  if (router.pathname.startsWith('/member')) {
    mainStyle = `flex-1` // '/member'로 시작하는 모든 경로에 mainStyle을 적용하지 않습니다.
  }
  if (router.pathname.startsWith('/photo')) {
    mainStyle = `flex-1` // '/photo'로 시작하는 모든 경로에 mainStyle을 적용하지 않습니다.
  }

  return (
    <>
      <Head>
        <title>Beyond_Imagination</title>
      </Head>
      <Header
        className={`flex justify-between px-12 fixed top-0 w-full bg-black`}
      ></Header>
      <main className={mainStyle}>
        <Component {...pageProps} />
      </main>
      <Footer className={`px-12`}></Footer>
    </>
  )
}

export default MyApp
