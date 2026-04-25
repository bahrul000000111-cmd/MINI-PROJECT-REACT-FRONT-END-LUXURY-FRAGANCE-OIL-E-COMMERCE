import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '', general: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const result = await register(
      form.name,
      form.email,
      form.password,
      form.password_confirmation
    );

    if (result.success) {
      navigate('/users');
    } else {
      if (result.errors) {
        setErrors(result.errors);
      } else {
        setErrors({ general: result.message });
      }
    }

    setLoading(false);
  };

  const getError = (field) => errors[field]?.[0] || '';

  return (
    <div className="min-h-screen flex items-center justify-center bg-frag-cream px-4 py-12 pt-24">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-frag-border p-8">
        <h1 className="text-3xl font-serif text-frag-dark text-center mb-2">Get Started</h1>
        <p className="text-sm text-frag-gray text-center mb-8">Create your account to explore</p>

        {errors.general && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-frag-dark mb-1">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2.5 rounded-lg border bg-white text-frag-dark placeholder-frag-gray focus:outline-none focus:ring-2 focus:ring-frag-dark/20 transition-all ${
                getError('name') ? 'border-red-300 focus:border-red-500' : 'border-frag-border focus:border-frag-dark'
              }`}
              placeholder="John Doe"
            />
            {getError('name') && <p className="mt-1 text-xs text-red-600">{getError('name')}</p>}
          </div>

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
              className={`w-full px-4 py-2.5 rounded-lg border bg-white text-frag-dark placeholder-frag-gray focus:outline-none focus:ring-2 focus:ring-frag-dark/20 transition-all ${
                getError('email') ? 'border-red-300 focus:border-red-500' : 'border-frag-border focus:border-frag-dark'
              }`}
              placeholder="you@example.com"
            />
            {getError('email') && <p className="mt-1 text-xs text-red-600">{getError('email')}</p>}
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
              className={`w-full px-4 py-2.5 rounded-lg border bg-white text-frag-dark placeholder-frag-gray focus:outline-none focus:ring-2 focus:ring-frag-dark/20 transition-all ${
                getError('password') ? 'border-red-300 focus:border-red-500' : 'border-frag-border focus:border-frag-dark'
              }`}
              placeholder="Minimum 6 characters"
            />
            {getError('password') && <p className="mt-1 text-xs text-red-600">{getError('password')}</p>}
          </div>

          <div>
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-frag-dark mb-1">
              Confirm Password
            </label>
            <input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              value={form.password_confirmation}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-frag-border bg-white text-frag-dark placeholder-frag-gray focus:outline-none focus:ring-2 focus:ring-frag-dark/20 focus:border-frag-dark transition-all"
              placeholder="Repeat your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-frag-dark text-white font-medium rounded-lg hover:bg-frag-dark/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-frag-gray">
          Already have an account?{' '}
          <Link to="/login" className="text-frag-dark font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

