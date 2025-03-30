import mongoose from "mongoose";
const { Schema } = mongoose;

const libraryBookSchema = new Schema({
  bookId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true },
  publisher: { type: String },
  category: { type: String },
  availableCopies: { type: Number, default: 1 },
  totalCopies: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('LibraryBook', libraryBookSchema);