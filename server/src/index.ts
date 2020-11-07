import express from 'express';
import cors from 'cors';
import {
    accountController,
    matchController,
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

app.use('/api/v1', api);

app.listen(5000, () => {
    console.log('Listening on http://localhost:5000');
});
