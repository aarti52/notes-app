import { useState, useRef, useEffect } from "react";
import axios from "axios";

import {ChakraProvider, Button, Modal, ModalOverlay, ModalContent, ModalHeader,  ModalBody,  ModalFooter, Input,
Textarea, Box, useDisclosure, useToast} from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { CloseButton } from "./components/ui/close-button";
import Note_Card from "./components/Note_Card";

import './App.css'
function App2() {
  const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure();
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);
  const [formValues, setFormValues] = useState({ title: "", body: "" });
  const initialRef = useRef(null);
  const textareaRef = useRef(null); 
  const toast=useToast()
  const addNote = async (note) => {
    try {
      const res = await axios.post("http://localhost:3000/api/notes", {
        // Your data goes here
        title: note.title,
        body: note.body,
      });
      setNotes([...notes, { ...res.data, id: res.data.id }]);
      setFormValues({ title: "", body: "" });
      toast({
        title: 'Note added.',
        description: 'Your note was added successfully!',
        status: 'success', // Can be "info", "warning", or "error"
        duration: 3000,
        isClosable: true,
      });
      
    } catch (error) {
      toast({
        title: 'Error adding note.',
        description: 'Something went wrong.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Error posting data:', error);
    }
    onClose();
  };

  const deleteNote = async (note) => {
    const deletingNote = notes.find((n) => n._id === note._id);
    if (!deletingNote) {
      console.error("Note not found!");
      return;
    }

    try {
      setNotes(notes.filter((n) => n.id != note._id));
      await axios.delete(`http://localhost:3000/api/notes/${deletingNote._id}`);
      toast({
        title: 'Note deleted.',
        description: 'The note was deleted successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error deleting note.',
        description: 'Something went wrong.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Error deleting note:', error);
    }
  };

  const editExistingNote = (note) => {
    setEditNote(note);
    setFormValues({ title: note.title, body: note.body });
    onOpen();
  };

  const updateNote = async () => {
    try {
      const res = await axios.put(`http://localhost:3000/api/notes/${editNote._id}`, {
        title: formValues.title,
        body: formValues.body,
      });
      setNotes(
        notes.map((note) => (note.id === editNote.id ? res.data : note))
      );
      setEditNote(null);
      setFormValues({ title: "", body: "" });
      onClose();
      toast({
        title: 'Note updated.',
        description: 'Your note was updated successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error updating note.',
        description: 'Something went wrong.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Error updating note:', error);
    }
  };

  const handleFormSubmit = () => {
    if (editNote) {
      updateNote();
    } else {
      addNote(formValues);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      textareaRef.current?.focus(); // Move focus to Textarea
    }
  };

  useEffect(() => {
    const getnotes = async () => {
      let res = await axios.get("http://localhost:3000/api/notes");
      setNotes(res.data);
    };
    getnotes();
  }, []);

  return (
    <ChakraProvider>
      <Box
        bgImg={'../public/backgroundimg.png'}  
        width=" 100%"
        height="80vh"
        overflow="contain"      
        backgroundRepeat= 'repeat-y' 
        backgroundSize=' cover'
        backgroundPosition= 'center'
        zIndex={-1}
        h="100vh"
        className="custom-scrollbar"
      >
        <Navbar openForm={onOpen} />
      <Box 
      border=' 2px solid black'
      height=' 80vh'
      width=' 60vw'
      overflow=' auto'
      scrollBehavior='smooth'
      margin='5rem auto'    
      shadow='2xl'
      className="custom-scrollbar"
      >

        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {notes.map((note) => (
            <Note_Card
            key={note.id}
            note={note}
            deleteNote={deleteNote}
            editExistingNote={editExistingNote}
            />
          ))}
        </Box>
      </Box>

        <Modal
          isOpen={isModalOpen}
          onClose={onClose}
          initialFocusRef={initialRef}
          closeOnEsc
          closeOnOverlayClick
        >
          <ModalOverlay />
          <ModalContent w="300px" maxW="400px" h="300px">
            <ModalHeader
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {editNote ? "Edit Note" : "Add Note"}
              <CloseButton
                onClick={onClose}
                marginTop="2px"
                aria-label="Close Modal"
              />
            </ModalHeader>
            <ModalBody>
              <Input
                ref={initialRef}
                placeholder="Title"
                name="title"
                value={formValues.title}
                onChange={handleInputChange}
                onKeyDown={handleTitleKeyDown} // Handle Enter key in title field
                mb={4}
                autoFocus
              />
              <Textarea
                ref={textareaRef} // Set ref to Textarea for focus
                placeholder="Body"
                name="body"
                value={formValues.body}
                onChange={handleInputChange}
                overflow="auto"
              />
            </ModalBody>
            <ModalFooter>
              <Button
                bg="purple.400"
                mr={3}
                onClick={handleFormSubmit}
                size="sm"
                aria-label={editNote ? "Update Note" : "Add Note"}
              >
                {editNote ? "Update Note" : "Add Note"}
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        
      </Box>
    </ChakraProvider>
  );
}

export default App2;
