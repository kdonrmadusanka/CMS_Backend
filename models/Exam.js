const mongoose = require('mongoose');
const { Schema } = mongoose;

const examSchema = new Schema({
  examName: { type: String, required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  room: { type: String },
  maxMarks: { type: Number, required: true },
  passingMarks: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Exam', examSchema);