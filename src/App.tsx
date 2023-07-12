import React, { useEffect, useState } from "react";
import "./App.css";
import api from "./utils/api/customAxios";

function App() {
  const [content, setContent] = useState([]);
  useEffect(() => {
    something();
  }, []);

  const something = async () =>
    await api
      .get("/facebook/react/issues")
      .then(res => {
        console.log("res.data", res.data);
        setContent(res.data);
      })
      .catch(err => console.log("err from API", err.data));

  return (
    <div className="App">
      {content ? content.length : <span>loading...</span>}
    </div>
  );
}

export default App;
