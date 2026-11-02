import { PersonalGoal } from '../types';

export const INITIAL_PERSONAL_GOALS: PersonalGoal[] = [
  {
    id: 'pg-1',
    title: 'Read 2 physical books / month',
    category: 'reading',
    targetCount: 2,
    currentCount: 1.4, // 1 book done, 40% of second
    unit: 'books',
    frequency: 'monthly',
    deadlineDescription: 'Current month target'
  },
  {
    id: 'pg-2',
    title: 'Gym workout 4× a week',
    category: 'fitness',
    targetCount: 4,
    currentCount: 3,
    unit: 'sessions',
    frequency: 'weekly',
    deadlineDescription: 'This week (3 of 4 done)'
  },
  {
    id: 'pg-3',
    title: 'Meet friends & family weekly',
    category: 'social',
    targetCount: 2,
    currentCount: 2,
    unit: 'gatherings',
    frequency: 'weekly',
    deadlineDescription: 'Achieved this week!'
  },
  {
    id: 'pg-4',
    title: 'Outdoor morning jog 3× a week',
    category: 'nature',
    targetCount: 3,
    currentCount: 2,
    unit: 'jogs',
    frequency: 'weekly',
    deadlineDescription: '1 more jog to hit target'
  },
  {
    id: 'pg-5',
    title: 'Study physical textbook 3 hrs/week',
    category: 'learning',
    targetCount: 3,
    currentCount: 2.25,
    unit: 'hours',
    frequency: 'weekly',
    deadlineDescription: '45 mins remaining'
  }
];
