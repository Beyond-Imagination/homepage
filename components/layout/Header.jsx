import Link from 'next/link'
import styles from '../../styles/layout.module.css'

const Header = ({ className }) => {
  return (
    <header
      className={`flex justify-between px-12 fixed top-0 w-full bg-black`}
      style={{ zIndex: 20, backgroundColor: '#111111' }}
    >
      <div
        className={`w-72 logo text-2xl py-5 ${styles.logo} flex-grow-0 flex-shrink-0 mr-20`}
      >
        <Link href="/" style={{ color: '#3038FF' }}>
          <span className="pl-36 font-bold">BEYOND</span>
          <span className="font-extralight">IMAGINATION</span>
        </Link>
      </div>
      <nav
        className="flex-1 flex justify-end items-center"
        style={{ alignItems: 'flex-start' }}
      >
        <ul className="flex items-center justify-between h-full w-full px-40">
          <li className="mx-2">
            <Link
              href="/"
              className="text-sm text-white hover:text-gray-200 transition-colors duration-300"
            >
              HOME
            </Link>
          </li>
          <li className="mx-2">
            <Link
              href="/member"
              className={`text-sm text-white hover:text-gray-200 transition-colors duration-300 ${styles.headerFont}`}
            >
              MEMBER
            </Link>
          </li>
          <li className="mx-2">
            <Link
              href="/projects"
              className={`text-sm text-white hover:text-gray-200 transition-colors duration-300 ${styles.headerFont}`}
            >
              PROJECT
            </Link>
          </li>

          <li className="mx-2">
            <Link
              href="/history"
              className={`text-sm text-white hover:text-gray-200 transition-colors duration-300 ${styles.headerFont}`}
            >
              {' '}
              HISTORY
            </Link>
          </li>
          <li className="mx-2">
            <Link
              href="/photo"
              className={`text-sm text-white hover:text-gray-200 transition-colors duration-300 ${styles.headerFont}`}
            >
              {' '}
              PHOTO
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
