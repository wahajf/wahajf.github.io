'use client';

import { useState, useEffect } from 'react';
import { Cloud, CloudRain, CloudSun, Sun, CloudFog, CloudLightning, CloudSnow, Palette } from 'lucide-react';

export default function Footer() {
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
    localStorage.setItem('accent', nextAccent);
    window.dispatchEvent(new Event('accentchange'));
  };

  const renderWeatherIcon = () => {
    const code = weatherCode;
    const style = { color: '#e0f2fe', width: '13px', height: '13px', flexShrink: 0 };
    
    if (code === 0 || code === 1) return <Sun size={13} style={style} />;
    if (code === 2 || code === 3) return <CloudSun size={13} style={style} />;
    if (code >= 45 && code <= 48) return <CloudFog size={13} style={style} />;
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return <CloudRain size={13} style={style} />;
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return <CloudSnow size={13} style={style} />;
    if (code >= 95 && code <= 99) return <CloudLightning size={13} style={style} />;
    return <Cloud size={13} style={style} />;
  };

  return (
    <footer className="site-footer">
      <div
        className="inner-content-container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.78rem',
          fontWeight: '500',
          paddingTop: '18px',
          paddingBottom: '18px',
          maxWidth: '1280px',
          width: '100%'
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
          Vancouver, BC {timeString && `• ${timeString}`} {temp && `• ${temp}`}
          <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '1px' }}>
            {renderWeatherIcon()}
          </span>
        </span>
        <div>
          <span>{new Date().getFullYear()} © Wahaj Farooq</span>
        </div>
      </div>
    </footer>
  );
}
