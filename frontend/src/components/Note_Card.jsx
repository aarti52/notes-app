/* eslint-disable react/prop-types */
import { Box, Heading, Text, Button,  } from "@chakra-ui/react";
import  editimg  from '../assets/editimg.png'; 
import deleteimg from '../assets/deleteimg.png';


// Check the path or use a relative path based on where this component is located

function Note_Card({ note, deleteNote, editExistingNote}) {
  <style>
     {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          
        `}
  
  </style>
  
  return (<>

    {/* {generateRandomColor()} */}
    <Box borderWidth="1px" 
    
    // bgColor={color}
    // border='8px solid white'
    borderRadius="lg" p={4} m={6} w='10rem'h='10rem' boxShadow="xl" overflow={'auto'}
    bgColor={"#e1e19e"}  opacity={0.6} className="custom-scrollbar"
     color={"black"} display={'flex'} flexDirection={'column'} gap={10}
    >
       {/* {console.log(note.id)} */}
      <Box>
      <Heading size="s" mb={2}>{note.title}</Heading>
      <Text fontSize={'16x'}
      //  height={'1vh'}
      >{note.body}</Text>
      </Box>
      
      <Box display="flex" justifyContent="space-around">
        <Button onClick={() => editExistingNote(note)}
         size="xs" bg="purple.400" fontSize="sm">
         <img src={editimg} style={{height:'13px'}}/>
        </Button>
        <Button onClick={() =>{ 
          // console.log(note)
          deleteNote(note)
        }} size="xs" bg="red.400" fontSize="sm">
         <img src={deleteimg} style={{height:'13px'}}/>
        </Button>
      </Box>
    </Box>
    </>
  );
}

export default Note_Card;
