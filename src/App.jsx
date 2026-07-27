import React, { useState, useEffect } from 'react';
import { initialProfileData } from './data/profileData';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AviationSpotlight from './components/AviationSpotlight';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProfileEditor from './components/ProfileEditor';

export default function App() {
  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem('wahaj_profile_data');
    return saved ? JSON.parse(saved) : initialProfileData;
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('wahaj_theme') || 'dark';
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('wahaj_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('wahaj_profile_data', JSON.stringify(profileData));
  }, [profileData]);

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar 
        theme={theme} 
        setTheme={setTheme} 
        onOpenEditor={() => setIsEditorOpen(true)} 
      />

      {/* Main Content Area */}
      <main className="main-content">
        <Hero data={profileData} />

        <div className="section-divider" />

        {/* Aviation Media Showcase (@thatyvrspotter) */}
        <AviationSpotlight projects={profileData.projects} />

        <div className="section-divider" />

        {/* Projects Showcase */}
        <Projects projects={profileData.projects} />

        <div className="section-divider" />

        {/* Work Experience */}
        <Experience experience={profileData.experience} />

        <div className="section-divider" />

        {/* Skills */}
        <Skills skills={profileData.skills} />

        <div className="section-divider" />

        {/* Contact Form */}
        <Contact email={profileData.personalInfo.email} />
      </main>

      {/* Footer */}
      <Footer name={profileData.personalInfo.name} />

      {/* Profile Live Editor Modal */}
      {isEditorOpen && (
        <ProfileEditor
          data={profileData}
          setData={setProfileData}
          onClose={() => setIsEditorOpen(false)}
        />
      )}
    </div>
  );
}
