'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import PillNavbar from '../../components/PillNavbar';
import Footer from '../../components/Footer';
import { urlForImage } from '../../../sanity/lib/image';

const portableTextComponents = {
  block: {
    h1: ({ children }) => <h1 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text)', marginTop: '28px', marginBottom: '12px' }}>{children}</h1>,
    h2: ({ children }) => <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text)', marginTop: '24px', marginBottom: '10px' }}>{children}</h2>,
    h3: ({ children }) => <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text)', marginTop: '20px', marginBottom: '8px' }}>{children}</h3>,
    normal: ({ children }) => <p style={{ fontSize: '0.96rem', lineHeight: '1.65', color: 'var(--text)', marginBottom: '16px', fontWeight: '400' }}>{children}</p>
  },
  list: {
    bullet: ({ children }) => <ul style={{ paddingLeft: '20px', marginBottom: '16px', color: 'var(--text)' }}>{children}</ul>,
    number: ({ children }) => <ol style={{ paddingLeft: '20px', marginBottom: '16px', color: 'var(--text)' }}>{children}</ol>
  },
  listItem: {
    bullet: ({ children }) => <li style={{ fontSize: '0.94rem', lineHeight: '1.6', marginBottom: '6px' }}>{children}</li>,
    number: ({ children }) => <li style={{ fontSize: '0.94rem', lineHeight: '1.6', marginBottom: '6px' }}>{children}</li>
  }
};

export default function BlogPostClient({ initialPost }) {
  const [post] = useState(initialPost);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '120px' }}>
        <PillNavbar />
        <div style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '16px' }}>Post not found.</div>
        <Link href="/blog" style={{ color: 'var(--text)', textDecoration: 'underline' }}>
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const imageUrl = post.mainImage ? urlForImage(post.mainImage)?.url() : post.previewImage;

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <PillNavbar />

      <main className="inner-content-container" style={{ width: '100%', maxWidth: '620px', paddingTop: '0px', paddingBottom: '48px' }}>
        {/* Navigation / Back Button */}
        <div style={{ marginBottom: '24px' }}>
          <Link
            href="/blog"
            style={{
              fontSize: '0.86rem',
              fontWeight: '500',
              color: 'var(--muted)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            ← Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <header style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '1.85rem', fontWeight: '700', color: 'var(--text)', lineHeight: 1.25, marginBottom: '12px', letterSpacing: '-0.02em' }}>
            {post.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.84rem', color: 'var(--muted)', fontWeight: '500' }}>
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </time>
            )}
            {post.publishedAt && post.readTime && <span>•</span>}
            {post.readTime && <span>{post.readTime} min read</span>}
          </div>
        </header>

        {/* Featured Image */}
        {imageUrl && (
          <div style={{ borderRadius: '14px', overflow: 'hidden', marginBottom: '24px', position: 'relative', paddingBottom: '52%', height: 0 }}>
            <img
              src={imageUrl}
              alt={post.title}
              onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        {/* Article Body */}
        <article style={{ paddingBottom: '16px' }}>
          {Array.isArray(post.body) && post.body.length > 0 ? (
            <PortableText value={post.body} components={portableTextComponents} />
          ) : post.excerpt ? (
            <p style={{ fontSize: '0.96rem', lineHeight: '1.65', color: 'var(--text)' }}>
              {post.excerpt}
            </p>
          ) : null}
        </article>

        <Footer />
      </main>
    </div>
  );
}
