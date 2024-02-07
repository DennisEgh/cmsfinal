"use client"

import { useEffect, useState } from "react";

export default function Home() {


  const contentful = require("contentful");
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchContentfulEntry = async () => {
      const client = contentful.createClient({
        space: "2nndgunvdm6o",
        accessToken: "cLblbMbgr3evuaNOcQWUAuKZIpLxr9dGMKNK2rvcYG4",
      });

      const posts = await client.getEntries();
    
      setData(posts.items)

    };
    fetchContentfulEntry();


  }, []);
console.log(data)


  return (
    <section id="landingpage">
      <h1>h1lo</h1>
    </section>
  );
}
