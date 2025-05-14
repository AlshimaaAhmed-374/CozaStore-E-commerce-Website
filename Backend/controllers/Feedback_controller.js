const Feedback = require('../models/feedback.model');

exports.submitFeedback = async (req, res) => {
  try {
    const { name, email, review } = req.body;
    
    // Validate required fields
    if (!name || !email || !review) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newFeedback = new Feedback({
      name,
      email,
      review
    });

    await newFeedback.save();
    
    res.status(201).json({ 
      success: true,
      message: 'Thank you for your feedback!',
      data: newFeedback
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ 
      error: 'An error occurred while submitting feedback',
      details: error.message 
    });
  }
};