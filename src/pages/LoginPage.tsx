// Login Page - Enhanced with luxury dark theme and best practices

import React, { useState, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { UserService } from '../services/api';
import { setAuthData } from '../utils/auth';
import type { AuthCredentials } from '../types';
import { Eye, EyeOff, Hotel, Lock, Mail, User } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<AuthCredentials>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Form validation
  const validationErrors = useMemo(() => {
    const errors: { email?: string; password?: string } = {};
    
    if (formSubmitted || credentials.email) {
      if (!credentials.email) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }
    
    if (formSubmitted || credentials.password) {
      if (!credentials.password) {
        errors.password = 'Password is required';
      } else if (credentials.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }
    }
    
    return errors;
  }, [credentials, formSubmitted]);

  const isFormValid = useMemo(() => {
    return Object.keys(validationErrors).length === 0 && credentials.email && credentials.password;
  }, [validationErrors, credentials]);

  // Enhanced form submission with better error handling
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    if (!isFormValid) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await UserService.authenticate(credentials);
      
      if (response.success && response.data) {
        // Create authentication data with token and email
        const authData = {
          ...response.data,
          email: credentials.email,
          // Generate a token if not provided (for demo purposes)
          token: `token-${response.data.id}-${Date.now()}`
        };
        
        // Store authentication data based on remember me preference
        setAuthData(authData.token, authData, rememberMe);
        
        // Navigate based on user role
        const redirectPath = response.data.role === 'admin' ? '/admin' : '/';
        navigate(redirectPath);
      } else {
        setError(response.error || 'Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('Unable to connect to the server. Please check your connection and try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  }, [credentials, isFormValid, rememberMe, navigate]);

  // Quick login for demo purposes
  const handleQuickLogin = useCallback((email: string, role: string) => {
    setCredentials({ email, password: 'demo123' });
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const demoData = {
        email,
        role,
        name: role === 'admin' ? 'Hotel Administrator' : 'Hotel Guest',
        token: 'demo-token'
      };
      
      setAuthData(demoData.token, demoData, false);
      const redirectPath = role === 'admin' ? '/admin' : '/';
      navigate(redirectPath);
    }, 1000);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo and branding */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
              <Hotel className="w-8 h-8 text-gray-900" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-neutral-400 text-sm">
            Sign in to access your hotel account
          </p>
        </div>

        <Card className="bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-500/30 rounded-lg text-red-300 text-sm" role="alert">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-3 flex-shrink-0" />
                {error}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-neutral-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className={`pl-10 ${validationErrors.email ? 'border-red-500' : 'border-neutral-600 focus:border-yellow-500'}`}
                  required
                  aria-invalid={validationErrors.email ? 'true' : 'false'}
                  aria-describedby={validationErrors.email ? 'email-error' : undefined}
                />
              </div>
              {validationErrors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">
                  {validationErrors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-neutral-400" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className={`pl-10 pr-10 ${validationErrors.password ? 'border-red-500' : 'border-neutral-600 focus:border-yellow-500'}`}
                  required
                  aria-invalid={validationErrors.password ? 'true' : 'false'}
                  aria-describedby={validationErrors.password ? 'password-error' : undefined}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-300 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {validationErrors.password && (
                <p id="password-error" className="mt-1 text-sm text-red-400" role="alert">
                  {validationErrors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-neutral-600 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-300">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link to="/forgot-password" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              size="md"
              disabled={!isFormValid || loading}
              className="font-semibold"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Demo Quick Login */}
          <div className="mt-8 pt-6 border-t border-neutral-700">
            <div className="text-center mb-4">
              <p className="text-sm text-neutral-400">Quick demo access</p>
            </div>
            <div className="space-y-3">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => handleQuickLogin('guest@example.com', 'guest')}
                disabled={loading}
                className="text-neutral-300 hover:text-white hover:bg-neutral-700 border-neutral-600"
              >
                <User className="w-4 h-4 mr-2" />
                Login as Guest
              </Button>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => handleQuickLogin('admin@hotel.com', 'admin')}
                disabled={loading}
                className="text-neutral-300 hover:text-white hover:bg-neutral-700 border-neutral-600"
              >
                <User className="w-4 h-4 mr-2" />
                Login as Admin
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link 
              to="/" 
              className="text-neutral-400 hover:text-neutral-300 text-sm transition-colors flex items-center justify-center"
            >
              <span className="mr-1">←</span> Back to Home
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default React.memo(LoginPage);
