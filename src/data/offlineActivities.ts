import { OfflineSuggestion } from '../types';

export const OFFLINE_SUGGESTIONS: OfflineSuggestion[] = [
  // 15 Minutes
  {
    id: 'sug-1',
    title: 'Read 1 Chapter of a Physical Paperback',
    category: 'reading',
    durationMinutes: 15,
    description: 'Grab a tangible book with paper pages. Feel the texture and smell the paper.',
    benefit: 'Rests optic nerves, reduces stress levels by up to 68% within 6 minutes.',
    digitalSwapExample: '15 min less Instagram Stories → 1 full book chapter finished',
    difficulty: 'Easy',
    tags: ['Relaxing', 'No Blue Light', 'Paper']
  },
  {
    id: 'sug-2',
    title: 'Core Blast or 50 Pushups & Stretching',
    category: 'fitness',
    durationMinutes: 15,
    description: 'Step away from the desk. Do 3 sets of pushups, planks, and hamstring stretches.',
    benefit: 'Stimulates blood circulation and releases natural posture tension.',
    digitalSwapExample: '15 min less TikTok scrolling → 50 pushups and limber spine',
    difficulty: 'Easy',
    tags: ['Quick Energy', 'Posture Reset']
  },
  {
    id: 'sug-3',
    title: 'Windowless Fresh Air Stroll',
    category: 'nature',
    durationMinutes: 15,
    description: 'Walk around your block or courtyard with your phone completely left at home.',
    benefit: 'Allows your visual focus to rest on the horizon rather than a 6-inch screen.',
    digitalSwapExample: '15 min screen break → 1,500 fresh-air steps',
    difficulty: 'Easy',
    tags: ['Nature', 'Mental Clarity']
  },
  {
    id: 'sug-4',
    title: 'Surprise Call to a Loved One',
    category: 'social',
    durationMinutes: 15,
    description: 'Call your grandma, sibling, or old classmate simply to hear their voice and check in.',
    benefit: 'Deepens emotional bonds far more than passive text reactions.',
    digitalSwapExample: '15 min less social media → a heartwarming memory with family',
    difficulty: 'Easy',
    tags: ['Heartfelt', 'Connection']
  },
  {
    id: 'sug-5',
    title: 'Mindful Handwritten Journaling',
    category: 'mindfulness',
    durationMinutes: 15,
    description: 'Take a notebook and fountain pen or ballpoint. Write down 3 thoughts and 3 gratitudes.',
    benefit: 'Decreases mental clutter and strengthens memory consolidation.',
    digitalSwapExample: '15 min doomscrolling → 1 page of personal clarity',
    difficulty: 'Easy',
    tags: ['Pen & Paper', 'Peace']
  },

  // 30 Minutes
  {
    id: 'sug-6',
    title: '30-Minute Physical Reading Session',
    category: 'reading',
    durationMinutes: 30,
    description: 'Make a hot cup of herbal tea. Sit in a comfortable armchair with zero screens in the room.',
    benefit: 'Read ~20 pages. Over a month of daily 30m, that is 2 whole 300-page books!',
    digitalSwapExample: '30 minutes less Instagram → 30 minutes reading 📖',
    difficulty: 'Easy',
    tags: ['Classic Book', 'Deep Calm']
  },
  {
    id: 'sug-7',
    title: 'Quick 3.5 km Sunset Jog',
    category: 'nature',
    durationMinutes: 30,
    description: 'Lace up your running sneakers. Pace yourself through the neighborhood or nearby park.',
    benefit: 'Burns ~280 calories, floods the brain with mood-elevating endocannabinoids.',
    digitalSwapExample: '30 min short-form videos → 3.5 km of cardiovascular health',
    difficulty: 'Moderate',
    tags: ['Cardio', 'Outdoor', 'Endorphins']
  },
  {
    id: 'sug-8',
    title: 'Learn a Musical Instrument',
    category: 'hobbies',
    durationMinutes: 30,
    description: 'Practice notes, scales, chords, or melodies on an acoustic guitar, piano, violin, or flute.',
    benefit: 'Builds tactile dexterity, creative auditory pathways, and deep state of flow.',
    digitalSwapExample: '30 min Reddit thread browsing → mastery of a new musical melody',
    difficulty: 'Moderate',
    tags: ['Music', 'Tactile']
  },
  {
    id: 'sug-9',
    title: 'Brisk Table Tennis / Badminton Match',
    category: 'sports',
    durationMinutes: 30,
    description: 'Grab a paddle or racket with a friend, neighbor, or family member.',
    benefit: 'Lightning fast hand-eye coordination and real laughter.',
    digitalSwapExample: '30 min idle phone checking → competitive spirited sport rally',
    difficulty: 'Moderate',
    tags: ['High Energy', 'Fun']
  },
  {
    id: 'sug-10',
    title: 'Cook a Fresh Meal From Scratch',
    category: 'hobbies',
    durationMinutes: 30,
    description: 'Chop fresh garlic, herbs, and vegetables. Sauté a delicious stir-fry or pasta sauce.',
    benefit: 'Engages all 5 senses: aroma, taste, touch, sight, and sound.',
    digitalSwapExample: '30 min food delivery app scrolling → nourishing home-cooked dinner',
    difficulty: 'Moderate',
    tags: ['Culinary', 'Healthy']
  },

  // 60 Minutes (1 Hour)
  {
    id: 'sug-11',
    title: 'Dedicated Gym Workout & Lifting',
    category: 'fitness',
    durationMinutes: 60,
    description: 'Full workout session: warmup, compound lifts or dumbbell circuit, and cooldown stretch.',
    benefit: 'Builds muscle density, metabolic health, and unmatched mental grit.',
    digitalSwapExample: '1 hour less YouTube → 1 hour at the gym 🏋️',
    difficulty: 'Moderate',
    tags: ['Iron Therapy', 'Strength', 'Dumbbells']
  },
  {
    id: 'sug-12',
    title: 'Pickup Basketball or Tennis Session',
    category: 'sports',
    durationMinutes: 60,
    description: 'Head to the local court for shooting hoops, practicing serves, or playing 2v2.',
    benefit: 'Burns 500+ calories while having genuine interactive play.',
    digitalSwapExample: '1 hour video binging → 1 hour competitive sports match',
    difficulty: 'Moderate',
    tags: ['Teamwork', 'Agility']
  },
  {
    id: 'sug-13',
    title: 'Screen-Free Coffee Date With a Friend',
    category: 'social',
    durationMinutes: 60,
    description: 'Meet at a neighborhood café. Put both phones in your bags or upside down on silent.',
    benefit: 'Builds true intimacy, empathy, and shared belly-laughter.',
    digitalSwapExample: '1 hour group chat lurking → 1 hour of genuine eye-to-eye connection',
    difficulty: 'Easy',
    tags: ['Friendship', 'Real Talk']
  },
  {
    id: 'sug-14',
    title: 'Deep Focused Book Study / Language Practice',
    category: 'learning',
    durationMinutes: 60,
    description: 'Pen, paper dictionary, or physical textbook. Master a new grammar topic or chapter.',
    benefit: 'Enters the flow state where neuroplasticity operates at maximum capacity.',
    digitalSwapExample: '1 hour random tabs → complete mastery of a challenging topic',
    difficulty: 'Engaging',
    tags: ['Deep Focus', 'Knowledge']
  },
  {
    id: 'sug-15',
    title: 'Watercolor Painting or Sketching',
    category: 'hobbies',
    durationMinutes: 60,
    description: 'Paint a plant on your windowsill, a park scene, or practice still-life sketching.',
    benefit: 'Rewires patience and trains spatial observation.',
    digitalSwapExample: '1 hour digital consumption → a tangible piece of art you made',
    difficulty: 'Engaging',
    tags: ['Creative', 'Artistic']
  },

  // 120 Minutes (2 Hours)
  {
    id: 'sug-16',
    title: 'Unplugged Evening Dinner with Friends',
    category: 'social',
    durationMinutes: 120,
    description: 'Gather around a table, share food, tell stories from the week, and play a board game.',
    benefit: 'Longevity and happiness studies rank close social relationships as factor #1.',
    digitalSwapExample: '2 hours less screen time → 2 hours with friends 👥',
    difficulty: 'Easy',
    tags: ['Unforgettable', 'Community', 'Dinner']
  },
  {
    id: 'sug-17',
    title: 'Forest Trail Hike & Nature Immersion',
    category: 'nature',
    durationMinutes: 120,
    description: 'Visit a regional park or nature reserve. Walk the trail breathing pine and damp soil.',
    benefit: 'Shinrin-yoku (forest bathing) lowers cortisol and boosts natural killer immune cells.',
    digitalSwapExample: '2 hours streaming video → 10,000 steps surrounded by trees',
    difficulty: 'Moderate',
    tags: ['Forest Bathing', 'Clean Air']
  },
  {
    id: 'sug-18',
    title: 'Visit the Public Library / Bookstore Odyssey',
    category: 'reading',
    durationMinutes: 120,
    description: 'Browse wooden bookshelves, explore unexpected sections, and read in a sunlit corner.',
    benefit: 'Rediscover the serene atmosphere of quiet public temples of knowledge.',
    digitalSwapExample: '2 hours endless feed refreshing → exploring endless literary worlds',
    difficulty: 'Easy',
    tags: ['Sanctuary', 'Literature']
  }
];
