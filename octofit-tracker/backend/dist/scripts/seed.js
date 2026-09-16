import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            LeaderboardEntry.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const [alex, jordan, sam] = await User.insertMany([
            { name: 'Alex Morgan', email: 'alex@example.com', level: 8 },
            { name: 'Jordan Lee', email: 'jordan@example.com', level: 6 },
            { name: 'Sam Rivera', email: 'sam@example.com', level: 5 },
        ]);
        const [trailblazers, pulse] = await Team.insertMany([
            { name: 'Trailblazers', description: 'Weekend endurance crew', points: 420 },
            { name: 'Pulse', description: 'Daily movement team', points: 365 },
        ]);
        await Activity.insertMany([
            { name: 'Morning Run', type: 'running', duration: 32, points: 80, userId: alex._id.toString(), teamId: trailblazers._id.toString() },
            { name: 'Strength Circuit', type: 'strength', duration: 45, points: 95, userId: jordan._id.toString(), teamId: pulse._id.toString() },
            { name: 'Evening Ride', type: 'cycling', duration: 38, points: 88, userId: sam._id.toString(), teamId: trailblazers._id.toString() },
        ]);
        await LeaderboardEntry.insertMany([
            { name: 'Alex Morgan', userId: alex._id.toString(), score: 420, points: 420 },
            { name: 'Jordan Lee', userId: jordan._id.toString(), score: 365, points: 365 },
            { name: 'Sam Rivera', userId: sam._id.toString(), score: 310, points: 310 },
        ]);
        await Workout.insertMany([
            { name: 'Full Body Foundation', type: 'strength', description: 'A balanced beginner-friendly session', duration: 30 },
            { name: 'Cardio Intervals', type: 'cardio', description: 'Short bursts with recovery periods', duration: 25 },
            { name: 'Mobility Reset', type: 'mobility', description: 'Gentle movement for recovery days', duration: 15 },
        ]);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
