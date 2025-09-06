
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

const sampleEvents = [
  {
    name: 'Tech Conference 2024',
    description: 'Annual tech conference with a variety of speakers and workshops.',
    date: '2024-10-26',
    time: '09:00',
    location: 'Main Auditorium',
    capacity: 500,
    type: 'Conference'
  },
  {
    name: 'Art Workshop',
    description: 'A hands-on workshop for students interested in painting and drawing.',
    date: '2024-11-15',
    time: '14:00',
    location: 'Fine Arts Building, Room 101',
    capacity: 50,
    type: 'Workshop'
  },
  {
    name: 'Career Fair',
    description: 'Connect with top companies and explore internship and job opportunities.',
    date: '2024-11-20',
    time: '10:00',
    location: 'University Gymnasium',
    capacity: 1000,
    type: 'Career'
  },
];

const sampleStudents = [
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    major: 'Computer Science'
  },
  {
    name: 'Bob Williams',
    email: 'bob@example.com',
    major: 'Business Administration'
  },
];

export const seedDatabase = async () => {
  const eventsCollection = collection(db, 'events');
  const studentsCollection = collection(db, 'students');

  console.log('Seeding events...');
  for (const event of sampleEvents) {
    await addDoc(eventsCollection, event);
  }
  console.log('Events seeded.');

  console.log('Seeding students...');
  for (const student of sampleStudents) {
    await addDoc(studentsCollection, student);
  }
  console.log('Students seeded.');
};
