const express = require('express');
const protect = require('../middleware/authMiddleware');

const {
  createInvoice,
  getInvoices,
  getInvoice,
  sendInvoice
} = require('../controllers/invoiceController');

const router = express.Router();

router.route('/').post(protect, createInvoice).get(protect, getInvoices);
router.get('/:id', protect, getInvoice);
router.post('/send-invoice/:id', protect, sendInvoice);

module.exports = router;
