export const mockEvents = [
  {
    id: 1,
    title: 'Dashain Mela 2025',
    date: '2025-10-30',
    time: '10:00 AM',
    location: 'Tundikhel, Kathmandu',
    description: 'Grand Dashain festival celebration featuring cultural programs, food stalls, and traditional games.',
    organizer: 'Rajesh Shrestha',
    organizerId: 2,
    category: 'Cultural',
    tickets: [
      {
        type: 'Normal',
        price: 500,
        capacity: 700,
        registeredCount: 356,
        benefits: ['General admission', 'Access to food stalls', 'Participation in games'],
        gradient: 'from-blue-500 to-blue-700'
      },
      {
        type: 'VIP',
        price: 2000,
        capacity: 200,
        registeredCount: 80,
        benefits: [
          'Premium seating area',
          'Welcome drink',
          'Food voucher worth NPR 500',
          'Event merchandise',
          'Priority parking'
        ],
        gradient: 'from-purple-500 to-pink-600'
      },
      {
        type: 'VVIP',
        price: 5000,
        capacity: 100,
        registeredCount: 20,
        benefits: [
          'Exclusive lounge access',
          'Meet & greet with performers',
          'Gourmet dining experience',
          'Premium gift hamper',
          'Dedicated host service',
          'Valet parking'
        ],
        gradient: 'from-amber-500 to-red-600'
      }
    ],
    registeredCount: 456,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
    status: 'upcoming'
  },
  {
    id: 2,
    title: 'Pokhara Music Festival',
    date: '2025-11-15',
    time: '06:00 PM',
    location: 'Phewa Lake Side, Pokhara',
    description: 'Live music performances by top Nepali artists with stunning lakeside views.',
    organizer: 'Sita Gurung',
    organizerId: 4,
    category: 'Music',
    price: 1500,
    capacity: 500,
    registeredCount: 287,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    status: 'upcoming'
  },
  {
    id: 3,
    title: 'Nepal Tech Summit 2025',
    date: '2025-11-20',
    time: '09:00 AM',
    location: 'Soaltee Hotel, Kathmandu',
    description: 'Connect with tech leaders, startups, and innovators shaping Nepal\'s digital future.',
    organizer: 'Rajesh Shrestha',
    organizerId: 2,
    category: 'Educational',
    price: 2000,
    capacity: 300,
    registeredCount: 245,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
    status: 'upcoming'
  },
  {
    id: 4,
    title: 'Chitwan Jungle Marathon',
    date: '2025-12-05',
    time: '06:00 AM',
    location: 'Chitwan National Park, Chitwan',
    description: 'Run through the scenic Chitwan National Park in this unique marathon experience.',
    organizer: 'Sita Gurung',
    organizerId: 4,
    category: 'Sports',
    price: 1000,
    capacity: 200,
    registeredCount: 178,
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800',
    status: 'upcoming'
  },
  {
    id: 5,
    title: 'Buddha Jayanti Celebration',
    date: '2025-05-15',
    time: '07:00 AM',
    location: 'Lumbini, Rupandehi',
    description: 'Sacred celebration of Lord Buddha\'s birth anniversary with prayers, meditation, and cultural programs.',
    organizer: 'Rajesh Shrestha',
    organizerId: 2,
    category: 'Religious',
    price: 0,
    capacity: 2000,
    registeredCount: 1543,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
    status: 'upcoming'
  },
  {
    id: 6,
    title: 'Kathmandu Art Exhibition',
    date: '2025-11-10',
    time: '11:00 AM',
    location: 'Nepal Art Council, Babar Mahal, Kathmandu',
    description: 'Showcase of contemporary Nepali art featuring paintings, sculptures, and installations.',
    organizer: 'Sita Gurung',
    organizerId: 4,
    category: 'Cultural',
    price: 300,
    capacity: 150,
    registeredCount: 92,
    image: 'https://images.unsplash.com/photo-1577705998148-6da4f3b8e8c6?w=800',
    status: 'upcoming'
  },
  {
    id: 7,
    title: 'Bhaktapur Jatra',
    date: '2025-10-10',
    time: '08:00 AM',
    location: 'Durbar Square, Bhaktapur',
    description: 'Traditional Newari festival with chariot processions, masked dances, and cultural performances.',
    organizer: 'Rajesh Shrestha',
    organizerId: 2,
    category: 'Religious',
    price: 200,
    capacity: 800,
    registeredCount: 800,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
    status: 'past'
  },
  {
    id: 8,
    title: 'Startup Weekend Kathmandu',
    date: '2025-11-25',
    time: '09:00 AM',
    location: 'Karkhana, Lazimpat, Kathmandu',
    description: '54-hour event where entrepreneurs pitch ideas, form teams, and launch startups.',
    organizer: 'Sita Gurung',
    organizerId: 4,
    category: 'Educational',
    price: 1200,
    capacity: 100,
    registeredCount: 67,
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800',
    status: 'upcoming'
  }
];

export const nepalCities = [
  'Kathmandu',
  'Pokhara',
  'Lalitpur',
  'Bhaktapur',
  'Chitwan',
  'Biratnagar',
  'Butwal',
  'Dharan',
  'Hetauda',
  'Janakpur',
  'Bharatpur',
  'Dhangadhi',
  'Nepalgunj',
  'Birgunj',
  'Lumbini'
];

export const eventCategories = [
  'Cultural',
  'Music',
  'Sports',
  'Educational',
  'Religious'
];
