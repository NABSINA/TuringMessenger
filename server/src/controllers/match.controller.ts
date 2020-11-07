import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    res.json({hi: 'there'});
});

export default router;
