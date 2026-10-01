const express = require('express');
const router = express.Router();
const savedController = require('./saved.controller');
const authMiddleware = require('../../middleware/auth.middleware');

router.use(authMiddleware);

router.post('/opportunities/:id/save', savedController.save);

router.delete('/opportunities/:id/save', savedController.unsave);

router.get('/me/saved', savedController.getMySaved);

module.exports = router;