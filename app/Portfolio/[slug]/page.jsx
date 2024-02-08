"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPostsPortfolio } from "../../../DB/contentfulPortfolio";

function Slug({ params }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchContentfulEntry = async () => {
      try {
        const posts = await getPostsPortfolio();
        console.log(posts);

        const post = posts.items.find(
          (item) => item.fields.slug === params.slug
        );

        if (post) {
          console.log(post.fields.image.fields.file.url);
          setData(post);
        } else {
          setError(true);
          router.push("/404");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };
    fetchContentfulEntry();
  }, [params.slug, router]);

  if (error) {
    return;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section id="slug">
      <div className="slug__container">
        <h1>{data.fields.slug}</h1>
        <img src={data.fields.image.fields.file.url} alt="" />
        <p>{data.fields.description}</p>
      </div>
    </section>
  );
}

export default Slug;
