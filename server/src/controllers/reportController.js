const Report = require('../models/Report');
const Interview = require('../models/Interview');
const { getDbStatus, inMemoryStore } = require('../config/db');

/**
 * Get Report by Interview ID
 */
const getReportByInterviewId = async (req, res) => {
  try {
    const { interviewId } = req.params;

    if (getDbStatus()) {
      const report = await Report.findOne({ interviewId }).populate('interviewId');
      if (!report) {
        return res.status(404).json({ error: 'Evaluation report not found.' });
      }
      return res.json({ success: true, report });
    } else {
      let foundReport = null;
      for (const [id, r] of inMemoryStore.reports.entries()) {
        if (String(r.interviewId) === String(interviewId)) {
          const interview = inMemoryStore.interviews.get(interviewId);
          foundReport = { ...r, interviewId: interview };
          break;
        }
      }
      if (!foundReport) {
        return res.status(404).json({ error: 'Evaluation report not found.' });
      }
      return res.json({ success: true, report: foundReport });
    }
  } catch (err) {
    console.error('Error fetching report:', err);
    return res.status(500).json({ error: 'Failed to retrieve report.' });
  }
};

/**
 * Get Report by Report ID directly
 */
const getReportById = async (req, res) => {
  try {
    const { id } = req.params;

    if (getDbStatus()) {
      const report = await Report.findById(id).populate('interviewId');
      if (!report) {
        return res.status(404).json({ error: 'Evaluation report not found.' });
      }
      return res.json({ success: true, report });
    } else {
      const report = inMemoryStore.reports.get(id);
      if (!report) {
        return res.status(404).json({ error: 'Evaluation report not found.' });
      }
      const interview = inMemoryStore.interviews.get(String(report.interviewId));
      return res.json({ success: true, report: { ...report, interviewId: interview } });
    }
  } catch (err) {
    console.error('Error fetching report by ID:', err);
    return res.status(500).json({ error: 'Failed to retrieve report.' });
  }
};

/**
 * Get all interview history reports
 */
const getAllReports = async (req, res) => {
  try {
    if (getDbStatus()) {
      const reports = await Report.find().populate('interviewId').sort({ createdAt: -1 });
      return res.json({ success: true, reports });
    } else {
      const reports = Array.from(inMemoryStore.reports.values()).map(r => {
        const interview = inMemoryStore.interviews.get(String(r.interviewId));
        return { ...r, interviewId: interview };
      }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      return res.json({ success: true, reports });
    }
  } catch (err) {
    console.error('Error fetching all reports:', err);
    return res.status(500).json({ error: 'Failed to list interview history.' });
  }
};

module.exports = {
  getReportByInterviewId,
  getReportById,
  getAllReports
};
