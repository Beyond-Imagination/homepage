import styles from '../../styles/layout.module.css'

const Footer = ({ className }) => {
  return (
    <footer className={`${styles.footer} ${className}`}>
      © Beyond Imagination. 2022 All rights reserved
    </footer>
  )
}

export default Footer
