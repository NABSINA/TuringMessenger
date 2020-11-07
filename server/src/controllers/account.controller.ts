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
    const typeIndex = Math.floor(Math.random() * 3);
    const uuid = uuidv4();
    const newUser = {
        username: req.params.userID,
        isBot: false,
        isFooledByHuman: typeIndex === 0,
        isFooledByBot: typeIndex === 1,
        isFooling: typeIndex === 2,
    } as User;
    data.append(JSONFile.users, {[uuid]: newUser});
    res.json({ uuid });
});

router.post('/destroy/:uuid', async (req, res) => {
    const { uuid } = req.params;
    data.remove(JSONFile.users, uuid);
    res.json({ uuid });
});

export default router;
