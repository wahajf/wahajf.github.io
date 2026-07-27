import React, { useState } from 'react';
import { X, Save, RotateCcw, Plus, Trash2, Edit } from 'lucide-react';

export default function ProfileEditor({ data, setData, onClose }) {
  const [formData, setFormData] = useState(JSON.parse(JSON.stringify(data)));
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setData(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleBioChange = (index, value) => {
    const updatedBio = [...formData.personalInfo.bioParagraphs];
    updatedBio[index] = value;
    setFormData({
      ...formData,
      personalInfo: { ...formData.personalInfo, bioParagraphs: updatedBio }
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ padding: '24px', maxWidth: '650px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Live Profile Editor</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Customize your site text & projects in real-time.</p>
          </div>
          <button onClick={onClose} className="btn" style={{ padding: '6px', borderRadius: '50%' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Personal Info */}
          <div>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '10px', color: 'var(--accent-color)' }}>Personal Information</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Full Name</label>
                <input
                  type="text"
                  value={formData.personalInfo.name}
                  onChange={(e) => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, name: e.target.value } })}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-main)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Title / Roles</label>
                <input
                  type="text"
                  value={formData.personalInfo.title}
                  onChange={(e) => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, title: e.target.value } })}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-main)' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Email Address</label>
                <input
                  type="text"
                  value={formData.personalInfo.email}
                  onChange={(e) => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, email: e.target.value } })}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-main)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Status Badge</label>
                <input
                  type="text"
                  value={formData.personalInfo.statusBadge}
                  onChange={(e) => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, statusBadge: e.target.value } })}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-main)' }}
                />
              </div>
            </div>

            {/* Bio Paragraphs */}
            <div>
              <label style={{ fontSize: '0.76rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Bio Paragraphs</label>
              {formData.personalInfo.bioParagraphs.map((para, idx) => (
                <textarea
                  key={idx}
                  rows={2}
                  value={para}
                  onChange={(e) => handleBioChange(idx, e.target.value)}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-main)', marginBottom: '8px', fontSize: '0.85rem' }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Modal Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
          <button onClick={onClose} className="btn">Cancel</button>
          <button onClick={handleSave} className="btn btn-primary">
            <Save size={14} /> {savedSuccess ? 'Saved!' : 'Save & Update Site'}
          </button>
        </div>
      </div>
    </div>
  );
}
