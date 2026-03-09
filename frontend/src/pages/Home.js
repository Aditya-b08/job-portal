import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?search=${search}`);
  };

  const categories = [
    { icon: '💻', name: 'Technology', count: '2.3k jobs' },
    { icon: '📊', name: 'Finance', count: '1.1k jobs' },
    { icon: '🎨', name: 'Design', count: '890 jobs' },
    { icon: '📣', name: 'Marketing', count: '1.5k jobs' },
    { icon: '🤝', name: 'Sales', count: '980 jobs' },
    { icon: '👥', name: 'HR', count: '560 jobs' },
  ];

  const stats = [
    { value: '10,000+', label: 'Jobs Posted' },
    { value: '5,000+', label: 'Companies' },
    { value: '50,000+', label: 'Job Seekers' },
    { value: '8,000+', label: 'Hired' },
  ];

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <span className="hero-badge">🚀 #1 Job Portal in India</span>
            <h1>Find Your <span className="highlight">Dream Job</span><br />Today</h1>
            <p>Connect with top companies and unlock your career potential. Thousands of jobs waiting for you.</p>
            <form className="search-bar" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search job title, skills, or company..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-lg">Search Jobs</button>
            </form>
            <div className="hero-tags">
              <span>Popular:</span>
              {['React Developer', 'Node.js', 'Full Stack', 'Data Analyst'].map(tag => (
                <Link key={tag} to={`/jobs?search=${tag}`} className="tag">{tag}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map(s => (
              <div key={s.label} className="stat-card">
                <h3>{s.value}</h3>
                <p>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Browse by Category</h2>
          <p className="section-sub">Explore jobs across all major industries</p>
          <div className="categories-grid">
            {categories.map(cat => (
              <Link key={cat.name} to={`/jobs?category=${cat.name}`} className="category-card">
                <span className="cat-icon">{cat.icon}</span>
                <h4>{cat.name}</h4>
                <p>{cat.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-grid">
            <div className="cta-card cta-seeker">
              <h3>Looking for a job?</h3>
              <p>Create your profile and apply to thousands of jobs in minutes</p>
              <Link to="/register" className="btn btn-primary btn-lg">Get Started Free</Link>
            </div>
            <div className="cta-card cta-employer">
              <h3>Hiring talent?</h3>
              <p>Post your job and reach thousands of qualified candidates</p>
              <Link to="/register" className="btn btn-primary btn-lg">Post a Job</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
