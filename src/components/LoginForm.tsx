import { useState, type FC } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loginStudentApi } from '../services/api';
import toast from 'react-hot-toast';
import { LogIn, Eye, EyeOff, Loader2 } from 'lucide-react';

const LoginForm: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await loginStudentApi(data);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050816] p-4 transition-colors duration-500">
      <div className="bg-slate-900/40 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-white/10 hover:border-indigo-500/50 hover:shadow-indigo-500/20 transition-all duration-500 group">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-600 p-4 rounded-2xl mb-4 shadow-xl shadow-indigo-600/40 group-hover:scale-110 transition-transform duration-500">
            <LogIn className="text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
          <p className="text-indigo-200 mt-2">Sign in to manage student records</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-indigo-200 mb-1">Email Address</label>
            <input
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
              })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="admin@example.com"
            />
            {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email.message as string}</p>}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Password</label>
            <div className="relative group/input">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', { 
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' }
                })}
                className={`w-full px-4 py-3.5 bg-white/5 border rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ${errors.password ? 'border-rose-500/50 ring-1 ring-rose-500/20 animate-shake' : 'border-white/10'}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-rose-400 text-xs mt-1.5 ml-1">{errors.password.message as string}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/30 transform transition active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Authenticating...
              </>
            ) : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-indigo-200 text-sm">
            Don't have an account? <span onClick={() => navigate('/register')} className="text-white font-semibold cursor-pointer hover:underline">Register Now</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
