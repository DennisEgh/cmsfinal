"use client";
import { useState, useEffect } from "react";
import { getPostsNav } from "../DB/contentfulNav";
import Link from "next/link";

function Navbar() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPostsNav();
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
    <nav>
      <div className="nav__bar--container">
        <div className="nav__bar--item">
          {data.items.map((item, index) => (
            <Link
              href={`/${item.fields.portfolio}`}
              key={index}
              className="nav__bar--link"
            >
              {item.fields.portfolio}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
