import { useState, useEffect } from 'react';
import { 
  FiMessageSquare, FiUsers, FiClock, FiCalendar, FiMail, FiPhone, FiMapPin, 
  FiEye, FiTrash2, FiLogOut, FiRefreshCw, FiSearch, FiFilter, FiDownload,
  FiUser, FiSend, FiCheckCircle, FiAlertCircle
} from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

// API Base URL - change this based on environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminDashboard = ({ token, admin, onLogout }) => {
  const { isDark } = useTheme();
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    today: 0,
    thisWeek: 0
  });
  const [messages, setMessages] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalMessages: 0,
    limit: 10
  });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    await loadStats();
    await loadMessages();
  };

  const loadStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const loadMessages = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/messages?page=${page}&limit=10`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setMessages(data.messages);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/messages/${messageId}/read`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        loadDashboard();
      }
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const deleteMessage = async (messageId) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        loadDashboard();
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const StatCard = ({ icon: Icon, title, value, color, bgColor }) => (
    <div className={`rounded-2xl p-6 transition-all duration-300 hover:scale-105 ${
      isDark ? 'bg-gray-800/50 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-xl'
    } border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-xl`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>{title}</p>
          <p className={`text-3xl font-bold mt-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${bgColor}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl border-b ${
        isDark 
          ? 'bg-gray-900/90 border-gray-800' 
          : 'bg-white/90 border-gray-200'
      } shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-xl ${
                isDark ? 'bg-emerald-600' : 'bg-emerald-500'
              }`}>
                <FiUser className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Admin Dashboard
                </h1>
                <p className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Welcome back, {admin?.email || 'Admin'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={loadDashboard}
                className={`p-2 rounded-xl transition-colors ${
                  isDark
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                <FiRefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-medium transition-colors"
              >
                <FiLogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={FiMessageSquare}
            title="Total Messages"
            value={stats.total}
            color="text-blue-600"
            bgColor="bg-blue-100"
          />
          <StatCard
            icon={FiAlertCircle}
            title="Unread Messages"
            value={stats.unread}
            color="text-red-600"
            bgColor="bg-red-100"
          />
          <StatCard
            icon={FiCalendar}
            title="Today"
            value={stats.today}
            color="text-green-600"
            bgColor="bg-green-100"
          />
          <StatCard
            icon={FiClock}
            title="This Week"
            value={stats.thisWeek}
            color="text-purple-600"
            bgColor="bg-purple-100"
          />
        </div>

        {/* Messages Section */}
        <div className={`rounded-2xl shadow-2xl overflow-hidden ${
          isDark ? 'bg-gray-800/50 backdrop-blur-xl' : 'bg-white/90 backdrop-blur-xl'
        } border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          {/* Messages Header */}
          <div className={`px-6 py-4 border-b ${
            isDark ? 'border-gray-700 bg-gray-800/80' : 'border-gray-200 bg-gray-50/80'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
              <h2 className={`text-xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Messages ({pagination.totalMessages})
              </h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-10 pr-4 py-2 rounded-xl text-sm ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } border focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500`}
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`px-3 py-2 rounded-xl text-sm ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } border focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500`}
                >
                  <option value="all">All Messages</option>
                  <option value="unread">Unread Only</option>
                  <option value="read">Read Only</option>
                </select>
              </div>
            </div>
          </div>

          {/* Messages List */}
          <div className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {loading ? (
              <div className="p-12 text-center">
                <FiRefreshCw className={`w-8 h-8 animate-spin mx-auto mb-4 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Loading messages...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="p-12 text-center">
                <FiMessageSquare className={`w-12 h-12 mx-auto mb-4 ${
                  isDark ? 'text-gray-600' : 'text-gray-400'
                }`} />
                <p className={`text-lg font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>No messages found</p>
                <p className={isDark ? 'text-gray-500' : 'text-gray-500'}>
                  Messages from your contact form will appear here
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-6 transition-all duration-200 hover:bg-opacity-50 ${
                    !message.read_status
                      ? isDark
                        ? 'bg-emerald-900/20 border-l-4 border-emerald-500'
                        : 'bg-emerald-50 border-l-4 border-emerald-500'
                      : ''
                  } ${isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`p-2 rounded-lg ${
                          isDark ? 'bg-gray-700' : 'bg-gray-100'
                        }`}>
                          <FiUser className={`w-4 h-4 ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className={`text-lg font-semibold ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {message.name}
                          </h3>
                          <div className={`flex items-center space-x-4 text-sm ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            <div className="flex items-center space-x-1">
                              <FiMail className="w-4 h-4" />
                              <span>{message.email}</span>
                            </div>
                            {message.mobile && (
                              <div className="flex items-center space-x-1">
                                <FiPhone className="w-4 h-4" />
                                <span>{message.mobile}</span>
                              </div>
                            )}
                            <div className="flex items-center space-x-1">
                              <FiClock className="w-4 h-4" />
                              <span>{formatDate(message.created_at)}</span>
                            </div>
                          </div>
                        </div>
                        {!message.read_status && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            New
                          </span>
                        )}
                      </div>
                      <div className={`p-4 rounded-xl ${
                        isDark ? 'bg-gray-700/50' : 'bg-gray-50'
                      } border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                        <p className={`whitespace-pre-wrap ${
                          isDark ? 'text-gray-300' : 'text-gray-800'
                        }`}>
                          {message.message}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 ml-6">
                      {!message.read_status && (
                        <button
                          onClick={() => markAsRead(message.id)}
                          className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                        >
                          <FiCheckCircle className="w-4 h-4" />
                          <span>Mark Read</span>
                        </button>
                      )}
                      <button
                        onClick={() => deleteMessage(message.id)}
                        className="flex items-center space-x-1 text-red-600 hover:text-red-700 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className={`px-6 py-4 border-t ${
              isDark ? 'border-gray-700 bg-gray-800/80' : 'border-gray-200 bg-gray-50/80'
            }`}>
              <div className="flex justify-between items-center">
                <div className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{' '}
                  {Math.min(pagination.currentPage * pagination.limit, pagination.totalMessages)} of{' '}
                  {pagination.totalMessages} results
                </div>
                <div className="flex space-x-2">
                  {Array.from({ length: pagination.totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => loadMessages(i + 1)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        i + 1 === pagination.currentPage
                          ? 'bg-emerald-600 text-white'
                          : isDark
                          ? 'text-gray-300 hover:bg-gray-700'
                          : 'text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;