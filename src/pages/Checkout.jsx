import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';
import PaymentGateway from '../components/PaymentGateway';
import Modal from '../components/Modal';

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { getEventById, purchaseTickets } = useEvents();

  const eventId = searchParams.get('eventId');
  const ticketType = searchParams.get('ticketType');
  const event = getEventById(eventId);
  const ticket = event?.tickets?.find(t => t.type === ticketType);

  const [quantity, setQuantity] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [purchasedTickets, setPurchasedTickets] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!event || !ticket) {
      navigate('/events');
      return;
    }
  }, [isAuthenticated, event, ticket, navigate]);

  if (!event || !ticket) {
    return null;
  }

  const availableTickets = ticket.capacity - ticket.registeredCount;
  const subtotal = ticket.price * quantity;
  const serviceFee = Math.round(subtotal * 0.05); // 5% service fee
  const total = subtotal + serviceFee;

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= availableTickets) {
      setQuantity(value);
    }
  };

  const handlePaymentSuccess = () => {
    const result = purchaseTickets(
      event.id,
      user.id,
      user.name,
      user.email,
      ticket.type,
      ticket.price,
      quantity
    );

    if (result.success) {
      setPurchasedTickets(result.attendees);
      setShowPayment(false);
      setShowConfirmation(true);
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <button
          onClick={() => navigate(`/events/${eventId}`)}
          className="text-gray-600 hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-400 hover:to-orange-400 hover:bg-clip-text hover:text-transparent mb-6 flex items-center transition-all duration-300"
        >
          ← Back to Event
        </button>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Checkout</h1>

            {/* Event Details */}
            <div className="mb-8 p-4 bg-slate-50 rounded-lg">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">{event.title}</h2>
              <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                <div>
                  <p>📅 {event.date}</p>
                  <p>⏰ {event.time}</p>
                </div>
                <div>
                  <p>📍 {event.location}</p>
                  <p>👤 {event.organizer}</p>
                </div>
              </div>
            </div>

            {/* Ticket Selection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">{ticket.type} Ticket</h3>
                  <p className="text-sm text-slate-600">NPR {ticket.price.toLocaleString()} per ticket</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => quantity > 1 && setQuantity(q => q - 1)}
                    className="w-8 h-8 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-600 hover:border-purple-500 hover:text-purple-500 transition-all"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={availableTickets}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-16 text-center border-2 border-slate-300 rounded-lg px-2 py-1"
                  />
                  <button
                    onClick={() => quantity < availableTickets && setQuantity(q => q + 1)}
                    className="w-8 h-8 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-600 hover:border-purple-500 hover:text-purple-500 transition-all"
                    disabled={quantity >= availableTickets}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg mb-4">
                <div className="space-y-2 text-sm text-slate-600 mb-4">
                  {ticket.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <span className="mr-2 text-purple-500">✓</span>
                      {benefit}
                    </div>
                  ))}
                </div>
                <div className="text-xs text-slate-500">
                  {availableTickets} tickets remaining
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Price Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Ticket Price (x{quantity})</span>
                  <span className="text-slate-800">NPR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Service Fee (5%)</span>
                  <span className="text-slate-800">NPR {serviceFee.toLocaleString()}</span>
                </div>
                <div className="border-t border-slate-200 pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-800">Total Amount</span>
                    <span className="text-purple-600">NPR {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => setShowPayment(true)}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Proceed to Payment
            </button>
          </div>
        </div>

        {/* Payment Gateway Modal */}
        <PaymentGateway
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
          event={{...event, price: total}}
          onPaymentSuccess={handlePaymentSuccess}
        />

        {/* Confirmation Modal */}
        <Modal
          isOpen={showConfirmation}
          onClose={() => {
            setShowConfirmation(false);
            navigate('/dashboard');
          }}
          title="✅ Booking Confirmed!"
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
              You're all set for {event.title}!
            </h3>
            <p className="text-slate-600 mb-4">
              A confirmation email has been sent to {user?.email}
            </p>
            <div className="bg-slate-50 p-4 rounded-lg text-left text-sm space-y-2">
              <p>🎫 <strong>Ticket Type:</strong> {ticket.type}</p>
              <p>🔢 <strong>Quantity:</strong> {quantity}</p>
              <p>📅 <strong>Date:</strong> {event.date} at {event.time}</p>
              <p>📍 <strong>Location:</strong> {event.location}</p>
              <p>💰 <strong>Amount Paid:</strong> NPR {total.toLocaleString()}</p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Checkout;