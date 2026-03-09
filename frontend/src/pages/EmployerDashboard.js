import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

export default function EmployerDashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios.get('/api/jobs/employer/myjobs')
      .then(r => setJobs(r.data))
      .finally(() => setLoading(false));
  }, []);

  const viewApplications = async (jobId) => {
    setSelectedJob(jobId);
    const { data } = await axios.get(`/api/applications/job/${jobId}`);
    setApplications(data);
  };

  const updateStatus = async (appId, status) => {
    await axios.put(`/api/applications/${appId}/status`, { status });
    toast.success('Status updated!');
    viewApplications(selectedJob);
  };

  const deleteJob = async (jobId) => {
    if (!window.confirm('Delete this job?')) return;
    await axios.delete(`/api/jobs/${jobId}`);
    setJobs(jobs.filter(j => j._id !== jobId));
    toast.success('Job deleted');
  };

  const stats = [
    { label: 'Jobs Posted', value: jobs.length, icon: '📋' },
    { label: 'Active Jobs', value: jobs.filter(j => j.isActive).length, icon: '✅' },
    { label: 'Total Applicants', value: jobs.reduce((a, j) => a + (j.applicants?.length || 0), 0), icon: '👥' },
  ];

  return (
    <div className="dashboard page-wrapper">
      <div className="container">
        <div className="dash-header">
          <div>
            <h2>Employer Dashboard 🏢</h2>
            <p>{user.companyName || user.name}</p>
          </div>
          <Link to="/employer/post-job" className="btn btn-primary">+ Post New Job</Link>
        </div>

        <div className="stats-row">
          {stats.map(s => (
            <div key={s.label} className="stat-box card">
              <span className="stat-icon">{s.icon}</span>
              <h3>{s.value}</h3><p>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Jobs Table */}
        <div className="card">
          <div className="table-header"><h3>Your Job Listings</h3></div>
          {loading ? <div className="loading">Loading...</div> : jobs.length === 0 ? (
            <div className="empty-state">
              <p>No jobs posted yet.</p>
              <Link to="/employer/post-job" className="btn btn-primary mt-20">Post Your First Job</Link>
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Title</th><th>Location</th><th>Type</th><th>Applicants</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {jobs.map(job => (
                    <tr key={job._id}>
                      <td><strong>{job.title}</strong></td>
                      <td>{job.location}</td>
                      <td>{job.jobType}</td>
                      <td>
                        <button className="btn btn-outline btn-sm" onClick={() => viewApplications(job._id)}>
                          View {job.applicants?.length || 0} applicants
                        </button>
                      </td>
                      <td><span className={`badge ${job.isActive ? 'badge-green' : 'badge-red'}`}>
                        {job.isActive ? 'Active' : 'Closed'}
                      </span></td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteJob(job._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Applicants Panel */}
        {selectedJob && (
          <div className="card mt-20">
            <div className="table-header">
              <h3>Applications for this job ({applications.length})</h3>
              <button className="btn btn-outline btn-sm" onClick={() => setSelectedJob(null)}>Close</button>
            </div>
            {applications.length === 0 ? (
              <div className="empty-state"><p>No applications yet.</p></div>
            ) : (
              <div className="applicants-list">
                {applications.map(app => (
                  <div key={app._id} className="applicant-card">
                    <div className="applicant-info">
                      <div className="applicant-avatar">{app.applicant?.name?.charAt(0)}</div>
                      <div>
                        <h4>{app.applicant?.name}</h4>
                        <p>{app.applicant?.email} • {app.applicant?.phone}</p>
                        <p className="skills">{app.applicant?.skills?.join(', ')}</p>
                      </div>
                    </div>
                    <div className="applicant-actions">
                      <span className={`badge ${app.status === 'hired' ? 'badge-green' : app.status === 'rejected' ? 'badge-red' : 'badge-yellow'}`}>
                        {app.status}
                      </span>
                      <select value={app.status} onChange={e => updateStatus(app._id, e.target.value)}>
                        {['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div className="cover-letter">
                      <strong>Cover Letter:</strong>
                      <p>{app.coverLetter}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
