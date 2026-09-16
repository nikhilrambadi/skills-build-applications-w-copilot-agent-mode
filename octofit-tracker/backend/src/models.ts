import mongoose, { Schema } from 'mongoose'

const documentSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    userId: String,
    teamId: String,
    points: Number,
    score: Number,
    duration: Number,
    type: String,
  },
  { timestamps: true, strict: false },
)

export const User = mongoose.model('User', documentSchema, 'users')
export const Team = mongoose.model('Team', documentSchema, 'teams')
export const Activity = mongoose.model('Activity', documentSchema, 'activities')
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', documentSchema, 'leaderboard')
export const Workout = mongoose.model('Workout', documentSchema, 'workouts')