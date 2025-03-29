const mongoose = require('mongoose');
const { Schema } = mongoose;

const feeSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['Paid', 'Unpaid', 'Partial'], default: 'Unpaid' },
  paymentDate: { type: Date },
  paymentMethod: { type: String },
  transactionId: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Fee', feeSchema);