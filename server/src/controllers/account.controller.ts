import { JSONFile } from '../data/JSONFile.enum';
import { User } from '../models/user.model';
import { uuidv4 } from '../services/helper';
import * as data from '../data';
import express from 'express';

const router = express.Router();

router.get('/:uuid', async (req, res) => {
    const { uuid } = req.params;
    const user: User = data.get(JSONFile.users)[uuid];
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        res.json({message: `User with uuid ${uuid} not found`});
    }
});

router.post('/create/:userID', async (req, res) => {
    const uuid = uuidv4();
    data.append(JSONFile.users, {[uuid]: {username: req.params.userID}});
    res.json({ uuid });
});

router.post('/destroy/:uuid', async (req, res) => {
    const { uuid } = req.params;
    data.remove(JSONFile.users, uuid);
    res.json({ uuid });
});

export default router;
