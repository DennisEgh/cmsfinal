"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPosts } from "@/DB/contentful";

function Slug({ params }) {
  const [postSlug, setPostSlug] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  const router = useRouter();

  useEffect(() => {
    const fetchContentfulEntry = async () => {
      try {
        setLoading(true);
        const posts = await getPosts();
        console.log(posts);

        const post = posts.items.find(
          (item) => item.fields.slug === params.slug
        );

        if (post) {
          setPostSlug(post.fields.slug);
        } else {
          router.push("/404");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };
    fetchContentfulEntry();
  }, [params.slug, router]);

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
