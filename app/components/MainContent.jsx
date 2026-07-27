'use client';

import { useState, useEffect } from 'react';
import { Cloud, CloudRain, CloudSun, Sun, CloudFog, CloudLightning, CloudSnow } from 'lucide-react';
import { profileData } from '../data/profileData';

export default function MainContent() {
  const [timeString, setTimeString] = useState('');
  const [temp, setTemp] = useState('17°C');
  const [weatherCode, setWeatherCode] = useState(3);

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

  return (
    <main className="container-main" style={{ width: '100%', maxWidth: '620px' }}>
      {/* About / Hero Section */}
      <section id="about" style={{ scrollMarginTop: '100px', marginBottom: '96px', paddingTop: '48px' }}>
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

      {/* Full Width Background Section Below Hero (#FAFAFA in Light Mode) */}
      <div style={{
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        backgroundColor: 'var(--sub-bg)',
        borderTop: 'none',
        paddingTop: '16px',
        paddingBottom: '80px',
        display: 'flex',
        justifyContent: 'center',
        transition: 'background-color 0.25s ease'
      }}>
        <div style={{ width: '100%', maxWidth: '620px', boxSizing: 'border-box' }}>
          {/* Work / Projects Section (No line below Work heading) */}
          <section id="work" style={{ scrollMarginTop: '100px', marginBottom: '48px' }}>
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

          {/* Experience Section */}
          <section id="experience" style={{ scrollMarginTop: '100px', marginBottom: '48px' }}>
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
                <div key={index} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontWeight: '500', color: 'var(--text)' }}>{exp.role}</span>
                  <span style={{ fontSize: '0.84rem', fontWeight: '500', color: 'var(--muted)' }}>{exp.period}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section id="education" style={{ scrollMarginTop: '100px', marginBottom: '48px' }}>
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
          <section id="contact" style={{ scrollMarginTop: '100px', marginBottom: '48px' }}>
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

          <footer style={{ marginTop: '60px', paddingTop: '20px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.84rem', fontWeight: '500', color: 'var(--muted)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              Vancouver, BC {timeString && `• ${timeString}`} {temp && `• ${temp}`}
              <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '1px' }}>
                {renderWeatherIcon()}
              </span>
            </span>
            <span>{new Date().getFullYear()}</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
