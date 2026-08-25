import { createClient } from 'next-sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'y5ygdyls';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-01';

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true
    })
  : null;

export async function getPosts() {
  if (!client) return [];
  try {
    const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      readTime,
      excerpt,
      mainImage,
      categories[]->{ _id, title, slug }
    }`;
    const res = await client.fetch(query);
    return res || [];
  } catch (e) {
    console.warn('Sanity fetch error:', e);
    return [];
  }
}

export async function getCategories() {
  if (!client) return [];
  try {
    const query = `*[_type == "category"] | order(title asc) {
      _id,
      title,
      slug,
      description
    }`;
    const res = await client.fetch(query);
    return res || [];
  } catch (e) {
    console.warn('Sanity fetch error:', e);
    return [];
  }
}

export async function getPostBySlug(slug) {
  if (!client) return null;
  try {
    const query = `*[_type == "post" && (slug.current == $slug || _id == $slug)][0] {
      _id,
      title,
      slug,
      publishedAt,
      readTime,
      excerpt,
      mainImage,
      body,
      categories[]->{ _id, title, slug }
    }`;
    const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), 2500));
    const res = await Promise.race([client.fetch(query, { slug }), timeoutPromise]);
    return res || null;
  } catch (e) {
    console.warn('Sanity fetch error:', e);
    return null;
  }
}
