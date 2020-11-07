import { GenericResponse } from '../models/generic-response.model';
import { Message } from '../models/message.model';
import { JSONFile } from '../data/JSONFile.enum';
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
            key === uuid && (matches[key] as string[]).includes(userID))
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

export default router;
