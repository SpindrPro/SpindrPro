const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/find', userController.findUser, (req, res) => {
    return res.status(200).json(res.locals.found);
})

router.post('/create', userController.createUser, (req, res) => {
    return res.status(200).json(res.locals.user_id);
})

router.get('/:user_id', userController.getTracks, (req, res) => {
    return res.status(200).json(res.locals.tracks);
});

router.post('/:user_id', userController.createTrack, (req, res) => {
    return res.status(200).json(res.locals.updatedUser);
});

module.exports = router;