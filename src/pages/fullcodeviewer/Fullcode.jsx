
import { useParams } from 'react-router-dom';
import styles from './Fullcode.module.css'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, doc, getDoc, addDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

const Fullcode = () => {
    const [code, setcode] = useState([]);
    const { id } = useParams();

    const getCode = async () => {
        const docRef = doc(db, "showroom", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setcode(docSnap.data());
            console.log(docSnap.data());
        } else {
            console.log("No such document!");
        }
    }

    useEffect(() => {
        getCode();
    }, [])


    return (
        <div className={styles.codes}>
            <div className={styles.code_html}>
                <div className={styles.header}>
                    <div className={styles.dots}>
                        <div className={styles.dot} style={{ backgroundColor: "#fc605c" }}></div>
                        <div className={styles.dot} style={{ backgroundColor: "#febb42" }}></div>
                        <div className={styles.dot} style={{ backgroundColor: "#32c948" }}></div>
                    </div>
                    <h3>HTML</h3>
                </div>
                <div className={styles.codeeditor}><p>{code.html_code}</p></div>
                <button className={styles.copybtn} onClick={() => { navigator.clipboard.writeText(code.html_code) }}>COPY</button>
            </div>
            <div className={styles.code_css}>
                <div className={styles.header}>
                    <div className={styles.dots}>
                        <div className={styles.dot} style={{ backgroundColor: "#fc605c" }}></div>
                        <div className={styles.dot} style={{ backgroundColor: "#febb42" }}></div>
                        <div className={styles.dot} style={{ backgroundColor: "#32c948" }}></div>
                    </div>
                    <h3>CSS</h3>
                </div>
                <div className={styles.codeeditor}><p>{code.css_code}</p></div>
                <button className={styles.copybtn}  onClick={() => { navigator.clipboard.writeText(code.css_code) }}>COPY</button>
            </div>
            <div className={styles.code_js}>
                <div className={styles.header}>
                    <div className={styles.dots}>
                        <div className={styles.dot} style={{ backgroundColor: "#fc605c" }}></div>
                        <div className={styles.dot} style={{ backgroundColor: "#febb42" }}></div>
                        <div className={styles.dot} style={{ backgroundColor: "#32c948" }}></div>
                    </div>
                    <h3>JS</h3>
                </div>
                <div className={styles.codeeditor}><p>{code.js_code}</p></div>
                <button className={styles.copybtn}  onClick={() => { navigator.clipboard.writeText(code.js_code) }}>COPY</button>
            </div>
        </div>
    )
}

export default Fullcode