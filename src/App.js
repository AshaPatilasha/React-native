import React, { useState, useLayoutEffect } from "react";
import "./styles.css";

import Tree from "./Tree/Tree";

const structure = [
  {
    type: "folder",
    name: "DEMO_FOLDER",
    files: [
      {
        type: "folder",
        name: "FOLDER_ONE"
      },
      {
        type: "folder",
        name: "SUB_FOLDER_ONE",
        files: [
          { type: "file", name: "FILE_TWO.txt" },
          { type: "file", name: "FILE_ONE.txt" }
        ]
      }
    ]
  },
  {
    type: "folder",
    name: "FOLDER_TWO",
    files: [
      {
        type: "file",
        name: "FILE_ONE.txt"
      }
    ]
  },
  { type: "file", name: "FILE_THREE.txt" }
];

export default function App() {
  let [data, setData] = useState(structure);

  const handleClick = (node) => {
    console.log(node);
  };
  const handleUpdate = (state) => {
    localStorage.setItem(
      "tree",
      JSON.stringify(state, function (key, value) {
        if (key === "parentNode" || key === "id") {
          return null;
        }
        return value;
      })
    );
  };

  useLayoutEffect(() => {
    try {
      let savedStructure = JSON.parse(localStorage.getItem("tree"));
      if (savedStructure) {
        setData(savedStructure);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="App">
      <h2>Assignment</h2>

      <Tree data={data} onUpdate={handleUpdate} onNodeClick={handleClick} />
    </div>
  );
}
