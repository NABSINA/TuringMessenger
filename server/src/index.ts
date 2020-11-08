import express from 'express';
import cors from 'cors';
import {
    accountController,
    matchController,
    messagesController,
    voteController,
} from './controllers';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'I\'m alive!'
    });
});

const api = express.Router();
api.get('/', (req, res) => {
    res.json({
        version: process.version,
    });
});
api.use('/match', matchController);
api.use('/account', accountController);
api.use('/messages', messagesController);
api.use('/vote', voteController);

app.use('/api/v1', api);

app.listen(5000, () => {
    console.log('Listening on http://localhost:5000');
});
