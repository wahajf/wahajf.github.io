import { getPosts, getPostBySlug } from '../../../sanity/lib/client';
import BlogPostClient from './BlogPostClient';

export async function generateStaticParams() {
  const posts = await getPosts();
  return (posts || []).map((post) => ({
    slug: post.slug?.current || post.id
  }));
}

export default async function BlogPostPage({ params }) {
  const slug = params?.slug;
  const post = await getPostBySlug(slug);

  return <BlogPostClient initialPost={post} />;
}
