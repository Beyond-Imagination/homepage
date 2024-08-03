'use client'
import Link from 'next/link'
import styles from '../../styles/layout.module.css'
import MenuIcon from '@mui/icons-material/Menu'
import React from 'react'
import Button from '@mui/material/Button'

const Header = () => {
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }
  return (
    <header
      className={`w-full h-50 fixed top-0 `}
      style={{ zIndex: 20, backgroundColor: '#111111' }}
    >
      <div className={`max-w-[1440px] mx-auto`}>
        <div
          className={`md:py-4 py-2 px-8 lg:border-0 mx-4 lg:mx-0 md:h-[64px]`}
        >
          <div className={`relative flex items-center  justify-between`}>
            {/*Logo*/}
            <div className={`${styles.logo} mr-3`}>
              <Link
                href="/"
                style={{ color: '#3038FF' }}
                className={'flex items-center'}
              >
                {/*<img src="/images/logo2.png" alt="Logo" className={`w-6 mr-3`} />*/}
                <div
                  className={`flex items-center h-full logo lg:text-2xl text-lg`}
                >
                  <span className="font-bold">BEYOND</span>
                  <span className="font-extralight">IMAGINATION</span>
                </div>
              </Link>
            </div>
            {/*Navigation*/}
            <div className={`relative hidden md:flex items-center ml-auto`}>
              <nav className="ml-auto" style={{ alignItems: 'flex-start' }}>
                <ul className="flex space-x-8">
                  <li className="">
                    <Link
                      href="/"
                      className="text-sm text-white hover:text-gray-200 transition-colors duration-300"
                    >
                      HOME
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      href="/member"
                      className={`text-sm text-white hover:text-gray-200 transition-colors duration-300 ${styles.headerFont}`}
                    >
                      MEMBER
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      href="/projects"
                      className={`text-sm text-white hover:text-gray-200 transition-colors duration-300 ${styles.headerFont}`}
                    >
                      PROJECT
                    </Link>
                  </li>

                  <li className="">
                    <Link
                      href="/history"
                      className={`text-sm text-white hover:text-gray-200 transition-colors duration-300 ${styles.headerFont}`}
                    >
                      {' '}
                      HISTORY
                    </Link>
                  </li>
                  <li className="">
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
            </div>
            <div className={`md:hidden relative`}>
              <Button title={`menu button`} onClick={toggleDrawer(!open)}>
                <MenuIcon></MenuIcon>
              </Button>
            </div>
          </div>
        </div>
        {open && (
          <div className={`px-12 py-2`}>
            <nav className="ml-auto" style={{ alignItems: 'flex-start' }}>
              <ul className="flex flex-col ">
                <li className="">
                  <Link
                    onClick={toggleDrawer(false)}
                    href="/"
                    className="text-md text-white hover:text-gray-200 transition-colors duration-300"
                  >
                    HOME
                  </Link>
                </li>
                <li className="">
                  <Link
                    onClick={toggleDrawer(false)}
                    href="/member"
                    className={`text-md text-white hover:text-gray-200 transition-colors duration-300 ${styles.headerFont}`}
                  >
                    MEMBER
                  </Link>
                </li>
                <li className="">
                  <Link
                    onClick={toggleDrawer(false)}
                    href="/projects"
                    className={`text-md text-white hover:text-gray-200 transition-colors duration-300 ${styles.headerFont}`}
                  >
                    PROJECT
                  </Link>
                </li>

                <li className="">
                  <Link
                    onClick={toggleDrawer(false)}
                    href="/history"
                    className={`text-md text-white hover:text-gray-200 transition-colors duration-300 ${styles.headerFont}`}
                  >
                    {' '}
                    HISTORY
                  </Link>
                </li>
                <li className="">
                  <Link
                    onClick={toggleDrawer(false)}
                    href="/photo"
                    className={`text-md text-white hover:text-gray-200 transition-colors duration-300 ${styles.headerFont}`}
                  >
                    {' '}
                    PHOTO
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
