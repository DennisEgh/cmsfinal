"use client";

import { useEffect, useState } from "react";
import { getPostsAboutMe } from "../DB/contenfulAboutme";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPostsAboutMe();
        setData(posts);
        console.log(posts)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return null;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section id="landingpage">
      <div className="landingpage__container">

      <h1>{data.items[3].fields.title}</h1>
      <p>{data.items[3].fields.description}</p>
      <img loading="lazy" src={data.items[3].fields.image.fields.file.url} alt="" />
      
      </div>
    </section>
  );
}
