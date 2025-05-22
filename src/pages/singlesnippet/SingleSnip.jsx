import React from 'react'
import styles from './SingleSnip.module.css'



const SingleSnip = ({ display, snip, changer }) => {
    return (
        <div style={{ display: display }} className={styles.bigsnip}>
            <div className={styles.image}>
                <div className={styles.imgcontainer}>
                    <div className={styles.todo}>
                        <button onClick={() => { navigator.clipboard.writeText(snip.snip) }} className={styles.copybtn}>COPY</button>
                        <h2>{snip.name}</h2>
                        <p className={styles.code}>{snip.snip}</p>
                        <div className={styles.info_card}>
                            <p className={styles.info}>{snip.info}</p>
                        </div>
                        <button className={styles.closebtn} onClick={changer}>X</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleSnip