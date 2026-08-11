'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PillNavbar from '../components/PillNavbar';
import Footer from '../components/Footer';
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

      {/* Hero Header Section matching Homepage layout */}
      <main className="inner-content-container" style={{ width: '100%', maxWidth: '620px' }}>
        <section className="hero-section" id="blog-hero" style={{ scrollMarginTop: '100px', marginBottom: '64px', paddingTop: '48px' }}>
          <div className="hero-text">
            <p style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text)', marginBottom: '8px' }}>
              Blog & Articles
            </p>
            <p style={{ color: 'var(--muted)', fontSize: '0.98rem' }}>
              Thoughts on software engineering, aviation media, UI/UX design, and digital content creation.
            </p>
          </div>
        </section>
      </main>

      {/* Full-Width Background Section matching Homepage */}
      <div className="full-width-below-hero">
        <div className="inner-content-container" style={{ width: '100%', maxWidth: '620px' }}>
          
          {/* Category Filter Pills Section */}
          <section className="section-block" style={{ marginBottom: '36px' }}>
            <div className="section-label" style={{ fontSize: '0.82rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: '16px' }}>
              Categories
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <button
                onClick={() => setSelectedCategory('All')}
                className="website-pill"
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
                    className="website-pill"
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

          {/* Articles Cards Section */}
          <section className="section-block" style={{ marginBottom: '48px' }}>
            <div className="section-label with-border" style={{ fontSize: '0.82rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', paddingBottom: '8px', borderBottom: '1px solid var(--border)', marginBottom: '24px' }}>
              Articles ({filteredPosts.length})
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                      className="card"
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

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                        {post.categories?.map((cat) => (
                          <span
                            key={cat._id || cat.title}
                            className="website-pill"
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

                      <div className="card-title" style={{ fontSize: '1.05rem', fontWeight: '500', color: 'var(--text)', marginBottom: '8px', lineHeight: '1.35' }}>
                        {post.title}
                      </div>

                      {post.excerpt && (
                        <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: '1.5', margin: 0 }}>
                          {post.excerpt}
                        </p>
                      )}
                    </Link>
                  );
                })
              )}
            </div>
          </section>

          {/* Unified Homepage-style Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
