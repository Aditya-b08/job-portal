import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const statusColors = {
  pending: 'badge-yellow', reviewed: 'badge-blue',
  shortlisted: 'badge-green', rejected: 'badge-red', hired: 'badge-purple'
};

export default function JobSeekerDashboard() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/applications/my/applications')
      .then(r => setApplications(r.data))
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: 'Total Applied', value: applications.length, icon: '📝' },
    { label: 'Shortlisted', value: applications.filter(a => a.status === 'shortlisted').length, icon: '⭐' },
    { label: 'Hired', value: applications.filter(a => a.status === 'hired').length, icon: '🎉' },
    { label: 'Pending', value: applications.filter(a => a.status === 'pending').length, icon: '⏳' },
  ];

  return (
    <div className="dashboard page-wrapper">
      <div className="container">
        <div className="dash-header">
          <div>
            <h2>Hello, {user.name} 👋</h2>
            <p>Track all your job applications here</p>
          </div>
          <Link to="/jobs" className="btn btn-primary">Browse More Jobs</Link>
        </div>

        {/* Stats */}
        <div className="stats-row">
          {stats.map(s => (
            <div key={s.label} className="stat-box card">
              <span className="stat-icon">{s.icon}</span>
              <h3>{s.value}</h3>
              <p>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Applications Table */}
        <div className="card">
          <div className="table-header">
            <h3>My Applications ({applications.length})</h3>
          </div>
          {loading ? <div className="loading">Loading...</div> : applications.length === 0 ? (
            <div className="empty-state">
              <p>😕 No applications yet.</p>
              <Link to="/jobs" className="btn btn-primary mt-20">Start Applying</Link>
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Job Title</th><th>Company</th><th>Location</th>
                    <th>Type</th><th>Applied On</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map(app => (
                    <tr key={app._id}>
                      <td><Link to={`/jobs/${app.job?._id}`}>{app.job?.title}</Link></td>
                      <td>{app.job?.company}</td>
                      <td>{app.job?.location}</td>
                      <td>{app.job?.jobType}</td>
                      <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                      <td><span className={`badge ${statusColors[app.status]}`}>{app.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
