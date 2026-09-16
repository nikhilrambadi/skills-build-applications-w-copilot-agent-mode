import { Router } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js';
function createResourceRouter(model) {
    const router = Router();
    router.get('/', async (_request, response) => {
        try {
            response.json(await model.find().lean());
        }
        catch (error) {
            response.status(500).json({ error: 'Unable to load resource', details: String(error) });
        }
    });
    router.post('/', async (request, response) => {
        try {
            const resource = await model.create(request.body);
            response.status(201).json(resource);
        }
        catch (error) {
            response.status(400).json({ error: 'Unable to create resource', details: String(error) });
        }
    });
    return router;
}
export const usersRouter = createResourceRouter(User);
export const teamsRouter = createResourceRouter(Team);
export const activitiesRouter = createResourceRouter(Activity);
export const leaderboardRouter = createResourceRouter(LeaderboardEntry);
export const workoutsRouter = createResourceRouter(Workout);
