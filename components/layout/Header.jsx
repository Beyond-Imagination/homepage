import Link from 'next/link'
import styles from '../../styles/layout.module.css'

const Header = ({ className }) => {
  return (
    <header
      className={`${className}`}
      style={{ zIndex: 20, backgroundColor: '#000' }}
    >
      <div
        className={`w-72 logo text-2xl py-4 ${styles.logo} flex-grow-0 flex-shrink-0`}
      >
        <Link href="/">Beyond_Imagination</Link>
      </div>
      <nav className={`flex-1 flex justify-end items-center`}>
        <Link href="/">
          <a className={`w-48 text-center`}>팀 소개</a>
        </Link>
        <Link href="/member">
          <a className={`w-48 text-center`}>팀원 소개</a>
        </Link>
        <Link href="/projects">
          <a className={`w-48 text-center`}>프로젝트 소개</a>
        </Link>
        <Link href="/history">
          <a className={`w-48 text-center`}>연혁</a>
        </Link>
        <Link href="/photo">
          <a className={`w-48 text-center`}>사진</a>
        </Link>
      </nav>
    </header>
  )
}

export default Header
