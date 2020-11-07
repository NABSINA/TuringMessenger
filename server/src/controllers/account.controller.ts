import { JSONFile } from '../data/JSONFile.enum';
import * as data from '../data';
import express from 'express';

const router = express.Router();

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

router.get('/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    const user = data.get(JSONFile.users)[uuid];
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
    const uuid = uuidv4();
    data.remove(JSONFile.users, req.params.uuid);
    res.json({ uuid });
});

export default router;
