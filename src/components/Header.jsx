import React from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'


const Header = () => {
  return (
      <div className={styles.navbar}>
        <div className={styles.nav_left}>
          <a href="#">Logo</a>
        </div>
        <div className={styles.nav_right}>
          <Link to={"/"}>Home</Link>
          <Link to={"/addsnip"}>Add Snip</Link>
        </div>
      </div>
  )
}

export default Header