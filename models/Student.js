import mongoose from "mongoose";
const { Schema } = mongoose;

const studentSchema = new Schema({
  studentId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  admissionDate: { type: Date, default: Date.now },
  batch: { type: String, required: true },
  section: { type: String },
  coursesEnrolled: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  attendance: [{ 
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['Present', 'Absent', 'Late'], default: 'Absent' }
  }],
  guardian: {
    name: { type: String },
    relation: { type: String },
    contact: { type: String }
  }
}, { timestamps: true });

export default studentSchema;