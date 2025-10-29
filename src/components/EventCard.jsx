import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 right-3">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {event.category}
            </span>
          </div>
          {event.tickets && event.tickets.some(t => t.type === 'VIP') && (
            <div className="absolute top-3 left-3">
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                VIP Available
              </span>
            </div>
          )}
        </div>
        
        <div className="p-5">
          <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1">
            {event.title}
          </h3>
          
          <p className="text-slate-600 text-sm mb-3 line-clamp-2">
            {event.description}
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center text-slate-700 text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{event.date} at {event.time}</span>
            </div>
            
            <div className="flex items-center text-slate-700 text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="line-clamp-1">{event.location}</span>
            </div>

            <div className="flex items-center text-slate-700 text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>By {event.organizer}</span>
            </div>
          </div>

          {/* Ticket Preview */}
          <div className="border-t pt-4 mb-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">Starting from:</span>
              <span className="font-semibold text-blue-600">
                {event.tickets ? 
                  `NPR ${Math.min(...event.tickets.map(t => t.price)).toLocaleString()}` :
                  'Free Entry'}
              </span>
            </div>
          </div>

          {/* View Details Button */}
          <Link 
            to={`/events/${event.id}`}
            className="block w-full bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 text-white text-center py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
  );   
};

export default EventCard;

