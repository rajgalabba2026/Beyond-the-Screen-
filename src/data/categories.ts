import { CategoryInfo, OfflineCategory } from '../types';

export const CATEGORIES: Record<OfflineCategory, CategoryInfo> = {
  reading: {
    id: 'reading',
    name: 'Reading Physical Books',
    icon: 'BookOpen',
    color: '#059669', // Emerald
    bgColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    textColor: '#065F46',
    description: 'Immerse in paper pages, expand imagination, and escape blue light.',
    defaultSwapRatio: '30 min less screen time = ~15 to 20 book pages'
  },
  fitness: {
    id: 'fitness',
    name: 'Gym & Workouts',
    icon: 'Dumbbell',
    color: '#E07A5F', // Warm Terracotta
    bgColor: '#FFF5F2',
    borderColor: '#FECACA',
    textColor: '#991B1B',
    description: 'Strength training, calisthenics, gym routines, and energizing sets.',
    defaultSwapRatio: '1 hr less YouTube = 1 solid gym workout session'
  },
  sports: {
    id: 'sports',
    name: 'Sports & Active Games',
    icon: 'Trophy',
    color: '#D97706', // Amber
    bgColor: '#FEF3C7',
    borderColor: '#FDE68A',
    textColor: '#92400E',
    description: 'Basketball, tennis, swimming, rock climbing, soccer, or badminton.',
    defaultSwapRatio: '45 min less scrolling = a 3-set badminton or tennis rally'
  },
  nature: {
    id: 'nature',
    name: 'Jogging & Outdoors',
    icon: 'Footprints',
    color: '#16A34A', // Green
    bgColor: '#F0FDF4',
    borderColor: '#BBF7D0',
    textColor: '#166534',
    description: 'Fresh air jogs, trail runs, nature walks, and screen-free park rests.',
    defaultSwapRatio: '30 min screen pause = 3.5 km outdoor jog in the breeze'
  },
  social: {
    id: 'social',
    name: 'Meeting Friends & Family',
    icon: 'Users',
    color: '#8B5CF6', // Violet
    bgColor: '#F5F3FF',
    borderColor: '#DDD6FE',
    textColor: '#5B21B6',
    description: 'Deep face-to-face talks, coffee catchups, dinners, and board games.',
    defaultSwapRatio: '2 hrs less screen time = quality dinner & laugh with best friends'
  },
  learning: {
    id: 'learning',
    name: 'Studying & Deep Focus',
    icon: 'GraduationCap',
    color: '#0284C7', // Sky blue
    bgColor: '#F0F9FF',
    borderColor: '#BAE6FD',
    textColor: '#075985',
    description: 'Mastering languages, exam prep, writing handwritten notes, research.',
    defaultSwapRatio: '45 min screen pause = 1 uninterrupted deep study cycle'
  },
  hobbies: {
    id: 'hobbies',
    name: 'Creative Hobbies & Crafts',
    icon: 'Palette',
    color: '#EC4899', // Pink
    bgColor: '#FDF2F8',
    borderColor: '#FBCFE8',
    textColor: '#9D174D',
    description: 'Acoustic guitar, woodworking, sketching, culinary cooking, pottery.',
    defaultSwapRatio: '1 hr screen pause = learning 3 new guitar chords or cooking a feast'
  },
  mindfulness: {
    id: 'mindfulness',
    name: 'Quiet Rest & Breath',
    icon: 'Sparkles',
    color: '#0D9488', // Teal
    bgColor: '#F0FDFA',
    borderColor: '#99F6E4',
    textColor: '#115E59',
    description: 'Unplugged contemplation, journaling, stretching, afternoon tea in silence.',
    defaultSwapRatio: '20 min screen pause = mental reset and nervous system calm'
  }
};
