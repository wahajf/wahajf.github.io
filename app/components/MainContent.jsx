'use client';

import { useState, useEffect, useRef } from 'react';
import { Cloud, CloudRain, CloudSun, Sun, CloudFog, CloudLightning, CloudSnow, Palette, ChevronLeft, ChevronRight } from 'lucide-react';
import { profileData } from '../data/profileData';
import Footer from './Footer';

export default function MainContent({ renderHeroOnly, renderSheetOnly }) {
  const [timeString, setTimeString] = useState('');
  const [temp, setTemp] = useState('17°C');
  const [weatherCode, setWeatherCode] = useState(3);
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -sliderRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: sliderRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const vancouverTime = new Date().toLocaleTimeString('en-US', {
        timeZone: 'America/Vancouver',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      setTimeString(vancouverTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);

    // Fetch live Vancouver temperature & weathercode
    fetch('https://api.open-meteo.com/v1/forecast?latitude=49.2827&longitude=-123.1207&current_weather=true')
      .then((res) => res.json())
      .then((data) => {
        if (data?.current_weather?.temperature !== undefined) {
          setTemp(`${Math.round(data.current_weather.temperature)}°C`);
        }
        if (data?.current_weather?.weathercode !== undefined) {
          setWeatherCode(data.current_weather.weathercode);
        }
      })
      .catch(() => {});

    return () => clearInterval(interval);
  }, []);

  const cycleAccent = () => {
    const current = document.documentElement.getAttribute('data-accent') || 'orange';
    const accents = ['orange', 'lime', 'skyblue'];
    const nextIndex = (accents.indexOf(current) + 1) % accents.length;
    const nextAccent = accents[nextIndex];
    document.documentElement.setAttribute('data-accent', nextAccent);
  };

  const renderWeatherIcon = () => {
    const code = weatherCode;
    const style = { color: 'var(--muted)', width: '13px', height: '13px', flexShrink: 0 };
    
    if (code === 0 || code === 1) return <Sun size={13} style={style} />;
    if (code === 2 || code === 3) return <CloudSun size={13} style={style} />;
    if (code >= 45 && code <= 48) return <CloudFog size={13} style={style} />;
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return <CloudRain size={13} style={style} />;
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return <CloudSnow size={13} style={style} />;
    if (code >= 95 && code <= 99) return <CloudLightning size={13} style={style} />;
    return <Cloud size={13} style={style} />;
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  const heroSection = (
    <div className="hero-stage">
      <div className="hero-stage-inner">
        <section id="about" className="hero-content">
          <p className="hero-text">
            Hi, I'm Wahaj, a Software Engineer and incoming CS freshman at <a href={profileData.sfuUrl} target="_blank" rel="noreferrer" className="hero-link">Simon Fraser University</a>. On the side I run <a href={profileData.socialLinks.youtube} target="_blank" rel="noreferrer" className="hero-link">@thatyvrspotter</a>, documenting planespotting at YVR.
          </p>
        </section>
      </div>
    </div>
  );

  if (renderHeroOnly) {
    return heroSection;
  }

  const sheetSection = (
    <div className="sliding-sheet-container">
        <div className="inner-content-container">
          {/* Work / Projects Section (No line below Work heading) */}
          <section id="work" style={{ scrollMarginTop: '100px', marginBottom: '80px' }}>
            <div style={{ marginBottom: '24px' }}>
              <span style={{
                fontSize: '0.76rem',
                fontWeight: '500',
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                backgroundColor: 'var(--pill-bg)',
                border: '1px solid var(--border)',
                padding: '4px 10px',
                borderRadius: '6px',
                display: 'inline-block'
              }}>
                Selected Projects
              </span>
            </div>

            <div className="projects-grid">
              {profileData.projects.map((proj) => {
                const primaryUrl = proj.websiteUrl || proj.githubUrl || proj.youtubeUrl || proj.tiktokUrl;
                const CardWrapper = primaryUrl ? 'a' : 'div';
                const cardProps = primaryUrl ? { href: primaryUrl, target: '_blank', rel: 'noreferrer' } : {};

                return (
                  <div
                    key={proj.id}
                    className="project-item"
                  >
                    {/* 1. Thumbnail Image ABOVE */}
                    {proj.previewImage && (
                      <a
                        href={primaryUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="project-thumb"
                        style={{ display: 'block', aspectRatio: '16 / 9', padding: '0px' }}
                      >
                        <img
                          src={proj.previewImage}
                          alt={`${proj.title} preview`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            display: 'block'
                          }}
                        />
                      </a>
                    )}

                    {/* 2. Info Below Thumbnail */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', marginTop: '8px' }}>
                      {/* Top Row: Title on Left, Light Grey Circle Icon Buttons on Right */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <a
                          href={primaryUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="card-title"
                          style={{ fontSize: '1.02rem', fontWeight: '600', textDecoration: 'none', lineHeight: '1.2' }}
                        >
                          {proj.title}
                        </a>

                        {/* Right Aligned Light Grey Circle Icon Buttons */}
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          {(() => {
                            const handleMouseMove = (e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const x = e.clientX - (rect.left + rect.width / 2);
                              const y = e.clientY - (rect.top + rect.height / 2);
                              e.currentTarget.style.setProperty('--tt-x', `${x}px`);
                              e.currentTarget.style.setProperty('--tt-y', `${y}px`);
                            };
                            const handleMouseLeave = (e) => {
                              e.currentTarget.style.setProperty('--tt-x', '0px');
                              e.currentTarget.style.setProperty('--tt-y', '0px');
                            };

                            return (
                              <>
                                {proj.websiteUrl && (
                                  <a
                                    href={proj.websiteUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Website"
                                    data-tooltip="Website ↗"
                                    className="project-social-btn"
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                  >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <circle cx="12" cy="12" r="10" />
                                      <line x1="2" y1="12" x2="22" y2="12" />
                                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                    </svg>
                                  </a>
                                )}
                                {proj.youtubeUrl && (
                                  <a
                                    href={proj.youtubeUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="YouTube"
                                    data-tooltip="YouTube ↗"
                                    className="project-social-btn"
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                  >
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                    </svg>
                                  </a>
                                )}
                                {proj.tiktokUrl && (
                                  <a
                                    href={proj.tiktokUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="TikTok"
                                    data-tooltip="TikTok ↗"
                                    className="project-social-btn"
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                  >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.89-2.89c.39 0 .76.08 1.1.22v-3.6a6.34 6.34 0 1 0 5.24 6.27V9.75a8.27 8.27 0 0 0 5.17 1.83V8.14a4.83 4.83 0 0 1-1.4-.45z"/>
                                    </svg>
                                  </a>
                                )}
                                {proj.githubUrl && (
                                  <a
                                    href={proj.githubUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="GitHub"
                                    data-tooltip="GitHub ↗"
                                    className="project-social-btn"
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                  >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                                    </svg>
                                  </a>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      </div>

                      {/* Bottom Row: Date Directly Under Title */}
                      <div className="card-date" style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '-2px', lineHeight: '1.2' }}>
                        {proj.date}
                      </div>
                    </div>

                    {proj.stats && (
                      <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                        {proj.stats.map((stat) => (
                          <div key={stat.label} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.8rem',
                            fontWeight: '500',
                            color: 'var(--muted)'
                          }}>
                            <span style={{ color: 'var(--text)', fontWeight: '500' }}>{stat.value}</span>
                            <span>{stat.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
        <div style={{ width: '100%' }}>
          <Footer />
        </div>
      </div>
  );

  if (renderSheetOnly) {
    return sheetSection;
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {heroSection}
      {sheetSection}
    </div>
  );
}
