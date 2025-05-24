import React, { useEffect, useState } from 'react'
import styles from "./AddSnip.module.css"
import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';
import { db } from "../../firebase.config";


const AddSnip = () => {
    const [Name, setName] = useState('');
    const [snippets, setSnippets] = useState('');
    const [info, setInfo] = useState('');
    const [sniplang, setSniplang] = useState([]);
    const [savesninlang, setSavesninlang] = useState("");

    const addData = async () => {
        const docRef = await addDoc(collection(db, "snippets"), {
            name: Name,
            snip: snippets,
            info: info,
            lang_id: savesninlang

        });
        alert("doc added");
    }


    useEffect(() => {
        const q = query(collection(db, "lang"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let products = [];
            querySnapshot.forEach((doc) => {
                products.push({ ...doc.data(), id: doc.id });
            });
            setSniplang(products);
            console.log(products);
        })
        return () => { unsub(); }
    }, [])




    return (<div className={styles.editor}>
        <div className={styles.insert_table}>
            <input className={styles.inputsnip} type='text' placeholder='Name' onChange={(e) => { setName(e.target.value) }} value={Name} />
            <textarea className={styles.inputsnipbig} name="Snippet" placeholder='snippets' cols="50" rows="20" onChange={(e) => { setSnippets(e.target.value) }} value={snippets}></textarea>
            <textarea className={styles.inputsnipbig} type='text' cols="40" row="20" placeholder='info' onChange={(e) => { setInfo(e.target.value) }} value={info} />
            <select className={styles.selecter} name="brand"  onChange={(e) => setSavesninlang(e.target.value)}>
                <option value="all">All</option>
                {
                    sniplang.map((e, i) => {
                        return (<>
                            <option key={i} value={e.id}>{e.name}</option>
                        </>)
                    })
                }
            </select>
            <button className={styles.inputbtn} onClick={() => { addData() }}>save</button>
        </div>
    </div>

    )
}

export default AddSnip