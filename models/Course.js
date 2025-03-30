import mongoose from "mongoose";
const { Schema } = mongoose;

const courseSchema = new Schema({
  courseCode: { type: String, required: true, unique: true },
  courseName: { type: String, required: true },
  description: { type: String },
  creditHours: { type: Number, required: true },
  department: { type: String, required: true },
  instructor: { type: Schema.Types.ObjectId, ref: 'Faculty' },
  schedule: {
    days: [{ type: String }],
    startTime: { type: String },
    endTime: { type: String },
    room: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);