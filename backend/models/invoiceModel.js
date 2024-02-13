const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  hours: {
    type: Number,
    required: true
  }
});

const invoiceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true
    },
    items: [ItemSchema], // Array of items
    dueDate: {
      type: Date
    },
    status: {
      type: Boolean,
      default: false,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    paymentTerms: {
      type: String,
      default: 'NET 30' // Default payment terms if not specified
    }
  },
  { timestamps: true }
);

invoiceSchema.pre('save', function (next) {
  if (!this.dueDate) {
    const currentDate = new Date();
    const paymentTerms = this.paymentTerms.split(' ');
    const daysToAdd = parseInt(paymentTerms[1]);
    const dueDate = new Date(
      currentDate.setDate(currentDate.getDate() + daysToAdd)
    );
    this.dueDate = dueDate;
  }
  next();
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
