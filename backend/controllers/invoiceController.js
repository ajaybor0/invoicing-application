const twilio = require('twilio');
const Invoice = require('../models/invoiceModel');
const { jsPDF } = require('jspdf');
const fs = require('fs');
const transporter = require('../config/email.js');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

const twilioClient = twilio(accountSid, authToken);

// @desc     Create invoice
// @method   POST
// @endpoint /api/invoice
// @access   Private
const createInvoice = async (req, res, next) => {
  try {
    const { clientId, items, dueDate, status, totalAmount } = req.body;

    const invoice = new Invoice({
      userId: req.user._id,
      clientId,
      items,
      dueDate,
      status,
      totalAmount
    });

    const createdInvoice = await invoice.save();
    res.status(200).json({ message: 'Invoice created', createdInvoice });
  } catch (error) {
    next(error);
  }
};

// @desc     Get invoices
// @method   GET
// @endpoint /api/invoices
// @access   Private
const getInvoices = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const invoices = await Invoice.find({ userId }).populate('clientId');

    if (!invoices || invoices.length === 0) {
      res.statusCode = 404;
      throw new Error('No invoices found!');
    }
    res.status(200).json(invoices);
  } catch (error) {
    next(error);
  }
};

// @desc     Get a single invoice
// @method   GET
// @endpoint /api/invoices/:id
// @access   Private
const getInvoice = async (req, res, next) => {
  try {
    const { id: invoiceId } = req.params;
    const invoice = await Invoice.findById({ _id: invoiceId }).populate(
      'clientId'
    );

    if (!invoice) {
      res.statusCode = 404;
      throw new Error('Invoice not found!');
    }
    res.status(200).json(invoice);
  } catch (error) {
    next(error);
  }
};

// @desc     Send invoice
// @method   POST
// @endpoint /api/invoices/send-invoice/:id
// @access   Private
const sendInvoice = async (req, res, next) => {
  try {
    const { id: invoiceId } = req.params;
    const invoice = await Invoice.findById({ _id: invoiceId })
      .populate('clientId')
      .populate('userId');

    if (!invoice) {
      res.statusCode = 404;
      throw new Error('Invoice not found!');
    }

    const client = invoice.clientId;
    const user = invoice.userId;

    const recipientNumber = client.phone; // Phone number to send the message to (including country code)
    const recipientEmail = client.email; // Email address to send the email to
    const messageBody = `Hi ${client.name},

I hope this message finds you well. 
I wanted to inform you that I've just sent over the invoice for our services. You should receive it shortly via email.

Thank you once again for your business.

Best regards,
${user.name}`;

    const generatePDF = (invoice, client) => {
      const doc = new jsPDF();

      doc.text(20, 20, 'Invoice');

      // Client details
      doc.text(20, 30, `Client: ${client.name}`);
      doc.text(20, 40, `Email: ${client.email}`);
      doc.text(20, 50, `Phone number: ${client.phone}`);

      // Invoice items
      let startY = 70;
      doc.text(20, startY, 'Item');
      doc.text(80, startY, 'Rate');
      doc.text(150, startY, 'Hours');
      startY += 10;
      invoice.items.forEach((item, index) => {
        doc.text(20, startY + index * 10, item.item);
        doc.text(
          80,
          startY + index * 10,
          `$${item.rate.toFixed(2).toString()}`
        );
        doc.text(150, startY + index * 10, item.hours.toString());
      });

      // Total
      doc.text(80, startY + invoice.items.length * 10 + 10, 'Total');
      doc.text(
        150,
        startY + invoice.items.length * 10 + 10,
        `$${invoice.totalAmount.toFixed(2).toString()}`
      );

      const pdfPath = 'invoice.pdf';
      doc.save(pdfPath);
      return pdfPath;
    };

    const sendEmail = async (recipientEmail, invoice) => {
      try {
        const pdfPath = generatePDF(invoice, client);
        const attachment = fs.readFileSync(pdfPath);

        const msg = {
          to: recipientEmail,
          from: process.env.EMAIL_FROM,
          subject: 'Invoice',
          html: `<p>Dear ${client?.name},</p>
                 <p>Please find attached invoice.</p>`,
          attachments: [
            {
              content: attachment,
              filename: 'invoice.pdf',
              type: 'application/pdf',
              disposition: 'attachment'
            }
          ]
        };

        await transporter.sendMail(msg);
        fs.unlinkSync(pdfPath); // Delete the temporary PDF file
      } catch (error) {
        next(error);
      }
    };

    const sendTextMessage = async (to, body) => {
      try {
        await twilioClient.messages.create({
          body: body,
          from: `+${phoneNumber}`, // Twilio phone number (must be purchased on Twilio)
          to: to
        });
      } catch (error) {
        next(error);
      }
    };

    await sendEmail(recipientEmail, invoice);
    await sendTextMessage(recipientNumber, messageBody);

    res.status(200).json({ message: 'Invoice sent successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createInvoice, getInvoices, getInvoice, sendInvoice };
