"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPostsPortfolio } from "../../../DB/contentfulPortfolio";

function Slug({ params }) {
  const [postSlug, setPostSlug] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
          setPostSlug(post.fields.slug);
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
    return
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{params.slug}</h1>
    </div>
  );
}

export default Slug;
