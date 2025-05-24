import React from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import logo from '../assets/snippet.svg'


const Header = () => {
  return (
      <div className={styles.navbar}>
        <div className={styles.nav_left}>
        <Link to={"/"}><img src={logo} alt="" /></Link>
        </div>
        <div className={styles.nav_right}>
         
          {/* <Link to={"/addsnip"}>Add Snip</Link> */}
          <Link to={"/showroom"}>ShowRoom</Link>
        </div>
      </div>
  )
}

export default Header