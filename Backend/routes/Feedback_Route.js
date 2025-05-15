const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/Feedback_controller');

// POST route for submitting feedback
router.post('/', feedbackController.submitFeedback);

module.exports = router;