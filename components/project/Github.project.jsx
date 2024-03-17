import Link from 'next/link'
import styles from '../../styles/layout.module.css'

function Github({ github }) {
  return (
    <div className={`mb-4`}>
      {github.map((git) => {
        return (
          (<Link key={git.key} href={git.value} target={`_blank`}>

            <div className={`flex items-center cursor-pointer`}>
              <span className={`material-icons mr-1 text-gray-200`}>
                link
              </span>
              <span className={`text-gray-200 text-sm ${styles.ProjectFont}`}>
                {git.key} Github
              </span>
            </div>

          </Link>)
        );
      })}
    </div>
  );
}
export default Github
