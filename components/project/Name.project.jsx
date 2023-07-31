import styles from '../../styles/layout.module.css'

function Name({ name, onClick }) {
  return (
    <div
      className={`text-2xl font-semibold my-4 cursor-pointer hover:underline text-gray-200 ${styles.ProjectFont}`}
      onClick={onClick}
    >
      {name}
    </div>
  )
}

export default Name
