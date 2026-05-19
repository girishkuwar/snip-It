import React, { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.config";

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
    <div style={{padding:"30px"}}>

      <h1>Snip-It</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        style={{
          width:"100%",
          padding:"10px",
          marginBottom:"10px"
        }}
      />

      <textarea
        placeholder="Paste code..."
        value={code}
        onChange={(e)=>setCode(e.target.value)}
        style={{
          width:"100%",
          height:"250px",
          padding:"15px"
        }}
      />

      <button
        onClick={saveSnippet}
        style={{
          marginTop:"10px",
          padding:"10px 20px"
        }}
      >
        Save
      </button>

      <div style={{marginTop:"30px"}}>
        {snippets.map(item=>(
          <div
            key={item.id}
            style={{
              border:"1px solid #333",
              padding:"15px",
              marginBottom:"15px"
            }}
          >
            <h3>{item.title}</h3>

            <button
              onClick={() =>
                navigator.clipboard.writeText(item.snip)
              }
            >
              Copy
            </button>

            <pre>{item.snip}</pre>

          </div>
        ))}
      </div>

    </div>
  );
};

export default QuickPaste;
