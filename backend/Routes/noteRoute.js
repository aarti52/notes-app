import express from 'express';
import Note from '../Model/NotesModel.js';

const router = express.Router();

// Create a new note
router.post('/', async (req, res) => {
  try {
    const newNote = new Note({
      title: req.body.title,
      body: req.body.body
    });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read a single note by ID
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a note by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, body: req.body.body },
      { new: true }
    );
    if (!updatedNote) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a note by ID
router.delete('/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
