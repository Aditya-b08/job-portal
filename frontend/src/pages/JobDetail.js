import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import './JobDetail.css';

export default function JobDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');

  useEffect(() => {
    axios.get(`/api/jobs/${id}`)
      .then(r => setJob(r.data))
      .catch(() => toast.error('Job not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!user) { toast.info('Please login to apply'); return navigate('/login'); }
    setApplying(true);
    try {
      await axios.post(`/api/applications/${id}`, { coverLetter });
      toast.success('🎉 Application submitted successfully!');
      setShowForm(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to apply');
    } finally { setApplying(false); }
  };

  if (loading) return <div className="loading">Loading job details...</div>;
  if (!job) return <div className="loading">Job not found.</div>;

  return (
    <div className="job-detail-page page-wrapper">
      <div className="container">
        <div className="job-detail-grid">
          {/* Main Content */}
          <div className="job-main">
            <div className="card job-header-card">
              <div className="job-title-row">
                <div className="company-logo-lg">{job.company?.charAt(0)}</div>
                <div>
                  <h1>{job.title}</h1>
                  <p className="company-name">{job.company} • {job.location}</p>
                </div>
              </div>
              <div className="job-meta">
                <span className="badge badge-blue">{job.jobType}</span>
                <span className="badge badge-green">{job.experience}</span>
                <span className="badge badge-purple">{job.category}</span>
                {job.salary?.min && (
                  <span className="badge badge-yellow">💰 ₹{job.salary.min/1000}k - ₹{job.salary.max/1000}k</span>
                )}
              </div>
              {user?.role === 'jobseeker' && (
                <button className="btn btn-primary btn-lg apply-btn" onClick={() => setShowForm(!showForm)}>
                  {showForm ? 'Cancel' : '🚀 Apply Now'}
                </button>
              )}
              {!user && (
                <button className="btn btn-primary btn-lg apply-btn" onClick={() => navigate('/login')}>
                  Login to Apply
                </button>
              )}
            </div>

            {/* Apply Form */}
            {showForm && (
              <div className="card apply-form">
                <h3>Submit Your Application</h3>
                <form onSubmit={handleApply}>
                  <div className="form-group">
                    <label>Cover Letter *</label>
                    <textarea
                      placeholder="Tell the employer why you're a great fit for this role..."
                      value={coverLetter}
                      onChange={e => setCoverLetter(e.target.value)}
                      required rows={6}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={applying}>
                    {applying ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              </div>
            )}

            <div className="card">
              <h2>Job Description</h2>
              <p className="job-description">{job.description}</p>

              {job.skills?.length > 0 && (
                <div className="job-section">
                  <h3>Required Skills</h3>
                  <div className="skills-list">
                    {job.skills.map(s => <span key={s} className="badge badge-blue">{s}</span>)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="job-sidebar">
            <div className="card sidebar-card">
              <h3>Job Overview</h3>
              <div className="overview-list">
                <div><span>📅 Posted</span><strong>{new Date(job.createdAt).toLocaleDateString()}</strong></div>
                <div><span>💼 Type</span><strong>{job.jobType}</strong></div>
                <div><span>📍 Location</span><strong>{job.location}</strong></div>
                <div><span>🎓 Experience</span><strong>{job.experience}</strong></div>
                <div><span>🏷️ Category</span><strong>{job.category}</strong></div>
                {job.deadline && <div><span>⏰ Deadline</span><strong>{new Date(job.deadline).toLocaleDateString()}</strong></div>}
              </div>
            </div>

            {job.employer && (
              <div className="card sidebar-card">
                <h3>About the Company</h3>
                <p className="company-about">{job.employer.companyDescription || 'No description provided.'}</p>
                {job.employer.companyWebsite && (
                  <a href={job.employer.companyWebsite} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                    Visit Website
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
