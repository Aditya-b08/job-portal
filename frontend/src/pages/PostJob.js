import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './PostJob.css';

export default function PostJob() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', company: '', location: '',
    jobType: 'Full-time', experience: 'Fresher', category: 'Technology',
    skills: '', salaryMin: '', salaryMax: '', deadline: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
        salary: { min: Number(form.salaryMin), max: Number(form.salaryMax) }
      };
      await axios.post('/api/jobs', payload);
      toast.success('🎉 Job posted successfully!');
      navigate('/employer/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to post job');
    } finally { setLoading(false); }
  };

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  return (
    <div className="post-job-page page-wrapper">
      <div className="container">
        <div className="post-job-card card">
          <div className="post-job-header">
            <h2>Post a New Job 📋</h2>
            <p>Fill in the details to find the perfect candidate</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Basic Information</h3>
              <div className="grid-2">
                <div className="form-group">
                  <label>Job Title *</label>
                  <input placeholder="e.g. Senior React Developer" value={form.title}
                    onChange={e => set('title', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Company Name *</label>
                  <input placeholder="Your company name" value={form.company}
                    onChange={e => set('company', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Location *</label>
                  <input placeholder="e.g. Bangalore, Remote" value={form.location}
                    onChange={e => set('location', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Job Type</label>
                  <select value={form.jobType} onChange={e => set('jobType', e.target.value)}>
                    {['Full-time', 'Part-time', 'Remote', 'Contract', 'Internship'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Experience Required</label>
                  <select value={form.experience} onChange={e => set('experience', e.target.value)}>
                    {['Fresher', '1-2 years', '2-5 years', '5+ years'].map(e => <option key={e}>{e}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select value={form.category} onChange={e => set('category', e.target.value)}>
                    {['Technology', 'Marketing', 'Finance', 'Design', 'Sales', 'HR', 'Other'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Compensation & Skills</h3>
              <div className="grid-2">
                <div className="form-group">
                  <label>Min Salary (₹ per year)</label>
                  <input type="number" placeholder="e.g. 300000" value={form.salaryMin}
                    onChange={e => set('salaryMin', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Max Salary (₹ per year)</label>
                  <input type="number" placeholder="e.g. 600000" value={form.salaryMax}
                    onChange={e => set('salaryMax', e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label>Required Skills (comma separated)</label>
                <input placeholder="e.g. React, Node.js, MongoDB, JavaScript" value={form.skills}
                  onChange={e => set('skills', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Application Deadline</label>
                <input type="date" value={form.deadline} onChange={e => set('deadline', e.target.value)} />
              </div>
            </div>

            <div className="form-section">
              <h3>Job Description</h3>
              <div className="form-group">
                <label>Describe the role, responsibilities, and requirements *</label>
                <textarea placeholder="Write a detailed job description..." value={form.description}
                  onChange={e => set('description', e.target.value)}
                  required rows={8} />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                {loading ? 'Posting...' : '🚀 Post Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
