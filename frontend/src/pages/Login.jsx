import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex min-h-full">
      {/* Left side content */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-full">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Sign in</h2>
            <p className="text-sm text-clerk-muted mb-8">
              Welcome back! Please enter your details.
            </p>
          </div>

          <div className="mt-8">
            {error && (
              <div className="mb-6 p-4 rounded bg-red-900/40 border border-red-500/50 text-red-200 text-sm">
                <span className="font-semibold text-red-400">Error:</span> {error}
              </div>
            )}

            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-clerk-text mb-2">Email address</label>
                  <div className="mt-1">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#1f1f22] border border-clerk-border rounded-lg text-white placeholder-clerk-muted focus:outline-none focus:ring-2 focus:ring-clerk-primary focus:border-transparent transition-all duration-200"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-clerk-text">Password</label>
                    <a href="#" className="font-medium text-sm text-clerk-muted hover:text-white transition-colors">
                      Forgot password?
                    </a>
                  </div>
                  <div className="mt-1">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#1f1f22] border border-clerk-border rounded-lg text-white placeholder-clerk-muted focus:outline-none focus:ring-2 focus:ring-clerk-primary focus:border-transparent transition-all duration-200"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-4 bg-white text-black font-semibold py-2.5 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex justify-center items-center gap-2 relative"
                  >
                    {isLoading ? 'Signing in...' : 'Sign in to account'}
                  </button>
                </div>
              </form>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-clerk-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-clerk-dark px-2 text-clerk-muted">New to PrimeTrade?</span>
                  </div>
                </div>

                <div className="mt-6 flex gap-4">
                  <Link
                    to="/register"
                    className="w-full bg-transparent border border-clerk-border text-white font-medium py-2.5 rounded-lg hover:bg-[#1f1f22] transition-colors duration-200 text-center block"
                  >
                    Create an account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side background visual - Only visible on LG screens and up */}
      <div className="hidden lg:block relative w-0 flex-1 border-l border-clerk-border bg-grid-pattern">
        <div className="absolute inset-0 bg-gradient-to-br from-clerk-dark/90 via-clerk-dark/50 to-transparent"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Decorative central glowing element */}
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full w-96 h-96"></div>
            <img src="/database_illustration.png" alt="Database server" className="relative z-10 w-80 h-auto object-cover rounded-2xl shadow-[0_0_50px_rgba(59,130,246,0.3)] border border-[var(--color-clerk-border)]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
