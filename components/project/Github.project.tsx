import Link from 'next/link'
import styles from '../../styles/layout.module.css'

interface GitItem {
  key: string
  value: string
}

interface GithubProps {
  github: GitItem[]
}

const Github: React.FC<GithubProps> = ({ github }) => {
  return (
    <div className="mb-4">
      {github.map((git) => (
        <Link
          key={git.key}
          href={git.value}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex items-center cursor-pointer">
            <span className="material-icons mr-1 text-gray-200">link</span>
            <span className={`text-gray-200 text-sm ${styles.ProjectFont}`}>
              {git.key} Github
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Github
