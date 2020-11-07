import { GenericResponse } from '../models/generic-response.model';
import { getNextMessage } from '../services/ai.service';
import { Message } from '../models/message.model';
import { JSONFile } from '../data/JSONFile.enum';
import { Match } from '../models/match.model';
import { User } from '../models/user.model';
import * as data from '../data';
import express from 'express';

const router = express.Router();

router.post('/send/:uuid', async (req, res) => {
    const { uuid } = req.params;
    const { userID, message } = req.body;
    const messages = (() => {
        const allMessages = data.get(JSONFile.messages);
        const result = allMessages[uuid];
        const matches = data.get(JSONFile.matches);
        if (Object.keys(matches).find(key =>
            key === uuid && (matches[key] as Match).userIDs.includes(userID))
        ) {
            if (!result) {
                data.append(JSONFile.messages, {[uuid]: []});
                return [];
            }
        } else {
            return undefined;
        }
        return result;
    })() as Message[];
    if (messages) {
        messages.push({ userID, message } as Message);
        data.update(JSONFile.messages, uuid, messages);
        res.json(GenericResponse.Ok());
    } else {
        res.status(400);
        res.json(GenericResponse.Message(`user ${userID} is not in the group ${uuid}`));
    }
});

router.get('/all/:uuid', async (req, res) => {
    const { uuid } = req.params;
    const messages = data.get(JSONFile.messages)[uuid] as Message[];
    const match = data.get(JSONFile.matches)[uuid] as Match;
    const users = data.get(JSONFile.users);
    const botIDs: string[] = match.userIDs
        .filter(x => (users[x] as User).isBot);
    if (!botIDs.includes(messages[messages.length - 1].userID)) {
        botIDs.forEach(botID => {
            setTimeout(async () => {
                try {
                    messages.push({
                        userID: botID,
                        message: await getNextMessage(messages.map(x => x.message)),
                    } as Message);
                    data.update(JSONFile.messages, uuid, messages);
                } catch (ex) {
                    console.error(ex);
                }
            }, 1000);
        });
    }
    res.json(data.get(JSONFile.messages)[uuid] || []);
});

export default router;
