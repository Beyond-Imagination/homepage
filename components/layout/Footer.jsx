import styles from '../../styles/layout.module.css'

const Footer = ({ className }) => {
  return (
    <footer className={`${styles.footer} ${className}`}>
      © Beyond_Imagination. 2022 All rights reserved
    </footer>
  )
}

export default Footer
