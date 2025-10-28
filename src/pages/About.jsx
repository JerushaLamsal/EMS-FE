import React from 'react';

const About = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-blue-600/10"></div>
        <div className="relative container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
            About HamroEvents
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Connecting Nepal Through Events
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto"></div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
              <p>
                HamroEvents is Nepal's premier digital hub for discovering and managing events across our beautiful nation. 
                From the vibrant music festivals echoing across Pokhara's lakeside to the innovative tech conferences 
                in Kathmandu's bustling startup scene, we bring together communities through the power of shared experiences.
              </p>
              
              <p>
                Our mission is simple yet powerful: to simplify event discovery, empower local organizers, and make 
                event registration seamless through Nepal's trusted digital payment systems like eSewa and Khalti. 
                We believe that every event, whether it's a traditional cultural celebration in Bhaktapur or a 
                modern business summit in Biratnagar, deserves to reach its perfect audience.
              </p>
              
              <p>
                HamroEvents is built with inclusivity at its heart. We're here to help students discover educational 
                seminars, startups find networking opportunities, families enjoy cultural festivals, and communities 
                come together through meaningful experiences. From the mountains of Mustang to the plains of the Terai, 
                we're connecting every corner of Nepal.
              </p>
            </div>
          </div>

          {/* Vision Section */}
          <div className="bg-gradient-to-r from-red-600 to-blue-600 rounded-2xl shadow-xl p-8 md:p-12 mb-16 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Vision</h2>
            <p className="text-xl text-center leading-relaxed opacity-95">
              "To build Nepal's leading event ecosystem where technology bridges creativity and community, 
              fostering connections that strengthen our rich cultural heritage while embracing innovation."
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16">
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Our Mission</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">🎯</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">Empower Organizers</h3>
                    <p className="text-gray-600">Provide powerful tools for event creators to manage, promote, and grow their events across Nepal.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">🔍</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">Simplify Discovery</h3>
                    <p className="text-gray-600">Make it easy for people to find events that match their interests, location, and schedule.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">💳</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">Enable Seamless Payments</h3>
                    <p className="text-gray-600">Integrate with trusted Nepali payment systems like eSewa and Khalti for secure transactions.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">🤝</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">Build Community</h3>
                    <p className="text-gray-600">Foster connections between people, organizations, and communities through shared experiences.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-bold text-xl mb-3 text-gray-800">Innovation</h3>
              <p className="text-gray-600">
                Bringing cutting-edge technology to Nepal's event management landscape
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-bold text-xl mb-3 text-gray-800">Community</h3>
              <p className="text-gray-600">
                Building bridges between organizers, attendees, and local communities
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">🏔️</div>
              <h3 className="font-bold text-xl mb-3 text-gray-800">Heritage</h3>
              <p className="text-gray-600">
                Celebrating and preserving Nepal's rich cultural traditions through events
              </p>
            </div>
          </div>

          {/* Closing Section */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500 rounded-2xl shadow-xl p-8 text-center">
            <div className="text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                From Pokhara to Kathmandu — every event brings people closer.
              </h2>
              <p className="text-lg opacity-90 mb-6">
                Join thousands of Nepalis who trust HamroEvents for their event needs
              </p>
              <div className="flex justify-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">10,000+</div>
                  <div className="text-sm opacity-80">Events Hosted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">50,000+</div>
                  <div className="text-sm opacity-80">Happy Attendees</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">7</div>
                  <div className="text-sm opacity-80">Provinces Covered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;