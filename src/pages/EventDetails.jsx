import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';
import PaymentGateway from '../components/PaymentGateway';
import Modal from '../components/Modal';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { getEventById, registerForEvent, unregisterFromEvent, isUserRegistered } = useEvents();
  const [showPayment, setShowPayment] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const event = getEventById(id);
  const isRegistered = isAuthenticated && isUserRegistered(parseInt(id), user?.id);
  const isFull = event?.registeredCount >= event?.capacity;

  if (!event) {
    return (
      <div className="min-h-[calc(100vh-280px)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Event not found</h2>
          <button
            onClick={() => navigate('/events')}
            className="text-primary-600 hover:text-primary-700"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const handleRegister = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user.role !== 'attendee') {
      alert(`Access Denied: Only attendees can register and pay for events. Your role: ${user.role}`);
      return;
    }

    if (event.price === 0) {
      const result = registerForEvent(event.id, user.id, user.name, user.email);
      if (result.success) {
        console.log('✅ Registration successful for free event');
        setShowConfirmation(true);
      } else {
        alert(result.error);
      }
    } else {
      setShowPayment(true);
    }
  };

  const handlePaymentSuccess = () => {
    if (!selectedTicket) {
      alert('Please select a ticket type');
      return;
    }

    const result = registerForEvent(
      event.id,
      user.id,
      user.name,
      user.email,
      selectedTicket.type,
      selectedTicket.price
    );
    setShowPayment(false);
    
    if (result.success) {
      console.log('✅ Payment successful! Registration confirmed.');
      console.log('📧 Confirmation email sent to:', user.email);
      setShowConfirmation(true);
    } else {
      alert(result.error);
    }
  };

  const handleUnregister = () => {
    if (window.confirm('Are you sure you want to unregister from this event?')) {
      unregisterFromEvent(event.id, user.id);
      alert('Successfully unregistered from the event');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 max-w-4xl py-12">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-8">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-96 object-cover"
          />

          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 text-white text-sm font-semibold px-3 py-1 rounded-full uppercase">
                  {event.category}
                </span>
                <h1 className="text-4xl font-bold text-slate-800 mt-3">{event.title}</h1>
              </div>
              <span className={`px-4 py-2 rounded-lg font-semibold ${
                event.status === 'upcoming' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-slate-100 text-slate-600'
              }`}>
                {event.status}
              </span>
            </div>

            {/* Organizer Information */}
            <div className="mb-6 p-4 bg-slate-50 rounded-lg">
              <h2 className="text-lg font-semibold text-slate-800 mb-2">Event Organizer</h2>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {event.organizer.charAt(0)}
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-slate-800">{event.organizer}</p>
                  <p className="text-sm text-slate-600">Professional Event Organizer</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">📅</span>
                  <div>
                    <p className="text-sm text-slate-500">Date & Time</p>
                    <p className="text-slate-800 font-medium">{event.date} at {event.time}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-2xl mr-3">📍</span>
                  <div>
                    <p className="text-sm text-slate-500">Location</p>
                    <p className="text-slate-800 font-medium">{event.location}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">👤</span>
                  <div>
                    <p className="text-sm text-slate-500">Organizer</p>
                    <p className="text-slate-800 font-medium">{event.organizer}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-2xl mr-3">🎫</span>
                  <div>
                    <p className="text-sm text-slate-500">Capacity</p>
                    <p className="text-slate-800 font-medium">
                      {event.registeredCount} / {event.capacity} registered
                    </p>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(event.registeredCount / event.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">About This Event</h2>
              <p className="text-slate-600 leading-relaxed">{event.description}</p>
            </div>

            {/* Ticket Types Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Select Your Ticket</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {event.tickets?.map((ticket) => {
                  const gradientStyle = ticket.type === 'VVIP' 
                    ? 'border-amber-400 shadow-amber-200/50'
                    : ticket.type === 'VIP'
                    ? 'border-purple-400 shadow-purple-200/50'
                    : 'border-blue-400 shadow-blue-200/50';

                  const textColorClass = `text-${ticket.type === 'VVIP' ? 'amber' : ticket.type === 'VIP' ? 'purple' : 'blue'}-500`;

                  return (
                    <div 
                      key={ticket.type}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-sm" />
                      <div className={`relative border-2 ${gradientStyle} rounded-xl p-6 bg-white shadow-xl hover:shadow-2xl transition-all duration-300`}>
                        <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full text-white text-sm font-bold bg-gradient-to-r ${ticket.gradient}`}>
                          {ticket.type}
                        </div>

                        <div className="mt-4 text-center mb-6">
                          <p className="text-3xl font-bold text-slate-800">
                            NPR {ticket.price.toLocaleString()}
                          </p>
                          <p className="text-sm text-slate-500">per person</p>
                        </div>

                        <div className="space-y-3 mb-6">
                          {ticket.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center text-slate-600">
                              <span className={`mr-2 ${textColorClass}`}>✓</span>
                              {benefit}
                            </div>
                          ))}
                        </div>

                        <div className="mb-6">
                          <div className="flex justify-between text-sm text-slate-600 mb-2">
                            <span>Availability</span>
                            <span>{ticket.capacity - ticket.registeredCount} left</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full bg-gradient-to-r ${ticket.gradient}`}
                              style={{ width: `${(ticket.registeredCount / ticket.capacity) * 100}%` }}
                            />
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (!isAuthenticated) {
                              navigate('/login');
                              return;
                            }
                            navigate(`/checkout?eventId=${event.id}&ticketType=${ticket.type}`);
                          }}
                          disabled={ticket.registeredCount >= ticket.capacity}
                          className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                            ticket.registeredCount >= ticket.capacity
                              ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                              : `bg-gradient-to-r ${ticket.gradient} text-white hover:shadow-lg transform hover:-translate-y-0.5`
                          }`}
                        >
                          {ticket.registeredCount >= ticket.capacity ? 'Sold Out' : 'Book Now'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {!isAuthenticated && (
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg text-center">
                  <p className="text-slate-800">
                    <span>🔒 </span>
                    <span className="font-medium">Please </span>
                    <button 
                      onClick={() => navigate('/login')} 
                      className="text-purple-600 hover:text-pink-600 font-semibold underline"
                    >
                      login
                    </button>
                    <span className="font-medium"> or </span>
                    <button 
                      onClick={() => navigate('/signup')} 
                      className="text-purple-600 hover:text-pink-600 font-semibold underline"
                    >
                      sign up
                    </button>
                    <span className="font-medium"> to book tickets</span>
                  </p>
                </div>
              )}
            </div>

            {event.status === 'upcoming' && (
              <div className="flex gap-4">
                {isAuthenticated && user.role === 'attendee' ? (
                  isRegistered ? (
                    <button
                      onClick={handleUnregister}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
                    >
                      Unregister from Event
                    </button>
                  ) : (
                    <button
                      onClick={handleRegister}
                      disabled={isFull}
                      className={`flex-1 font-semibold py-3 rounded-lg transition shadow-md ${
                        isFull
                          ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 hover:shadow-lg text-white'
                      }`}
                    >
                      {isFull ? 'Event Full' : event.price === 0 ? 'Register for Free' : `Register - NPR ${event.price.toLocaleString()}`}
                    </button>
                  )
                ) : isAuthenticated && user.role !== 'attendee' ? (
                  <div className="flex-1 bg-gray-200 text-gray-600 font-semibold py-3 rounded-lg text-center">
                    Only attendees can register for events (Your role: {user.role})
                  </div>
                ) : (
                  <button
                    onClick={() => navigate('/login')}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
                  >
                    Login to Register
                  </button>
                )}
              </div>
            )}

            {!isAuthenticated && event.status === 'upcoming' && (
              <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                <p className="text-yellow-800 font-medium">
                  🔒 Please <button onClick={() => navigate('/login')} className="text-blue-600 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-400 hover:to-orange-400 hover:bg-clip-text underline transition-all duration-300">login</button> or <button onClick={() => navigate('/signup')} className="text-blue-600 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-400 hover:to-orange-400 hover:bg-clip-text underline transition-all duration-300">sign up</button> to register for this event
                </p>
              </div>
            )}

            {/* Footer */}
            <footer className="mt-16 py-8 border-t border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">About Us</h3>
                  <p className="text-slate-600 mb-4">
                    We're Nepal's premier event management platform, connecting people with unforgettable experiences.
                  </p>
                  <Link 
                    to="/about"
                    className="text-purple-600 hover:text-pink-600 font-medium"
                  >
                    Learn more about us →
                  </Link>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Need Help?</h3>
                  <p className="text-slate-600 mb-4">
                    Having questions about tickets or the event? Our team is here to help.
                  </p>
                  <Link 
                    to="/contact"
                    className="text-purple-600 hover:text-pink-600 font-medium"
                  >
                    Contact our support team →
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </div>

        {/* Payment Gateway Modal */}
        {event && selectedTicket && (
          <PaymentGateway
            isOpen={showPayment}
            onClose={() => {
              setShowPayment(false);
              setSelectedTicket(null);
            }}
            event={event}
            ticket={selectedTicket}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}

        {/* Confirmation Modal */}
        <Modal
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          title="✅ Registration Confirmed!"
          actions={
            <button
              onClick={() => {
                setShowConfirmation(false);
                navigate('/dashboard');
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Go to Dashboard
            </button>
          }
        >
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              You're all set for {event?.title}!
            </h3>
            <p className="text-slate-600 mb-4">
              A confirmation email has been sent to {user?.email}
            </p>
            <div className="bg-slate-50 p-4 rounded-lg text-left text-sm space-y-2">
              <p>🎫 <strong>Ticket Type:</strong> {selectedTicket?.type}</p>
              <p>📅 <strong>Date:</strong> {event?.date} at {event?.time}</p>
              <p>📍 <strong>Location:</strong> {event?.location}</p>
              <p>💰 <strong>Amount Paid:</strong> NPR {selectedTicket?.price.toLocaleString()}</p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default EventDetails;