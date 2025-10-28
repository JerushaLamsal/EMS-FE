import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';

const Home = () => {
  const { events } = useEvents();
  const upcomingEvents = events.filter(e => e.status === 'upcoming').slice(0, 3);

  return (
    <div className="min-h-[calc(100vh-280px)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-500 via-purple-600 to-orange-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Namaste! Welcome to HamroEvents</h1>
          <p className="text-xl mb-8 text-pink-100">
            Discover and celebrate Nepal's vibrant culture, festivals, and events
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/events"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
            >
              Browse Events
            </Link>
            <Link
              to="/login"
              className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition duration-300 shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
            Why Choose HamroEvents?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                Cultural Events
              </h3>
              <p className="text-slate-600">
                Experience Nepal's rich traditions through Dashain, Tihar, and cultural festivals across cities.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">💵</div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                NPR Payment
              </h3>
              <p className="text-slate-600">
                Pay securely with eSewa, Khalti, and IME Pay - Nepal's trusted digital wallets.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🏞️</div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                Nationwide Coverage
              </h3>
              <p className="text-slate-600">
                Discover events in Kathmandu, Pokhara, Chitwan, and all major cities of Nepal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800">Upcoming Events</h2>
            <Link
              to="/events"
              className="text-gray-600 hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-400 hover:to-orange-400 hover:bg-clip-text hover:text-transparent font-semibold transition-all duration-300"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map(event => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">
                    {event.category}
                  </span>
                  <h3 className="text-xl font-semibold text-slate-800 mt-3 mb-3">
                    {event.title}
                  </h3>
                  <div className="text-sm text-slate-600 space-y-1">
                    <p>📅 {event.date}</p>
                    <p>📍 {event.location}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
