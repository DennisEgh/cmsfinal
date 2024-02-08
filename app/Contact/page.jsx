"use client";

import { useEffect, useState } from "react";
import { getPostsContact } from "../../DB/contenfulContact";
export default function Contact() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPostsContact();
        setData(posts);
        console.log(posts);
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
    <section id="contact">
        <h1>Get in touch with me!</h1>
        <div className="contact__container" >
      {data.items.slice(1, 3).map((item, index) => (
          <div className="contact__items" key={index}>
            <h1>{item.fields.label}</h1>
            <p>{item.fields.method}</p>
          </div>
      ))}
      </div>
      <div className="contact__items">
        <h1>{data.items[0].fields.label}</h1>
        <img className="contact__img" loading="lazy" src={data.items[0].fields.social.fields.file.url} alt="" />

      </div>
    </section>
  );
}
