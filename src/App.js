import React, { useState } from "react";
import "./App.css";
import { Title } from "./components/Title";
import { Matrix } from "./components/Matrix";
import { FileInput } from "./components/FileInput";

function App() {
  const [srcText, setSrcText] = useState("asfsadf\ndfhfdh");
  const [toSearch, setToSearch] = useState("");

  return (
    <div className="App">
      <h2>Word Search</h2>
      <FileInput imageText={(txt) => setSrcText(txt)} />
      <Title
        key={srcText}
        data={srcText}
        updateData={(d) => {
          console.log("new d", d);
          setSrcText(d);
        }}
      />
      <Matrix data={srcText} searchWord={toSearch} />
      <div>
        <h3>
          Seach Word:
          <input
            value={toSearch}
            onChange={(d) => setToSearch(d.target.value.toUpperCase())}
          />
        </h3>
      </div>
    </div>
  );
}

export default App;
