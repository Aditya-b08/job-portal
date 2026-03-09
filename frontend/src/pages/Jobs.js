import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './Jobs.css';

const JobCard = ({ job }) => (
  <Link to={`/jobs/${job._id}`} className="job-card card">
    <div className="job-card-header">
      <div className="company-logo">{job.company?.charAt(0)}</div>
      <div>
        <h3>{job.title}</h3>
        <p className="company-name">{job.company}</p>
      </div>
      <span className={`badge badge-blue`}>{job.jobType}</span>
    </div>
    <div className="job-card-body">
      <span>📍 {job.location}</span>
      <span>💼 {job.experience}</span>
      {job.salary?.min && <span>💰 ₹{job.salary.min/1000}k - ₹{job.salary.max/1000}k</span>}
    </div>
    <div className="job-card-skills">
      {job.skills?.slice(0, 3).map(s => <span key={s} className="badge badge-gray">{s}</span>)}
    </div>
    <div className="job-card-footer">
      <span className="badge badge-green">{job.category}</span>
      <span className="posted-ago">
        {new Date(job.createdAt).toLocaleDateString()}
      </span>
    </div>
  </Link>
);

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    location: '', jobType: '',
    category: searchParams.get('category') || '',
    experience: ''
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(Object.fromEntries(Object.entries(filters).filter(([,v]) => v)));
      const { data } = await axios.get(`/api/jobs?${params}`);
      setJobs(data);
    } catch {
      setJobs([]);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchJobs(); }, []);

  return (
    <div className="jobs-page page-wrapper">
      <div className="container">
        <div className="jobs-header">
          <h2>Browse All Jobs</h2>
          <p>{jobs.length} jobs found</p>
        </div>

        {/* Search & Filters */}
        <div className="jobs-filters card">
          <input type="text" placeholder="🔍 Search jobs, companies, skills..."
            value={filters.search}
            onChange={e => setFilters({ ...filters, search: e.target.value })} />
          <input type="text" placeholder="📍 Location"
            value={filters.location}
            onChange={e => setFilters({ ...filters, location: e.target.value })} />
          <select value={filters.jobType} onChange={e => setFilters({ ...filters, jobType: e.target.value })}>
            <option value="">All Job Types</option>
            {['Full-time', 'Part-time', 'Remote', 'Contract', 'Internship'].map(t => <option key={t}>{t}</option>)}
          </select>
          <select value={filters.category} onChange={e => setFilters({ ...filters, category: e.target.value })}>
            <option value="">All Categories</option>
            {['Technology', 'Marketing', 'Finance', 'Design', 'Sales', 'HR', 'Other'].map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={filters.experience} onChange={e => setFilters({ ...filters, experience: e.target.value })}>
            <option value="">All Experience</option>
            {['Fresher', '1-2 years', '2-5 years', '5+ years'].map(e => <option key={e}>{e}</option>)}
          </select>
          <button className="btn btn-primary" onClick={fetchJobs}>Search</button>
        </div>

        {/* Job Listings */}
        {loading ? (
          <div className="loading">Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="no-jobs">
            <p>😕 No jobs found. Try different filters.</p>
          </div>
        ) : (
          <div className="jobs-grid">
            {jobs.map(job => <JobCard key={job._id} job={job} />)}
          </div>
        )}
      </div>
    </div>
  );
}
