import { db } from '../db';
import { Router } from 'express';

export const router = Router();

router.get('/', async (req,res) => {
    try {
        const [procedures] = await db.query('SELECT * FROM procedures');
        res.json(procedures);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({
            error:'Failed to fetch procedures.'
        });
    }
});