import React, { useEffect, useState } from "react";
import axios from "axios";
import MainEditor from "./Components/MainEditor/MainEditor";
import Layout from "./Components/Layout/Layout";

export default function App() {
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/tags")
      .then((tagResponse) => {
        setTags(tagResponse.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <Layout>
      {error ? <span>{error}</span> : <MainEditor tags={tags} />}
    </Layout>
  );
}
