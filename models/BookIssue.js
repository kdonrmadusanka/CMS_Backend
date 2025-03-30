import mongoose from "mongoose";
const { Schema } = mongoose;

const bookIssueSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: 'LibraryBook', required: true },
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  issueDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnDate: { type: Date },
  status: { type: String, enum: ['Issued', 'Returned', 'Overdue'], default: 'Issued' },
  fine: { type: Number, default: 0 }
}, { timestamps: true });

export default bookIssueSchema;