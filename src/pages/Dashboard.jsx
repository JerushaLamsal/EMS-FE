import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockUsers } from '../data/mockUsers';
import { mockEvents } from '../data/nepalMockEvents';
import { NEPAL_PROVINCES, EVENT_CATEGORIES, CURRENCY, PAYMENT_METHODS } from '../data/nepalData';

const Dashboard = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedProvince, setSelectedProvince] = useState('all');
  
  // Use Nepal mock events data
  const events = mockEvents;
  
  // Calculate comprehensive Nepal-specific statistics
  const stats = useMemo(() => {
    // Financial metrics in NPR
    const totalRevenue = events.reduce((sum, event) => sum + (event.registeredCount * event.price), 0);
    const totalRegistrations = events.reduce((sum, event) => sum + event.registeredCount, 0);
    const totalCapacity = events.reduce((sum, event) => sum + event.capacity, 0);
    
    // User analytics
    const usersByRole = mockUsers.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});
    
    const verifiedOrganizers = mockUsers.filter(u => u.role === 'organizer' && u.verified).length;
    const unverifiedOrganizers = mockUsers.filter(u => u.role === 'organizer' && !u.verified).length;
    
    // Province-wise breakdown
    const provinceStats = NEPAL_PROVINCES.reduce((acc, province) => {
      const provinceEvents = events.filter(e => e.province === province.name);
      const provinceUsers = mockUsers.filter(u => u.province === province.name);
      
      acc[province.name] = {
        events: provinceEvents.length,
        registrations: provinceEvents.reduce((sum, e) => sum + e.registeredCount, 0),
        revenue: provinceEvents.reduce((sum, e) => sum + (e.registeredCount * e.price), 0),
        users: provinceUsers.length,
        organizers: provinceUsers.filter(u => u.role === 'organizer').length
      };
      return acc;
    }, {});
    
    // Event category performance
    const categoryStats = EVENT_CATEGORIES.reduce((acc, category) => {
      const categoryEvents = events.filter(e => e.category === category.name);
      acc[category.name] = {
        events: categoryEvents.length,
        registrations: categoryEvents.reduce((sum, e) => sum + e.registeredCount, 0),
        revenue: categoryEvents.reduce((sum, e) => sum + (e.registeredCount * e.price), 0),
        icon: category.icon
      };
      return acc;
    }, {});
    
    // Payment method distribution (Nepal-specific)
    const paymentStats = {
      'eSewa': { transactions: Math.floor(totalRegistrations * 0.65), amount: totalRevenue * 0.65, percentage: 65 },
      'Khalti': { transactions: Math.floor(totalRegistrations * 0.25), amount: totalRevenue * 0.25, percentage: 25 },
      'IME Pay': { transactions: Math.floor(totalRegistrations * 0.08), amount: totalRevenue * 0.08, percentage: 8 },
      'Bank Transfer': { transactions: Math.floor(totalRegistrations * 0.02), amount: totalRevenue * 0.02, percentage: 2 }
    };
    
    // Top performing events
    const topEvents = events
      .sort((a, b) => (b.registeredCount * b.price) - (a.registeredCount * a.price))
      .slice(0, 5);
    
    return {
      totalEvents: events.length,
      upcomingEvents: events.filter(e => e.status === 'upcoming').length,
      totalRevenue,
      totalRegistrations,
      totalCapacity,
      totalUsers: mockUsers.length,
      occupancyRate: (totalRegistrations / totalCapacity) * 100,
      avgRevenuePerEvent: totalRevenue / events.length,
      usersByRole,
      verifiedOrganizers,
      unverifiedOrganizers,
      provinceStats,
      categoryStats,
      paymentStats,
      topEvents
    };
  }, [selectedProvince]);

  const StatCard = ({ title, value, subtitle, icon, color, trend }) => (
    <div className={`bg-gradient-to-br ${color} text-white rounded-lg shadow-lg p-6 relative overflow-hidden`}>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium opacity-90">{title}</h3>
          <span className="text-3xl opacity-80">{icon}</span>
        </div>
        <p className="text-3xl font-bold mb-1">{value}</p>
        {subtitle && <p className="text-xs opacity-80">{subtitle}</p>}
        {trend && (
          <div className="flex items-center mt-2">
            <span className={`text-xs px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
              {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}%
            </span>
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center">
              HamroEvents Dashboard
            </h1>
            <p className="text-gray-600">Complete analytics for Nepal's event management ecosystem</p>
          </div>
          <div className="flex space-x-4">
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Provinces</option>
              {NEPAL_PROVINCES.map(province => (
                <option key={province.id} value={province.name}>{province.name}</option>
              ))}
            </select>
            <Link
              to="/create"
              className="px-6 py-2 bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-lg hover:from-red-700 hover:to-blue-700 transition font-semibold"
            >
              + Create Event
            </Link>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={`${CURRENCY.symbol}${stats.totalRevenue.toLocaleString()}`}
            subtitle={`${stats.totalRegistrations.toLocaleString()} registrations`}
            icon="💰"
            color="from-red-500 to-red-600"
            trend={23.7}
          />
          <StatCard
            title="Active Events"
            value={stats.totalEvents}
            subtitle={`${stats.upcomingEvents} upcoming`}
            icon="🎉"
            color="from-blue-500 to-blue-600"
            trend={8.3}
          />
          <StatCard
            title="Occupancy Rate"
            value={`${stats.occupancyRate.toFixed(1)}%`}
            subtitle={`${stats.totalRegistrations} / ${stats.totalCapacity} seats`}
            icon="📊"
            color="from-green-500 to-green-600"
            trend={5.7}
          />
          <StatCard
            title="System Users"
            value={stats.totalUsers}
            subtitle={`${stats.unverifiedOrganizers} pending verification`}
            icon="👥"
            color="from-purple-500 to-purple-600"
            trend={15.3}
          />
        </div>

        {/* Province Performance & Payment Methods */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Province-wise Performance</h2>
              <span className="text-2xl">🏛️</span>
            </div>
            <div className="space-y-4">
              {Object.entries(stats.provinceStats)
                .sort(([,a], [,b]) => b.revenue - a.revenue)
                .slice(0, 5)
                .map(([province, data]) => (
                <div key={province} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-800">{province}</p>
                    <p className="text-sm text-gray-600">{data.events} events • {data.registrations} attendees</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600">{CURRENCY.symbol}{data.revenue.toLocaleString()}</p>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${Math.min((data.revenue / stats.totalRevenue) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Payment Methods</h2>
              <span className="text-2xl">💳</span>
            </div>
            <div className="space-y-4">
              {Object.entries(stats.paymentStats).map(([method, data]) => (
                <div key={method} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">{method}</span>
                    <span className="text-sm font-bold text-gray-900">{data.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        method === 'eSewa' ? 'bg-green-500' : 
                        method === 'Khalti' ? 'bg-purple-500' :
                        method === 'IME Pay' ? 'bg-blue-500' : 'bg-gray-500'
                      }`}
                      style={{ width: `${data.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{data.transactions} transactions</span>
                    <span>{CURRENCY.symbol}{Math.round(data.amount).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing Events & Event Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Top Performing Events</h2>
              <span className="text-2xl">🏆</span>
            </div>
            <div className="space-y-4">
              {stats.topEvents.map((event, index) => (
                <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' :
                      index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{event.title}</p>
                      <p className="text-sm text-gray-600">{event.city}, {event.province} • {event.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      {CURRENCY.symbol}{(event.registeredCount * event.price).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">{event.registeredCount} attendees</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Event Categories</h2>
              <span className="text-2xl">📈</span>
            </div>
            <div className="space-y-4">
              {Object.entries(stats.categoryStats)
                .sort(([,a], [,b]) => b.events - a.events)
                .slice(0, 6)
                .map(([category, data]) => (
                <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{data.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{category}</p>
                      <p className="text-xs text-gray-600">{data.events} events</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600 text-sm">{data.registrations}</p>
                    <p className="text-xs text-gray-500">attendees</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
