"use client";
import { useState, useEffect } from "react";
import { getPosts } from "@/DB/contentful";

function Portfolio() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts();
        setData(posts);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>HELLO</h1>
      <ul>
        {data.items.map((item, index) => (
          <li key={index}>{item.fields.title}</li>
        ))}
      </ul>{" "}
    </div>
  );
}

export default Portfolio;
