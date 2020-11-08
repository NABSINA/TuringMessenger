import { GenericResponse } from '../models/generic-response.model';
import { JSONFile } from '../data/JSONFile.enum';
import { Match } from '../models/match.model';
import { User } from '../models/user.model';
import * as data from '../data';
import express from 'express';

const router = express.Router();

router.post('/:uuid', async (req, res) => {
    const { uuid } = req.params;
    const { userID, vote } = req.body;
    const voteResults = data.get(JSONFile.votes)[uuid];
    if (voteResults) {
        // vote === false ? not bot : (vote === true ? bot : ¯\_(ツ)_/¯)
        voteResults[userID] = vote;
        data.update(JSONFile.votes, uuid, voteResults);
    } else {
        data.append(JSONFile.votes, {
            [uuid]: {
                [userID]: vote
            }
        });
    }
    res.json(GenericResponse.Ok());
});

router.get('/:uuid', async (req, res) => {
    const { uuid } = req.params;
    const voteResults = data.get(JSONFile.votes)[uuid];
    const users = data.get(JSONFile.users);
    const matches = data.get(JSONFile.matches);
    Object.keys(voteResults).filter(x => x !== 'createdAt').forEach(userID => {
        const otherUserID = (matches[uuid] as Match).userIDs.filter(x => x !== userID)[0];
        voteResults[userID] = {
            vote: voteResults[userID],
            valid: (users[otherUserID] as User).isBot === voteResults[userID]
        };
    });
    res.json(voteResults);
})

export default router;
