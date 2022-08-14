import Link from 'next/link'

function Github({ github }) {
  return (
    <div className={`mb-4`}>
      {github.map((git) => {
        return (
          <Link key={git.key} href={git.value}>
            <a target={`_blank`}>
              <div className={`flex items-center cursor-pointer`}>
                <span className={`material-icons mr-1`}>link</span>
                <span>{git.key} Github</span>
              </div>
            </a>
          </Link>
        )
      })}
    </div>
  )
}
export default Github
