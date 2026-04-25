import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.get(`/users/${id}`);
        setUser(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-frag-cream">
        <div className="text-frag-gray animate-pulse">Loading user details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-frag-cream px-4">
        <div className="text-center">
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 inline-block">
            {error}
          </div>
          <div>
            <Link
              to="/users"
              className="inline-flex items-center text-sm font-medium text-frag-dark hover:underline"
            >
              <svg className="mr-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Back to Users
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-frag-cream px-4 py-12 pt-24">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/users"
          className="inline-flex items-center text-sm font-medium text-frag-gray hover:text-frag-dark mb-6 transition-colors"
        >
          <svg className="mr-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Users
        </Link>

        <div className="bg-white rounded-2xl border border-frag-border shadow-sm p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-frag-dark text-white flex items-center justify-center text-xl font-serif">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-serif text-frag-dark">{user.name}</h1>
              <p className="text-sm text-frag-gray">Member ID: #{user.id}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 bg-frag-cream/50 rounded-xl border border-frag-border">
                <p className="text-xs font-semibold text-frag-gray uppercase tracking-wider mb-1">
                  Email Address
                </p>
                <p className="text-sm text-frag-dark">{user.email}</p>
              </div>

              <div className="p-4 bg-frag-cream/50 rounded-xl border border-frag-border">
                <p className="text-xs font-semibold text-frag-gray uppercase tracking-wider mb-1">
                  Account Created
                </p>
                <p className="text-sm text-frag-dark">
                  {new Date(user.created_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              <div className="p-4 bg-frag-cream/50 rounded-xl border border-frag-border">
                <p className="text-xs font-semibold text-frag-gray uppercase tracking-wider mb-1">
                  Last Updated
                </p>
                <p className="text-sm text-frag-dark">
                  {new Date(user.updated_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              <div className="p-4 bg-frag-cream/50 rounded-xl border border-frag-border">
                <p className="text-xs font-semibold text-frag-gray uppercase tracking-wider mb-1">
                  Status
                </p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

