import Link from 'next/link'
import styles from '../../styles/layout.module.css'

const Header = ({ className }) => {
  return (
    <header
      className={`${className}`}
      style={{ zIndex: 20, backgroundColor: '#000' }}
    >
      <div
        className={`w-72 logo text-2xl py-5 ${styles.logo} flex-grow-0 flex-shrink-0 mr-20`}
      >
        <Link href="/">Beyond_Imagination</Link>
      </div>
      <nav
        className="flex-1 flex justify-end items-center"
        style={{ alignItems: 'flex-start' }}
      >
        <ul className="flex items-center justify-between h-full w-full px-20">
          <li className="mx-2">
            <Link href="/">
              <a className="text-base font-bold text-white hover:text-gray-200 transition-colors duration-300">
                팀 소개
              </a>
            </Link>
          </li>
          <li className="mx-2">
            <Link href="/member">
              <a className="text-base font-bold text-white hover:text-gray-200 transition-colors duration-300">
                팀원 소개
              </a>
            </Link>
          </li>
          <li className="mx-2">
            <Link href="/projects">
              <a className="text-base font-bold text-white hover:text-gray-200 transition-colors duration-300">
                프로젝트 소개
              </a>
            </Link>
          </li>
          <li className="mx-2">
            <Link href="/history">
              <a className="text-base font-bold text-white hover:text-gray-200 transition-colors duration-300">
                연혁
              </a>
            </Link>
          </li>
          <li className="mx-2">
            <Link href="/photo">
              <a className="text-base font-bold text-white hover:text-gray-200 transition-colors duration-300">
                사진
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
