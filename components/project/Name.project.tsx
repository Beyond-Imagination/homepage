import styles from '../../styles/layout.module.css'

interface NameProps {
  name: string
  onClick: any
}

const Name: React.FC<NameProps> = ({ name, onClick }) => {
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
