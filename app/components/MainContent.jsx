'use client';

import { profileData } from '../data/profileData';

export default function MainContent() {
  return (
    <main className="container-main" style={{ width: '100%', maxWidth: '620px' }}>
      {/* About / Hero Section (Top area on clean white: 48px top padding) */}
      <section id="about" style={{ scrollMarginTop: '100px', marginBottom: '24px', paddingTop: '48px' }}>
        <div style={{ fontSize: '1.05rem', lineHeight: 1.4, fontWeight: '500', color: 'var(--text)' }}>
          <p style={{ marginBottom: '7px' }}>
            Hi, I'm Wahaj, a Software Engineer and incoming CS freshman at the{' '}
            <a
              href={profileData.ubcUrl}
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--text)', textDecoration: 'underline', textUnderlineOffset: '4px', fontWeight: '500' }}
            >
              University of British Columbia
            </a>
            .
          </p>
          <p>
            On the side I run{' '}
            <a
              href={profileData.socialLinks.youtube}
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

      {/* Full Width Background Section Below Hero (#FAFAFA in Light Mode: 24px top padding = 48px total space below hero) */}
      <div style={{
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        backgroundColor: 'var(--sub-bg)',
        borderTop: 'none',
        paddingTop: '24px',
        paddingBottom: '80px',
        display: 'flex',
        justifyContent: 'center',
        transition: 'background-color 0.25s ease'
      }}>
        <div style={{ width: '100%', maxWidth: '620px', boxSizing: 'border-box' }}>
          {/* Work / Projects Section */}
          <section id="work" style={{ scrollMarginTop: '100px', marginBottom: '52px' }}>
            <div style={{
              fontSize: '0.82rem',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--muted)',
              marginBottom: '16px'
            }}>
              Work
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {profileData.projects.map((proj) => (
                <div
                  key={proj.id}
                  style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    borderRadius: '16px',
                    padding: '20px',
                    transition: 'border-color 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <div style={{ fontSize: '1.02rem', fontWeight: '500', color: 'var(--text)' }}>{proj.title}</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: '500', color: 'var(--muted)', marginTop: '2px' }}>{proj.date}</div>
                    </div>

                    {/* YouTube & TikTok Pill Links */}
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <a
                        href={proj.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          fontSize: '0.78rem',
                          padding: '4px 12px',
                          borderRadius: '9999px',
                          background: 'var(--pill-bg)',
                          color: 'var(--text)',
                          textDecoration: 'none',
                          fontWeight: '500'
                        }}
                      >
                        YouTube ↗
                      </a>
                      <a
                        href={proj.tiktokUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          fontSize: '0.78rem',
                          padding: '4px 12px',
                          borderRadius: '9999px',
                          background: 'var(--pill-bg)',
                          color: 'var(--text)',
                          textDecoration: 'none',
                          fontWeight: '500'
                        }}
                      >
                        TikTok ↗
                      </a>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.88rem', fontWeight: '500', color: 'var(--muted)', lineHeight: '1.5', marginBottom: '16px' }}>
                    {proj.description}
                  </div>

                  {proj.youtubeId && (
                    <div style={{
                      borderRadius: '10px',
                      overflow: 'hidden',
                      border: '1px solid var(--border)',
                      position: 'relative',
                      paddingBottom: '56.25%',
                      height: 0,
                      background: '#000000'
                    }}>
                      <iframe
                        src={`https://www.youtube.com/embed/${proj.youtubeId}`}
                        title={proj.title}
                        allowFullScreen
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                      ></iframe>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Experience & Education Section */}
          <section id="experience" style={{ scrollMarginTop: '100px', marginBottom: '52px' }}>
            <div style={{
              fontSize: '0.82rem',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--muted)',
              marginBottom: '16px'
            }}>
              Experience
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
              {profileData.experience.map((exp, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontWeight: '500', color: 'var(--text)' }}>{exp.role}</span>
                  <span style={{ fontSize: '0.84rem', fontWeight: '500', color: 'var(--muted)' }}>{exp.period}</span>
                </div>
              ))}
            </div>

            {/* Education Subsection */}
            <div style={{
              fontSize: '0.82rem',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--muted)',
              marginBottom: '16px'
            }}>
              Education
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {profileData.education.map((edu, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ fontWeight: '500', color: 'var(--text)' }}>{edu.institution}</div>
                    <div style={{ fontSize: '0.84rem', fontWeight: '500', color: 'var(--muted)', marginTop: '2px' }}>{edu.degree}</div>
                  </div>
                  <span style={{ fontSize: '0.84rem', fontWeight: '500', color: 'var(--muted)' }}>{edu.period}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" style={{ scrollMarginTop: '100px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
            <div style={{
              fontSize: '0.82rem',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--muted)',
              marginBottom: '12px'
            }}>
              Contact
            </div>

            <p style={{ color: 'var(--muted)', fontSize: '0.92rem', fontWeight: '500' }}>
              Reach out at{' '}
              <a href={`mailto:${profileData.socialLinks.email}`} style={{ color: 'var(--text)', textDecoration: 'underline', textUnderlineOffset: '3px', fontWeight: '500' }}>
                {profileData.socialLinks.email}
              </a>
              , find me on{' '}
              <a href={profileData.socialLinks.github} target="_blank" rel="noreferrer" style={{ color: 'var(--text)', textDecoration: 'underline', textUnderlineOffset: '3px', fontWeight: '500' }}>
                GitHub
              </a>
              , or check out @thatyvrspotter on{' '}
              <a href={profileData.socialLinks.youtube} target="_blank" rel="noreferrer" style={{ color: 'var(--text)', textDecoration: 'underline', textUnderlineOffset: '3px', fontWeight: '500' }}>
                YouTube
              </a>{' '}
              &{' '}
              <a href={profileData.socialLinks.tiktok} target="_blank" rel="noreferrer" style={{ color: 'var(--text)', textDecoration: 'underline', textUnderlineOffset: '3px', fontWeight: '500' }}>
                TikTok
              </a>
              .
            </p>
          </section>

          <footer style={{ marginTop: '60px', paddingTop: '20px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', fontWeight: '500', color: 'var(--muted)' }}>
            <span>{profileData.location}</span>
            <span>{new Date().getFullYear()}</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
