const mongoose = require('mongoose');
const { Schema } = mongoose;

const attendanceSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  date: { type: Date, required: true, default: Date.now },
  status: { type: String, enum: ['Present', 'Absent', 'Late'], default: 'Absent' },
  remarks: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);