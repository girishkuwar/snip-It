




import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import SingleSnip from '../singlesnippet/SingleSnip';
import { Link } from 'react-router-dom';

const Home = () => {
  const [Name, setName] = useState('');
  const [snippets, setSnippets] = useState('');
  const [info, setInfo] = useState('');
  const [mySnip, setMySnip] = useState([]);
  const [sniplang, setSniplang] = useState([]);
  const [savesninlang, setSavesninlang] = useState("");
  const [reload, setReload] = useState(true);
  const [viewer, setViewer] = useState('none');
  const [singlesnip, setSinglesnip] = useState([]);

  const addData = async () => {
    const docRef = await addDoc(collection(db, "snippets", "jWxzdBnG6SWyBaDPKQKC", "css"), {
      name: Name,
      snippet: snippets,
      info: info
    });
    alert("doc added");
  }

  const getSnipCat = () => {
    const q = query(collection(db, "lang"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let products = [];
      querySnapshot.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
      });
      setSniplang(products);
      console.log(products);
    })
  }

  const getcatsnippet = (id) => {
    if (id === "all") {
      setReload(!reload);
      return;
    }
    const q = query(collection(db, "snippets"), where("lang_id", "==", id));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let products = [];
      querySnapshot.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
      });
      setMySnip(products);
      console.log(products);
    })
  }

  const viewBig = (i) => {
    if (viewer === "none") {
      setViewer("block");
      setSinglesnip(mySnip[i]);
    } else if (viewer === "block") {
      setViewer("none");
    }
  }





  useEffect(() => {
    const q = query(collection(db, "snippets"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let products = [];
      querySnapshot.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
      });
      setMySnip(products);
      getSnipCat();
    })
  }, [reload])

  return (<div>
     <SingleSnip display={viewer} snip={singlesnip} changer={viewBig} />
    <div className={styles.snippetslist}>
     
      <select className={styles.selector} name="brand" onChange={(e) => getcatsnippet(e.target.value)}>
        <option value="all">All</option>
        {
          sniplang.map((e, i) => {
            return (<>
              <option key={i} value={e.id}>{e.name}</option>
            </>)
          })
        }
      </select>

      <div className={styles.list}>
        <div>
        <Link to={"/addsnip"}>
          <div className={styles.codeeditor_blank}>
            <h1>+</h1>
          </div>
        </Link>
        </div>
        {
          mySnip.map((e, i) => {
            return (<div key={i}>
              <div className={styles.codeeditor}>
                <div className={styles.header}>
                  <span className={styles.title}>{e.name}</span>
                  <button className={styles.copybtn} onClick={() => { navigator.clipboard.writeText(e.snip) }}>COPY</button>
                </div>
                <div className={styles.editor_content}>
                  <code className={styles.code}>
                    <p onClick={() => { viewBig(i) }}>{e.snip}</p>
                  </code>
                </div>
              </div>
            </div>)

          })
        }
      </div>

    </div>
    </div>
  )


}

export default Home

