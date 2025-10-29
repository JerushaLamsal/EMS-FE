import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateEvent from './pages/CreateEvent';
import Dashboard from './pages/Dashboard';
import Attendees from './pages/Attendees';
import Checkout from './pages/Checkout';

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventDetails />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/checkout" element={<Checkout />} />
                
                <Route
                  path="/create"
                  element={
                    <ProtectedRoute roles={['organizer']}>
                      <CreateEvent />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute roles={['admin']}>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/attendees"
                  element={
                    <ProtectedRoute roles={['admin', 'organizer']}>
                      <Attendees />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;
