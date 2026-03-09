import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

export default function Profile() {
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
    skills: user?.skills?.join(', ') || '',
    experience: user?.experience || '',
    education: user?.education || '',
    companyName: user?.companyName || '',
    companyDescription: user?.companyDescription || '',
    companyWebsite: user?.companyWebsite || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, skills: form.skills.split(',').map(s => s.trim()).filter(Boolean) };
      const { data } = await axios.put('/api/users/profile', payload);
      toast.success('Profile updated!');
    } catch (err) {
      toast.error('Failed to update profile');
    } finally { setLoading(false); }
  };

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="profile-page page-wrapper">
      <div className="container">
        <div className="profile-card card">
          <div className="profile-header">
            <div className="profile-avatar">{user?.name?.charAt(0)}</div>
            <div>
              <h2>{user?.name}</h2>
              <p>{user?.email}</p>
              <span className="badge badge-blue">{user?.role}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="profile-form">
            <h3>Personal Information</h3>
            <div className="grid-2">
              <div className="form-group">
                <label>Full Name</label>
                <input value={form.name} onChange={e => set('name', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input value={form.location} onChange={e => set('location', e.target.value)} placeholder="City, State" />
              </div>
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea value={form.bio} onChange={e => set('bio', e.target.value)} placeholder="Tell us about yourself..." rows={3} />
            </div>

            {user?.role === 'jobseeker' && (
              <>
                <h3>Professional Details</h3>
                <div className="form-group">
                  <label>Skills (comma separated)</label>
                  <input value={form.skills} onChange={e => set('skills', e.target.value)} placeholder="React, Node.js, MongoDB..." />
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label>Experience</label>
                    <select value={form.experience} onChange={e => set('experience', e.target.value)}>
                      <option value="">Select</option>
                      {['Fresher', '1-2 years', '2-5 years', '5+ years'].map(e => <option key={e}>{e}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Education</label>
                    <input value={form.education} onChange={e => set('education', e.target.value)} placeholder="B.Tech CSE, XYZ University" />
                  </div>
                </div>
              </>
            )}

            {user?.role === 'employer' && (
              <>
                <h3>Company Details</h3>
                <div className="grid-2">
                  <div className="form-group">
                    <label>Company Name</label>
                    <input value={form.companyName} onChange={e => set('companyName', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Company Website</label>
                    <input value={form.companyWebsite} onChange={e => set('companyWebsite', e.target.value)} placeholder="https://..." />
                  </div>
                </div>
                <div className="form-group">
                  <label>Company Description</label>
                  <textarea value={form.companyDescription} onChange={e => set('companyDescription', e.target.value)} rows={3} />
                </div>
              </>
            )}

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
