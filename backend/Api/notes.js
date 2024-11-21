import mongoose from 'mongoose';
import Note from '../backend/Model/NotesModel.js';

// MongoDB connection logic
const connectDB = async () => {
  if (!global.mongooseConnection) {
    global.mongooseConnection = await mongoose.connect(process.env.MONGO_URI);
  }
};

export default async function handler(req, res) {
  await connectDB();

  // Create a new note (POST request)
  if (req.method === 'POST') {
    try {
      const { title, body } = req.body;
      const newNote = new Note({
        title,
        body
      });
      const savedNote = await newNote.save();
      return res.status(201).json(savedNote);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Read all notes (GET request)
  if (req.method === 'GET') {
    try {
      const notes = await Note.find();
      return res.status(200).json(notes);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Read a single note (GET request with ID)
  if (req.method === 'GET' && req.query.id) {
    try {
      const note = await Note.findById(req.query.id);
      if (!note) return res.status(404).json({ message: 'Note not found' });
      return res.status(200).json(note);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Update a note (PUT request)
  if (req.method === 'PUT') {
    try {
      const updatedNote = await Note.findByIdAndUpdate(
        req.query.id,
        { title: req.body.title, body: req.body.body },
        { new: true }
      );
      if (!updatedNote) return res.status(404).json({ message: 'Note not found' });
      return res.status(200).json(updatedNote);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Delete a note (DELETE request)
  if (req.method === 'DELETE') {
    try {
      const deletedNote = await Note.findByIdAndDelete(req.query.id);
      if (!deletedNote) return res.status(404).json({ message: 'Note not found' });
      return res.status(200).json({ message: 'Note deleted successfully' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
