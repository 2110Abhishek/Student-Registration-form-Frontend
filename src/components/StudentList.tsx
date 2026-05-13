import { type FC } from 'react';
import type { Student } from '../types/student';
import { deleteStudentApi } from '../services/api';
import toast from 'react-hot-toast';
import { Trash2, Edit3, User, GraduationCap, Mail, Phone } from 'lucide-react';

interface StudentListProps {
  students: Student[];
  onUpdate: (student: Student) => void;
  onDelete: () => void;
  loading: boolean;
}

const StudentList: FC<StudentListProps> = ({ students, onUpdate, onDelete, loading }) => {
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudentApi(id);
        toast.success('Student deleted');
        onDelete();
      } catch (error: any) {
        toast.error('Failed to delete');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
        <p className="text-slate-400 text-lg">No students found. Register your first student!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {students.map((student) => (
        <div key={student.id} className="group bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:bg-slate-800/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-2xl shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
              <User className="text-white w-6 h-6" />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onUpdate(student)}
                className="p-2 bg-white/5 text-indigo-400 hover:bg-indigo-500 hover:text-white rounded-xl transition-all"
                title="Edit"
              >
                <Edit3 size={18} />
              </button>
              <button
                onClick={() => handleDelete(student.id!)}
                className="p-2 bg-white/5 text-rose-400 hover:bg-rose-500 hover:text-white rounded-xl transition-all"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{student.fullName}</h3>
          <p className="text-slate-400 text-sm mb-6 flex items-center gap-2">
            <GraduationCap size={16} /> {student.courseEnrolled}
          </p>

          <div className="space-y-3 pt-4 border-t border-white/5">
            <div className="flex items-center gap-3 text-slate-300 text-sm">
              <Mail size={16} className="text-indigo-500" />
              <span className="truncate">{student.email}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300 text-sm">
              <Phone size={16} className="text-indigo-500" />
              <span>{student.phoneNumber}</span>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
             <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] uppercase tracking-widest font-bold rounded-full border border-indigo-500/20">
                Active Student
             </span>
             <span className="text-slate-500 text-xs font-mono">#{student.id?.slice(-6)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentList;
