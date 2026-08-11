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

      {/* Hero Header Section matching Homepage layout 100% */}
      <main className="inner-content-container" style={{ width: '100%', maxWidth: '620px' }}>
        <section className="hero-section" id="blog-hero" style={{ scrollMarginTop: '100px', marginBottom: '96px', paddingTop: '48px' }}>
          <div className="hero-text">
            <p>
              Writing on software engineering, aviation media, UI/UX design, and digital content creation.
            </p>
            <p>
              On the side I run{' '}
              <a
                href="https://youtube.com/@thatyvrspotter"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--text)', textDecoration: 'underline', textUnderlineOffset: '4px', fontWeight: '500' }}
              >
                @thatyvrspotter
              </a>
              , documenting planespotting at YVR.
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
                className={`website-pill ${selectedCategory === 'All' ? 'active' : ''}`}
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
                All
              </button>
              {categories.map((cat) => {
                const isActive = selectedCategory.toLowerCase() === cat.title.toLowerCase();
                return (
                  <button
                    key={cat._id}
                    onClick={() => setSelectedCategory(cat.title)}
                    className={`website-pill ${isActive ? 'active' : ''}`}
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

          {/* Articles Cards Section with Divider Border */}
          <section className="section-block" style={{ marginBottom: '48px' }}>
            <div className="section-label with-border" style={{ fontSize: '0.82rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', paddingBottom: '8px', borderBottom: '1px solid var(--border)', marginBottom: '24px' }}>
              Articles ({filteredPosts.length})
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {loading ? (
                <div style={{ padding: '24px 0', color: 'var(--muted)', fontSize: '0.9rem' }}>Loading articles...</div>
              ) : filteredPosts.length === 0 ? (
                <div style={{ padding: '24px 0', color: 'var(--muted)', fontSize: '0.9rem' }}>
                  No articles found for category "{selectedCategory}".
                </div>
              ) : (
                filteredPosts.map((post) => {
                  const imageUrl = post.mainImage ? urlForImage(post.mainImage)?.url() : post.previewImage;
                  const postSlug = post.slug?.current || post.id;
                  const dateStr = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
                  const readTime = post.readTime || '3 min read';

                  return (
                    <Link
                      key={post._id || post.id}
                      href={`/blog/${postSlug}`}
                      className="card post-card"
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

                      <div className="card-top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                        <div>
                          <div className="card-title" style={{ fontSize: '1.02rem', fontWeight: '500', color: 'var(--text)' }}>
                            {post.title}
                          </div>
                          <div className="card-date" style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '2px' }}>
                            {dateStr} • {readTime}
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '6px' }}>
                          {post.categories?.map((cat) => (
                            <span
                              key={cat._id || cat.title}
                              className="website-pill"
                              style={{ fontSize: '0.76rem' }}
                            >
                              {cat.title}
                            </span>
                          ))}
                        </div>
                      </div>

                      {post.excerpt && (
                        <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: '1.5', margin: '0 0 14px 0' }}>
                          {post.excerpt}
                        </p>
                      )}

                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <span className="website-pill" style={{ backgroundColor: 'var(--pill-active-bg)', color: 'var(--pill-active-text)', fontWeight: '500' }}>
                          Read article ↗
                        </span>
                      </div>
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
