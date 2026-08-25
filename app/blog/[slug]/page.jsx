import { getPosts, getPostBySlug } from '../../../sanity/lib/client';
import BlogPostClient from './BlogPostClient';

export async function generateStaticParams() {
  const posts = await getPosts();
  return (posts || []).map((post) => ({
    slug: post.slug?.current || post.id
  }));
}

const MOCK_POSTS = {
  'mock-1': {
    _id: 'mock-1',
    title: 'Building Modern Web Interfaces with Next.js & Tailwind CSS',
    publishedAt: '2026-08-20',
    readTime: '4 min read',
    excerpt: 'An in-depth exploration of performance-driven web development, dynamic layout math, and micro-interactions for modern applications.',
    categories: [{ title: 'Engineering' }],
    body: [
      { _type: 'block', children: [{ text: 'Building user interfaces that feel alive requires careful attention to layout math, CSS transitions, and hardware-accelerated animations.' }] },
      { _type: 'block', children: [{ text: 'In modern web applications built with Next.js and React, performance and visual aesthetics go hand in hand. By focusing on GPU-composited keyframes and clean route prefetching, web apps can achieve native 60fps fluidity.' }] }
    ]
  },
  'mock-2': {
    _id: 'mock-2',
    title: 'Inside @thatyvrspotter: Documenting Aviation at YVR',
    publishedAt: '2026-08-14',
    readTime: '5 min read',
    excerpt: 'How capturing commercial aviation at Vancouver International Airport grew into a passion project reaching over 150,000 views.',
    categories: [{ title: 'Aviation' }],
    body: [
      { _type: 'block', children: [{ text: 'Planespotting at YVR (Vancouver International Airport) provides a unique window into world aviation, tracking international heavy airliners and regional operations across the West Coast.' }] },
      { _type: 'block', children: [{ text: 'From Boeing 777s on final approach to sunset arrivals over Runway 08L, @thatyvrspotter has grown into a community of aviation enthusiasts sharing high-definition flight media.' }] }
    ]
  },
  'mock-3': {
    _id: 'mock-3',
    title: 'My Journey to Computer Science at Simon Fraser University',
    publishedAt: '2026-08-01',
    readTime: '3 min read',
    excerpt: 'Reflecting on building software projects, learning systems architecture, and preparing for SFU Computer Science in Fall 2026.',
    categories: [{ title: 'Personal' }],
    body: [
      { _type: 'block', children: [{ text: 'As an incoming Computer Science freshman at Simon Fraser University, building real-world projects—from full-stack web applications to media platforms—has been an incredible learning foundation.' }] }
    ]
  }
};

export default async function BlogPostPage({ params }) {
  const slug = params?.slug;
  let post = null;

  try {
    post = await getPostBySlug(slug);
  } catch (err) {
    console.error('Failed to fetch post by slug:', err);
  }

  // Check mock posts fallback
  if (!post && MOCK_POSTS[slug]) {
    post = MOCK_POSTS[slug];
  }

  // Fallback for youtube or any un-matched slug so the page never returns 404
  if (!post) {
    post = {
      _id: slug || 'youtube',
      title: slug === 'youtube' ? 'thatyvrspotter: my gallery of planespotting' : 'Article Preview',
      publishedAt: '2026-08-12',
      readTime: '3 min read',
      excerpt: 'Aviation media channel documenting commercial planespotting & flight operations at YVR.',
      categories: [{ title: 'Aviation' }],
      body: [
        { _type: 'block', children: [{ text: 'Documenting commercial planespotting at Vancouver International Airport (YVR).' }] },
        { _type: 'block', children: [{ text: 'Capturing flight arrivals, departures, sunset heavy operations, and runway 08L spotter perspectives.' }] }
      ]
    };
  }

  return <BlogPostClient initialPost={post} />;
}
