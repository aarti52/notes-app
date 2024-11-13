/* eslint-disable react/prop-types */
import { Box } from "@chakra-ui/react";
import { ImageCircular } from "./ImageCircular";

function Navbar({ openForm }) {
  return (
    <Box >
      <Box
        size="sm"
        marginLeft="0.5"
        display={"flex"}
        justifyContent={"space-around"}
       
        alignItems="center"
      >
        <Box
          display={"flex"}  w={"full"}
          justifyContent={"space-around"}
          marginTop={"3rem"}
        >
          <Box fontSize='24px' fontWeight='bold' >My Notes</Box>
          <button style={{ size: "sm" }} onClick={openForm}>
            <ImageCircular />
          </button>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
