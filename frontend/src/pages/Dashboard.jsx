import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filter, setFilter] = useState('all');

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
      setError('');
    } catch (err) {
      console.error('Fetch tasks error', err);
      // Don't show "failed to fetch" if it's just an empty user
      if (err.response?.status !== 404 && err.response?.status !== 401) {
         setError('Failed to securely fetch tasks.');
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    if (!title.trim()) {
      setError('Task title is required');
      setIsSubmitting(false);
      return;
    }

    try {
      await api.post('/tasks', { title, description });
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to sync task securely.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      await api.put(`/tasks/${task._id}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  return (
    <div className="flex-1 bg-clerk-dark text-clerk-text">
      {/* Top Header Section */}
      <div className="border-b border-clerk-border bg-[#0e0e11]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Developer Dashboard
          </h1>
          <p className="mt-3 text-lg text-clerk-muted max-w-2xl">
            Securely manage, iterate, and track your backend tasks. Authentication validated by PrimeTrade.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative Grid BG */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none -z-10"></div>
        <div className="absolute top-0 right-0 w-1/2 h-96 bg-clerk-primary/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        {error && (
          <div className="bg-red-900/40 border border-red-500/50 text-red-200 px-6 py-4 rounded-lg mb-8 flex items-center shadow-lg">
             <span className="font-semibold">{error}</span>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content Area - Task List */}
          <div className="flex-1 order-2 lg:order-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-xl font-semibold text-white">
                Task Instances
              </h2>
              
              <div className="flex bg-[#121214] border border-clerk-border p-1 rounded-lg">
                <button 
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'all' ? 'bg-[#27272a] text-white shadow-sm' : 'text-clerk-muted hover:text-white'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setFilter('pending')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'pending' ? 'bg-[#27272a] text-white shadow-sm' : 'text-clerk-muted hover:text-white'}`}
                >
                  Pending
                </button>
                <button 
                  onClick={() => setFilter('completed')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'completed' ? 'bg-[#27272a] text-white shadow-sm' : 'text-clerk-muted hover:text-white'}`}
                >
                  Completed
                </button>
              </div>
            </div>

            {filteredTasks.length === 0 ? (
              <div className="border border-dashed border-clerk-border rounded-xl p-16 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#18181b] border border-clerk-border mb-4">
                  <svg className="w-8 h-8 text-clerk-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-1">No instances found</h3>
                <p className="text-sm text-clerk-muted max-w-sm mx-auto">
                  {filter === 'all' ? "Get started by initializing a new task using the developer console." : `No instances matching the '${filter}' criteria.`}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <div key={task._id} className="bg-[var(--color-clerk-card)] border border-[var(--color-clerk-border)] p-5 rounded-2xl shadow-xl relative overflow-hidden hover:border-[#3f3f46] transition-colors group">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className={`text-lg font-semibold ${task.status === 'completed' ? 'line-through text-clerk-muted' : 'text-white'}`}>
                            {task.title}
                          </h3>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border
                            ${task.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}
                          `}>
                            {task.status}
                          </span>
                        </div>
                        
                        {task.description && (
                          <p className={`text-sm ${task.status === 'completed' ? 'text-[#52525b]' : 'text-clerk-muted'}`}>
                            {task.description}
                          </p>
                        )}
                        
                        {user?.role === 'admin' && task.userId?.email && (
                          <div className="mt-4 flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold text-[#52525b] tracking-wider">Object Anchor</span>
                            <span className="text-xs font-mono text-[#a1a1aa] bg-[#1f1f22] px-2 py-1 rounded border border-[#27272a]">{task.userId.email}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-row sm:flex-col justify-end gap-2 shrink-0">
                        <button 
                          onClick={() => handleToggleStatus(task)}
                          className="px-3 py-1.5 bg-[#1f1f22] hover:bg-[#27272a] text-white border border-[#27272a] hover:border-[#3f3f46] rounded-md text-sm font-medium transition-colors w-full text-center"
                        >
                          {task.status === 'completed' ? 'Revert Status' : 'Resolve'}
                        </button>
                        <button 
                          onClick={() => handleDeleteTask(task._id)}
                          className="px-3 py-1.5 bg-transparent hover:bg-red-500/10 text-clerk-muted hover:text-red-400 rounded-md text-sm font-medium transition-colors w-full text-center"
                        >
                          Terminate
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Server Actions Form */}
          <div className="w-full lg:w-80 shrink-0 order-1 lg:order-2">
            <div className="bg-[var(--color-clerk-card)] border border-[var(--color-clerk-border)] p-6 rounded-2xl shadow-xl relative overflow-hidden sticky top-24">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#27272a]">
                <div className="w-2h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Initialize Object</h2>
              </div>
              
              <form onSubmit={handleCreateTask} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-clerk-muted mb-1.5 uppercase tracking-wide">Identifier Name</label>
                  <input 
                    type="text"
                    className="w-full px-4 py-2.5 bg-[#1f1f22] border border-[var(--color-clerk-border)] rounded-lg text-white placeholder-[var(--color-clerk-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-clerk-primary)] focus:border-transparent transition-all duration-200"
                    placeholder="e.g. Implement Webhooks"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-clerk-muted mb-1.5 uppercase tracking-wide">Payload (Optional)</label>
                  <textarea 
                    className="w-full px-4 py-2.5 bg-[#1f1f22] border border-[var(--color-clerk-border)] rounded-lg text-white placeholder-[var(--color-clerk-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-clerk-primary)] focus:border-transparent transition-all duration-200 min-h-[100px] resize-y"
                    placeholder="Metadata parameters..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-white hover:bg-gray-200 text-black font-semibold text-sm py-2 rounded-md transition-colors mt-2"
                >
                  {isSubmitting ? 'Pushing...' : 'Deploy to Database'}
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
