import Link from 'next/link'

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
            <h2 className="text-[#5A5A5A] text-lg font-semibold mb-5">
              Category
            </h2>
            <nav className="list-none mb-10 space-y-2">
              <li>
                <Link href="/member">
                  <a className="text-[#B4B4B4] text-sm font-light hover:text-gray-800">
                    Member
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/projects">
                  <a className="text-[#B4B4B4] text-sm font-light hover:text-gray-800">
                    Projects
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/history">
                  <a className="text-[#B4B4B4] text-sm font-light hover:text-gray-800">
                    History
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/photo">
                  <a className="text-[#B4B4B4] text-sm font-light hover:text-gray-800">
                    Photo
                  </a>
                </Link>
              </li>
            </nav>
          </div>
          <div className="ml-auto">
            <Link href="mailto:team@beyond-imagination.kr">
              <a
                href="mailto:team@beyond-imagination.kr"
                className="flex items-center"
              >
                <img src="/images/ConnectBI.png" alt="Logo" />
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
