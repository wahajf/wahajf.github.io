'use client';

import PillNavbar from '../components/PillNavbar';
import Footer from '../components/Footer';
import { profileData } from '../data/profileData';

export default function AboutPage() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <PillNavbar />

      <main style={{ width: '100%' }}>
        {/* About Page Hero Section: Excerpt on Left, Picture Placeholder on Right */}
        <section className="page-hero-stage inner-content-container" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 200px',
          gap: '32px',
          alignItems: 'center',
          marginTop: '40px',
          marginBottom: '64px',
          paddingBottom: '40px',
          borderBottom: '1px solid var(--border)'
        }}>
          <div>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: 'var(--text)', margin: 0 }}>
              Hi, I'm Wahaj Farooq — a Software Engineer and incoming Computer Science freshman at <a href="https://www.sfu.ca" target="_blank" rel="noreferrer" className="hero-link">Simon Fraser University</a>. I specialize in building web applications, modern interfaces, and media projects. On the side, I run <a href="https://youtube.com/@thatyvrspotter" target="_blank" rel="noreferrer" className="hero-link">@thatyvrspotter</a>, where I record planespotting videos at YVR.
            </p>
          </div>

          <div style={{
            width: '100%',
            aspectRatio: '1 / 1',
            borderRadius: '16px',
            overflow: 'hidden',
            backgroundColor: 'var(--card-bg)',
            border: '1px dashed var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--muted)',
            fontSize: '0.84rem',
            fontWeight: '500'
          }}>
            Photo Placeholder
          </div>
        </section>

        <div className="page-content-sheet inner-content-container" style={{ paddingBottom: '80px', width: '100%' }}>
          {/* Experience Section */}
          <section id="experience" style={{ scrollMarginTop: '100px', marginBottom: '80px' }}>
          <div style={{
            fontSize: '0.82rem',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--muted)',
            marginBottom: '16px',
            paddingBottom: '8px',
            borderBottom: '1px solid var(--border)'
          }}>
            Experience
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {profileData.experience.map((exp, index) => (
              <div key={index} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontWeight: '500', color: 'var(--text)' }}>{exp.role}</span>
                    {exp.organization && (
                      <span style={{ fontSize: '0.86rem', color: 'var(--muted)', fontWeight: '400', marginLeft: '8px' }}>
                        {exp.organization}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.84rem', fontWeight: '500', color: 'var(--muted)' }}>{exp.period}</span>
                </div>

                {exp.stats && (
                  <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
                    {exp.stats.map((stat) => (
                      <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', fontWeight: '500' }}>
                        <span style={{ color: 'var(--text)', fontWeight: '500' }}>{stat.value}</span>
                        <span style={{ color: 'var(--muted)' }}>{stat.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" style={{ scrollMarginTop: '100px', marginBottom: '80px' }}>
          <div style={{
            fontSize: '0.82rem',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--muted)',
            marginBottom: '16px',
            paddingBottom: '8px',
            borderBottom: '1px solid var(--border)'
          }}>
            Skills
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {profileData.skills.map((skill, index) => (
              <span
                key={index}
                className="skill-pill"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" style={{ scrollMarginTop: '100px', marginBottom: '80px' }}>
          <div style={{
            fontSize: '0.82rem',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--muted)',
            marginBottom: '16px',
            paddingBottom: '8px',
            borderBottom: '1px solid var(--border)'
          }}>
            Education
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {profileData.education.map((edu, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '4px 0' }}>
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
        <section id="contact" style={{ scrollMarginTop: '100px', marginBottom: '80px' }}>
          <div style={{
            fontSize: '0.82rem',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--muted)',
            marginBottom: '16px',
            paddingBottom: '8px',
            borderBottom: '1px solid var(--border)'
          }}>
            Contact
          </div>

          <p style={{ color: 'var(--muted)', fontSize: '0.92rem', fontWeight: '500' }}>
            Reach out at <a href={`mailto:${profileData.socialLinks.email}`} className="hero-link">{profileData.socialLinks.email}</a>, find me on <a href={profileData.socialLinks.github} target="_blank" rel="noreferrer" className="hero-link">GitHub</a>, or check out @thatyvrspotter on <a href={profileData.socialLinks.youtube} target="_blank" rel="noreferrer" className="hero-link">YouTube</a> &amp; <a href={profileData.socialLinks.tiktok} target="_blank" rel="noreferrer" className="hero-link">TikTok</a>.
          </p>
          </section>
        </div>
      </main>
      <div style={{ width: '100%' }}>
        <Footer />
      </div>
    </div>
  );
}
