import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'jobseeker', companyName: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await register(form);
      toast.success(`Account created! Welcome, ${user.name}!`);
      navigate(user.role === 'employer' ? '/employer/dashboard' : '/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-header">
          <h2>Create Account 🚀</h2>
          <p>Join thousands of job seekers and employers</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>I am a...</label>
            <div className="role-toggle">
              <button type="button"
                className={`role-btn ${form.role === 'jobseeker' ? 'active' : ''}`}
                onClick={() => setForm({ ...form, role: 'jobseeker' })}>
                👤 Job Seeker
              </button>
              <button type="button"
                className={`role-btn ${form.role === 'employer' ? 'active' : ''}`}
                onClick={() => setForm({ ...form, role: 'employer' })}>
                🏢 Employer
              </button>
            </div>
          </div>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })} required />
          </div>
          {form.role === 'employer' && (
            <div className="form-group">
              <label>Company Name</label>
              <input type="text" placeholder="TechCorp Pvt Ltd" value={form.companyName}
                onChange={e => setForm({ ...form, companyName: e.target.value })} required />
            </div>
          )}
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="you@example.com" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Min 6 characters" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })} required minLength={6} />
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
