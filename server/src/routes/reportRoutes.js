const express = require('express');
const router = express.Router();
const {
  getReportByInterviewId,
  getReportById,
  getAllReports
} = require('../controllers/reportController');

router.get('/all', getAllReports);
router.get('/interview/:interviewId', getReportByInterviewId);
router.get('/:id', getReportById);

module.exports = router;
