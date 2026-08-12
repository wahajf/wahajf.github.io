import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'y5ygdyls';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.log('SANITY_API_TOKEN is missing. Please add SANITY_API_TOKEN to .env.local with Editor permissions.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-02-01',
  token,
  useCdn: false
});

async function deleteAllPosts() {
  try {
    const posts = await client.fetch('*[_type == "post"]');
    console.log(`Found ${posts.length} posts to delete.`);
    
    for (const post of posts) {
      console.log(`Deleting post: ${post.title} (${post._id})`);
      await client.delete(post._id);
      await client.delete(`drafts.${post._id}`).catch(() => {});
    }
    console.log('All posts deleted successfully!');
  } catch (err) {
    console.error('Error deleting posts:', err);
  }
}

deleteAllPosts();
