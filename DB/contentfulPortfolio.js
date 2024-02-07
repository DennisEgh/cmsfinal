const contentful = require("contentful");

const client = contentful.createClient({
  space: "2nndgunvdm6o",
  accessToken: "cLblbMbgr3evuaNOcQWUAuKZIpLxr9dGMKNK2rvcYG4",
});

async function fetchPosts() {
  try {
    const entries = await client.getEntries({
      content_type: "portfolioItems"
    });
    return entries;
  } catch (error) {
    console.error("Error fetching entries:", error);
    return []; 
  }
}

export async function getPostsPortfolio() {
  const posts = await fetchPosts();
  return posts;
}
