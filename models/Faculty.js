const mongoose = require('mongoose');
const { Schema } = mongoose;

const facultySchema = new Schema({
  facultyId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  department: { type: String, required: true },
  designation: { type: String },
  coursesTeaching: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  joiningDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Faculty', facultySchema);