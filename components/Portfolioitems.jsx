"use client";
import { useEffect, useState } from "react";

function portfolioitems() {
  const contentful = require("contentful");
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchContentfulEntry = async () => {
      const client = contentful.createClient({
        space: "2nndgunvdm6o",
        accessToken: "cLblbMbgr3evuaNOcQWUAuKZIpLxr9dGMKNK2rvcYG4",
      });

      const posts = await client.getEntries();
      setData(posts.items[0].fields.title);
    };
    fetchContentfulEntry();
  }, []);
  console.log(data);

  return <div>{data}</div>;
}

export default portfolioitems;
