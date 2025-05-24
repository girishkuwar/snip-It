import React, { useEffect, useState } from 'react'
import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import styles from './ShowRoom.module.css'
import { Link } from 'react-router-dom';

const ShowRoom = () => {
    const [cardData, setCardData] = useState([]);


    useEffect(() => {
        const q = query(collection(db, "showroom"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let products = [];
            querySnapshot.forEach((doc) => {
                products.push({ ...doc.data(), id: doc.id });
            });
            setCardData(products);
        })
    }, [])

    return (
        <div className={styles.list}>
            <Link to={"/"}></Link>
            {
                cardData.map((e, i) => {
                    return (<Link to={`${e.id}`}>
                        <div key={i} className={styles.card}>
                            <div className={styles.center}>
                                <div className={styles.articlecard}>

                                    <div className={styles.imgshower}>
                                        <img src={e.img_address} alt="article-cover" />
                                    </div>
                                </div>
                            <div className={styles.content}>
                                <p className={styles.title}>{e.name}</p>
                            </div>
                            </div>
                        </div>
                    </Link>)
                })
            }

        </div>
    )
}

export default ShowRoom