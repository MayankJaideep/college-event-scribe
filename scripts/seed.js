
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

// TODO: Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

const seedDatabase = async () => {
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

seedDatabase().then(() => {
  console.log('Database seeding complete.');
  process.exit(0);
}).catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});
