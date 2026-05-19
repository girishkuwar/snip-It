import React, { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase.config';

const QuickPaste = () => {
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [snippets, setSnippets] = useState([]);

  const saveSnippet = async () => {
    if (!code.trim()) return;

    await addDoc(collection(db, "snippets"), {
      title: title || "Untitled",
      snip: code,
      createdAt: Date.now(),
    });

    setTitle("");
    setCode("");
  };

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "snippets"),
      (snapshot) => {
        let data=[];

        snapshot.forEach((doc)=>{
          data.push({
            id:doc.id,
            ...doc.data()
          });
        });

        setSnippets(data.reverse());
      }
    );

    return ()=>unsub();
  }, []);

  return (
    <div className="container">

    <h1 className="title">Snip-It</h1>

    <input
      placeholder="Title"
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      className="input"
    />

    <textarea
      placeholder="Paste code..."
      value={code}
      onChange={(e)=>setCode(e.target.value)}
      className="textarea"
    />

    <button
      onClick={saveSnippet}
      className="saveBtn"
    >
      Save
    </button>

    <div className="snippetList">

      {snippets.map(item=>(
        <div
          key={item.id}
          className="card"
        >

          <div className="cardTop">
            <h3>{item.title}</h3>

            <button
              className="copyBtn"
              onClick={() =>
                navigator.clipboard.writeText(item.snip)
              }
            >
              Copy
            </button>
          </div>

          <pre>{item.snip}</pre>

        </div>
      ))}

    </div>

</div>
  );
};

export default QuickPaste;
