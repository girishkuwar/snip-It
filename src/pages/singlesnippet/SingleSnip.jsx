import React from 'react'
import styles from './SingleSnip.module.css'



const SingleSnip = ({ display, snip, changer }) => {
    return (
        <div style={{ display: display }} className={styles.bigsnip}>
            <div className={styles.image}>
                <div className={styles.imgcontainer}>
                    <div className={styles.todo}>
                        <button className={styles.copybtn}>COPY</button>
                        <h2>{snip.name}</h2>
                        <p>{snip.snip}</p>
                        <button className={styles.closebtn} onClick={changer}>X</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleSnip