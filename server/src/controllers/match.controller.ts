import { GenericResponse } from '../models/generic-response.model';
import { JSONFile } from '../data/JSONFile.enum';
import { Match } from '../models/match.model';
import { User } from '../models/user.model';
import { uuidv4 } from '../services/helper';
import * as data from '../data';
import express from 'express';

const router = express.Router();

function randomUserName(uuid: string): string {
    const unique = (arr: string[]) => arr.filter((v, i, a) => a.indexOf(v) === i);
    const users = data.get(JSONFile.users);
    const currentUsername = (users[uuid] as User).username;
    const usernames = unique(
        Object.keys(users).map(key => (users[key] as User).username)
        .filter(x => x !== currentUsername)
    );
    return usernames[Math.floor(Math.random() * usernames.length)];
}

function createBot(username: string): string {
    const uuid = uuidv4();
    const newUser = {
        username,
        isBot: true,
    } as User;
    data.append(JSONFile.users, {[uuid]: newUser});
    return uuid;
}

router.get('/:uuid', async (req, res) => {
    const { uuid } = req.params;
    const user: User = data.get(JSONFile.users)[uuid];
    if (user) {
        if (user.searchingForOpponent) {
            const matches = data.get(JSONFile.matches) as {[key: string]: Match};
            const findMatchWithUser = (userUUID: string): Match => {
                const matchID = Object.keys(matches).find(key => matches[key].userIDs.includes(userUUID));
                return matches[matchID];
            };
            const match = findMatchWithUser(uuid);
            if (match) {
                res.json(match);
            } else {
                const users = data.get(JSONFile.users);
                const matchedUserUUID = user.isFooledByBot
                    ? createBot(randomUserName(uuid))
                    : Object.keys(users).find(key => {
                        const u = users[key] as User;
                        const differentUser = key !== uuid;
                        const isSearching = u.searchingForOpponent;
                        const matchNotFound = !findMatchWithUser(key);
                        const userTypeMatches = !u.isFooledByBot;
                        return differentUser && isSearching && matchNotFound && userTypeMatches;
                    });
                if (matchedUserUUID) {
                    const newMatchUUID = uuidv4();
                    const newMatch = {
                        [newMatchUUID]: {
                            matchID: newMatchUUID,
                            partySize: 2,
                            userIDs: [
                                matchedUserUUID,
                                uuid,
                            ],
                        } as Match
                    };
                    data.append(JSONFile.matches, newMatch);
                    if (!user.isFooledByBot) {
                        const foolerIndex = Math.floor(Math.random() * 2);
                        newMatch[newMatchUUID].userIDs.forEach((userID, i) => {
                            const u = users[userID] as User;
                            u.isFooling = i === foolerIndex;
                            u.isFooledByHuman = i !== foolerIndex;
                            data.update(JSONFile.users, userID, u);
                        });
                    }
                }
                res.json(GenericResponse.Ok());
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
