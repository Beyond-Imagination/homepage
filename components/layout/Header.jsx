import Link from 'next/link'
import styles from '../../styles/layout.module.css'

const Header = () => {
  return (
    <header
      className={`flex justify-between px-12 fixed top-0 w-full bg-black`}
    >
      <div className={`w-30 logo text-2xl py-4 ${styles.logo}`}>
        <a href="/">Beyond Imagination</a>
      </div>
      <nav className={`flex-1 flex justify-end items-center`}>
        <Link href="/">
          <a className={`px-8`}>팀 소개</a>
        </Link>
        <Link href="/member">
          <a className={`px-8`}>팀원 소개</a>
        </Link>
        <Link href="/project">
          <a className={`px-8`}>프로젝트 소개</a>
        </Link>
        <Link href="/history">
          <a className={`px-8`}>연혁</a>
        </Link>
        <Link href="/photo">
          <a className={`px-8`}>사진</a>
        </Link>
      </nav>
    </header>
  )
}

export default Header
