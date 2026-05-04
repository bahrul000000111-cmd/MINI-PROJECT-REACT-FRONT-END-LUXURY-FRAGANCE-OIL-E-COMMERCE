import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/* ─── Eye Icons ──────────────────────────────────────────────── */
function EyeOpen() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function EyeOff() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

/* ─── Spinner ────────────────────────────────────────────────── */
function Spinner() {
  return (
    <svg
      className="inline-block mr-2 align-middle"
      style={{ animation: 'fragra-spin 0.8s linear infinite' }}
      width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

/* ─── Styled Input Field ─────────────────────────────────────── */
function InputField({ id, name, type, value, onChange, placeholder, error, children }) {
  return (
    <div>
      {children}
      <div style={{ position: 'relative' }}>
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required
          placeholder={placeholder}
          className="frag-input-focus"
          style={{
            width: '100%',
            padding: type === 'password' ? '12px 48px 12px 16px' : '12px 16px',
            borderRadius: 10,
            border: error ? '1.5px solid #E8B4B4' : '1.5px solid #E5E1D8',
            background: error ? '#FFF8F8' : '#FAFAF8',
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            color: '#1A1A1A',
            boxSizing: 'border-box',
            transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
          }}
        />
      </div>
      {error && (
        <p style={{
          marginTop: 5,
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          color: '#9B3B3B',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9B3B3B" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><circle cx="12" cy="16" r="0.5" fill="#9B3B3B" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export default function Register() {
  /* ── Existing logic – untouched ─────────────────────────────── */
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
    try {
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
    } catch (error) {
      if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        setErrors({ general: 'Server sedang sibuk, coba lagi nanti.' });
      } else if (!navigator.onLine) {
        setErrors({ general: 'Tidak ada koneksi internet. Periksa jaringan Anda.' });
      } else {
        setErrors({ general: 'Terjadi kesalahan tak terduga. Silakan coba lagi.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const getError = (field) => errors[field]?.[0] || '';

  /* ── UI-only state ───────────────────────────────────────────── */
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const labelStyle = {
    display: 'block',
    fontFamily: "'Inter', sans-serif",
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: '0.06em',
    color: '#3D3630',
    marginBottom: 6,
    textTransform: 'uppercase',
  };

  const eyeBtnStyle = {
    position: 'absolute',
    right: 14,
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#9E9085',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.2s ease',
  };

  return (
    <>
      {/* ── Google Fonts ── */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* ── Keyframe + Input Focus ── */}
      <style>{`
        @keyframes fragra-spin { to { transform: rotate(360deg); } }
        .frag-input-focus:focus {
          outline: none;
          border-color: #1A1A1A !important;
          box-shadow: 0 0 0 3px rgba(26,26,26,0.08);
          background: #fff !important;
        }
        .frag-select:focus {
          outline: none;
          border-color: #1A1A1A;
          box-shadow: 0 0 0 3px rgba(26,26,26,0.08);
        }
      `}</style>

      {/* ── Full-page wrapper ── */}
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '96px 16px 48px',
          background: 'linear-gradient(135deg, #1A1A1A 0%, #2C2416 50%, #1A1A1A 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative orbs */}
        <div style={{
          position: 'absolute', top: '10%', right: '8%', width: 380, height: 380,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,100,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '8%', left: '5%', width: 300, height: 300,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,100,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* ── Card ── */}
        <div style={{
          width: '100%',
          maxWidth: 460,
          background: 'rgba(255,255,255,0.97)',
          borderRadius: 20,
          padding: '44px 44px 40px',
          boxShadow: '0 40px 100px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.1)',
          position: 'relative',
        }}>

          {/* Brand mark */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              letterSpacing: '0.25em',
              color: '#B8A88A',
              textTransform: 'uppercase',
              marginBottom: 14,
            }}>
              Frägra · Minyak Wangi Premium
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, #E5E1D8)' }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9B99A' }} />
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, #E5E1D8)' }} />
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 34,
              fontWeight: 400,
              color: '#1A1A1A',
              margin: 0,
              lineHeight: 1.2,
            }}>
              Register
            </h1>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: '#8A7F72',
              marginTop: 8,
              marginBottom: 0,
            }}>
              Buat akun Frägra baru
            </p>
          </div>

          {/* General error */}
          {errors.general && (
            <div style={{
              marginBottom: 20,
              padding: '12px 16px',
              background: '#FFF5F5',
              border: '1px solid #F8C8C8',
              borderRadius: 10,
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: '#9B3B3B',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9B3B3B" strokeWidth="1.5" style={{ flexShrink: 0, marginTop: 1 }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              {errors.general}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

            {/* Nama */}
            <div>
              <label htmlFor="reg-name" style={labelStyle}>Nama</label>
              <input
                id="reg-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Nama lengkap Anda"
                className="frag-input-focus"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 10,
                  border: getError('name') ? '1.5px solid #E8B4B4' : '1.5px solid #E5E1D8',
                  background: getError('name') ? '#FFF8F8' : '#FAFAF8',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: '#1A1A1A',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                }}
              />
              {getError('name') && (
                <p style={{ marginTop: 5, fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9B3B3B', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9B3B3B" strokeWidth="2"><circle cx="12" cy="12" r="10" /></svg>
                  {getError('name')}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="reg-email" style={labelStyle}>Email</label>
              <input
                id="reg-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="nama@email.com"
                className="frag-input-focus"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 10,
                  border: getError('email') ? '1.5px solid #E8B4B4' : '1.5px solid #E5E1D8',
                  background: getError('email') ? '#FFF8F8' : '#FAFAF8',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: '#1A1A1A',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                }}
              />
              {getError('email') && (
                <p style={{ marginTop: 5, fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9B3B3B', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9B3B3B" strokeWidth="2"><circle cx="12" cy="12" r="10" /></svg>
                  {getError('email')}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="reg-password" style={labelStyle}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="reg-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Minimal 8 karakter"
                  className="frag-input-focus"
                  style={{
                    width: '100%',
                    padding: '12px 48px 12px 16px',
                    borderRadius: 10,
                    border: getError('password') ? '1.5px solid #E8B4B4' : '1.5px solid #E5E1D8',
                    background: getError('password') ? '#FFF8F8' : '#FAFAF8',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: '#1A1A1A',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                  style={eyeBtnStyle}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#1A1A1A'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9E9085'}
                >
                  {showPassword ? <EyeOff /> : <EyeOpen />}
                </button>
              </div>
              {getError('password') && (
                <p style={{ marginTop: 5, fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9B3B3B', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9B3B3B" strokeWidth="2"><circle cx="12" cy="12" r="10" /></svg>
                  {getError('password')}
                </p>
              )}
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label htmlFor="reg-password-confirm" style={labelStyle}>Konfirmasi Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="reg-password-confirm"
                  name="password_confirmation"
                  type={showConfirm ? 'text' : 'password'}
                  value={form.password_confirmation}
                  onChange={handleChange}
                  required
                  placeholder="Ulangi password Anda"
                  className="frag-input-focus"
                  style={{
                    width: '100%',
                    padding: '12px 48px 12px 16px',
                    borderRadius: 10,
                    border: '1.5px solid #E5E1D8',
                    background: '#FAFAF8',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: '#1A1A1A',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label={showConfirm ? 'Sembunyikan konfirmasi' : 'Tampilkan konfirmasi'}
                  style={eyeBtnStyle}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#1A1A1A'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9E9085'}
                >
                  {showConfirm ? <EyeOff /> : <EyeOpen />}
                </button>
              </div>
            </div>

            {/* Daftar sebagai (Role) */}
            <div>
              <label htmlFor="reg-role" style={labelStyle}>Daftar sebagai</label>
              <div style={{ position: 'relative' }}>
                <select
                  id="reg-role"
                  name="role"
                  className="frag-select"
                  style={{
                    width: '100%',
                    padding: '12px 40px 12px 16px',
                    borderRadius: 10,
                    border: '1.5px solid #E5E1D8',
                    background: '#FAFAF8',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: '#1A1A1A',
                    boxSizing: 'border-box',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    cursor: 'pointer',
                    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                  }}
                >
                  <option value="customer">Pelanggan (Customer)</option>
                  <option value="seller">Penjual (Seller)</option>
                </select>
                {/* Chevron icon */}
                <svg
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#9E9085' }}
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                marginTop: 4,
                borderRadius: 10,
                border: 'none',
                background: loading
                  ? '#555'
                  : 'linear-gradient(135deg, #1A1A1A 0%, #3A3530 100%)',
                color: '#F3F0E9',
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = 'linear-gradient(135deg, #2E2E2E 0%, #4A4540 100%)'; }}
              onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = 'linear-gradient(135deg, #1A1A1A 0%, #3A3530 100%)'; }}
            >
              {loading ? (
                <><Spinner /> Memproses...</>
              ) : (
                'Daftar'
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0 18px' }}>
            <div style={{ flex: 1, height: 1, background: '#E5E1D8' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#B8B0A4', letterSpacing: '0.1em' }}>ATAU</span>
            <div style={{ flex: 1, height: 1, background: '#E5E1D8' }} />
          </div>

          {/* Login link */}
          <p style={{
            textAlign: 'center',
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: '#8A7F72',
            margin: 0,
          }}>
            Sudah punya akun?{' '}
            <Link
              to="/login"
              style={{
                color: '#1A1A1A',
                fontWeight: 600,
                textDecoration: 'none',
                borderBottom: '1px solid #C9B99A',
                paddingBottom: 1,
                transition: 'border-color 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#4A3F35'; e.currentTarget.style.borderColor = '#4A3F35'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#1A1A1A'; e.currentTarget.style.borderColor = '#C9B99A'; }}
            >
              Login di sini
            </Link>
          </p>

          {/* Trust badge */}
          <div style={{
            marginTop: 24,
            paddingTop: 18,
            borderTop: '1px solid #F0ECE4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#B8A88A" strokeWidth="1.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#B8A88A', letterSpacing: '0.1em' }}>
              SSL 256-bit · Data Anda Aman
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
