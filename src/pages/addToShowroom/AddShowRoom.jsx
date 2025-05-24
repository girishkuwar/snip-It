import React, { useState } from 'react'
import styles from './AddShowRoom.module.css'
import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';
import { db } from "../../firebase.config";



const AddShowRoom = () => {
  const [Name, setName] = useState("");
  const [imgAddress, setImgAddress] = useState("");
  const [html_code, setHtml_code] = useState("");
  const [css_code, setCss_code] = useState("");
  const [js_code, setJs_code] = useState("");



  const addData = async () => {
    const docRef = await addDoc(collection(db, "showroom"), {
      name: Name,
      img_address: imgAddress,
      html_code: html_code,
      css_code: css_code,
      js_code: js_code
    });
    alert("doc added");
  }

  return (
    <div className={styles.addshowroom}>
      <div className={styles.heading}>
        <input type='text' placeholder='Name' onChange={(e) => { setName(e.target.value) }} value={Name} />
        <input type='text' placeholder='Image Address' onChange={(e) => { setImgAddress(e.target.value) }} value={imgAddress} />
        <button onClick={() => { addData() }}>SUBMIT</button>
      </div>
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
          <div className={styles.codeeditor}>
            <textarea placeholder='Enter HTML code' name="html_code" id="" cols="30" rows="10" onChange={(e) => { setHtml_code(e.target.value) }} value={html_code} ></textarea>
          </div>
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
          <div className={styles.codeeditor}>
            <textarea name="css_code" placeholder='Enter CSS code' id="" cols="30" rows="10" onChange={(e) => { setCss_code(e.target.value) }} value={css_code} ></textarea>
          </div>
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
          <div className={styles.codeeditor}>
            <textarea name="js_code" placeholder='Enter JS code' id="" cols="30" rows="10" onChange={(e) => { setJs_code(e.target.value) }} value={js_code} ></textarea>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AddShowRoom