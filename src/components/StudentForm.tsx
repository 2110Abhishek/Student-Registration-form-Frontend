import { useEffect, type FC } from 'react';
import { useForm } from 'react-hook-form';
import type { Student } from '../types/student';
import { registerStudentApi, updateStudentApi } from '../services/api';
import toast from 'react-hot-toast';
import { X, UserPlus, Save } from 'lucide-react';

interface StudentFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  initialData?: Student | null;
}

const StudentForm: FC<StudentFormProps> = ({ onSuccess, onCancel, initialData }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Student>({
    defaultValues: initialData || {}
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = async (data: Student) => {
    try {
      if (initialData?.id) {
        await updateStudentApi(initialData.id, data);
        toast.success('Student updated successfully');
      } else {
        await registerStudentApi(data);
        toast.success('Student registered successfully');
      }
      onSuccess();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Action failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-white/10 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-500/20 p-2 rounded-xl">
              {initialData ? <Save className="text-indigo-400 w-6 h-6" /> : <UserPlus className="text-indigo-400 w-6 h-6" />}
            </div>
            <h2 className="text-xl font-bold text-white">{initialData ? 'Update Student' : 'Register New Student'}</h2>
          </div>
          <button onClick={onCancel} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 overflow-y-auto custom-scrollbar space-y-4">
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
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all min-h-[60px] max-h-[120px] text-sm"
                placeholder="123 Street, City, Country"
              />
              {errors.address && <p className="text-rose-400 text-[10px] mt-1 ml-1">{errors.address.message}</p>}
            </div>

            {!initialData && (
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
            )}
          </div>

          <div className="pt-4 border-t border-white/5 flex gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2.5 px-6 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all border border-white/10 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transform transition active:scale-95 disabled:opacity-50 text-sm"
            >
              {isSubmitting ? 'Saving...' : initialData ? 'Update Student' : 'Register Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
