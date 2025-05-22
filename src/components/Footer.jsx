import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer}>
    <p>&copy; 2025 Your Company. All rights reserved.</p>
    <p>
      <a href="#">Privacy Policy</a> |
      <a href="#">Terms</a> |
      <a href="#">Contact</a>
    </p>
  </div>
  )
}

export default Footer