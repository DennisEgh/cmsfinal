"use client";
import { useEffect, useState } from "react";

function portfolioitems() {
  const contentful = require("contentful");
  const [data, setData] = useState();

  useEffect(() => {
    const fetchContentfulEntry = async () => {
      const client = contentful.createClient({
        space: "2nndgunvdm6o",
        accessToken: "cLblbMbgr3evuaNOcQWUAuKZIpLxr9dGMKNK2rvcYG4",
      });

      const posts = await client.getEntries();
      console.log(posts.items[0].fields.slug)
    };
    fetchContentfulEntry();
  }, []);

  return <div>{data}</div>;
}

export default portfolioitems;
