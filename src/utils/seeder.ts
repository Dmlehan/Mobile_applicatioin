import { noteService } from '@/services/noteService';

/**
 * Seeds a standard list of premium rich-text notes for development, styling, and viva testing.
 */
export const seedNotesForUser = async (userId: string): Promise<void> => {
  const sampleNotes = [
    {
      title: 'Meeting Notes - NoteSphere Design',
      content: '<h3>NoteSphere Architecture</h3><p>Here are the project milestones for NoteSphere:</p><ul><li><b>Phase 6</b>: Setup Note CRUD with Firestore integration.</li><li><b>Phase 7</b>: Deliver Rich Text Editor with contentEditable fallback.</li><li><b>Phase 8</b>: Deploy Favorites filtering tab.</li></ul>',
      category: 'Work',
      favorite: true,
    },
    {
      title: 'Weekly Shopping List',
      content: '<p>Things to buy for the family dinner:</p><ul><li>Fresh organic strawberries 🍓</li><li>Whole wheat bread 🍞</li><li>Greek yogurt 🥛</li><li>Avocados 🥑</li></ul>',
      category: 'Personal',
      favorite: false,
    },
    {
      title: 'Idea: Smart Plant Watering App',
      content: '<h3>Smart Irrigation Concept</h3><p>An app that integrates with moisture sensors over BLE and alerts users when plants need water.</p><p><i>Key features:</i></p><ol><li>Daily notification check.</li><li>Watering calendar logs.</li></ol>',
      category: 'Ideas',
      favorite: true,
    },
    {
      title: 'JavaScript Closure Notes',
      content: '<h3>What is a JavaScript Closure?</h3><p>A closure is the combination of a function bundled together (enclosed) with references to its surrounding scope (the lexical environment).</p><p>In other words, a closure gives an inner function access to the outer function\'s scope.</p>',
      category: 'Study',
      favorite: false,
    },
    {
      title: 'Gym Workout Routine',
      content: '<p>My core upper body workout plan:</p><ul><li>Warm-up: 5 mins stretching</li><li>Bench press: 4 sets of 8-12 reps</li><li>Dumbbell rows: 3 sets of 10 reps</li><li>Overhead press: 3 sets of 12 reps</li></ul>',
      category: 'Personal',
      favorite: false,
    },
  ];

  for (const item of sampleNotes) {
    const note = await noteService.createNote(userId, item.title, item.content, item.category);
    if (item.favorite) {
      await noteService.updateNote(note.id, { favorite: true });
    }
  }
};
