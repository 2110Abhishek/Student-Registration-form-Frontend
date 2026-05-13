import { useState, useEffect, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudentsApi } from '../services/api';
import type { Student } from '../types/student';
import StudentList from '../components/StudentList';
import StudentForm from '../components/StudentForm';
import { UserPlus, LogOut, LayoutDashboard, ShieldCheck, Users, GraduationCap, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard: FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('All');
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await getStudentsApi();
      setStudents(data);
      setFilteredStudents(data);
    } catch (error: any) {
      toast.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = students.filter(student => {
      const matchesSearch = student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           student.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterCourse === 'All' || student.courseEnrolled === filterCourse;
      return matchesSearch && matchesFilter;
    });
    setFilteredStudents(filtered);
  }, [searchTerm, filterCourse, students]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleLogout = () => {
    toast.success('Logged out');
    navigate('/');
  };

  const openRegisterForm = () => {
    setEditingStudent(null);
    setShowForm(true);
  };

  const openUpdateForm = (student: Student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <LayoutDashboard size={24} />
            </div>
            <div>
               <h1 className="text-xl font-bold tracking-tight">Student Manager</h1>
               <div className="flex items-center gap-1 text-[10px] text-indigo-400 font-bold uppercase tracking-wider">
                  <ShieldCheck size={10} /> 2-Level Encrypted
               </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={openRegisterForm}
              className="hidden sm:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-600/20"
            >
              <UserPlus size={18} />
              Register Student
            </button>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
              title="Logout"
            >
              <LogOut size={22} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Student Registry</h2>
            <p className="text-slate-400">Manage and monitor student enrollments securely</p>
          </div>
          
          <button
            onClick={openRegisterForm}
            className="sm:hidden flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-4 py-3 rounded-xl font-semibold transition-all"
          >
            <UserPlus size={18} />
            Add Student
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-2">
              <div className="bg-indigo-500/20 p-2 rounded-xl text-indigo-400">
                <Users size={20} />
              </div>
              <span className="text-slate-400 text-sm font-medium">Total Students</span>
            </div>
            <p className="text-3xl font-bold text-white">{students.length}</p>
          </div>
          <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-2">
              <div className="bg-emerald-500/20 p-2 rounded-xl text-emerald-400">
                <GraduationCap size={20} />
              </div>
              <span className="text-slate-400 text-sm font-medium">Active Courses</span>
            </div>
            <p className="text-3xl font-bold text-white">{new Set(students.map(s => s.courseEnrolled)).size}</p>
          </div>
          <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-2">
              <div className="bg-amber-500/20 p-2 rounded-xl text-amber-400">
                <ShieldCheck size={20} />
              </div>
              <span className="text-slate-400 text-sm font-medium">Encrypted Records</span>
            </div>
            <p className="text-3xl font-bold text-white">{students.length}</p>
          </div>
          <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-2">
              <div className="bg-rose-500/20 p-2 rounded-xl text-rose-400">
                <Users size={20} />
              </div>
              <span className="text-slate-400 text-sm font-medium">Last 24h</span>
            </div>
            <p className="text-3xl font-bold text-white">0</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder-slate-500"
            />
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <select
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
                className="pl-11 pr-10 py-3 bg-slate-900/50 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="All">All Courses</option>
                {Array.from(new Set(students.map(s => s.courseEnrolled))).map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <StudentList
          students={filteredStudents}
          onUpdate={openUpdateForm}
          onDelete={fetchStudents}
          loading={loading}
        />

        {/* Pagination Placeholder */}
        {!loading && filteredStudents.length > 0 && (
          <div className="mt-12 flex justify-between items-center bg-slate-900/30 p-4 rounded-2xl border border-white/5">
            <p className="text-slate-400 text-sm">Showing <span className="text-white font-medium">{filteredStudents.length}</span> of <span className="text-white font-medium">{students.length}</span> students</p>
            <div className="flex gap-2">
              <button className="p-2 bg-white/5 hover:bg-white/10 text-slate-400 rounded-xl transition-all disabled:opacity-30 cursor-not-allowed" disabled>
                <ChevronLeft size={20} />
              </button>
              <button className="p-2 bg-white/5 hover:bg-white/10 text-slate-400 rounded-xl transition-all disabled:opacity-30 cursor-not-allowed" disabled>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </main>

      {showForm && (
        <StudentForm
          onSuccess={() => {
            setShowForm(false);
            fetchStudents();
          }}
          onCancel={() => setShowForm(false)}
          initialData={editingStudent}
        />
      )}
    </div>
  );
};

export default Dashboard;
