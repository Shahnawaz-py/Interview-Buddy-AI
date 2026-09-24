const express = require('express');
const router = express.Router();
const {
  createInterview,
  getInterview,
  submitAnswer,
  endInterview
} = require('../controllers/interviewController');

router.post('/start', createInterview);
router.get('/:id', getInterview);
router.post('/:id/answer', submitAnswer);
router.post('/:id/end', endInterview);

module.exports = router;
