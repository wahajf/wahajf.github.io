import { createClient } from 'next-sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
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

// Fallback Mock Posts for seamless preview when Sanity Env Variables are not yet set
const mockPosts = [
  {
    _id: 'mock-1',
    title: 'Building Flight Citizen: Aviation Tracking & Interface Design',
    slug: { current: 'building-flight-citizen' },
    publishedAt: '2026-02-10T12:00:00Z',
    readTime: '4 min read',
    excerpt: 'Insights on designing a minimal, fast aviation tracking platform and digital media publication.',
    previewImage: 'flightcitizen-preview.png',
    categories: [
      { _id: 'cat-1', title: 'Aviation', slug: { current: 'aviation' } },
      { _id: 'cat-3', title: 'Design', slug: { current: 'design' } }
    ],
    body: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'c1',
            _type: 'span',
            text: 'Flight Citizen started as a passion project to combine real-time flight tracking data with modern minimalist UI design. Most aviation trackers are cluttered with ads and legacy controls; our goal was to deliver a sleek, Apple-inspired interface focused purely on clarity and speed.'
          }
        ]
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'h2',
        children: [{ _key: 'c2', _type: 'span', text: 'Architecture & Visual Hierarchy' }]
      },
      {
        _key: 'b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'c3',
            _type: 'span',
            text: 'We prioritized high-contrast dark modes, HSL tailored accent highlights, and lightning-fast render times. By structuring components around atomic design principles, users can filter airspace data seamlessly.'
          }
        ]
      }
    ]
  },
  {
    _id: 'mock-2',
    title: 'Lessons from Growing @thatyvrspotter to 150K+ Views',
    slug: { current: 'growing-thatyvrspotter' },
    publishedAt: '2026-01-20T12:00:00Z',
    readTime: '5 min read',
    excerpt: 'How documenting commercial planespotting at YVR taught me visual storytelling, media creation, and analytics.',
    previewImage: 'yvrspotter-preview.png',
    categories: [
      { _id: 'cat-1', title: 'Aviation', slug: { current: 'aviation' } },
      { _id: 'cat-2', title: 'Content Creation', slug: { current: 'content-creation' } }
    ],
    body: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'c1',
            _type: 'span',
            text: 'Planespotting at Vancouver International Airport (YVR) began as a hobby and quickly evolved into a digital media brand reaching over 150,000 views across YouTube and TikTok.'
          }
        ]
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'h2',
        children: [{ _key: 'c2', _type: 'span', text: 'Key Takeaways for Creators' }]
      },
      {
        _key: 'b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'c3',
            _type: 'span',
            text: 'Consistency in publishing, optimizing 16:9 thumbnail compositions, and listening to community feedback were key drivers in reaching aviation enthusiasts worldwide.'
          }
        ]
      }
    ]
  },
  {
    _id: 'mock-3',
    title: 'Mastering Modern Web Architecture with Next.js & React',
    slug: { current: 'modern-web-architecture-nextjs' },
    publishedAt: '2026-01-05T12:00:00Z',
    readTime: '6 min read',
    excerpt: 'Exploring component design patterns, static optimization, and glassmorphism styling in modern web apps.',
    previewImage: null,
    categories: [
      { _id: 'cat-4', title: 'Tech', slug: { current: 'tech' } },
      { _id: 'cat-3', title: 'Design', slug: { current: 'design' } }
    ],
    body: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'c1',
            _type: 'span',
            text: 'Modern web applications require a blend of performance, responsiveness, and aesthetic excellence. In this article we dive into Next.js App Router patterns and CSS design tokens.'
          }
        ]
      }
    ]
  }
];

const mockCategories = [
  { _id: 'cat-1', title: 'Aviation', slug: { current: 'aviation' }, description: 'Flight tracking, planespotting, and aviation platforms.' },
  { _id: 'cat-2', title: 'Content Creation', slug: { current: 'content-creation' }, description: 'Media creation, YouTube analytics, and audience growth.' },
  { _id: 'cat-3', title: 'Design', slug: { current: 'design' }, description: 'UI/UX design, glassmorphism, and visual systems.' },
  { _id: 'cat-4', title: 'Tech', slug: { current: 'tech' }, description: 'Software engineering, Next.js, and web development.' }
];

export async function getPosts() {
  if (!client) return mockPosts;
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
    console.warn('Sanity fetch error, using fallback posts:', e);
    return [];
  }
}

export async function getCategories() {
  if (!client) return mockCategories;
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
    console.warn('Sanity fetch error, using fallback categories:', e);
    return [];
  }
}

export async function getPostBySlug(slug) {
  if (!client) {
    return mockPosts.find((p) => p.slug.current === slug) || mockPosts[0];
  }
  try {
    const query = `*[_type == "post" && slug.current == $slug][0] {
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
    const res = await client.fetch(query, { slug });
    return res || mockPosts.find((p) => p.slug.current === slug) || mockPosts[0];
  } catch (e) {
    console.warn('Sanity fetch error, using fallback post:', e);
    return mockPosts.find((p) => p.slug.current === slug) || mockPosts[0];
  }
}
