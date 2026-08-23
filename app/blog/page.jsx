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

      {/* Main Page Hero Section Template */}
      <main className="inner-content-container">
        <section id="about" style={{ scrollMarginTop: '100px', marginBottom: '96px', paddingTop: '48px' }}>
          <div style={{ fontSize: '1.05rem', lineHeight: 1.4, fontWeight: '500', color: 'var(--text)' }}>
            <p>
              Long-form thoughts on software engineering, web architecture, and building digital products.
            </p>
          </div>
        </section>
      </main>

      {/* Full-Width Background Section Below Hero */}
      <div className="full-width-below-hero">
        <div className="inner-content-container">
          <section id="articles" style={{ scrollMarginTop: '100px', marginBottom: '48px' }}>
            <div style={{
              fontSize: '0.82rem',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--muted)',
              marginBottom: '16px'
            }}>
              Articles
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '24px' }}>
              <button
                onClick={() => setSelectedCategory('All')}
                className={`website-pill ${selectedCategory === 'All' ? 'active' : ''}`}
                style={{ border: 'none', cursor: 'pointer', outline: 'none' }}
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
                    style={{ border: 'none', cursor: 'pointer', outline: 'none' }}
                  >
                    {cat.title}
                  </button>
                );
              })}
            </div>

            {/* Posts List */}
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
                      className="card"
                      style={{
                        display: 'block',
                        textDecoration: 'none',
                        transition: 'border-color 0.2s ease, transform 0.15s ease'
                      }}
                    >
                      {imageUrl && (
                        <div style={{ borderRadius: '10px', overflow: 'hidden', position: 'relative', paddingBottom: '48%', height: 0, marginBottom: '16px', background: 'transparent' }}>
                          <img
                            src={imageUrl}
                            alt={post.title}
                            onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }}
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                      )}

                      <div className="card-top">
                        <div>
                          <div className="card-title">{post.title}</div>
                          <div className="card-date">{dateStr} • {readTime}</div>
                        </div>

                        <div style={{ display: 'flex', gap: '6px' }}>
                          {post.categories?.map((cat) => (
                            <span key={cat._id || cat.title} className="website-pill">
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

                      <div style={{ display: 'flex', justifySelf: 'flex-end', justifyContent: 'flex-end' }}>
                        <span className="website-pill active">
                          Read article ↗
                        </span>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </section>

          <Footer />
        </div>
      </div>
    </div>
  );
}
