import type { Profile } from './types'

export const mockFeedProfiles: Profile[] = [
  {
    id: 'p1',
    displayName: 'Ava',
    age: 24,
    location: 'Santa Cruz de Tenerife',
    occupation: 'Photographer',
    interests: ['Coffee', 'Hiking', 'Playlists', 'City walks'],
    bio: "Coffee enthusiast, weekend hiker, and always searching for the perfect playlist. Let's explore the city together.",
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop',
    ],
  },
  {
    id: 'p2',
    displayName: 'Liam',
    age: 27,
    location: 'Las Palmas',
    occupation: 'Product Designer',
    interests: ['Board games', 'Ramen', 'Sketching'],
    bio: 'Product designer by day, board game champion by night. Known for making the best ramen in town.',
    photos: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop',
    ],
  },
  {
    id: 'p3',
    displayName: 'Mia',
    age: 25,
    location: 'Barcelona',
    occupation: 'Sports Therapist',
    interests: ['Running', 'Film photography', 'Road trips'],
    bio: 'Marathon runner and film photography lover. Always down for a spontaneous road trip and new coffee spots.',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop',
    ],
  },
  {
    id: 'p4',
    displayName: 'Noah',
    age: 29,
    location: 'Madrid',
    occupation: 'Software Engineer',
    interests: ['Climbing', 'Craft beer', 'Live music'],
    bio: 'Software engineer with a passion for rock climbing and craft beer. Looking for someone to explore breweries with.',
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop',
    ],
  },
]
