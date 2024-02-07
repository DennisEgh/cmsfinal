"use client";
import { useState, useEffect } from "react";
import { getPosts } from "@/DB/contentful";
import Link from "next/link";

function Portfolio() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts();
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>HELLO</h1>
      <div className="portfolio__item--container">
        <div className="portfolio__item">
          {data.items.map((item, index) => (
            <Link href={`/Portfolio/${item.fields.slug}` } key={index} >
              <div className="portfolio__item--card"  >
                <h1>{item.fields.title}</h1>

                <img
                  loading="lazy"
                  src={item.fields.image.fields.file.url}
                  alt="leim"
                ></img>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
