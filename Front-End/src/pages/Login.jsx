import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(form.email, form.password);

    if (result.success) {
      navigate('/users');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-frag-cream px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-frag-border p-8">
        <h1 className="text-3xl font-serif text-frag-dark text-center mb-2">Welcome Back</h1>
        <p className="text-sm text-frag-gray text-center mb-8">Sign in to access your account</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-frag-dark mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-frag-border bg-white text-frag-dark placeholder-frag-gray focus:outline-none focus:ring-2 focus:ring-frag-dark/20 focus:border-frag-dark transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-frag-dark mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-frag-border bg-white text-frag-dark placeholder-frag-gray focus:outline-none focus:ring-2 focus:ring-frag-dark/20 focus:border-frag-dark transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-frag-dark text-white font-medium rounded-lg hover:bg-frag-dark/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-frag-gray">
          Don't have an account?{' '}
          <Link to="/register" className="text-frag-dark font-medium hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

