import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import SingleSnip from '../singlesnippet/SingleSnip';
import { Link } from 'react-router-dom';

const Home = () => {
  const [name, setName] = useState('');
  const [snippetText, setSnippetText] = useState('');
  const [info, setInfo] = useState('');
  const [snippetsList, setSnippetsList] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedLang, setSelectedLang] = useState("all");
  const [reload, setReload] = useState(true);
  const [viewer, setViewer] = useState('none');
  const [singleSnippet, setSingleSnippet] = useState(null);

  const addData = async () => {
    try {
      await addDoc(collection(db, "snippets", "jWxzdBnG6SWyBaDPKQKC", "css"), {
        name,
        snippet: snippetText,
        info
      });
      alert("Snippet added");
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const fetchLanguages = () => {
    const q = query(collection(db, "lang"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const langs = [];
      querySnapshot.forEach((doc) => {
        langs.push({ ...doc.data(), id: doc.id });
      });
      setLanguages(langs);
    });
    return unsub;
  };

  const fetchSnippetsByLang = (langId) => {
    if (langId === "all") {
      setReload(prev => !prev);
      return;
    }
    const q = query(collection(db, "snippets"), where("lang_id", "==", langId));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setSnippetsList(data);
    });
    return unsub;
  };

  const toggleViewer = (index) => {
    if (viewer === "none") {
      setViewer("block");
      setSingleSnippet(snippetsList[index]);
    } else {
      setViewer("none");
      setSingleSnippet(null);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "snippets"));
    const unsubSnippets = onSnapshot(q, (querySnapshot) => {
      const allSnippets = [];
      querySnapshot.forEach((doc) => {
        allSnippets.push({ ...doc.data(), id: doc.id });
      });
      setSnippetsList(allSnippets);
    });

    const unsubLanguages = fetchLanguages();

    return () => {
      unsubSnippets();
      unsubLanguages();
    };
  }, [reload]);

  return (
    <div>
      <SingleSnip display={viewer} snip={singleSnippet} changer={toggleViewer} />

      <div className={styles.snippetslist}>
        <select
          className={styles.selector}
          value={selectedLang}
          onChange={(e) => {
            setSelectedLang(e.target.value);
            fetchSnippetsByLang(e.target.value);
          }}
        >
          <option value="all">All</option>
          {languages.map((lang) => (
            <option key={lang.id} value={lang.id}>{lang.name}</option>
          ))}
        </select>

        <div className={styles.list}>
          <div>
            <Link to="/addsnip">
              <div className={styles.codeeditor_blank}>
                <h1>+</h1>
              </div>
            </Link>
          </div>

          {snippetsList.map((snippet, index) => (
            <div key={snippet.id}>
              <div className={styles.codeeditor}>
                <div className={styles.header}>
                  <span className={styles.title}>{snippet.name}</span>
                  <button
                    className={styles.copybtn}
                    onClick={() => navigator.clipboard.writeText(snippet.snip)}
                  >
                    COPY
                  </button>
                </div>
                <div className={styles.editor_content}>
                  <pre className={styles.code}>
                    <code onClick={() => toggleViewer(index)}>
                      {snippet.snip}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;