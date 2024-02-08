"use client";
import { useEffect, useState } from "react";
import { getPostsAboutMe } from "../../DB/contenfulAboutme";

function AboutMe() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPostsAboutMe();
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
    <section id="aboutme">
      <div className="about__me--container">
        <div className="about__me--items">
          <div className="about__me--item">
            <h1>{data.items[0].fields.title}</h1>
            <p>{data.items[0].fields.description}</p>
          </div>
          <div className="about__me--item">
            <h1>{data.items[1].fields.title}</h1>
            <p>{data.items[1].fields.description}</p>
          </div>
          <div className="about__me--item">
            <h1>{data.items[2].fields.title}</h1>
            <p>{data.items[2].fields.description}</p>
            <img className="about__me--img" loading="lazy" src={data.items[0].fields.image.fields.file.url} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
