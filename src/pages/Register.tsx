import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { Student } from '../types/student';
import { registerStudentApi } from '../services/api';
import toast from 'react-hot-toast';
import { UserPlus, ArrowLeft } from 'lucide-react';

const Register: FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Student>();
  const navigate = useNavigate();

  const onSubmit = async (data: Student) => {
    try {
      await registerStudentApi(data);
      toast.success('Registration successful! Please login.');
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-white/10 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden p-8">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/')}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl">
              <UserPlus className="text-white w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Student Registration</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1 ml-1">Full Name</label>
              <input
                {...register('fullName', { required: 'Full name is required' })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                placeholder="John Doe"
              />
              {errors.fullName && <p className="text-rose-400 text-[10px] mt-1 ml-1">{errors.fullName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1 ml-1">Email Address</label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-rose-400 text-[10px] mt-1 ml-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Phone Number</label>
              <input
                {...register('phoneNumber', { required: 'Phone number is required' })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="+1 234 567 890"
              />
              {errors.phoneNumber && <p className="text-rose-400 text-xs mt-1">{errors.phoneNumber.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Date of Birth</label>
              <input
                type="date"
                {...register('dob', { required: 'Date of birth is required' })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              {errors.dob && <p className="text-rose-400 text-xs mt-1">{errors.dob.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Gender</label>
              <select
                {...register('gender', { required: 'Gender is required' })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
              >
                <option value="" className="bg-slate-900">Select Gender</option>
                <option value="Male" className="bg-slate-900">Male</option>
                <option value="Female" className="bg-slate-900">Female</option>
                <option value="Other" className="bg-slate-900">Other</option>
              </select>
              {errors.gender && <p className="text-rose-400 text-xs mt-1">{errors.gender.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Course Enrolled</label>
              <input
                {...register('courseEnrolled', { required: 'Course is required' })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="Computer Science"
              />
              {errors.courseEnrolled && <p className="text-rose-400 text-xs mt-1">{errors.courseEnrolled.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-400 mb-1 ml-1">Address</label>
              <textarea
                {...register('address', { required: 'Address is required' })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all min-h-[60px] max-h-[100px] text-sm"
                placeholder="123 Street, City, Country"
              />
              {errors.address && <p className="text-rose-400 text-[10px] mt-1 ml-1">{errors.address.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-400 mb-1 ml-1">Password</label>
              <input
                type="password"
                {...register('password', { required: 'Password is required', minLength: 6 })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-rose-400 text-[10px] mt-1 ml-1">{errors.password.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transform transition active:scale-[0.98] disabled:opacity-50 mt-2 text-sm"
          >
            {isSubmitting ? 'Creating Account...' : 'Register Student'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
