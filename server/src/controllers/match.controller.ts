import { GenericResponse } from '../models/generic-response.model';
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
        if (user.searchingForOpponent) {
            const findMatchWithUser = (userUUID: string): string[] =>
                matches[Object.keys(matches).find(key => matches[key].includes(userUUID))] as string[];
            const matches = data.get(JSONFile.matches) as {[key: string]: string[]};
            const match = findMatchWithUser(uuid);
            if (match) {
                res.json(match);
            } else {
                const users = data.get(JSONFile.users);
                const matchedUserUUID = Object.keys(users).find(key => {
                    const u = users[key] as User;
                    const differentUser = key !== uuid;
                    const isSearching = u.searchingForOpponent;
                    const matchNotFound = !findMatchWithUser(key);
                    return differentUser && isSearching && matchNotFound;
                });
                if (matchedUserUUID) {
                    const newMatch = {
                        [uuidv4()]: [
                            matchedUserUUID,
                            uuid,
                        ]
                    };
                    data.append(JSONFile.matches, newMatch);
                } else {
                    res.json(GenericResponse.Ok());
                }
            }
        } else {
            user.searchingForOpponent = true;
            data.update(JSONFile.users, uuid, user);
            res.json(GenericResponse.Ok());
        }
    } else {
        res.status(404);
        res.json(GenericResponse.Message(`User with uuid ${uuid} not found`));
    }
});

export default router;
