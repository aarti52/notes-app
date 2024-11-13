/* eslint-disable react/prop-types */
import { Button,Box } from "@chakra-ui/react";
import {Text,Heading} from '@chakra-ui/react'
function Note({ note, deleteNote, editExistingNote }) {
  return (
    <div style={{ borderRadius:'2px',display:'flex',
        flexDirection:'column', alignItems:'center', gap:'8px',
    backgroundColor:"#e2e8f0", width:'9em',margin:'auto',height:'8em',
    padding: '2px', justifyContent:'center', marginTop:'1rem' }}>
      <Heading >{note.title}</Heading>
      <Text fontSize='md' fontFamily='monospace'
      >{note.body}</Text>
      <Box display='flex' gap='1rem' >

      <Button onClick={() => editExistingNote(note)} 
        size='xs' bg='purple.400' fontSize='xs'
        >Edit</Button>
      <Button onClick={() => deleteNote(note)}
        size='xs' bg='purple.400' fontSize='xs'>Delete</Button>
      
      </Box>
    </div>
  );
}

export default Note;
