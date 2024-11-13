import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const NotesModel= mongoose.model('Note', noteSchema);
export default NotesModel
