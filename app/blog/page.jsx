'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PillNavbar from '../components/PillNavbar';
import { getPosts, getCategories } from '../../sanity/lib/client';
import { urlForImage } from '../../sanity/lib/image';

export default function BlogIndexPage() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [postsData, categoriesData] = await Promise.all([
          getPosts(),
          getCategories()
        ]);
        setPosts(postsData || []);
        setCategories(categoriesData || []);
      } catch (err) {
        console.error('Failed to load blog data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter((post) =>
        post.categories?.some((cat) => cat.title.toLowerCase() === selectedCategory.toLowerCase())
      );

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <PillNavbar />

      <main className="inner-content-container" style={{ width: '100%', maxWidth: '620px', paddingTop: '100px', paddingBottom: '96px' }}>
        {/* Header / Hero */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: '8px' }}>
            Writing & Insights
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '600', color: 'var(--text)', margin: '0 0 12px 0', letterSpacing: '-0.02em' }}>
            Blog
          </h1>
          <p style={{ fontSize: '0.96rem', color: 'var(--muted)', lineHeight: '1.5', margin: 0 }}>
            Thoughts on software engineering, aviation media, UI/UX design, and building products.
          </p>
        </section>

        {/* Category Taxonomy Filter Tabs */}
        <section style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <button
              onClick={() => setSelectedCategory('All')}
              style={{
                fontSize: '0.82rem',
                fontWeight: '500',
                padding: '6px 14px',
                borderRadius: '9999px',
                border: '1px solid var(--border)',
                backgroundColor: selectedCategory === 'All' ? 'var(--pill-active-bg)' : 'var(--card-bg)',
                color: selectedCategory === 'All' ? 'var(--pill-active-text)' : 'var(--text)',
                cursor: 'pointer',
                transition: 'all 0.18s ease'
              }}
            >
              All Posts
            </button>
            {categories.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.title.toLowerCase();
              return (
                <button
                  key={cat._id}
                  onClick={() => setSelectedCategory(cat.title)}
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: '500',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    border: '1px solid var(--border)',
                    backgroundColor: isActive ? 'var(--pill-active-bg)' : 'var(--card-bg)',
                    color: isActive ? 'var(--pill-active-text)' : 'var(--text)',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease'
                  }}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>
        </section>

        {/* Posts Listing */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {loading ? (
            <div style={{ padding: '24px 0', color: 'var(--muted)', fontSize: '0.9rem' }}>Loading posts...</div>
          ) : filteredPosts.length === 0 ? (
            <div style={{ padding: '24px 0', color: 'var(--muted)', fontSize: '0.9rem' }}>
              No posts found for category "{selectedCategory}".
            </div>
          ) : (
            filteredPosts.map((post) => {
              const imageUrl = post.mainImage ? urlForImage(post.mainImage)?.url() : post.previewImage;
              const postSlug = post.slug?.current || post.id;

              return (
                <Link
                  key={post._id || post.id}
                  href={`/blog/${postSlug}`}
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    backgroundColor: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    borderRadius: '16px',
                    padding: '20px',
                    transition: 'border-color 0.2s ease, transform 0.15s ease'
                  }}
                >
                  {imageUrl && (
                    <div style={{ borderRadius: '10px', overflow: 'hidden', position: 'relative', paddingBottom: '48%', height: 0, marginBottom: '16px', background: 'transparent' }}>
                      <img
                        src={imageUrl}
                        alt={post.title}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    {post.categories?.map((cat) => (
                      <span
                        key={cat._id || cat.title}
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: '500',
                          padding: '3px 10px',
                          borderRadius: '9999px',
                          backgroundColor: 'var(--pill-bg)',
                          color: 'var(--muted)'
                        }}
                      >
                        {cat.title}
                      </span>
                    ))}
                    <span style={{ fontSize: '0.78rem', color: 'var(--muted)', marginLeft: 'auto' }}>
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}
                      {post.readTime ? ` · ${post.readTime}` : ''}
                    </span>
                  </div>

                  <h2 style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--text)', margin: '0 0 8px 0', lineHeight: '1.3' }}>
                    {post.title}
                  </h2>

                  {post.excerpt && (
                    <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: '1.5', margin: 0 }}>
                      {post.excerpt}
                    </p>
                  )}
                </Link>
              );
            })
          )}
        </section>
      </main>
    </div>
  );
}
