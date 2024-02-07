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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
            
         {data.items.map((item, index) => (
             
             <Link href={`/${item.fields.portfolio}`} key={index}>
        
              <div className="portfolio__item--card" >
                <h1>{item.fields.portfolio}</h1>

                
              </div>
            </Link>

                 
           
          ))}
      
   
    </div>
  );
}

export default Navbar;
