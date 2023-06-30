import Link from 'next/link'
import styles from '../../styles/layout.module.css'

const Header = ({ className }) => {
  return (
    <header
      className={`${className}`}
      style={{ zIndex: 20, backgroundColor: '#111111' }}
    >
      <div
        className={`w-72 logo text-2xl py-5 ${styles.logo} flex-grow-0 flex-shrink-0 mr-20`}
      >
        <Link href="/">
          <a style={{ color: '#3038FF' }}>
            <span className="pl-36 font-bold">BEYOND</span>
            <span className="font-extralight">IMAGINATION</span>
          </a>
        </Link>
      </div>

      <nav
        className="flex-1 flex justify-end items-center"
        style={{ alignItems: 'flex-start' }}
      >
        <ul className="flex items-center justify-between h-full w-full px-40">
          <li className="mx-2">
            <Link href="/">
              <a className="text-sm text-white hover:text-gray-200 transition-colors duration-300">
                HOME
              </a>
            </Link>
          </li>
          <li className="mx-2">
            <Link href="/member">
              <a
                className={`text-sm text-white hover:text-gray-200 transition-colors duration-300 ${styles.headerFont}`}
              >
                MEMBER
              </a>
            </Link>
          </li>
          <li className="mx-2">
            <Link href="/projects">
              <a
                className={`text-sm text-white hover:text-gray-200 transition-colors duration-300 ${styles.headerFont}`}
              >
                PROJECT
              </a>
            </Link>
          </li>

          <li className="mx-2">
            <Link href="/history">
              <a
                className={`text-sm text-white hover:text-gray-200 transition-colors duration-300 ${styles.headerFont}`}
              >
                {' '}
                HISTORY
              </a>
            </Link>
          </li>
          <li className="mx-2">
            <Link href="/photo">
              <a
                className={`text-sm text-white hover:text-gray-200 transition-colors duration-300 ${styles.headerFont}`}
              >
                {' '}
                PHOTO
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
