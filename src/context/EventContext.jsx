import { createContext, useContext, useState } from 'react';
import { mockEvents } from '../data/mockEvents';
import { mockAttendees } from '../data/mockAttendees';

const EventContext = createContext();

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(mockEvents);
  const [attendees, setAttendees] = useState(mockAttendees);

  const getEventById = (id) => {
    return events.find(event => event.id === parseInt(id));
  };

  const getEventsByOrganizer = (organizerId) => {
    return events.filter(event => event.organizerId === organizerId);
  };

  const createEvent = (eventData, organizerId, organizerName) => {
    const newEvent = {
      ...eventData,
      id: events.length + 1,
      organizerId,
      organizer: organizerName,
      registeredCount: 0,
      status: 'upcoming'
    };
    setEvents([...events, newEvent]);
    return newEvent;
  };

  const updateEvent = (id, eventData) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, ...eventData } : event
    ));
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
    setAttendees(attendees.filter(attendee => attendee.eventId !== id));
  };

  const registerForEvent = (eventId, userId, userName, userEmail) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return { success: false, error: 'Event not found' };

    // Check if already registered
    const alreadyRegistered = attendees.some(
      a => a.eventId === eventId && a.userId === userId
    );
    if (alreadyRegistered) {
      return { success: false, error: 'Already registered for this event' };
    }

    // Check capacity
    if (event.registeredCount >= event.capacity) {
      return { success: false, error: 'Event is full' };
    }

    const newAttendee = {
      id: attendees.length + 1,
      userId,
      name: userName,
      email: userEmail,
      eventId,
      eventTitle: event.title,
      registeredDate: new Date().toISOString().split('T')[0],
      status: 'confirmed'
    };

    setAttendees([...attendees, newAttendee]);
    setEvents(events.map(e => 
      e.id === eventId 
        ? { ...e, registeredCount: e.registeredCount + 1 }
        : e
    ));

    return { success: true, attendee: newAttendee };
  };

  // Purchase multiple tickets (handles quantity)
  const purchaseTickets = (eventId, userId, userName, userEmail, ticketType, ticketPrice, quantity = 1) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return { success: false, error: 'Event not found' };

    // Check capacity
    if (event.registeredCount + quantity > event.capacity) {
      return { success: false, error: 'Not enough tickets available' };
    }

    const newAttendees = [];
    for (let i = 0; i < quantity; i++) {
      const newAttendee = {
        id: attendees.length + newAttendees.length + 1,
        userId,
        name: userName,
        email: userEmail,
        eventId,
        eventTitle: event.title,
        ticketType,
        ticketPrice,
        registeredDate: new Date().toISOString().split('T')[0],
        status: 'confirmed'
      };
      newAttendees.push(newAttendee);
    }

    setAttendees([...attendees, ...newAttendees]);
    setEvents(events.map(e => 
      e.id === eventId 
        ? { ...e, registeredCount: e.registeredCount + quantity }
        : e
    ));

    return { success: true, attendees: newAttendees };
  };

  const unregisterFromEvent = (eventId, userId) => {
    setAttendees(attendees.filter(
      a => !(a.eventId === eventId && a.userId === userId)
    ));
    setEvents(events.map(e => 
      e.id === eventId 
        ? { ...e, registeredCount: Math.max(0, e.registeredCount - 1) }
        : e
    ));
  };

  const getAttendeesByEvent = (eventId) => {
    return attendees.filter(a => a.eventId === eventId);
  };

  const getAttendeesByUser = (userId) => {
    return attendees.filter(a => a.userId === userId);
  };

  const getAllAttendees = () => {
    return attendees;
  };

  const isUserRegistered = (eventId, userId) => {
    return attendees.some(a => a.eventId === eventId && a.userId === userId);
  };

  const value = {
    events,
    attendees,
    getEventById,
    getEventsByOrganizer,
    createEvent,
    updateEvent,
    deleteEvent,
  registerForEvent,
  purchaseTickets,
    unregisterFromEvent,
    getAttendeesByEvent,
    getAttendeesByUser,
    getAllAttendees,
    isUserRegistered
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};
