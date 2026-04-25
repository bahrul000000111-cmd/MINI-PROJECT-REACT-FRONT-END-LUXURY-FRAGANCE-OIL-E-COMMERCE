import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get(`/users?page=${page}`);
      setUsers(response.data.data.data);
      setPagination(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination?.last_page) {
      fetchUsers(page);
    }
  };

  if (loading && users.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-frag-cream">
        <div className="text-frag-gray animate-pulse">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-frag-cream px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-frag-dark mb-2">User Directory</h1>
          <p className="text-sm text-frag-gray">
            Browse and discover registered members
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-2xl border border-frag-border shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-frag-cream/50 border-b border-frag-border">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-frag-gray uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-frag-gray uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-frag-gray uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-frag-gray uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-frag-gray uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-frag-border">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-frag-cream/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-frag-dark">#{user.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-frag-dark">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-frag-gray">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-frag-gray">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/users/${user.id}`}
                      className="inline-flex items-center text-sm font-medium text-frag-dark hover:underline"
                    >
                      View
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-2xl border border-frag-border p-5 shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-base font-medium text-frag-dark">{user.name}</h3>
                  <p className="text-sm text-frag-gray">{user.email}</p>
                </div>
                <span className="text-xs text-frag-gray bg-frag-cream px-2 py-1 rounded-full">
                  #{user.id}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-frag-gray">
                  Joined {new Date(user.created_at).toLocaleDateString()}
                </span>
                <Link
                  to={`/users/${user.id}`}
                  className="text-sm font-medium text-frag-dark hover:underline inline-flex items-center"
                >
                  View Profile
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pagination && pagination.last_page > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(pagination.current_page - 1)}
              disabled={pagination.current_page === 1}
              className="px-4 py-2 text-sm font-medium text-frag-dark bg-white border border-frag-border rounded-lg hover:bg-frag-cream disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 text-sm font-medium rounded-lg border transition-colors ${
                  page === pagination.current_page
                    ? 'bg-frag-dark text-white border-frag-dark'
                    : 'bg-white text-frag-dark border-frag-border hover:bg-frag-cream'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(pagination.current_page + 1)}
              disabled={pagination.current_page === pagination.last_page}
              className="px-4 py-2 text-sm font-medium text-frag-dark bg-white border border-frag-border rounded-lg hover:bg-frag-cream disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {pagination && (
          <p className="mt-4 text-center text-xs text-frag-gray">
            Showing {pagination.from} to {pagination.to} of {pagination.total} users
          </p>
        )}
      </div>
    </div>
  );
}

