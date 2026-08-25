'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
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
    window.scrollTo(0, 0);
    async function loadData() {
      try {
        const [postsData, categoriesData] = await Promise.all([
          getPosts(),
          getCategories()
        ]);

        const fallbackPosts = [
          {
            _id: 'mock-1',
            title: 'Building Modern Web Interfaces with Next.js & Tailwind CSS',
            slug: { current: 'mock-1' },
            publishedAt: '2026-08-20',
            excerpt: 'An in-depth exploration of performance-driven web development, dynamic layout math, and micro-interactions for modern applications.',
            categories: [{ title: 'Engineering' }]
          },
          {
            _id: 'mock-2',
            title: 'Inside @thatyvrspotter: Documenting Aviation at YVR',
            slug: { current: 'mock-2' },
            publishedAt: '2026-08-14',
            excerpt: 'How capturing commercial aviation at Vancouver International Airport grew into a passion project reaching over 150,000 views.',
            categories: [{ title: 'Aviation' }]
          },
          {
            _id: 'mock-3',
            title: 'My Journey to Computer Science at Simon Fraser University',
            slug: { current: 'mock-3' },
            publishedAt: '2026-08-01',
            excerpt: 'Reflecting on building software projects, learning systems architecture, and preparing for SFU Computer Science in Fall 2026.',
            categories: [{ title: 'Personal' }]
          }
        ];

        const fetchedPosts = postsData || [];
        const mergedPosts = fetchedPosts.length > 0 ? fetchedPosts : fallbackPosts;
        const allCategories = categoriesData && categoriesData.length > 0
          ? categoriesData
          : [{ _id: 'cat-1', title: 'Engineering' }, { _id: 'cat-2', title: 'Aviation' }, { _id: 'cat-3', title: 'Personal' }];

        setPosts(mergedPosts);
        setCategories(allCategories);
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

      {/* Articles Section */}
      <div className="page-content-sheet" style={{ width: '100%', flex: '1 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="inner-content-container" style={{ paddingTop: '16px', flex: '1 0 auto' }}>
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
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
              <button
                onClick={() => setSelectedCategory('All')}
                className={`website-pill ${selectedCategory === 'All' ? 'active' : ''}`}
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
                  >
                    {cat.title}
                  </button>
                );
              })}
            </div>

            {/* Posts Gallery Grid (2-Column Gallery Layout) */}
            <div className="projects-grid">
              {loading ? (
                <>
                  <div style={{ padding: '24px', borderRadius: '16px', backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)', height: '260px', opacity: 0.5 }} />
                  <div style={{ padding: '24px', borderRadius: '16px', backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)', height: '260px', opacity: 0.3 }} />
                </>
              ) : filteredPosts.length === 0 ? (
                <div style={{ padding: '24px 0', color: 'var(--muted)', fontSize: '0.9rem', gridColumn: '1 / -1' }}>
                  No articles published yet.
                </div>
              ) : (
                filteredPosts.map((post) => {
                  const imageUrl = post.mainImage ? urlForImage(post.mainImage)?.url() : post.previewImage;
                  const postSlug = (typeof post.slug === 'string' ? post.slug : post.slug?.current) || post._id || post.id;
                  const dateStr = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
                  const readTime = post.readTime 
                    ? (String(post.readTime).includes('min read') ? post.readTime : `${post.readTime} min read`)
                    : '3 min read';

                  return (
                    <div key={post._id || post.id} className="project-item">
                      {/* 1. Thumbnail Image ABOVE */}
                      <Link href={`/blog/${postSlug}`} className="project-thumb" style={{ display: 'block', aspectRatio: '16 / 9', borderRadius: '14px', overflow: 'hidden', position: 'relative', backgroundColor: 'var(--card-bg)' }}>
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={post.title}
                            onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                        ) : (
                          <div style={{
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(99, 102, 241, 0.15))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <span style={{ fontSize: '0.82rem', fontWeight: '500', color: 'var(--muted)' }}>
                              {post.categories?.[0]?.title || 'Article'}
                            </span>
                          </div>
                        )}
                      </Link>

                      {/* 2. Info Below Thumbnail */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', marginTop: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                          <Link
                            href={`/blog/${postSlug}`}
                            className="card-title"
                            style={{ fontSize: '1.02rem', fontWeight: '600', textDecoration: 'none', lineHeight: '1.2' }}
                          >
                            {post.title}
                          </Link>
                        </div>

                        <div className="card-date" style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '-2px', lineHeight: '1.2' }}>
                          {dateStr} • {readTime}
                        </div>
                      </div>

                      {post.excerpt && (
                        <p style={{ fontSize: '0.86rem', color: 'var(--muted)', lineHeight: '1.5', margin: '6px 0 0 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Full Width Footer Pinned to Bottom */}
      <div style={{ width: '100%', marginTop: 'auto' }}>
        <Footer />
      </div>
    </div>
  );
}
