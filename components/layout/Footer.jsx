import Link from 'next/link'
import styles from '../../styles/layout.module.css'

const Footer = ({ className }) => {
  return (
    <footer className={`${className}`} style={{ background: '#111111' }}>
      <div className={`container py-16 mx-auto flex flex-wrap`}>
        <div className="flex w-full justify-between">
          <div className="w-1/8 pl-4 pr-20">
            <a className="flex title-font font-medium items-center justify-center text-gray-900">
              <img src="/images/logo2.png" alt="Logo" />
            </a>
          </div>
          <div className="w-1/8 px-12">
            <h2
              className={`text-[#5A5A5A] text-lg font-semibold mb-5 ${styles.FooterFont}`}
            >
              Category
            </h2>
            <nav className="list-none mb-10 space-y-2">
              <li>
                <Link href="/member">
                  <a
                    className={`${styles.FooterFont} text-[#B4B4B4] text-sm font-light hover:text-gray-800 `}
                  >
                    Member
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/projects">
                  <a
                    className={`${styles.FooterFont} text-[#B4B4B4] text-sm font-light hover:text-gray-800 `}
                  >
                    Projects
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/history">
                  <a
                    className={`${styles.FooterFont} text-[#B4B4B4] text-sm font-light hover:text-gray-800 `}
                  >
                    History
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/photo">
                  <a
                    className={`${styles.FooterFont} text-[#B4B4B4] text-sm font-light hover:text-gray-800 `}
                  >
                    Photo
                  </a>
                </Link>
              </li>
            </nav>
          </div>
          <div className="ml-auto">
            <Link href="mailto:team@beyond-imagination.kr">
              <a href="mailto:team@beyond-imagination.kr">
                <div
                  style={{
                    position: 'relative',
                    width: '369px',
                    height: '140px',
                    border: '1px solid #B4B4B4',
                    color: '#B4B4B4',
                    backgroundColor: '#111111',
                  }}
                >
                  <img
                    className="mr-3 mt-3"
                    src="/images/Arrow 1.png"
                    alt="Logo"
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                    }}
                  />

                  <div
                    className={`mb-3 ml-3 text-lg ${styles.FooterFont}`}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                    }}
                  >
                    CONTACT
                    <br />
                    Beyond Imagination
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div className="flex items-center mt-8">
          <div className="pl-4 title-font font-medium text-[#5A5A5A] text-sm font-semibold">
            © Beyond_Imagination.
          </div>
          <span className="pl-1 title-font font-medium text-[#5A5A5A] text-sm font-light">
            2023 All rights reserved
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
